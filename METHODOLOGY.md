# Curation Methodology

The collection is a curated, versioned map of graph engineering, not a systematic literature review, benchmark leaderboard, or endorsement list. The working definition is in [DEFINITION.md](DEFINITION.md); the design layers are in [TAXONOMY.md](TAXONOMY.md).

## Selection scope

The primary selection question is:

> Does this resource materially help a practitioner design, execute, observe, evaluate, secure, or evolve a graph-structured agent system?

In scope are:

- primary research, canonical implementations, and official documentation for agent orchestration and multi-agent systems;
- role and topology design, routing, handoffs, protocols, shared state, work graphs, gates, reliability, observability, security, cost, and graph optimization;
- benchmarks, datasets, empirical evaluations, production case studies, and substantive failure analyses;
- historically important work in multi-agent systems, distributed AI, blackboard architectures, actor-style coordination, workflow systems, or distributed systems when a specific primitive transfers directly to agent graphs; and
- serious critiques and negative results that help establish when a graph should not be used.

Contemporary practitioner sources that use the emerging term may be included when they define a relevant boundary or document a failure mode. They remain labeled `Practitioner analysis`; recency or influence does not elevate them above primary technical evidence.

The collection prioritizes original papers, first-party documentation, official repositories, standards bodies, and first-party engineering reports. A secondary source may qualify when it provides original synthesis or practitioner evidence unavailable from the primary sources alone.

## Inclusion criteria

A resource should satisfy all of the following:

1. **Direct relevance:** it maps to the working definition or contributes a clearly identified foundation, substrate, evaluation method, or critique.
2. **Technical substance:** it documents architecture, method, implementation details, evidence, or limitations beyond promotional claims.
3. **Traceable provenance:** it has an identifiable author or institution and a canonical, stable URL where reasonably available.
4. **Distinct contribution:** it is not merely a mirror, scraped rewrite, or lower-information duplicate of an included primary source.
5. **Status disclosure:** archival, preprint, experimental, discontinued, absorbed, or maintenance status is stated when material to interpretation.
6. **Practical or historical value:** a practitioner or researcher can use it to make a design decision, reproduce an approach, understand evidence, or recover an important idea.

Historical significance can justify retaining an inactive project. Novelty, popularity, citation count, star count, and commercial backing do not by themselves qualify a resource.

## Exclusion criteria

Excluded by default:

- graph databases, knowledge-graph construction, graph neural networks, or GraphRAG with no agent-coordination connection;
- single-agent prompting, context, tools, or loops with no transferable organizational or graph primitive;
- deterministic workflow material that neither hosts agentic nodes nor teaches a relevant topology, edge, state, or reliability mechanism;
- promotional landing pages, thin listicles, unsourced claims, affiliate links, and content farms;
- redundant mirrors when a canonical source is available;
- abandoned software with neither current utility nor historical significance; and
- resources whose central claims cannot be identified well enough to describe without speculation.

Eligibility depends on concrete contribution, not use of the phrase *graph engineering*; relevant work often uses earlier terminology.

## Taxonomy and controlled labels

Every dataset record has one primary placement. Cross-cutting resources use the layer that best represents the concrete engineering decision taught by the selected artifact.

| Field | Controlled values or rule |
| --- | --- |
| `section` | Must match the reader-facing README section containing the resource. |
| `rtype` | `Paper`, `Blog`, `Docs`, `Tool`, `Benchmark`, `Dataset`, `Book`, `Course`, `Video`, `List`, `Standard`, or `Critique`. |
| `evidence` | `Peer-reviewed research`, `Research preprint`, `Practitioner analysis`, `Official documentation`, `Maintained OSS project`, `Industry standard`, `Benchmark/dataset`, `Book/course`, or `Community resource`. |
| `layer` | `Roles`, `Topology`, `Handoffs`, `Work graphs`, `State`, `Gates`, `Reliability`, `Observability & cost`, or `Evolution`, as defined in [TAXONOMY.md](TAXONOMY.md). |
| `subcategory` | A concise descriptive placement within a section; it is not currently a controlled vocabulary. |

Labels use the exact spelling and capitalization above so that validation and downstream reuse remain deterministic. A resource's type describes the selected artifact, not everything its author or organization has produced.

## Source and evidence labels are not quality rankings

The `evidence` field describes the source and publication channel at the time of review. It does **not** score correctness, methodological strength, reproducibility, safety, maintenance quality, impact, or the curators' approval.

In particular:

- peer review does not guarantee that a result generalizes or has been independently replicated;
- a preprint is not automatically weaker than every peer-reviewed work;
- official documentation is authoritative about a project's intended behavior, not independent proof of its effectiveness;
- `Maintained OSS project` is a time-bound status, not a security audit or product recommendation; and
- practitioner analysis may be rigorous, but its claims should still be followed back to primary evidence where possible.

Descriptions therefore state concrete contributions and material limitations instead of converting the label into a star rating. If a preprint is later published or a project becomes archived, the label and description should be updated.

## Source verification

Source identity, publication status, scope fit, and claim accuracy are separate checks. Curators should:

1. **Resolve the identity.** Use the original paper, publisher record, official documentation, official repository, release, or standards page as the canonical URL. Match the exact title, authors or maintainers, and a durable identifier such as a DOI, arXiv ID, anthology ID, OpenReview forum ID, specification version, or release tag when one exists.
2. **Confirm the status.** Check whether the artifact is peer-reviewed, a preprint, a workshop paper, a draft standard, experimental documentation, a maintained release, or an archived project. Do not infer status from visual polish, author reputation, or a familiar conference template.
3. **Read the primary artifact.** Verify every quantitative claim and the described mechanism against the source itself. Search snippets, generated summaries, screenshots, slide images, and title-only pages are discovery leads—not bibliographic evidence.
4. **Test the scope independently.** A work does not become in scope because its title contains *graph*, *agent*, *loop*, or *engineering*. Apply the minimum system test in [DEFINITION.md](DEFINITION.md); graph-shaped memory or data remains a substrate unless multiple bounded agents and their load-bearing coordination graph are actually present.
5. **Triangulate anomalies.** For a new or unpublished-looking work, check at least two independent authoritative surfaces, such as a canonical index plus an author, institution, venue, or repository page. Conflicting authors, affiliations, dates, or claims must be resolved before inclusion.
6. **Exclude unresolved candidates.** Never manufacture missing metadata or cite a plausible-looking artifact provisionally. Reconsider it only after a canonical record or direct author or venue confirmation appears.

A working URL proves only that a page responds. It does not establish identity, authenticity, semantic freshness, correctness, or continued maintenance.

## Search strategy

Discovery combines exact-title and concept searches across canonical scholarly indexes, publisher proceedings, official documentation, standards bodies, and first-party repositories. Searches use both the emerging label *graph engineering* and established neighboring terms such as multi-agent orchestration, agent communication topology, work graphs, handoffs, shared state, verification, durable execution, and compound AI systems. Citation chaining from strong primary sources and release notes is used to locate earlier foundations and newer implementations.

Candidate discovery and inclusion are separate stages. Every candidate is checked against its primary artifact and the source-verification protocol above; a search result, screenshot, social post, or secondary summary is never sufficient by itself. The corpus is updated incrementally as new venue proceedings, specifications, releases, benchmarks, and substantive negative results become available.

## Date handling

For papers, `year` records the cited peer-reviewed publication year, or the preprint year when no later publication is verified. For documentation, standards, tools, and datasets, it records the cited major version or materially reviewed release rather than an assumed project-creation date. Mutable specifications and release-sensitive documentation are pinned to a dated version or tag whenever possible. When a preprint is later published, or a moving document supersedes the cited version, the canonical URL, venue, year, evidence label, and description are reviewed together.

The dated corpus snapshot in the README records when aggregate counts were recalculated; it does not imply that every linked project was re-audited on that day.

## Limitations

This is a selective field guide, not a systematic review, exhaustive bibliography, citation ranking, or replication study. Coverage is biased toward publicly accessible English-language primary records and sources discoverable through the indexes and communities reviewed. Fast-moving preprints, product documentation, and project status can change after verification. Mapping each resource to one primary layer compresses work that may span several concerns, and evidence labels describe publication form rather than methodological quality. Original linked works remain the authority for their claims, methods, limitations, and licenses.

## Freshness and maintenance

Reviews occur when links, publication status, projects, or standards change, with periodic checks for high-value and fast-moving entries.

Maintenance checks should look for:

- papers moving from preprint to a peer-reviewed venue;
- repositories being archived, renamed, transferred, or materially inactive;
- official documentation moving or describing a superseding product;
- licenses, standards, benchmarks, and datasets changing status; and
- claims or descriptions that have become misleading as the field evolves.

Automated validation can catch schema drift, duplicate URLs, and some link failures; it cannot judge whether a resource still does what the description says. Readers should verify current documentation, licensing, security posture, and compatibility before adopting a project.

## Corrections and disputes

A correction should identify the resource ID and canonical URL, link to primary evidence, name the exact field or sentence at issue, and propose the smallest accurate change.

Factual errors, broken canonical links, changed publication or maintenance status, and dataset drift should be corrected promptly. Editorial disagreements about scope or placement should cite [DEFINITION.md](DEFINITION.md) and [TAXONOMY.md](TAXONOMY.md) so that the decision can be recorded consistently. Sensitive vulnerability reports should follow [SECURITY.md](SECURITY.md), not a public issue.

## Dataset synchronization contract

`data/resources.jsonl` is the only hand-edited resource collection. The resource tables in `README.md`, `data/resources.csv`, and the website atlas are generated representations and must remain in lockstep with it. The [Hugging Face dataset](https://huggingface.co/datasets/cy0307/awesome-graph-engineering) is a one-way publication mirror of the same validated records.

For every addition, correction, move, or removal:

1. update `data/resources.jsonl` only;
2. preserve the stable `id` for an existing resource and never reuse a retired ID;
3. use one canonical URL per resource and keep controlled labels exact;
4. run `python3 scripts/sync.py` to regenerate the CSV, README tables, and website atlas;
5. run `bash scripts/check.sh` to validate the dataset, generated views, locales, JavaScript, and site assets; and
6. review every generated diff before committing it.

After changes land on `main`, the Hugging Face workflow—when configured with the `HF_TOKEN` repository secret—republishes the dataset card, JSONL, CSV, and JSON Schema in one Hub commit. Hub-side edits are intentionally overwritten by the next sync; corrections belong in the canonical GitHub source.

The synchronization check establishes structural consistency, not an independent judgment of resource quality. The field-level dataset contract is documented in [data/README.md](data/README.md), and contribution mechanics are in [CONTRIBUTING.md](CONTRIBUTING.md).
