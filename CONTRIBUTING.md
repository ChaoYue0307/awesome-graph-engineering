# Contributing

Contributions may correct metadata, update project status, improve prose, or add a well-sourced resource.

## What belongs here

Here, **graph engineering** means designing, implementing, and operating AI-agent organizations as explicit, observable graphs. A system directly in scope has all three properties:

1. **Plural bounded agency** — at least two separately accountable agentic runtime instances each make bounded execution decisions; instances may share a reusable role or model.
2. **Explicit coordination semantics** — typed delegation, context or artifact transfer, verification, escalation, or other defined relationships.
3. **An inspectable graph artifact** — the topology, or the policy that generates it, is load-bearing and can be versioned, traced, or otherwise examined.

A resource qualifies when it informs the design, implementation, operation, evaluation, or analysis of such systems. Relevant foundations, substrates, measurements, and critiques may also qualify, including classical multi-agent systems, durable execution beneath agent nodes, communication protocols, evaluation methods, and evidence about multi-agent failure.

A resource does not qualify when it is only:

- **Graph data engineering** — graph databases, GNNs, knowledge-graph construction, or GraphRAG-as-document-retrieval. That established data practice shares the name but is outside the agent-system scope. An exception is graph-shaped state infrastructure used directly by an agent organization.
- **Single-agent tool use** with no independently scoped peer, worker, supervisor, or judge. A task graph internal to one agent and graph/tree-of-thought prompting are also outside the core scope.
- Marketing copy with no technical substance, or a thin listicle rewrite of primary sources.
- A deterministic workflow with no separately accountable agentic instances, unless it provides a relevant substrate or comparison.
- Abandoned software with no historical significance.

Classical multi-agent systems are a foundation and area of overlap, not a blanket nonexample. See [COMPARISON.md](COMPARISON.md) for the detailed boundaries.

Prefer primary sources—official documentation, original papers, standards, and first-party engineering reports. Each entry must identify a concrete contribution to an engineering decision, implementation, evaluation, or scope boundary.

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

1. **Source identity** — resolve an exact title plus a durable identifier or version from a canonical primary record. A screenshot, slide, search snippet, generated summary, or title-only page is a lead, not evidence. If authors, affiliation, venue, date, or status conflict, do not add the item until the conflict is resolved.
2. **Canonical URL** — use the DOI or publisher page for peer-reviewed papers, arXiv abstract for preprints, official docs or repository for tools, and the publisher page for books. Pin a specification or release when a mutable `latest` URL would make the record’s year or description drift. Do not add trackers, affiliate links, or avoidable mirrors.
3. **Authors** — copy the canonical author or maintainer list in source order; prefer the full list rather than adding a new `et al.` abbreviation.
4. **Description** — write at least 80 characters in one or two concrete sentences explaining what the resource contributes. Prefer architectural details, study design, scale, and limitations over marketing claims.
5. **Engineering rationale** — write at least 60 characters identifying the specific decision, primitive, evidence question, or boundary the resource informs.
6. **Evidence label** — select the label by publication form, not perceived prestige. A polished company article remains `Practitioner analysis`; first-party product reference material is `Official documentation`.
7. **Project status** — state archival, discontinuation, acquisition, draft, pre-release, or experimental status when material.
8. **Primary layer** — choose the layer that best matches the resource’s main engineering contribution.

## How to contribute

1. **Small resource fix**: edit the matching JSON object in `data/resources.jsonl`.
2. **New resource**: append one complete 13-field object. Use the next unused `age-NNNN` identifier; identifiers are never recycled.
3. Run `python3 scripts/sync.py` to regenerate the CSV, README tables, and website atlas.
4. Run `bash scripts/check.sh`.
5. Open a pull request explaining the addition or correction. Prefer one resource per pull request; use a coherent batch when the changes share one rationale.

For prose fixes outside generated resource tables, edit the relevant Markdown file directly. Open an issue or discussion before proposing a new section or changing the schema.

## Translating the field guide

Localized introductions share one English resource catalog. Start with the
[translation hub](i18n/README.md), check the controlled terminology in
[`i18n/glossary.yml`](i18n/glossary.yml), and open a
[translation issue](https://github.com/ChaoYue0307/awesome-graph-engineering/issues/new?template=translation.yml)
before adding a locale.

- Keep the emerging-term qualification, three-part minimum test, and scope boundaries intact.
- Keep citation keys, URLs, code, dataset IDs, and original paper or project titles unchanged.
- Do not copy the generated resource tables into a localized README. Link to the canonical atlas instead.
- Record review status in [`i18n/manifest.yml`](i18n/manifest.yml) and request both native-language and agent-systems review.
- Prefer a short, accurate translation over a complete one that changes the technical meaning.

### Pull-request checklist

- [ ] The resource directly fits the minimum inclusion test or clearly serves its foundations, substrate, measurement, or critique.
- [ ] I opened a canonical primary record and verified the exact title, authors or maintainers, year, venue or release, and publication status; a screenshot or search result was not the sole source.
- [ ] All 13 fields are present and controlled labels match the documented display values exactly.
- [ ] The URL is canonical and loads.
- [ ] The description is concrete; `why` adds a distinct practitioner rationale.
- [ ] The source/evidence label describes source type rather than scoring quality.
- [ ] No duplicate exists by ID, normalized URL, or title.
- [ ] `python3 scripts/sync.py`, `python3 scripts/validate.py`, and `python3 scripts/sync.py --check` pass.

CI checks Markdown, schema and vocabulary validity, generated-file parity, and links on every pull request.

## Removing resources

A removal pull request may address link rot without a canonical replacement, duplication, an inactive project without historical significance, or materially misleading content. State the reason and provide a canonical successor when one exists.

## License

Contributions are dedicated under [CC0 1.0 Universal](LICENSE). By submitting a contribution, you confirm that you have the right to apply CC0 to it. Linked third-party works remain subject to their own terms; do not copy protected third-party content into this repository.
