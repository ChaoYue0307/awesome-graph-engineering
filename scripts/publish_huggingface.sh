#!/usr/bin/env bash
set -euo pipefail

repo_id="${HF_DATASET_REPO:-cy0307/awesome-graph-engineering}"
project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$project_root"
bash scripts/check.sh

staging_dir="$(mktemp -d "${TMPDIR:-/tmp}/awesome-graph-engineering-hf.XXXXXX")"
cleanup() {
  rm -rf -- "$staging_dir"
}
trap cleanup EXIT

cp huggingface/README.md "$staging_dir/README.md"
cp data/resources.jsonl "$staging_dir/resources.jsonl"
cp data/resources.csv "$staging_dir/resources.csv"
cp data/resource.schema.json "$staging_dir/resource.schema.json"

hf repos create "$repo_id" --type dataset --public --exist-ok
hf upload "$repo_id" "$staging_dir" . \
  --type dataset \
  --commit-message "Sync resource atlas from GitHub"
