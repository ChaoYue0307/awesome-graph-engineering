#!/usr/bin/env python3
"""Flag GitHub entries that have been archived, disabled, renamed, or gone quiet.

Link checking proves a URL still resolves; it cannot tell you the project behind
it was archived last month or that GitHub is silently redirecting a renamed slug.
This runs against the GitHub API and is therefore kept out of ``check.sh``, which
must work offline. CI runs it on a schedule.

Exit code 0 when nothing needs attention, 1 when an entry should be updated.
Set ``GITHUB_TOKEN`` to avoid the unauthenticated rate limit.
"""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSONL = ROOT / "data" / "resources.jsonl"
REPO_RE = re.compile(r"https://github\.com/([\w.-]+)/([\w.-]+?)/?$")
# A research artifact can be worth listing long after its last commit. Entries
# here have said so in their own description, so quiet does not mean stale.
QUIET_OK = {"age-0458"}
QUIET_AFTER_DAYS = 550


def api(path: str) -> dict | None:
    request = urllib.request.Request(
        f"https://api.github.com/{path}",
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "awesome-graph-engineering-repo-check",
            **({"Authorization": f"Bearer {os.environ['GITHUB_TOKEN']}"} if os.environ.get("GITHUB_TOKEN") else {}),
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.load(response)
    except urllib.error.HTTPError as exc:
        return {"_error": f"HTTP {exc.code}"}
    except Exception as exc:  # network failure should not masquerade as rot
        return {"_error": str(exc)}


def main() -> int:
    rows = [json.loads(line) for line in JSONL.read_text(encoding="utf-8").splitlines() if line.strip()]
    targets = []
    for row in rows:
        match = REPO_RE.match(str(row["url"]))
        if match:
            targets.append((row, f"{match.group(1)}/{match.group(2)}"))

    def probe(item):
        row, slug = item
        return row, slug, api(f"repos/{slug}")

    with ThreadPoolExecutor(8) as pool:
        results = list(pool.map(probe, targets))

    problems: list[str] = []
    errors: list[str] = []
    today = date.today()
    for row, slug, data in results:
        if not data or data.get("_error"):
            errors.append(f"{row['id']} {slug}: {data.get('_error') if data else 'no response'}")
            continue
        if data.get("archived") or data.get("disabled"):
            state = "archived" if data.get("archived") else "disabled"
            problems.append(
                f"{row['id']} {slug} is {state} — say so in the description or drop the entry"
            )
        canonical = str(data.get("full_name") or "")
        if canonical and canonical.lower() != slug.lower():
            problems.append(
                f"{row['id']} {slug} was renamed to {canonical} — point the URL at the canonical slug"
            )
        pushed = str(data.get("pushed_at") or "")
        if pushed and row["id"] not in QUIET_OK:
            age = (today - datetime.fromisoformat(pushed.replace("Z", "+00:00")).astimezone(timezone.utc).date()).days
            if age > QUIET_AFTER_DAYS:
                problems.append(
                    f"{row['id']} {slug} has no push in {age} days (last {pushed[:10]}) — "
                    f"note the status, or add the id to QUIET_OK if that is expected"
                )

    if errors:
        print(f"WARN — {len(errors)} repo(s) could not be checked:", file=sys.stderr)
        for line in errors:
            print(f"  - {line}", file=sys.stderr)
    if problems:
        print(f"FAIL — {len(problems)} repository status problem(s):")
        for line in problems:
            print(f"  - {line}")
        return 1
    print(f"OK — {len(targets)} GitHub repositories are active, canonically named, and recently pushed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
