# Graph Engineering Anti-Patterns

Recurring failure modes, each with the symptom that reveals it and the corrective move. Sourced from practitioner post-mortems, vendor-neutral benchmarks, and the critiques collected in the [README](README.md).

## Modeling

### 1. "Everything is a graph"

**Symptom:** the graph database was chosen before the queries were written; the workload turns out to be key lookups and aggregations.
**Move:** write the five most valuable queries first. If none needs variable-depth traversal or structural patterns, use the relational database you already operate (see [COMPARISON.md](COMPARISON.md)).

### 2. Properties that should be nodes (and vice versa)

**Symptom:** you can't traverse to something you constantly filter on (it's trapped in a property), or the graph is bloated with single-use nodes that are never traversed.
**Move:** model from access patterns: anything you traverse through or aggregate across is a node; anything you only read off an entity is a property. Expect to refactor once real queries arrive.

### 3. Schema anarchy

**Symptom:** six spellings of the same relationship type, orphan labels, silent semantic drift between teams.
**Move:** even "schema-optional" stores need a schema someone owns — constraints where the engine supports them, validation (e.g. SHACL in RDF), and migrations treated like any other database migration.

## Querying and storage

### 4. The supernode ambush

**Symptom:** p99 latency collapses when traversals touch celebrity nodes — the account followed by 40 million, the "USA" location node connected to everything.
**Move:** find hubs before they find you (degree distribution checks in CI), then mitigate: relationship-type partitioning, denormalized counters, capped expansions, or modeling the hub out of hot paths.

### 5. Unbounded traversal in the request path

**Symptom:** a variable-length path query with no depth cap or timeout takes down the OLTP cluster during an incident — exactly when the deep query was interesting.
**Move:** every online traversal gets a depth bound, a budget, and a kill switch; exploratory deep queries run on replicas or an analytics engine (lifecycle layer 5, not layer 4).

### 6. Analytics on the transactional cluster

**Symptom:** nightly PageRank makes the morning's checkout queries time out.
**Move:** separate OLTP serving from whole-graph computation — projected in-memory graphs, a processing engine, or a read replica. The two workloads have opposite tuning goals.

## Machine learning

### 7. GNN-first development

**Symptom:** months into a GNN pipeline, nobody has run the label-propagation or degree-feature baseline; when someone does, it ties.
**Move:** classic algorithms and trivial structural features are the baseline gate — a GNN must beat them by enough to pay for its training pipeline, drift monitoring, and opacity.

### 8. Leaky graph splits

**Symptom:** 0.99 AUC in the notebook, coin-flip in production — test edges were visible to message passing, or time travel leaked future structure into training.
**Move:** split by time for temporal graphs, remove test edges from the message-passing graph, and evaluate against realistic negative sampling.

## GraphRAG and AI serving

### 9. GraphRAG without an eval

**Symptom:** the team ships an entity-extraction + community-summary pipeline because a demo was impressive; nobody can say whether it beats vector search on their corpus.
**Move:** stand up the vector baseline and a question set first; adopt graph retrieval where it measurably wins (typically multi-hop and corpus-global questions), keep the hybrid otherwise.

### 10. Trusting the extractor

**Symptom:** the knowledge graph confidently contains entities and relationships the source documents never stated — LLM extraction hallucinated them, and downstream answers cite the graph as ground truth.
**Move:** provenance on every edge (source span, extractor version, confidence), sampled human audits, and treating the graph as an index over sources rather than a source itself.

## Visualization

### 11. The hairball demo

**Symptom:** the "whole graph" force-layout screenshot impresses executives and answers no question anyone has.
**Move:** visualize questions, not graphs: ego networks, filtered subgraphs, aggregated views. Above a few thousand visible elements, layout is decoration — switch to queries and summaries.

## Operations

### 12. Benchmarketing-driven procurement

**Symptom:** the database was chosen from a vendor's own benchmark showing it 100× faster than the incumbent — on the vendor's queries, dataset, and tuning.
**Move:** trust only audited, workload-representative benchmarks (LDBC-style) or your own reproduction on your own queries; treat every unaudited vendor benchmark as an ad.

### 13. The unversioned graph

**Symptom:** an ingestion bug corrupts edges; nobody can say what the graph looked like yesterday, or which pipeline run wrote what.
**Move:** versioned, idempotent, replayable ingestion (batch IDs, provenance properties, snapshots or time-travel storage) — the graph is a derived artifact you can rebuild, not an accumulating mystery.

### 14. Islands nobody reconciles

**Symptom:** three teams built three graphs with three notions of "customer"; a fourth project starts to unify them and becomes a fifth island.
**Move:** entity resolution as a first-class, owned service, and shared identifiers before shared platforms. This is an organizational anti-pattern wearing a technical costume.
