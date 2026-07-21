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
  - pandas
  - mlcroissant
configs:
  - config_name: default
    default: true
    data_files:
      - split: train
        path: resources.jsonl
---

# Awesome Graph Engineering Resource Atlas

A versioned collection of research, standards, frameworks, protocols, reliability systems, evaluations, and critiques for graph-structured multi-agent systems and programmable AI-agent organizations.

This dataset mirrors [Awesome Graph Engineering](https://github.com/ChaoYue0307/awesome-graph-engineering). The GitHub JSONL file is canonical; the Hub exposes the same records through Dataset Viewer, direct downloads, `datasets`, and pandas.

## Working definition

**Graph engineering is the practice of specifying, executing, observing, and evolving a graph-structured agent system—its roles and runtime instances, the contracts that connect them, the state and artifacts they share, and the evidence by which their collective behavior is judged—so that the system can be controlled, tested, and improved as an engineered whole.**

The graph must be load-bearing rather than decorative. Its declared topology, realized run graph, or graph-generating policy must materially constrain execution and remain inspectable enough to version, trace, evaluate, or deliberately change.

*Graph engineering* is used here as an emerging, non-standard term. The scope synthesizes multi-agent research, historical agent-system foundations, standards, runtime documentation, benchmarks, negative results, and practitioner analysis. The [evidence map](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/DEFINITION.md#evidence-map-for-the-synthesis) separates source-backed claims from analytical inferences. Carlos E. Perez’s [“graph of loops” essay](https://x.com/IntuitMachine/status/2078419526354378975) is one contemporary source, not an authority for the definition.

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

`resources.jsonl` drives the Dataset Viewer. `resources.csv` is an equivalent convenience export in the same row and field order. `resource.schema.json` is the machine-readable JSON Schema for one record.

Interoperable access points:

- [Dataset Viewer](https://huggingface.co/datasets/cy0307/awesome-graph-engineering/viewer/default/train)
- [Croissant metadata](https://huggingface.co/api/datasets/cy0307/awesome-graph-engineering/croissant)
- [Auto-converted Parquet](https://huggingface.co/api/datasets/cy0307/awesome-graph-engineering/parquet/default/train/0.parquet)

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

- The collection is selective and versioned; it is not an exhaustive scrape or systematic review.
- `evidence` records publication form. It does not score correctness, replication, maintenance, safety, or endorsement.
- Official documentation is authoritative about intended product behavior, not independent proof of reliability.
- Practitioner analysis may define or challenge a boundary, but recency does not give it priority over primary evidence.
- The field and its vocabulary are changing quickly; verify current documentation, publication status, licenses, and security posture before adoption.
- Linked resources are catalogued by URL only; verify each resource’s rights and license before reuse.

Read the full [curation methodology](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/METHODOLOGY.md), [scope boundaries](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/DEFINITION.md), and [dataset contract](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/data/README.md) before drawing aggregate conclusions.

## License

The dataset metadata, schema, original summaries, and repository-created assets are dedicated under [CC0 1.0 Universal](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/LICENSE). Linked resources are not included in that dedication and remain subject to their own rights and licenses. CC0 does not waive trademark or patent rights and provides the work without warranties. Citation is appreciated for scholarly traceability but is not required by CC0.

## Versioning and synchronization

GitHub’s `data/resources.jsonl` is canonical. The CSV, README tables, interactive atlas, and Hub mirror are generated from it. Stable IDs are never recycled. When `HF_TOKEN` is configured, accepted changes to `main` trigger validation and mirror publication.

## Citation

Curated by He Chaoyue.

```bibtex
@misc{he2026awesomegraphengineering,
  author       = {He, Chaoyue},
  title        = {Awesome Graph Engineering: A Field Guide, Dataset, and Interactive Atlas for Programmable AI-Agent Organizations},
  year         = {2026},
  version      = {1.3.0},
  publisher    = {GitHub},
  howpublished = {\url{https://github.com/ChaoYue0307/awesome-graph-engineering/releases/tag/v1.3.0}},
  url          = {https://github.com/ChaoYue0307/awesome-graph-engineering/releases/tag/v1.3.0}
}
```

Machine-readable metadata is available in [`CITATION.cff`](https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main/CITATION.cff). Cite the original linked works for claims derived from them.
