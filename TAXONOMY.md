# The Graph Engineering Lifecycle

Nine layers, from deciding whether you have a graph problem to running one in production. Every resource in the [README](README.md) and the [Resource Atlas](https://chaoyue0307.github.io/awesome-graph-engineering/#atlas) maps onto this lifecycle.

| # | Layer | The question it answers | Representative concerns |
| --- | --- | --- | --- |
| 1 | **Model** | What are the entities, relationships, and semantics? | LPG vs RDF, ontology design, schema evolution, identifier strategy, reification and edge properties |
| 2 | **Ingest** | How does data become and stay a graph? | ETL/CDC pipelines, entity resolution, mapping languages, LLM-based extraction, idempotent loads |
| 3 | **Store** | Where does the graph live? | Native graph databases, triplestores, relational/columnar backends, embedded engines, distributed partitioning, transactions |
| 4 | **Query** | How do you ask multi-hop questions interactively? | GQL, Cypher, Gremlin, SPARQL, SQL/PGQ, query planning, worst-case optimal joins, supernode handling |
| 5 | **Process** | How do you compute over the whole graph? | Vertex-centric and matrix paradigms, PageRank/communities/paths at scale, GPU acceleration, incremental computation |
| 6 | **Learn** | What can be predicted from structure? | GNNs, knowledge graph embeddings, link prediction, node classification, graph foundation models, feature stores |
| 7 | **Serve** | How do graphs power products and AI systems? | GraphRAG, agent memory, text-to-query, recommendation serving, APIs, caching, latency budgets |
| 8 | **Visualize** | How do humans read the graph? | Layouts at scale, the hairball problem, visual analytics, investigation UIs |
| 9 | **Operate** | How does it keep working? | Benchmarking, capacity planning, versioning and migrations, observability, cost, access control |

## How to use the taxonomy

- **Placing a resource**: most resources serve one primary layer; cross-cutting resources (books, surveys, case studies) are tagged by the layer they teach best.
- **Placing yourself**: application developers usually enter at layers 3–4, data engineers at 2, ML engineers at 6, AI engineers at 7, analysts at 5 and 8, platform teams at 9. The [reading paths in the README](README.md#reading-paths) follow these entry points.
- **Placing a decision**: architecture debates are usually one layer masquerading as another. "Which graph database?" (layer 3) is often really "what are our queries?" (layer 4) or "who operates it?" (layer 9). Naming the layer keeps the argument honest.

## Boundary notes

- **Layer 1 is where RDF and property graphs genuinely differ**; from layer 5 upward the paradigms mostly converge on the same algorithms and models. See [COMPARISON.md](COMPARISON.md).
- **Layer 7 is the newest and fastest-moving layer** — GraphRAG and agent memory barely existed before 2023 and now drive much of the field's growth. Treat resources there as promising rather than settled; evidence labels mark the difference.
- **Layers are not a pipeline you must fully build.** Plenty of excellent graph systems are layers 1+2+5 in a batch job, or 1+3+4 with no ML anywhere.
