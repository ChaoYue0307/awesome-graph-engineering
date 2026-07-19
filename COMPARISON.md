# Graph Engineering vs. Its Neighbors

The word "graph" is overloaded. This guide draws the boundaries that cause the most real-world confusion, and states when the neighbor is the right choice.

## GraphQL is not graph engineering

**GraphQL** is an API query protocol: clients select fields from an application object model over HTTP. Its "graph" is the shape of your API types, not a stored network you traverse or analyze. No multi-hop analytics, no graph algorithms, no graph storage are involved.

They meet only at the edges: a GraphQL API can be *backed by* a graph database (e.g. Neo4j's GraphQL library, Dgraph's native GraphQL). If your need is "flexible API for frontend teams", you want GraphQL. If your need is "find every account within four transfers of a sanctioned entity", you want graph engineering.

## Labeled property graphs (LPG) vs. RDF

The two dominant data models, and the field's longest-running argument.

| | LPG (Cypher/GQL/Gremlin world) | RDF (SPARQL/W3C world) |
| --- | --- | --- |
| Atom | Nodes and edges, both with key-value properties | Triples: subject–predicate–object |
| Identity | Local IDs per database | Global IRIs by design |
| Schema | Optional, database-enforced | Ontologies (RDFS/OWL), SHACL validation |
| Strengths | Developer ergonomics, path queries, OLTP workloads | Interoperability, federation, standards, reasoning |
| Typical home | Product backends, fraud, recommendations | Knowledge graphs, life sciences, government/linked data |

Rules of thumb: **integrating data across organizations or publishing it → RDF's global identifiers pay off. Building one product's connected backend → LPG ergonomics win.** The border is softening: RDF 1.2 (RDF-star) adds statement-level annotation that mimics edge properties, and interop efforts aim to map between the models — but teams still pick one as primary.

## Graph database vs. relational database

You do not need a graph database to do graph engineering — and knowing when you don't is a core skill.

Relational is enough when: traversals are bounded and shallow (1–2 hops), known in advance, and joinable on indexed keys; recursive CTEs cover the occasional hierarchy; **SQL/PGQ** (standardized in SQL:2023) gives you property-graph pattern matching over tables you already operate.

A dedicated graph system earns its operational cost when: hop depth is variable or unbounded (path finding, ring detection); queries are structural patterns rather than key lookups; relationship-heavy workloads make join fan-out the bottleneck; or you need graph algorithms (centrality, communities) close to transactional data.

The honest framing: this is an **access-pattern and operations decision, not an ideology**. Benchmarks from vendors on either side should be read as marketing until independently reproduced (see the benchmark resources in the [README](README.md)).

## Network science vs. graph engineering

Network science is the *study* of networks — degree distributions, small worlds, spreading dynamics. Graph engineering is the *construction* of systems that hold networks. Network science supplies the mental models and algorithms; engineering supplies scale, freshness, and reliability. A network scientist's notebook becomes graph engineering the day it has a pipeline, an SLA, and a second user.

## Graph ML vs. classic graph algorithms

Classic algorithms (PageRank, Louvain/Leiden, shortest paths) are deterministic, explainable, cheap, and often embarrassingly strong baselines. GNNs and embeddings learn task-specific signal from structure plus features, at the price of training pipelines, drift, and opacity. The pragmatic ordering: **exhaust classic algorithms and simple features first; reach for GNNs when the baseline demonstrably saturates.** Recent literature (see the graph ML section of the README) repeatedly finds tuned simple baselines matching GNNs on common benchmarks — treat that as calibration, not as a verdict against graph ML.

## Knowledge graph vs. "a graph"

Every knowledge graph is a graph; not every graph is a knowledge graph. A knowledge graph adds **shared semantics**: curated entity identity, a schema or ontology someone maintains, and an ambition to serve many use cases. A fraud graph tuned for one detection workload is graph engineering without being a knowledge graph — and that's fine. Call it a knowledge graph only when meaning, not just structure, is managed.

## GraphRAG vs. vector RAG

Vector RAG retrieves by embedding similarity: cheap to build and strong for local "which chunk says this" questions. GraphRAG builds an entity-relationship structure over the corpus and retrieves through it, which helps when answers require **connecting information across documents** — multi-hop questions, global "summarize the themes" questions, or auditability of why a fact was retrieved. The costs are real: extraction pipelines, index build spend, and quality that depends on extraction accuracy. Current practice (see the GraphRAG section of the README) is hybrid: vectors for local recall, graph structure for multi-hop and global queries, with evaluation before commitment.
