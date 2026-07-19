#!/usr/bin/env python3
"""Regenerate the data island in docs/index.html from data/resources.jsonl.

Only the JSON between the atlas-data script tags is replaced; the rest of the
page is hand-maintained. Run after any dataset change:

    python3 scripts/build_site.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "docs" / "index.html"

FIELDS = ["section", "rtype", "title", "url", "venue", "year", "authors", "description", "evidence", "subcategory"]


def main() -> None:
    rows = []
    with open(ROOT / "data" / "resources.jsonl", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                r = json.loads(line)
                rows.append({k: r.get(k, "") for k in FIELDS})

    payload = json.dumps(rows, ensure_ascii=False, separators=(",", ":"))
    # </script> inside JSON strings would terminate the script tag early.
    payload = payload.replace("</", "<\\/")

    html = SITE.read_text(encoding="utf-8")
    new_html, n = re.subn(
        r'(<script id="atlas-data" type="application/json">).*?(</script>)',
        lambda m: m.group(1) + "\n" + payload + "\n" + m.group(2),
        html,
        count=1,
        flags=re.S,
    )
    if n != 1:
        raise SystemExit("atlas-data script island not found in docs/index.html")
    SITE.write_text(new_html, encoding="utf-8")
    print(f"Embedded {len(rows)} resources into docs/index.html")


if __name__ == "__main__":
    main()
