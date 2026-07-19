# Dataset

The full resource list as structured data, kept in lockstep with `README.md` by `scripts/validate.py` in CI.

## Files

- `resources.csv` — one row per resource, UTF-8, header row, comma-separated.
- `resources.jsonl` — the same records, one JSON object per line. This file also feeds the website's Resource Atlas (`python3 scripts/build_site.py` re-embeds it).

## Fields

| Field | Meaning |
| --- | --- |
| `id` | Stable identifier, `age-NNNN`. Never reused after deletion. |
| `section` | README section the resource lives in. |
| `subcategory` | Finer-grained label inside the section (free text). |
| `rtype` | One of: Paper, Blog, Docs, Tool, Benchmark, Dataset, Book, Course, Video, List, Standard, Critique. |
| `title` | Resource title as shown in the README. |
| `url` | Canonical URL (arXiv abstract page for papers, official docs/repo for tools). |
| `venue` | Publishing platform or venue (arXiv, VLDB, neo4j.com, GitHub, …). |
| `year` | Publication or last-major-update year; empty for evergreen resources. |
| `authors` | Authors or maintainers; empty when institutional. |
| `description` | The list's original 1–2 sentence contribution summary. |
| `evidence` | One of: Peer-reviewed research, Research preprint, Practitioner analysis, Official documentation, Maintained OSS project, Industry standard, Benchmark/dataset, Book/course, Community resource. |
| `layer` | Primary design layer from [TAXONOMY.md](../TAXONOMY.md): `roles`, `topology`, `handoffs`, `workgraph`, `state`, `gates`, `reliability`, `observability`, `evolution`, or `cross-layer`. |

## Load it

```python
import pandas as pd
df = pd.read_csv(
    "https://raw.githubusercontent.com/ChaoYue0307/awesome-graph-engineering/main/data/resources.csv"
)
df.groupby("section").size().sort_values(ascending=False)
```

## License

CC0-1.0, same as the repository. Descriptions are original to this project; the linked works belong to their authors.
