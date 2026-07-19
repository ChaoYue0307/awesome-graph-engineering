#!/usr/bin/env python3
"""Validate localized entry points and launch assets without third-party packages."""

from __future__ import annotations

import json
import re
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOCALES = {
    "zh-Hans": ROOT / "i18n/zh-Hans/README.md",
    "es": ROOT / "i18n/es/README.md",
    "fr": ROOT / "i18n/fr/README.md",
    "de": ROOT / "i18n/de/README.md",
    "ja": ROOT / "i18n/ja/README.md",
    "ko": ROOT / "i18n/ko/README.md",
    "pt-BR": ROOT / "i18n/pt-BR/README.md",
}


def png_dimensions(path: Path) -> tuple[int, int]:
    payload = path.read_bytes()[:24]
    if len(payload) != 24 or payload[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError("not a PNG file")
    return struct.unpack(">II", payload[16:24])


def validate_relative_links(path: Path, text: str, errors: list[str]) -> None:
    for target in re.findall(r"!?(?:\[[^\]]*\])\(([^)]+)\)", text):
        target = target.strip().split("#", 1)[0]
        if not target or target.startswith(("http://", "https://", "mailto:")):
            continue
        resolved = (path.parent / target).resolve()
        if not resolved.exists():
            errors.append(f"{path.relative_to(ROOT)}: missing local link target {target}")


def main() -> int:
    errors: list[str] = []
    root_readme = (ROOT / "README.md").read_text(encoding="utf-8")
    manifest = (ROOT / "i18n/manifest.yml").read_text(encoding="utf-8")
    site_html = (ROOT / "docs/index.html").read_text(encoding="utf-8")
    site_i18n = (ROOT / "docs/i18n.js").read_text(encoding="utf-8")

    for locale, path in LOCALES.items():
        if not path.is_file():
            errors.append(f"missing localized guide: {path.relative_to(ROOT)}")
            continue
        text = path.read_text(encoding="utf-8")
        required = ("Awesome Graph Engineering", "He Chaoyue", "```bibtex", "../../README.md")
        for marker in required:
            if marker not in text:
                errors.append(f"{path.relative_to(ROOT)}: missing required marker {marker!r}")
        if "TODO" in text or "TBD" in text:
            errors.append(f"{path.relative_to(ROOT)}: contains an unfinished placeholder")
        if f"code: {locale}" not in manifest:
            errors.append(f"i18n/manifest.yml: missing locale {locale}")
        if f'value="{locale}"' not in site_html:
            errors.append(f"docs/index.html: language picker omits {locale}")
        if f'"{locale}"' not in site_i18n and f"{locale}:" not in site_i18n:
            errors.append(f"docs/i18n.js: translation dictionary omits {locale}")
        expected_root_link = f'i18n/{locale}/README.md'
        if expected_root_link not in root_readme:
            errors.append(f"README.md: language row omits {expected_root_link}")
        validate_relative_links(path, text, errors)

    validate_relative_links(ROOT / "i18n/README.md", (ROOT / "i18n/README.md").read_text(encoding="utf-8"), errors)

    manifest_json = ROOT / "docs/site.webmanifest"
    try:
        webmanifest = json.loads(manifest_json.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"docs/site.webmanifest is invalid: {exc}")
    else:
        for icon in webmanifest.get("icons", []):
            target = ROOT / "docs" / str(icon.get("src", ""))
            if not target.is_file():
                errors.append(f"docs/site.webmanifest: missing icon {icon.get('src')}")

    social = ROOT / "assets/social-card.png"
    try:
        dimensions = png_dimensions(social)
    except (OSError, ValueError) as exc:
        errors.append(f"assets/social-card.png is invalid: {exc}")
    else:
        if dimensions != (1200, 630):
            errors.append(f"assets/social-card.png must be 1200x630, got {dimensions[0]}x{dimensions[1]}")
        if social.stat().st_size >= 1_000_000:
            errors.append("assets/social-card.png must remain under 1 MB")
        mirror = ROOT / "docs/assets/social-card.png"
        if not mirror.is_file() or mirror.read_bytes() != social.read_bytes():
            errors.append("docs/assets/social-card.png must exactly mirror assets/social-card.png")

    github_preview = ROOT / "assets/share/github-social-preview.jpg"
    if not github_preview.is_file() or github_preview.stat().st_size >= 1_000_000:
        errors.append("GitHub social preview must exist and remain under 1 MB")

    if errors:
        print(f"FAIL — {len(errors)} localization/launch problem(s):")
        for error in errors:
            print(f"  - {error}")
        return 1
    print(f"OK — {len(LOCALES)} localized guides and launch assets validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
