#!/usr/bin/env python3
"""Flag arXiv entries whose paper was withdrawn or retracted without the entry saying so.

A link check proves the abstract page still loads; it cannot tell you the
authors pulled the paper. Two entries in this catalog turned out to have been
withdrawn for a methodology error and later revised, which is exactly the kind
of provenance a reader needs before citing a result.

The rule is not "never list a withdrawn paper" — a corrected or historically
important one can be worth keeping. The rule is that the entry must disclose
it. This queries the arXiv API and fails when arXiv reports a withdrawal that
the description does not mention.

Needs the network, so it stays out of the offline ``check.sh``; CI runs it on
a schedule. Exit code 0 when nothing needs attention, 1 otherwise.
"""

from __future__ import annotations

import json
import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSONL = ROOT / "data" / "resources.jsonl"
ARXIV_RE = re.compile(r"arxiv\.org/(?:abs|pdf|html)/(\d{4}\.\d{4,5})")
NS = {"a": "http://www.w3.org/2005/Atom", "arxiv": "http://arxiv.org/schemas/atom"}
WITHDRAWN_RE = re.compile(r"\b(withdrawn|retracted|retraction)\b", re.IGNORECASE)
# Wording that counts as the entry disclosing the status to a reader.
DISCLOSED_RE = re.compile(r"\b(withdraw\w*|retract\w*)\b", re.IGNORECASE)
BATCH = 40


def fetch(ids: list[str], attempts: int = 3) -> dict[str, dict[str, str]]:
    url = (
        "http://export.arxiv.org/api/query?id_list="
        + ",".join(ids)
        + f"&max_results={len(ids)}"
    )
    for attempt in range(attempts):
        try:
            with urllib.request.urlopen(url, timeout=60) as response:
                payload = response.read()
            break
        except Exception:
            if attempt == attempts - 1:
                raise
            time.sleep(4 * (attempt + 1))
    out: dict[str, dict[str, str]] = {}
    for entry in ET.fromstring(payload).findall("a:entry", NS):
        identifier = entry.find("a:id", NS)
        match = ARXIV_RE.search(identifier.text or "") if identifier is not None else None
        if not match:
            continue
        comment = entry.find("arxiv:comment", NS)
        summary = entry.find("a:summary", NS)
        out[match.group(1)] = {
            "comment": (comment.text or "") if comment is not None else "",
            "summary": (summary.text or "") if summary is not None else "",
        }
    return out


def main() -> int:
    rows = [json.loads(line) for line in JSONL.read_text(encoding="utf-8").splitlines() if line.strip()]
    targets = []
    for row in rows:
        match = ARXIV_RE.search(str(row["url"]))
        if match:
            targets.append((row, match.group(1)))

    problems: list[str] = []
    checked = 0
    for start in range(0, len(targets), BATCH):
        batch = targets[start : start + BATCH]
        try:
            found = fetch([identifier for _, identifier in batch])
        except Exception as exc:
            print(f"FAIL — arXiv API unreachable, nothing verified: {exc}", file=sys.stderr)
            return 1
        for row, identifier in batch:
            record = found.get(identifier)
            if record is None:
                continue
            checked += 1
            # The comment carries the withdrawal note; the summary is checked too
            # because some withdrawals replace the abstract text instead.
            if not WITHDRAWN_RE.search(record["comment"] + " " + record["summary"]):
                continue
            if DISCLOSED_RE.search(str(row["description"])):
                continue
            note = re.sub(r"\s+", " ", record["comment"]).strip()[:120]
            problems.append(
                f"{row['id']} arXiv {identifier} is marked withdrawn or retracted but the "
                f"description does not say so — disclose it or drop the entry. arXiv says: {note}"
            )
        if start + BATCH < len(targets):
            time.sleep(3)

    if problems:
        print(f"FAIL — {len(problems)} undisclosed withdrawal(s):")
        for line in problems:
            print(f"  - {line}")
        return 1
    print(f"OK — {checked} arXiv entries checked; every withdrawal is disclosed in its description.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
