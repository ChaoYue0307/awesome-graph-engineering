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
import urllib.error
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
# Fewer, larger requests give the throttle less to count.
BATCH = 100


USER_AGENT = "awesome-graph-engineering-arxiv-check"
EXPORT_API = "https://export.arxiv.org/api/query?id_list={ids}&max_results={count}"
# arXiv asks automated clients for at most one request every three seconds and
# throttles bursts with 429 or, from its front end, an instant 406. GitHub-hosted
# runners share IPs with other arXiv traffic, so a run can inherit a throttle it
# did not cause: back off in minutes rather than seconds.
RATE_LIMITED = {406, 429}
MAX_WAIT_SECONDS = 300


def fetch(ids: list[str], attempts: int = 5) -> dict[str, dict[str, str]]:
    request = urllib.request.Request(
        EXPORT_API.format(ids=",".join(ids), count=len(ids)),
        headers={"User-Agent": USER_AGENT},
    )
    for attempt in range(attempts):
        wait = 30 * 2**attempt
        try:
            with urllib.request.urlopen(request, timeout=90) as response:
                payload = response.read()
            break
        except urllib.error.HTTPError as exc:
            # Other 4xx codes mean the request itself is wrong; retrying cannot help.
            if exc.code < 500 and exc.code not in RATE_LIMITED:
                raise
            if attempt == attempts - 1:
                raise
            retry_after = (exc.headers or {}).get("Retry-After", "")
            if retry_after.isdigit():
                wait = int(retry_after)
        except Exception:
            if attempt == attempts - 1:
                raise
        print(f"arXiv did not answer (attempt {attempt + 1} of {attempts}); retrying in {min(wait, MAX_WAIT_SECONDS)}s", file=sys.stderr)
        time.sleep(min(wait, MAX_WAIT_SECONDS))
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
    missing: list[str] = []
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
                # An empty or truncated feed must not read as "no withdrawals".
                missing.append(f"{row['id']} arXiv {identifier}")
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
            time.sleep(5)

    if problems:
        print(f"FAIL — {len(problems)} undisclosed withdrawal(s):")
        for line in problems:
            print(f"  - {line}")
        return 1
    if missing:
        print(f"FAIL — arXiv returned no record for {len(missing)} of {len(targets)} entries; nothing verified for:")
        for line in missing:
            print(f"  - {line}")
        return 1
    print(f"OK — {checked} arXiv entries checked; every withdrawal is disclosed in its description.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
