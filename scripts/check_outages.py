#!/usr/bin/env python3
"""Keep temporary link-audit exclusions for host outages from outliving the outage.

When a whole host stops answering, lychee.toml excludes it so one outage does
not turn every run red, and the canonical URLs stay in the catalog. The risk is
that the exclusion is forgotten and quietly hides real rot later. Each outage
exclusion therefore carries two comment lines:

    # outage-since: 2026-09-17
    # outage-probe: https://example.org/ https://example.net/

This probes those URLs and fails when either the hosts answer again (drop the
exclusion) or the outage has lasted longer than MAX_OUTAGE_DAYS (point the
affected entries at a first-party mirror or an archived copy instead).

Needs the network, so it stays out of the offline ``check.sh``; CI runs it on
a schedule. Exit code 0 when nothing needs attention, 1 otherwise.
"""

from __future__ import annotations

import re
import sys
import urllib.error
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / "lychee.toml"
MAX_OUTAGE_DAYS = 30
SINCE_RE = re.compile(r"^\s*#\s*outage-since:\s*(\d{4}-\d{2}-\d{2})\s*$")
PROBE_RE = re.compile(r"^\s*#\s*outage-probe:\s*(.+?)\s*$")
PATTERN_RE = re.compile(r'^\s*"(.+)",?\s*$')


def outages(text: str) -> list[dict[str, object]]:
    """Pair each outage-since marker with its probe URLs and exclusion pattern."""
    found: list[dict[str, object]] = []
    current: dict[str, object] | None = None
    for number, line in enumerate(text.splitlines(), 1):
        if match := SINCE_RE.match(line):
            current = {"line": number, "since": date.fromisoformat(match.group(1)), "probes": []}
            found.append(current)
        elif current is not None and (match := PROBE_RE.match(line)):
            current["probes"].extend(match.group(1).split())
        elif current is not None and (match := PATTERN_RE.match(line)):
            current["pattern"] = match.group(1)
            current = None
    return found


def answers(url: str, attempts: int = 2) -> bool:
    """True when the host returns any non-5xx response.

    A 403 or 429 still proves the host is serving; a 5xx from a proxy in front
    of it usually means the origin behind it is still down.
    """
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (link-audit outage probe)"})
    for _ in range(attempts):
        try:
            with urllib.request.urlopen(request, timeout=30):
                return True
        except urllib.error.HTTPError as exc:
            if exc.code < 500:
                return True
        except Exception:
            pass
    return False


def main() -> int:
    entries = outages(CONFIG.read_text(encoding="utf-8"))
    problems: list[str] = []
    today = date.today()
    for entry in entries:
        where = f"lychee.toml:{entry['line']}"
        if not entry["probes"] or "pattern" not in entry:
            problems.append(f"{where} outage-since needs an outage-probe line and an exclusion pattern")
            continue
        days = (today - entry["since"]).days
        up = [url for url in entry["probes"] if answers(url)]
        if len(up) == len(entry["probes"]):
            problems.append(
                f"{where} {entry['pattern']} is serving again after {days} days "
                f"({', '.join(up)}); delete the exclusion and its comment"
            )
        elif days > MAX_OUTAGE_DAYS:
            problems.append(
                f"{where} {entry['pattern']} has been down {days} days; point the affected "
                f"entries at a first-party mirror or an archived copy and delete the exclusion"
            )
        else:
            print(f"still down — {entry['pattern']} ({days} of {MAX_OUTAGE_DAYS} days)")

    if problems:
        print(f"FAIL — {len(problems)} outage exclusion(s) need attention:")
        for line in problems:
            print(f"  - {line}")
        return 1
    print(f"OK — {len(entries)} outage exclusion(s) still justified.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
