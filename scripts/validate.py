#!/usr/bin/env python3
"""Validate the canonical resource dataset and every generated representation."""

from __future__ import annotations

import csv
import datetime as dt
import io
import json
import re
import sys
from urllib.parse import urlparse

from sync import (
    ATLAS_RE,
    CSV,
    FIELDS,
    JSONL,
    README,
    ROOT,
    SITE,
    TABLE_END,
    TABLE_START,
    render_atlas,
    render_csv,
    render_tables,
    replace_atlas_data,
    replace_readme_tables,
)

TYPES = {
    "Paper",
    "Blog",
    "Docs",
    "Tool",
    "Benchmark",
    "Dataset",
    "Book",
    "Course",
    "Video",
    "List",
    "Standard",
    "Critique",
}
EVIDENCE = {
    "Peer-reviewed research",
    "Research preprint",
    "Practitioner analysis",
    "Official documentation",
    "Maintained OSS project",
    "Industry standard",
    "Benchmark/dataset",
    "Book/course",
    "Community resource",
}
LAYERS = {
    "Roles",
    "Topology",
    "Handoffs",
    "Work graphs",
    "State",
    "Gates",
    "Reliability",
    "Observability & cost",
    "Evolution",
}
SECTIONS = {
    "Start Here",
    "Research Foundations",
    "Frameworks & SDKs",
    "Protocols & Handoffs",
    "State, Memory & Artifacts",
    "Verification & Evals",
    "Reliability & Durable Execution",
    "Observability & Cost",
    "Benchmarks & Datasets",
    "Production Case Studies",
    "Critiques & Limits",
}
ID_RE = re.compile(r"age-\d{4}\Z")


def read_jsonl(errors: list[str]) -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    try:
        lines = JSONL.read_text(encoding="utf-8").splitlines()
    except OSError as exc:
        errors.append(f"cannot read {JSONL.relative_to(ROOT)}: {exc}")
        return rows
    for line_number, line in enumerate(lines, 1):
        if not line.strip():
            continue
        try:
            row = json.loads(line)
        except json.JSONDecodeError as exc:
            errors.append(f"resources.jsonl:{line_number}: {exc.msg}")
            continue
        if not isinstance(row, dict):
            errors.append(f"resources.jsonl:{line_number}: record must be an object")
            continue
        rows.append(row)
    if not rows:
        errors.append("resources.jsonl contains no records")
    return rows


def validate_rows(rows: list[dict[str, object]], errors: list[str]) -> None:
    seen_ids: dict[str, int] = {}
    seen_urls: dict[str, str] = {}
    seen_titles: dict[str, str] = {}
    current_year = dt.date.today().year
    for position, row in enumerate(rows, 1):
        rid = str(row.get("id") or f"row {position}")
        missing = [field for field in FIELDS if field not in row]
        extra = [field for field in row if field not in FIELDS]
        if missing:
            errors.append(f"{rid}: missing schema field(s): {', '.join(missing)}")
        if extra:
            errors.append(f"{rid}: unexpected schema field(s): {', '.join(extra)}")
        if list(row) != list(FIELDS):
            errors.append(f"{rid}: fields must use the canonical schema order")
        for field in FIELDS:
            value = row.get(field)
            if value is None or (isinstance(value, str) and not value.strip()):
                errors.append(f"{rid}: empty required field '{field}'")
            elif field != "year" and not isinstance(value, str):
                errors.append(f"{rid}: '{field}' must be a string")
        year = row.get("year")
        if not isinstance(year, int) or isinstance(year, bool):
            errors.append(f"{rid}: 'year' must be an integer")
        elif not 1900 <= year <= current_year + 1:
            errors.append(f"{rid}: 'year' must be between 1900 and {current_year + 1}")

        rtype = row.get("rtype")
        evidence = row.get("evidence")
        layer = row.get("layer")
        section = row.get("section")
        if isinstance(rtype, str) and rtype not in TYPES:
            errors.append(f"{rid}: unknown rtype '{rtype}'")
        if isinstance(evidence, str) and evidence not in EVIDENCE:
            errors.append(f"{rid}: unknown evidence label '{evidence}'")
        if isinstance(layer, str) and layer not in LAYERS:
            errors.append(f"{rid}: unknown layer '{layer}'")
        if isinstance(section, str) and section not in SECTIONS:
            errors.append(f"{rid}: unknown section '{section}'")

        raw_id = row.get("id")
        if isinstance(raw_id, str) and raw_id:
            if not ID_RE.fullmatch(raw_id):
                errors.append(f"{rid}: id must match age-NNNN")
            if raw_id in seen_ids:
                errors.append(f"{rid}: duplicate id (first used on row {seen_ids[raw_id]})")
            else:
                seen_ids[raw_id] = position

        url = row.get("url")
        if isinstance(url, str) and url:
            parsed = urlparse(url)
            if parsed.scheme not in {"http", "https"} or not parsed.netloc:
                errors.append(f"{rid}: URL must use http(s) and include a host: {url}")
            normalized_url = parsed._replace(
                scheme=parsed.scheme.lower(),
                netloc=parsed.netloc.lower(),
                path=parsed.path.rstrip("/") or "/",
                fragment="",
            ).geturl()
            if normalized_url in seen_urls:
                errors.append(
                    f"{rid}: duplicate normalized URL also used by "
                    f"{seen_urls[normalized_url]}: {url}"
                )
            else:
                seen_urls[normalized_url] = rid

        title = row.get("title")
        if isinstance(title, str) and title:
            normalized_title = " ".join(title.casefold().split())
            if normalized_title in seen_titles:
                errors.append(
                    f"{rid}: duplicate title also used by "
                    f"{seen_titles[normalized_title]}: {title}"
                )
            else:
                seen_titles[normalized_title] = rid

    present_sections = {
        str(row.get("section")) for row in rows if isinstance(row.get("section"), str)
    }
    present_layers = {
        str(row.get("layer")) for row in rows if isinstance(row.get("layer"), str)
    }
    missing_sections = sorted(SECTIONS - present_sections)
    missing_layers = sorted(LAYERS - present_layers)
    if missing_sections:
        errors.append(
            "dataset has no resources in section(s): " + ", ".join(missing_sections)
        )
    if missing_layers:
        errors.append("dataset has no resources in layer(s): " + ", ".join(missing_layers))


def validate_csv(rows: list[dict[str, object]], errors: list[str]) -> None:
    try:
        csv_text = CSV.read_text(encoding="utf-8")
        reader = csv.DictReader(io.StringIO(csv_text, newline=""))
        csv_rows = list(reader)
    except (OSError, csv.Error) as exc:
        errors.append(f"cannot read {CSV.relative_to(ROOT)}: {exc}")
        return
    if reader.fieldnames != list(FIELDS):
        errors.append("resources.csv header does not match the canonical schema/order")
    normalized = [
        {field: "" if row.get(field) is None else str(row.get(field)) for field in FIELDS}
        for row in rows
    ]
    if csv_rows != normalized:
        errors.append("resources.csv records/order do not equal resources.jsonl")
    if all(set(row) == set(FIELDS) for row in rows) and csv_text != render_csv(rows):
        errors.append("resources.csv is not the exact generated output")


def validate_readme(rows: list[dict[str, object]], errors: list[str]) -> None:
    try:
        readme = README.read_text(encoding="utf-8")
    except OSError as exc:
        errors.append(f"cannot read README.md: {exc}")
        return

    marker_ok = readme.count(TABLE_START) == 1 and readme.count(TABLE_END) == 1
    if not marker_ok or readme.find(TABLE_START) > readme.find(TABLE_END):
        errors.append("README.md needs one ordered RESOURCE_TABLES_START/END marker pair")
        block = ""
    else:
        block = readme.split(TABLE_START, 1)[1].split(TABLE_END, 1)[0]

    # The generated link boundary, rather than the first ``)``, matters for DOI
    # URLs whose path legitimately contains parentheses.
    readme_urls = re.findall(
        r"^\| .*?\*\*\[[^\]]+\]\((https?://.+)\)\*\*<br><sub>", block, re.M
    )
    data_urls = [str(row.get("url")) for row in rows if isinstance(row.get("url"), str)]
    if set(readme_urls) != set(data_urls) or len(readme_urls) != len(data_urls):
        missing = sorted(set(data_urls) - set(readme_urls))
        extra = sorted(set(readme_urls) - set(data_urls))
        if missing:
            errors.append(f"README resource tables omit {len(missing)} dataset URL(s)")
        if extra:
            errors.append(f"README resource tables contain {len(extra)} unknown URL(s)")
        if not missing and not extra:
            errors.append("README resource tables repeat one or more resource URLs")

    badge = re.search(r"badge/resources-(\d+)-", readme)
    if not badge:
        errors.append("README resources badge not found")
    elif int(badge.group(1)) != len(rows):
        errors.append(f"README badge says {badge.group(1)} resources; dataset has {len(rows)}")

    if marker_ok and all(set(row) == set(FIELDS) for row in rows):
        try:
            expected = replace_readme_tables(readme, render_tables(rows))
        except ValueError as exc:
            errors.append(str(exc))
        else:
            if readme != expected:
                errors.append("README resource tables are not the exact generated output")


def validate_site(rows: list[dict[str, object]], errors: list[str]) -> None:
    try:
        html = SITE.read_text(encoding="utf-8")
    except OSError as exc:
        errors.append(f"cannot read docs/index.html: {exc}")
        return
    matches = list(ATLAS_RE.finditer(html))
    if len(matches) != 1:
        errors.append("docs/index.html must contain exactly one atlas-data script island")
        return
    match = matches[0]
    island = match.group(0)[len(match.group(1)) : -len(match.group(2))].strip()
    if not island:
        errors.append("atlas-data script island is empty")
        return
    try:
        atlas_rows = json.loads(island)
    except json.JSONDecodeError as exc:
        errors.append(f"atlas-data is not valid JSON: {exc.msg}")
        return
    if not isinstance(atlas_rows, list) or not atlas_rows:
        errors.append("atlas-data must be a nonempty JSON array")
    elif atlas_rows != rows:
        errors.append("atlas-data records/order do not equal resources.jsonl")
    if all(set(row) == set(FIELDS) for row in rows):
        try:
            expected = replace_atlas_data(html, render_atlas(rows))
        except ValueError as exc:
            errors.append(str(exc))
        else:
            if html != expected:
                errors.append("atlas-data is not the exact generated output")


def main() -> int:
    errors: list[str] = []
    rows = read_jsonl(errors)
    validate_rows(rows, errors)
    validate_csv(rows, errors)
    validate_readme(rows, errors)
    validate_site(rows, errors)
    if errors:
        print(f"FAIL — {len(errors)} problem(s):")
        for error in errors:
            print(f"  - {error}")
        return 1
    print(f"OK — {len(rows)} resources validated across JSONL, CSV, README, and site.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
