#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"

python3 scripts/sync.py --check
python3 scripts/validate.py
python3 scripts/validate_i18n.py
node scripts/generate_site_locales.mjs --check
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
