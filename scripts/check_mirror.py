#!/usr/bin/env python3
"""Fail when the Hugging Face dataset mirror no longer matches this repository.

The publish workflow skips the upload, and still succeeds, when the HF_TOKEN
secret is missing. That is the right behaviour for forks, but on this
repository it let the mirror sit at 165 rows while the catalog grew past 580.
This compares each mirrored file byte for byte against ``main``.

Needs the network, so it stays out of the offline ``check.sh``; CI runs it on
a schedule. Exit code 0 when the mirror is current, 1 otherwise.
"""

from __future__ import annotations

import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPO_ID = os.environ.get("HF_DATASET_REPO", "cy0307/awesome-graph-engineering")
# Mirror path -> source path; keep in step with scripts/publish_huggingface.sh.
FILES = {
    "README.md": ROOT / "huggingface" / "README.md",
    "resources.jsonl": ROOT / "data" / "resources.jsonl",
    "resources.csv": ROOT / "data" / "resources.csv",
    "resource.schema.json": ROOT / "data" / "resource.schema.json",
}


def download(name: str, attempts: int = 3) -> bytes | None:
    url = f"https://huggingface.co/datasets/{REPO_ID}/resolve/main/{name}"
    request = urllib.request.Request(url, headers={"User-Agent": "awesome-graph-engineering-mirror-check"})
    for attempt in range(attempts):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                return response.read()
        except urllib.error.HTTPError as exc:
            if exc.code == 404:
                return None
            if attempt == attempts - 1:
                raise
        except Exception:
            if attempt == attempts - 1:
                raise
        time.sleep(10 * (attempt + 1))
    return None


def rows(payload: bytes) -> int:
    return sum(1 for line in payload.splitlines() if line.strip())


def main() -> int:
    stale: list[str] = []
    for name, source in FILES.items():
        try:
            mirrored = download(name)
        except Exception as exc:
            print(f"FAIL — could not read {name} from the Hugging Face mirror: {exc}")
            return 1
        local = source.read_bytes()
        if mirrored is None:
            stale.append(f"{name} is missing from the mirror")
        elif mirrored != local:
            detail = (
                f" ({rows(mirrored)} rows on Hugging Face, {rows(local)} in the repository)"
                if name == "resources.jsonl"
                else ""
            )
            stale.append(f"{name} differs from {source.relative_to(ROOT)}{detail}")

    if stale:
        print(f"FAIL — the Hugging Face mirror {REPO_ID} is out of date:")
        for line in stale:
            print(f"  - {line}")
        print(
            "Publishing needs the HF_TOKEN repository secret; once it is set, re-run the "
            "'Sync Hugging Face dataset' workflow."
        )
        return 1
    print(f"OK — the Hugging Face mirror {REPO_ID} matches the repository file for file.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
