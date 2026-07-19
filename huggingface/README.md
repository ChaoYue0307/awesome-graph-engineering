---
pretty_name: Awesome Graph Engineering Resource Atlas
language:
  - en
license: cc0-1.0
annotations_creators:
  - expert-generated
source_datasets:
  - original
size_categories:
  - n<1K
tags:
  - agents
  - agentic-ai
  - multi-agent-systems
  - graph-engineering
  - agent-orchestration
  - tabular
  - datasets
configs:
  - config_name: default
    default: true
    data_files:
      - split: train
        path: resources.jsonl
---

# Awesome Graph Engineering Resource Atlas

An open, expert-curated map of the research, standards, frameworks, protocols, reliability systems, evaluations, and critiques needed to engineer AI-agent organizations as programmable graphs.

This is the synchronized dataset mirror for [Awesome Graph Engineering](https://github.com/ChaoYue0307/awesome-graph-engineering). The GitHub JSONL file is the canonical editorial source; this Hub repository makes the same records easy to preview, search, download, and load with `datasets` or pandas.

## Working definition

**Graph engineering is the practice of specifying, executing, observing, and evolving a graph-structured agent system—its roles and runtime instances, the contracts that connect them, the state and artifacts they share, and the evidence by which their collective behavior is judged—so that the system can be controlled, tested, and improved as an engineered whole.**

The graph must be load-bearing rather than decorative. Its declared topology, realized run graph, or graph-generating policy must materially constrain execution and remain inspectable enough to version, trace, evaluate, or deliberately change.

The term is emerging rather than standardized. The repository [triangulates its definition and scope](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/DEFINITION.md#evidence-map-for-the-synthesis) across peer-reviewed multi-agent research, historical agent-system foundations, standards, current runtimes, benchmarks, negative results, and contemporary practitioner analysis—including Carlos E. Perez's [“graph of loops” framing](https://x.com/IntuitMachine/status/2078419526354378975). No single source is treated as the authority for the field.

## Dataset structure

The `default` configuration contains one `train` split. “Train” is the Hub's conventional single-split label; these rows are a resource atlas, not labeled examples or a model-training benchmark.

Each row has 13 fields:

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | string | Stable `age-NNNN` resource identifier. |
| `section` | string | Reader-facing directory section. |
| `subcategory` | string | Specific discovery label within the section. |
| `rtype` | string | Resource format, such as Paper, Docs, Standard, or Benchmark. |
| `title` | string | Canonical resource title. |
| `url` | string | Canonical source URL. |
| `venue` | string | Publisher, venue, documentation site, or repository host. |
| `year` | integer | Publication year or year of the cited major release. |
| `authors` | string | Authors or maintaining organization. |
| `description` | string | Original summary of the resource's concrete contribution. |
| `why` | string | Practitioner rationale for including the resource. |
| `evidence` | string | Source-type label, not a quality score. |
| `layer` | string | Primary graph-engineering design layer. |

`resources.jsonl` drives the Dataset Viewer. `resources.csv` is an equivalent convenience export in the same row and field order.

## Load the data

```python
from datasets import load_dataset

dataset = load_dataset("cy0307/awesome-graph-engineering")
resources = dataset["train"]
print(resources.num_rows, resources.column_names)
```

```python
import pandas as pd

url = (
    "https://huggingface.co/datasets/cy0307/awesome-graph-engineering/"
    "resolve/main/resources.csv"
)
resources = pd.read_csv(url)
print(resources.groupby("layer").size().sort_values(ascending=False))
```

## Intended uses

- discover primary sources and implementation references by engineering layer;
- seed literature reviews and architecture comparisons, followed by reading the linked originals;
- analyze how the collection is distributed across source types, years, sections, and layers;
- build educational tools, resource browsers, or retrieval indexes; and
- propose corrections and additions through the canonical GitHub repository.

## Limitations and responsible use

- This is an opinionated, versioned field guide—not an exhaustive scrape or systematic review.
- `evidence` records publication form. It does not score correctness, replication, maintenance, safety, or endorsement.
- Official documentation is authoritative about intended product behavior, not independent proof of reliability.
- Practitioner analysis can sharpen a boundary but does not outweigh primary research merely because it is recent.
- The field and its vocabulary are changing quickly; verify current documentation, publication status, licenses, and security posture before adoption.
- Linked resources retain their own copyrights and licenses. CC0 applies only to this repository's metadata, schema, summaries, and original assets.

Read the full [curation methodology](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/METHODOLOGY.md), [scope boundaries](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/DEFINITION.md), and [dataset contract](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/data/README.md) before drawing aggregate conclusions.

## Versioning and synchronization

`data/resources.jsonl` in GitHub is the only hand-edited source. The CSV, README tables, interactive atlas, and this Hugging Face mirror are generated or published from that source. Stable IDs are never recycled. A GitHub Actions workflow validates parity and, when configured with the repository's `HF_TOKEN` secret, republishes the mirror after accepted changes to `main`.

## Citation

Preferred citation: **He Chaoyue (2026), *Awesome Graph Engineering*.**

```bibtex
@misc{he2026awesomegraphengineering,
  author       = {He, Chaoyue},
  title        = {Awesome Graph Engineering: A Field Guide, Dataset, and Interactive Atlas for Programmable AI-Agent Organizations},
  year         = {2026},
  publisher    = {GitHub},
  howpublished = {\url{https://github.com/ChaoYue0307/awesome-graph-engineering}},
  url          = {https://github.com/ChaoYue0307/awesome-graph-engineering}
}
```

Machine-readable metadata is available in [`CITATION.cff`](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/CITATION.cff). Cite the original linked works for claims derived from them.
