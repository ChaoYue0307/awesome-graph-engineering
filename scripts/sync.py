#!/usr/bin/env python3
"""Generate every derived resource view from data/resources.jsonl.

The JSONL file is the only hand-edited dataset. This script derives the CSV,
the README resource tables, and the website's ``atlas-data`` JSON island.
Use ``--check`` in CI to report drift without changing files.
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSONL = ROOT / "data" / "resources.jsonl"
CSV = ROOT / "data" / "resources.csv"
README = ROOT / "README.md"
SITE = ROOT / "docs" / "index.html"

FIELDS = (
    "id",
    "section",
    "subcategory",
    "rtype",
    "title",
    "url",
    "venue",
    "year",
    "authors",
    "description",
    "why",
    "evidence",
    "layer",
)
TABLE_START = "<!-- RESOURCE_TABLES_START -->"
TABLE_END = "<!-- RESOURCE_TABLES_END -->"
ATLAS_RE = re.compile(
    r"(<script\b(?=[^>]*\bid=[\"']atlas-data[\"'])"
    r"(?=[^>]*\btype=[\"']application/json[\"'])[^>]*>)"
    r".*?(</script>)",
    re.S,
)

TYPE_MARKERS = {
    "Paper": "📄",
    "Blog": "📝",
    "Docs": "📚",
    "Tool": "🧰",
    "Benchmark": "🧪",
    "Dataset": "🗃️",
    "Book": "📕",
    "Course": "🎓",
    "Video": "🎬",
    "List": "🧭",
    "Standard": "📐",
    "Critique": "⚠️",
}


def load_rows(path: Path = JSONL) -> list[dict[str, object]]:
    """Load JSONL and reject records that cannot be generated losslessly."""
    rows: list[dict[str, object]] = []
    with path.open(encoding="utf-8") as handle:
        for line_number, line in enumerate(handle, 1):
            if not line.strip():
                continue
            try:
                row = json.loads(line)
            except json.JSONDecodeError as exc:
                raise ValueError(f"{path}:{line_number}: {exc.msg}") from exc
            if not isinstance(row, dict):
                raise ValueError(f"{path}:{line_number}: record must be a JSON object")
            missing = [field for field in FIELDS if field not in row]
            extra = [field for field in row if field not in FIELDS]
            if missing or extra:
                details = []
                if missing:
                    details.append("missing " + ", ".join(missing))
                if extra:
                    details.append("unexpected " + ", ".join(extra))
                raise ValueError(f"{path}:{line_number}: {'; '.join(details)}")
            rows.append({field: row[field] for field in FIELDS})
    if not rows:
        raise ValueError(f"{path}: dataset is empty")
    return rows


def render_csv(rows: list[dict[str, object]]) -> str:
    output = io.StringIO(newline="")
    writer = csv.DictWriter(output, fieldnames=FIELDS, lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)
    return output.getvalue()


def markdown_text(value: object) -> str:
    """Keep generated table cells on one Markdown row."""
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\\", "\\\\")
        .replace("[", "\\[")
        .replace("]", "\\]")
        .replace("|", "\\|")
        .replace("\n", " ")
        .strip()
    )


def render_tables(rows: list[dict[str, object]]) -> str:
    sections: OrderedDict[str, list[dict[str, object]]] = OrderedDict()
    for row in rows:
        sections.setdefault(str(row["section"]), []).append(row)

    index_lines = [
        "### Contents",
        "",
        *[
            f"- [{markdown_text(section)}](#{re.sub(r'[^a-z0-9 -]', '', section.lower()).replace(' ', '-')}) — {len(section_rows)} resources"
            for section, section_rows in sections.items()
        ],
    ]
    chunks: list[str] = ["\n".join(index_lines)]
    for section, section_rows in sections.items():
        lines = [
            f"### {markdown_text(section)}",
            "",
            "| Resource | Source | What it contributes | Evidence |",
            "| --- | --- | --- | --- |",
        ]
        for row in section_rows:
            marker = TYPE_MARKERS.get(str(row["rtype"]), "🔗")
            year = markdown_text(row["year"])
            source_detail = " · ".join(
                part for part in (markdown_text(row["authors"]), year) if part
            )
            resource = (
                f"{marker} **[{markdown_text(row['title'])}]({row['url']})**"
                f"<br><sub>{markdown_text(row['rtype'])} · "
                f"{markdown_text(row['subcategory'])}</sub>"
            )
            source = f"**{markdown_text(row['venue'])}**<br><sub>{source_detail}</sub>"
            contribution = (
                f"{markdown_text(row['description'])}<br><sub><strong>Why:</strong> "
                f"{markdown_text(row['why'])}</sub>"
            )
            evidence = (
                f"**{markdown_text(row['evidence'])}**<br>"
                f"<sub>{markdown_text(row['layer'])}</sub>"
            )
            lines.append(f"| {resource} | {source} | {contribution} | {evidence} |")
        chunks.append("\n".join(lines))
    return "\n\n".join(chunks) + "\n"


def replace_readme_tables(readme: str, tables: str) -> str:
    if readme.count(TABLE_START) != 1 or readme.count(TABLE_END) != 1:
        raise ValueError(
            "README.md must contain exactly one RESOURCE_TABLES_START/END marker pair"
        )
    before, remainder = readme.split(TABLE_START, 1)
    _, after = remainder.split(TABLE_END, 1)
    return before + TABLE_START + "\n\n" + tables.rstrip() + "\n\n" + TABLE_END + after


def render_atlas(rows: list[dict[str, object]]) -> str:
    payload = json.dumps(rows, ensure_ascii=False, separators=(",", ":"))
    return payload.replace("</", "<\\/")


def replace_atlas_data(html: str, payload: str) -> str:
    replacement = lambda match: match.group(1) + "\n" + payload + "\n  " + match.group(2)
    generated, count = ATLAS_RE.subn(replacement, html, count=2)
    if count != 1:
        raise ValueError("docs/index.html must contain exactly one atlas-data script island")
    return generated


def expected_artifacts(rows: list[dict[str, object]]) -> dict[Path, str]:
    readme = README.read_text(encoding="utf-8")
    site = SITE.read_text(encoding="utf-8")
    return {
        CSV: render_csv(rows),
        README: replace_readme_tables(readme, render_tables(rows)),
        SITE: replace_atlas_data(site, render_atlas(rows)),
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check", action="store_true", help="fail on generated-file drift without writing"
    )
    args = parser.parse_args(argv)

    try:
        rows = load_rows()
        artifacts = expected_artifacts(rows)
    except (OSError, ValueError) as exc:
        print(f"sync: {exc}", file=sys.stderr)
        return 1

    drift = [
        path
        for path, expected in artifacts.items()
        if not path.exists() or path.read_text(encoding="utf-8") != expected
    ]
    if args.check:
        if drift:
            names = ", ".join(str(path.relative_to(ROOT)) for path in drift)
            print(f"Generated files are out of date: {names}", file=sys.stderr)
            print("Run: python3 scripts/sync.py", file=sys.stderr)
            return 1
        print(f"OK — {len(rows)} resources and all generated files are in sync.")
        return 0

    for path in drift:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(artifacts[path], encoding="utf-8")
        print(f"Updated {path.relative_to(ROOT)}")
    if not drift:
        print(f"Already in sync — {len(rows)} resources.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
