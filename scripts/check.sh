#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"

python3 scripts/sync.py --check
python3 scripts/validate.py
python3 scripts/validate_i18n.py
node scripts/generate_site_locales.mjs --check

# Mirrors the Markdown gate in .github/workflows/quality.yml so link-fragment
# and formatting errors surface here instead of only after a push. Skipped with
# a warning when the package cannot be fetched offline.
if npx --yes markdownlint-cli2 "**/*.md" >/tmp/markdownlint.log 2>&1; then
  echo "OK — Markdown lint passed."
else
  if grep -qiE "network|ENOTFOUND|EAI_AGAIN|registry" /tmp/markdownlint.log; then
    echo "WARN — skipped Markdown lint (markdownlint-cli2 unavailable offline)."
  else
    cat /tmp/markdownlint.log
    exit 1
  fi
fi
node --check docs/app.js
node --check docs/graph-scene.js
node --check docs/i18n.js
node --check scripts/generate_site_locales.mjs

test -s docs/index.html
test -s docs/404.html
test -s docs/llms.txt
test -s docs/site.webmanifest
test -s docs/assets/social-card.png

echo "OK — repository, dataset, locales, JavaScript, and site assets passed."
