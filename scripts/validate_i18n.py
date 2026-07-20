#!/usr/bin/env python3
"""Validate localized guides and site assets without third-party packages."""

from __future__ import annotations

import json
import re
import struct
import xml.etree.ElementTree as ET
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
LICENSE_MARKERS = {
    "zh-Hans": ("## 许可", "外部链接作品", "CC0 不要求引用"),
    "es": ("## Licencia", "obras externas referenciadas", "CC0 no la exige"),
    "fr": ("## Licence", "œuvres externes référencées", "pas exigée par CC0"),
    "de": ("## Lizenz", "verlinkte Werke", "nach CC0 nicht erforderlich"),
    "ja": ("## ライセンス", "リンク先の著作物", "CC0 上の要件ではありません"),
    "ko": ("## 라이선스", "외부 저작물", "CC0의 의무 사항은 아닙니다"),
    "pt-BR": ("## Licença", "obras externas referenciadas", "não é exigida pela CC0"),
}
DRAFT_MARKERS = (
    "initial editorial translation",
    "traducción editorial inicial",
    "première traduction éditoriale",
    "erste redaktionelle Übersetzung",
    "tradução editorial inicial",
    "初期の編集翻訳",
    "초기 편집 번역",
    "首版编辑性翻译",
)


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


def extract_bibtex(text: str) -> str | None:
    match = re.search(r"```bibtex\n(.*?)\n```", text, flags=re.DOTALL)
    return match.group(1) if match else None


def extract_site_copy_keys(source: str) -> dict[str, set[str]]:
    try:
        copy_source = source.split("const copy = {", 1)[1].split("\n};", 1)[0]
    except IndexError:
        return {}
    locales: dict[str, set[str]] = {}
    block_pattern = re.compile(
        r'^  (?:(?:"([^"]+)")|([A-Za-z][\w-]*)): \{\n(.*?)^  \},',
        flags=re.MULTILINE | re.DOTALL,
    )
    key_pattern = re.compile(
        r'^    (?:(?:"([^"]+)")|([A-Za-z][A-Za-z0-9]*)):',
        flags=re.MULTILINE,
    )
    for match in block_pattern.finditer(copy_source):
        locale = match.group(1) or match.group(2)
        locales[locale] = {
            key_match.group(1) or key_match.group(2)
            for key_match in key_pattern.finditer(match.group(3))
        }
    return locales


def main() -> int:
    errors: list[str] = []
    root_readme = (ROOT / "README.md").read_text(encoding="utf-8")
    root_bibtex = extract_bibtex(root_readme)
    manifest = (ROOT / "i18n/manifest.yml").read_text(encoding="utf-8")
    site_html = (ROOT / "docs/index.html").read_text(encoding="utf-8")
    site_i18n = (ROOT / "docs/i18n.js").read_text(encoding="utf-8")

    for locale, path in LOCALES.items():
        if not path.is_file():
            errors.append(f"missing localized guide: {path.relative_to(ROOT)}")
            continue
        text = path.read_text(encoding="utf-8")
        required = (
            "Awesome Graph Engineering",
            "Curated by ",
            "```bibtex",
            "../../README.md",
        )
        for marker in required:
            if marker not in text:
                errors.append(f"{path.relative_to(ROOT)}: missing required marker {marker!r}")
        if "TODO" in text or "TBD" in text:
            errors.append(f"{path.relative_to(ROOT)}: contains an unfinished placeholder")
        if any(marker.casefold() in text.casefold() for marker in DRAFT_MARKERS):
            errors.append(f"{path.relative_to(ROOT)}: contains a draft-translation notice")
        localized_bibtex = extract_bibtex(text)
        if root_bibtex is None or localized_bibtex != root_bibtex:
            errors.append(f"{path.relative_to(ROOT)}: BibTeX block differs from README.md")
        for marker in ("CC0 1.0 Universal", "(../../LICENSE)", *LICENSE_MARKERS[locale]):
            if marker not in text:
                errors.append(f"{path.relative_to(ROOT)}: license section omits {marker!r}")
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

    if "initial-editorial" in manifest:
        errors.append("i18n/manifest.yml: contains obsolete initial-editorial status")

    site_copy_keys = extract_site_copy_keys(site_i18n)
    expected_keys = site_copy_keys.get("en", set())
    for locale in ("en", *LOCALES):
        locale_keys = site_copy_keys.get(locale)
        if locale_keys is None:
            errors.append(f"docs/i18n.js: could not parse locale {locale}")
        elif locale_keys != expected_keys:
            missing = sorted(expected_keys - locale_keys)
            extra = sorted(locale_keys - expected_keys)
            errors.append(
                f"docs/i18n.js: {locale} key mismatch; missing={missing}, extra={extra}"
            )
    html_keys = set(re.findall(r'data-i18n="([^"]+)"', site_html))
    missing_html_keys = sorted(html_keys - expected_keys)
    if missing_html_keys:
        errors.append(f"docs/i18n.js: missing HTML translation keys {missing_html_keys}")

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

    visual = ROOT / "assets/visual-abstract.webp"
    visual_mirror = ROOT / "docs/assets/visual-abstract.webp"
    if not visual.is_file() or visual.stat().st_size >= 300_000:
        errors.append("Editorial visual abstract must exist and remain under 300 KB")
    elif not visual_mirror.is_file() or visual_mirror.read_bytes() != visual.read_bytes():
        errors.append("docs/assets/visual-abstract.webp must mirror assets/visual-abstract.webp")

    for name in ("visual-abstract-640.webp", "visual-abstract-960.webp"):
        responsive = ROOT / "docs/assets" / name
        if not responsive.is_file() or responsive.stat().st_size >= 150_000:
            errors.append(f"Responsive website visual {name} must exist and remain under 150 KB")

    square_visual = ROOT / "assets/share/visual-square.webp"
    if not square_visual.is_file() or square_visual.stat().st_size >= 300_000:
        errors.append("Square share visual must exist and remain under 300 KB")

    for name in ("layers-map-dark.svg", "layers-map-light.svg"):
        layer_map = ROOT / "assets" / name
        try:
            ET.parse(layer_map)
        except (OSError, ET.ParseError) as exc:
            errors.append(f"{name} is missing or invalid XML: {exc}")
        else:
            text = layer_map.read_text(encoding="utf-8")
            if "curated by" in text.casefold() or "lifecycle" in text.casefold():
                errors.append(f"{name} must remain name-free and non-sequential")

    if errors:
        print(f"FAIL — {len(errors)} localization/launch problem(s):")
        for error in errors:
            print(f"  - {error}")
        return 1
    print(f"OK — {len(LOCALES)} localized guides and site assets validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
