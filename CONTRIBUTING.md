# Contributing

Thanks for helping make this a useful, evidence-led map of graph engineering. Contributions of every size are welcome — a fixed typo, a corrected project status, or a well-sourced new resource.

## What belongs here

This repository uses **graph engineering** as a working term for designing, implementing, and operating AI-agent organizations as explicit, observable graphs. A system directly in scope has all three of these properties:

1. **Multiple independently scoped agent nodes** — reusable roles or runtime instances with distinct goals, context, authority, or responsibility.
2. **Explicit coordination semantics** — typed delegation, context or artifact transfer, verification, escalation, or other defined relationships.
3. **An inspectable graph artifact** — the topology, or the policy that generates it, is load-bearing and can be versioned, traced, or otherwise examined.

A resource qualifies when it helps someone design, implement, operate, evaluate, or understand those systems. The list also includes relevant foundations, substrates, measurements, and critiques: classical multi-agent systems, deterministic durable execution under agent nodes, communication protocols, evaluation methods, and evidence about when multi-agent designs fail.

A resource does not qualify when it is only:

- **Graph data engineering** — graph databases, GNNs, knowledge-graph construction, or GraphRAG-as-document-retrieval. That established data practice shares the name but is outside this repository's working scope. An exception is graph-shaped state infrastructure used directly by an agent organization.
- **Single-agent tool use** with no independently scoped peer, worker, supervisor, or judge. A task graph internal to one agent and graph/tree-of-thought prompting are also outside the core scope.
- Marketing copy with no technical substance, or a thin listicle rewrite of primary sources.
- A deterministic workflow with no genuine agent nodes, unless the resource is useful as agent-graph substrate or comparison.
- Abandoned software with no historical significance.

Classical multi-agent systems are a foundation and area of overlap, not a blanket nonexample. See [COMPARISON.md](COMPARISON.md) for the detailed boundaries.

Quality bar: **every entry must be something a practitioner would thank you for.** Prefer primary sources — official documentation, the original paper, a standard, or a first-party engineering report — over aggregators.

## Canonical entry format

[`data/resources.jsonl`](data/resources.jsonl) is the only hand-edited resource list. Each line is one JSON object with exactly these 13 fields, in this order:

`id`, `section`, `subcategory`, `rtype`, `title`, `url`, `venue`, `year`, `authors`, `description`, `why`, `evidence`, `layer`.

The generated README tables, `data/resources.csv`, and website atlas must not be edited by hand. Run `python3 scripts/sync.py` after changing the JSONL source. Full field semantics are documented in [`data/README.md`](data/README.md).

### Controlled display labels

Use these values exactly, including capitalization and punctuation:

- **Resource type (`rtype`)**: `Paper`, `Blog`, `Docs`, `Tool`, `Benchmark`, `Dataset`, `Book`, `Course`, `Video`, `List`, `Standard`, `Critique`.
- **Section (`section`)**: `Start Here`, `Research Foundations`, `Frameworks & SDKs`, `Protocols & Handoffs`, `State, Memory & Artifacts`, `Verification & Evals`, `Reliability & Durable Execution`, `Observability & Cost`, `Benchmarks & Datasets`, `Production Case Studies`, `Critiques & Limits`.
- **Primary layer (`layer`)**: `Roles`, `Topology`, `Handoffs`, `Work graphs`, `State`, `Gates`, `Reliability`, `Observability & cost`, `Evolution`.
- **Source/evidence label (`evidence`)**: `Peer-reviewed research`, `Research preprint`, `Practitioner analysis`, `Official documentation`, `Maintained OSS project`, `Industry standard`, `Benchmark/dataset`, `Book/course`, `Community resource`.

The `evidence` value describes **what kind of source it is**. It is not a quality score, endorsement, or certainty grade. Evaluate rigor from the work itself. Use `why` to state the resource's specific practical value; do not repeat the description.

## Writing rules

1. **Canonical URL** — use the DOI or publisher page for peer-reviewed papers, arXiv abstract for preprints, official docs or repository for tools, and the publisher page for books. Do not add trackers, affiliate links, or avoidable mirrors.
2. **Description** — write one or two concrete sentences explaining what the resource contributes. Prefer architectural details, study design, scale, and limitations over marketing claims.
3. **Why** — state why this particular item helps a graph engineer or why it matters as foundation, substrate, evidence, or critique.
4. **Evidence honesty** — select the source/evidence label by publication form, not by perceived prestige. A polished company article remains `Practitioner analysis`; first-party product reference material is `Official documentation`.
5. **Status honesty** — if a project is archived, discontinued, or absorbed, say so in the description. Include inactive projects only when historically important.
6. **One primary layer** — choose the most useful discovery lens, even when the resource crosses several.

## How to contribute

1. **Small resource fix**: edit the matching JSON object in `data/resources.jsonl`.
2. **New resource**: append one complete 13-field object. Use the next unused `age-NNNN` identifier; identifiers are never recycled.
3. Run `python3 scripts/sync.py` to regenerate the CSV, README tables, and website atlas.
4. Run `python3 scripts/validate.py` and then `python3 scripts/sync.py --check`.
5. Open a pull request explaining the addition or correction. One resource per PR is easiest to review; coherent batches are welcome.

For prose fixes outside generated resource tables, edit the relevant Markdown file directly. Open an issue or discussion before proposing a new section or changing the schema.

### Pull-request checklist

- [ ] The resource directly fits the minimum inclusion test or clearly serves its foundations, substrate, measurement, or critique.
- [ ] All 13 fields are present and controlled labels match the documented display values exactly.
- [ ] The URL is canonical and loads.
- [ ] The description is concrete; `why` adds a distinct practitioner rationale.
- [ ] The source/evidence label describes source type rather than scoring quality.
- [ ] No duplicate exists by ID, normalized URL, or title.
- [ ] `python3 scripts/sync.py`, `python3 scripts/validate.py`, and `python3 scripts/sync.py --check` pass.

CI checks Markdown, schema and vocabulary validity, generated-file parity, and links on every pull request.

## Removing resources

Removal PRs are as valuable as additions. Grounds include link rot with no canonical replacement, an inactive project without historical significance, duplication, or material that has become misleading. Explain the reason and, where possible, provide a canonical successor.

## License

By contributing, you agree that your contributions are released under [CC0-1.0](LICENSE), the same license as the repository's original metadata and descriptions. Linked works remain under their authors' licenses.
