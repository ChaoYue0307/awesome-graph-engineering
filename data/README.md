# Resource dataset

The Resource Atlas is published as structured, CC0 metadata. [`resources.jsonl`](resources.jsonl) is the canonical, hand-edited source; the README tables, website atlas, and `resources.csv` are generated views.

## Files and generation

- `resources.jsonl` — one UTF-8 JSON object per line, in curated display order. Edit this file.
- `resources.csv` — the same records and field order with a header row. Generated; do not edit it directly.
- `../README.md` resource tables — generated between the `RESOURCE_TABLES_START` and `RESOURCE_TABLES_END` markers.
- `../docs/index.html` atlas data — generated inside the `atlas-data` JSON script island.
- [GitHub Releases](https://github.com/ChaoYue0307/awesome-graph-engineering/releases/latest) — immutable versioned snapshots with direct CSV, JSONL, and bundled downloads.
- [Hugging Face mirror](https://huggingface.co/datasets/cy0307/awesome-graph-engineering) — published from the validated JSONL and CSV with `../huggingface/README.md` as its dataset card.

After editing the JSONL source, run:

```bash
python3 scripts/sync.py
python3 scripts/validate.py
python3 scripts/sync.py --check
```

The final command is read-only and fails when any generated view has drifted from the canonical data.

To publish the validated mirror manually:

```bash
bash scripts/publish_huggingface.sh
```

The GitHub workflow uses the same script and an `HF_TOKEN` repository secret. Synchronization is one-way: edit the canonical GitHub JSONL, never the Hub copy.

## Schema: exactly 13 fields

Every JSONL object must contain exactly the fields below. The generator emits CSV columns in this same order.

| # | Field | JSON type | Meaning |
| ---: | --- | --- | --- |
| 1 | `id` | string | Stable identifier matching `age-NNNN`. Assign the next unused value and never recycle an ID. |
| 2 | `section` | string | Controlled README/Atlas section display label. |
| 3 | `subcategory` | string | Specific discovery label within the section; free text, sentence case. |
| 4 | `rtype` | string | Controlled resource-type display label. |
| 5 | `title` | string | Canonical human-readable resource title. |
| 6 | `url` | string | Canonical absolute `https://` URL, or canonical `http://` only when no HTTPS endpoint exists. |
| 7 | `venue` | string | Publisher, venue, documentation site, or repository host shown to readers. |
| 8 | `year` | integer | Four-digit publication year or year of the cited major release. |
| 9 | `authors` | string | Author(s) or maintaining organization; separate multiple named authors with semicolons. |
| 10 | `description` | string | Original one- or two-sentence summary of the resource's concrete contribution. |
| 11 | `why` | string | Distinct practitioner rationale: why the item matters to this scope or what decision it improves. |
| 12 | `evidence` | string | Controlled **source/evidence display label** describing publication form. It is not a quality score. |
| 13 | `layer` | string | Controlled primary design-layer display label from [the taxonomy](../TAXONOMY.md). |

All string fields are required and non-empty. Keep each object on one physical line; ordinary JSON escaping rules apply.

## Controlled display-label vocabularies

Values are case-sensitive and must match exactly. These are reader-facing labels, not lowercase keys or slugs.

### `section`

- `Start Here`
- `Research Foundations`
- `Frameworks & SDKs`
- `Protocols & Handoffs`
- `State, Memory & Artifacts`
- `Verification & Evals`
- `Reliability & Durable Execution`
- `Observability & Cost`
- `Benchmarks & Datasets`
- `Production Case Studies`
- `Critiques & Limits`

### `rtype`

- `Paper`
- `Blog`
- `Docs`
- `Tool`
- `Benchmark`
- `Dataset`
- `Book`
- `Course`
- `Video`
- `List`
- `Standard`
- `Critique`

### `evidence`

- `Peer-reviewed research`
- `Research preprint`
- `Practitioner analysis`
- `Official documentation`
- `Maintained OSS project`
- `Industry standard`
- `Benchmark/dataset`
- `Book/course`
- `Community resource`

This label records the kind of source. It does not rank rigor, guarantee correctness, or imply endorsement. For example, use `Official documentation` for a framework's reference docs and `Practitioner analysis` for a first-party engineering argument.

### `layer`

- `Roles`
- `Topology`
- `Handoffs`
- `Work graphs`
- `State`
- `Gates`
- `Reliability`
- `Observability & cost`
- `Evolution`

Org graph and run/work graph are analytical views, not standardized industry object types. `Work graphs` labels resources centered on run-scoped decomposition, dependencies, and lineage.

## Load the data

Read the line-delimited canonical source without third-party packages:

```python
import json
from urllib.request import urlopen

url = "https://raw.githubusercontent.com/ChaoYue0307/awesome-graph-engineering/main/data/resources.jsonl"
with urlopen(url) as response:
    resources = [json.loads(line) for line in response if line.strip()]

print(len(resources), resources[0]["title"])
```

Or load the generated CSV with pandas:

```python
import pandas as pd

resources = pd.read_csv(
    "https://raw.githubusercontent.com/ChaoYue0307/awesome-graph-engineering/main/data/resources.csv"
)
print(resources.groupby("section").size().sort_values(ascending=False))
```

## Scope

Dataset membership follows the working definition and inclusion test in [`DEFINITION.md`](../DEFINITION.md). Graph-data engineering and single-agent tool use are outside the core scope; classical multi-agent systems remain a foundation and area of overlap.

## License

The dataset metadata, schema, and original descriptions are dedicated under [CC0 1.0 Universal](../LICENSE). Linked resources are not included and remain subject to their respective rights and licenses. CC0 does not waive trademark or patent rights and provides the work without warranties. Citation is appreciated for scholarly traceability but is not required by CC0.
