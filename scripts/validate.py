#!/usr/bin/env python3
"""Validate that data/resources.{csv,jsonl} and README.md agree.

Checks:
  1. CSV and JSONL contain the same records (by id) with required fields filled.
  2. Resource types and evidence labels come from the controlled vocabularies.
  3. No duplicate URLs inside the dataset.
  4. Every external resource URL in README tables exists in the dataset and vice versa.
  5. The resources badge count in README matches the dataset row count.

Exit code 0 on success, 1 with a report on failure.
"""

from __future__ import annotations

import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

TYPES = {
    "Paper", "Blog", "Docs", "Tool", "Benchmark", "Dataset",
    "Book", "Course", "Video", "List", "Standard", "Critique",
}
EVIDENCE = {
    "Peer-reviewed research", "Research preprint", "Practitioner analysis",
    "Official documentation", "Maintained OSS project", "Industry standard",
    "Benchmark/dataset", "Book/course", "Community resource",
}
REQUIRED = ["id", "section", "rtype", "title", "url", "description", "evidence"]


def fail(errors: list[str]) -> None:
    print(f"FAIL — {len(errors)} problem(s):")
    for e in errors:
        print(f"  - {e}")
    sys.exit(1)


def main() -> None:
    errors: list[str] = []

    with open(ROOT / "data" / "resources.csv", newline="", encoding="utf-8") as f:
        csv_rows = list(csv.DictReader(f))
    with open(ROOT / "data" / "resources.jsonl", encoding="utf-8") as f:
        jsonl_rows = [json.loads(line) for line in f if line.strip()]

    if len(csv_rows) != len(jsonl_rows):
        errors.append(f"CSV has {len(csv_rows)} rows, JSONL has {len(jsonl_rows)}")
    csv_ids = {r["id"] for r in csv_rows}
    jsonl_ids = {r["id"] for r in jsonl_rows}
    for missing in sorted(csv_ids ^ jsonl_ids):
        errors.append(f"id {missing} present in only one of CSV/JSONL")

    seen_urls: dict[str, str] = {}
    for r in csv_rows:
        rid = r.get("id", "<no id>")
        for field in REQUIRED:
            if not r.get(field, "").strip():
                errors.append(f"{rid}: empty required field '{field}'")
        if r.get("rtype") and r["rtype"] not in TYPES:
            errors.append(f"{rid}: unknown rtype '{r['rtype']}'")
        if r.get("evidence") and r["evidence"] not in EVIDENCE:
            errors.append(f"{rid}: unknown evidence '{r['evidence']}'")
        url = r.get("url", "").strip()
        if url in seen_urls:
            errors.append(f"{rid}: duplicate URL also used by {seen_urls[url]}: {url}")
        elif url:
            seen_urls[url] = rid

    readme = (ROOT / "README.md").read_text(encoding="utf-8")

    # Resource-table rows: "| <marker> **[Title](url)**<br><sub>Type</sub> | ..."
    row_urls = set()
    for m in re.finditer(r"^\| \S+ \*\*\[[^\]]+\]\((\S+?)\)\*\*<br>", readme, re.M):
        url = m.group(1)
        if url.startswith("http"):
            row_urls.add(url)

    data_urls = {u for u in seen_urls if u.startswith("http")}
    for url in sorted(row_urls - data_urls):
        errors.append(f"README table URL missing from dataset: {url}")
    for url in sorted(data_urls - row_urls):
        errors.append(f"Dataset URL missing from README tables: {url}")

    badge = re.search(r"badge/resources-(\d+)-", readme)
    if not badge:
        errors.append("resources badge not found in README")
    elif int(badge.group(1)) != len(csv_rows):
        errors.append(
            f"resources badge says {badge.group(1)}, dataset has {len(csv_rows)} rows"
        )

    if errors:
        fail(errors)
    print(f"OK — {len(csv_rows)} resources consistent across CSV, JSONL, and README.")


if __name__ == "__main__":
    main()
