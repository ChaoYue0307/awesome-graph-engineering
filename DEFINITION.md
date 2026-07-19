# Graph Engineering: Working Definition

**Graph engineering is the discipline of building production systems whose core data model is a graph** — designing how entities and relationships are modeled, ingested, stored, queried, processed, learned from, served, visualized, and operated over time.

The unit of value in graph engineering is the **relationship**. Rows tell you what things are; edges tell you how things affect each other. Graph engineering exists because a growing class of production problems — fraud rings, supply chains, attack paths, recommendations, molecule interactions, agent memory, enterprise knowledge — is defined by multi-hop structure that relational access patterns handle poorly and that pure ML pipelines flatten away.

## The minimal test

A system is a graph engineering system when all four hold:

1. **Relationships are first-class data**, not foreign keys reconstructed at query time — the model names edge types and the workload traverses them.
2. **Multi-hop structure carries the signal.** The questions that matter need paths, neighborhoods, or global structure (communities, centrality, connectivity), not just single-row lookups or aggregations.
3. **It is engineered**: explicit data model, defined ingestion, a query or processing layer, and someone operating it — not a one-off network diagram or a notebook experiment.
4. **It lives in production time**: the graph changes, and correctness, latency, and cost are managed across those changes.

## What it is not

- **Not GraphQL.** GraphQL is an API query protocol; its "graph" is your application object model. See [COMPARISON.md](COMPARISON.md).
- **Not only graph databases.** A graph database is one storage choice among several; graph engineering includes processing engines, algorithm libraries, graph ML, and knowledge graph pipelines that may never touch a dedicated graph store.
- **Not only graph theory.** Theory supplies the algorithms; engineering supplies the data model, the pipeline, the latency budget, and the on-call rotation.
- **Not a mandate.** A core graph engineering skill is knowing when a join table, a recursive CTE, or SQL/PGQ over your relational warehouse is the better system. See [ANTI-PATTERNS.md](ANTI-PATTERNS.md).

## Positioning

Graph engineering sits at the intersection of three older disciplines and inherits from each: **database systems** (storage, query optimization, transactions), **network science** (structure, algorithms, dynamics), and **knowledge representation** (ontologies, semantics, reasoning). Since roughly 2023 a fourth force — **LLMs** — pulled the field into a new serving role: graphs as the structured, verifiable memory and retrieval substrate for AI systems (GraphRAG, agent memory, text-to-query interfaces).

## Citing this definition

See [CITATION.cff](CITATION.cff). The taxonomy that operationalizes this definition lives in [TAXONOMY.md](TAXONOMY.md).
