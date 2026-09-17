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
# The query API takes a batch per request; OAI-PMH is always one paper per request.
BATCH = 100


USER_AGENT = "awesome-graph-engineering-arxiv-check"
EXPORT_API = "https://export.arxiv.org/api/query?id_list={ids}&max_results={count}"
OAI_RECORD = "https://oaipmh.arxiv.org/oai?verb=GetRecord&metadataPrefix=arXivRaw&identifier=oai:arXiv.org:{id}"
# arXiv answers some clients with an instant 406, and which endpoint refuses
# varies by IP and over time. On 17 Sep 2026 the query API refused all eight
# fresh GitHub runners probed while OAI-PMH served them, and a few hours later
# OAI-PMH briefly refused a laptop the query API was serving. So 403/406 means
# "use the other endpoint", and only both refusing is a failure.
REFUSED = {403, 406}
# arXiv's terms ask automated clients for at most one request every 3 seconds.
REQUEST_SPACING_SECONDS = 3
MAX_WAIT_SECONDS = 300


class Refused(Exception):
    """The endpoint rejects this client outright; retrying will not help."""


def get(url: str, attempts: int = 4) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(attempts):
        wait = 15 * 2**attempt
        try:
            with urllib.request.urlopen(request, timeout=90) as response:
                return response.read()
        except urllib.error.HTTPError as exc:
            if exc.code in REFUSED:
                raise Refused(f"HTTP {exc.code}") from exc
            # Other 4xx codes mean the request itself is wrong.
            if exc.code < 500 and exc.code != 429:
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
    raise RuntimeError("unreachable")


def record(comment: ET.Element | None, summary: ET.Element | None) -> dict[str, str]:
    return {
        "comment": (comment.text or "") if comment is not None else "",
        "summary": (summary.text or "") if summary is not None else "",
    }


def fetch_export(ids: list[str]) -> dict[str, dict[str, str]]:
    """One query-API request for a whole batch: fast, but refused from CI runners."""
    payload = get(EXPORT_API.format(ids=",".join(ids), count=len(ids)))
    out: dict[str, dict[str, str]] = {}
    for entry in ET.fromstring(payload).findall("a:entry", NS):
        identifier = entry.find("a:id", NS)
        match = ARXIV_RE.search(identifier.text or "") if identifier is not None else None
        if match:
            out[match.group(1)] = record(entry.find("arxiv:comment", NS), entry.find("a:summary", NS))
    return out


def fetch_oai(ids: list[str], out: dict[str, dict[str, str] | None]) -> None:
    """One OAI-PMH request per paper: slower, but often reachable when the query API is not.

    Results go straight into ``out`` so papers already fetched survive a
    refusal part-way through; ``None`` marks a paper arXiv has no record of.
    """
    for index, identifier in enumerate(ids):
        if index:
            time.sleep(REQUEST_SPACING_SECONDS)
        root = ET.fromstring(get(OAI_RECORD.format(id=identifier)))
        raw = root.find(".//{*}arXivRaw")
        out[identifier] = record(raw.find("{*}comments"), raw.find("{*}abstract")) if raw is not None else None


QUERY_API, OAI_PMH = "the query API", "OAI-PMH"


def fetch(ids: list[str], state: dict[str, object], rounds: int = 3) -> dict[str, dict[str, str] | None]:
    """Fetch a batch from whichever endpoint accepts this client, switching on refusal."""
    out: dict[str, dict[str, str] | None] = {}
    for round_number in range(rounds):
        for _ in (QUERY_API, OAI_PMH):
            source = state["source"]
            try:
                if source == QUERY_API:
                    out.update(fetch_export(ids))
                else:
                    fetch_oai([identifier for identifier in ids if identifier not in out], out)
                state["used"].add(source)
                return out
            except Refused as exc:
                other = OAI_PMH if source == QUERY_API else QUERY_API
                print(f"arXiv {source} refused this client ({exc}); switching to {other}", file=sys.stderr)
                state["source"] = other
                time.sleep(REQUEST_SPACING_SECONDS)
        if round_number < rounds - 1:
            wait = 60 * 2**round_number
            print(f"both arXiv endpoints refused this client; trying again in {wait}s", file=sys.stderr)
            time.sleep(wait)
    raise Refused(f"both {QUERY_API} and {OAI_PMH} refused this client in {rounds} rounds")


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
    state: dict[str, object] = {"source": QUERY_API, "used": set()}
    for start in range(0, len(targets), BATCH):
        batch = targets[start : start + BATCH]
        try:
            found = fetch([identifier for _, identifier in batch], state)
        except Exception as exc:
            print(f"FAIL — arXiv unreachable, nothing verified: {exc}", file=sys.stderr)
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
            time.sleep(REQUEST_SPACING_SECONDS)

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
    print(f"OK — {checked} arXiv entries checked through {' and '.join(sorted(state['used']))}; every withdrawal is disclosed in its description.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
