#!/usr/bin/env python3
"""Build deterministic, checksummed release assets from the validated repository."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT = ROOT / "dist" / "release"
CFF = ROOT / "CITATION.cff"
SITE = ROOT / "docs" / "index.html"
JSONL = ROOT / "data" / "resources.jsonl"

PACKAGE_FILES = (
    "README.md",
    "DEFINITION.md",
    "TAXONOMY.md",
    "METHODOLOGY.md",
    "COMPARISON.md",
    "ANTI-PATTERNS.md",
    "CONTRIBUTING.md",
    "CITATION.cff",
    "LICENSE",
    "data/README.md",
    "data/resources.jsonl",
    "data/resources.csv",
    "data/resource.schema.json",
)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def declared_version() -> str:
    match = re.search(r"^version:\s*[\"']?([^\s\"']+)", CFF.read_text(encoding="utf-8"), re.M)
    if not match:
        raise ValueError("CITATION.cff does not declare a version")
    return match.group(1)


def site_version() -> str:
    match = re.search(r'"version"\s*:\s*"([^"]+)"', SITE.read_text(encoding="utf-8"))
    if not match:
        raise ValueError("docs/index.html does not declare a dataset version")
    return match.group(1)


def write_deterministic_zip(output: Path) -> None:
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for relative in PACKAGE_FILES:
            source = ROOT / relative
            if not source.is_file():
                raise ValueError(f"release input is missing: {relative}")
            info = zipfile.ZipInfo(relative, date_time=(1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, source.read_bytes())


def build(version: str, output: Path) -> list[Path]:
    cff_version = declared_version()
    html_version = site_version()
    if version != cff_version or version != html_version:
        raise ValueError(
            f"version mismatch: requested {version}, CITATION.cff {cff_version}, site {html_version}"
        )

    rows = [json.loads(line) for line in JSONL.read_text(encoding="utf-8").splitlines() if line.strip()]
    if not rows:
        raise ValueError("canonical dataset is empty")

    output.mkdir(parents=True, exist_ok=True)
    prefix = f"awesome-graph-engineering-v{version}"
    copies = {
        ROOT / "data" / "resources.jsonl": output / f"{prefix}.jsonl",
        ROOT / "data" / "resources.csv": output / f"{prefix}.csv",
        ROOT / "data" / "resource.schema.json": output / f"{prefix}.schema.json",
        ROOT / "assets" / "share" / "github-social-preview.jpg": output / f"{prefix}-social-preview.jpg",
    }
    for source, destination in copies.items():
        shutil.copyfile(source, destination)

    bundle = output / f"{prefix}.zip"
    write_deterministic_zip(bundle)

    manifest = output / f"{prefix}-manifest.json"
    manifest.write_text(
        json.dumps(
            {
                "project": "awesome-graph-engineering",
                "version": version,
                "resource_count": len(rows),
                "schema_fields": list(rows[0]),
                "canonical_source": "data/resources.jsonl",
                "license": "CC0-1.0",
            },
            indent=2,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )

    assets = sorted([*copies.values(), bundle, manifest], key=lambda path: path.name)
    checksums = output / "SHA256SUMS"
    checksums.write_text(
        "".join(f"{sha256(path)}  {path.name}\n" for path in assets),
        encoding="utf-8",
    )
    return [*assets, checksums]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--version", help="release version without the leading v")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    version = (args.version or declared_version()).removeprefix("v")
    try:
        assets = build(version, args.output.resolve())
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"release build failed: {exc}")
        return 1
    print(f"Built {len(assets)} release assets for v{version}:")
    for asset in assets:
        print(f"  {asset}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
