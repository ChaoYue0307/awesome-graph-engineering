#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"

python3 scripts/sync.py --check
python3 scripts/validate.py
python3 scripts/validate_i18n.py
node scripts/generate_site_locales.mjs --check

# Mirrors the Markdown gate in .github/workflows/quality.yml so link-fragment
# and formatting errors surface here instead of only after a push.
#
# Availability is settled first, with a throwaway invocation, rather than by
# grepping the lint output for network words. Lint findings quote the offending
# source text, so a genuine error citing a URL such as registry.example.com
# matched the old heuristic and was reported as "skipped offline" — the gate
# passed locally while CI failed on the same file.
markdownlint_log="$(mktemp)"
trap 'rm -f "$markdownlint_log"' EXIT
if npx --yes markdownlint-cli2 --version >"$markdownlint_log" 2>&1; then
  if npx --yes markdownlint-cli2 "**/*.md" >"$markdownlint_log" 2>&1; then
    echo "OK — Markdown lint passed."
  else
    cat "$markdownlint_log"
    echo "FAIL — Markdown lint reported problems." >&2
    exit 1
  fi
else
  echo "WARN — skipped Markdown lint (markdownlint-cli2 could not be run; is the network available?)." >&2
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
