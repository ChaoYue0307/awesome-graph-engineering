# Graph Engineering vs. Its Neighbors

The word "graph" is badly overloaded. **Graph engineering** is also an emerging, non-standard label in the AI-agent context, so this page documents the working scope used by this repository rather than claiming a settled field boundary. It connects several established disciplines; the comparisons below explain when a neighboring frame is the more precise one.

## Five interacting engineering dimensions

Prompt, context, harness, loop, and graph engineering govern different concerns. They often interact and nest, but they are **not** a strict maturity sequence: a team can improve an edge contract without operating a persistent loop, or use a durable loop around one node inside a larger graph.

| Layer | Governs | You have a problem at this layer when… |
| --- | --- | --- |
| **Prompt engineering** | One model response | The model misunderstands the instruction |
| **Context engineering** | What the model can see | The model lacks (or drowns in) information |
| **Harness engineering** | One run's tools, permissions, isolation, checks | The agent can't act safely or verify locally |
| **Loop engineering** | A temporal control cycle: trigger → act → verify → retry or persist | Work recurs, needs feedback, or cannot finish reliably in one pass |
| **Graph engineering** | Relationships among multiple independently scoped agent nodes | Coordination, isolation, specialization, or parallel work must be explicit and inspectable |

A loop is principally a temporal view; a graph is principally a relational view. A node may run a loop, but graph membership does not require every node to own one. The complementary loop field guide is [awesome-loop-engineering](https://github.com/ChaoYue0307/awesome-loop-engineering).

Under this repository's working definition, a system is in scope only when all three conditions hold:

1. It has multiple independently scoped agent roles or runtime instances.
2. Their coordination semantics are explicit — for example typed delegation, context or artifact transfer, verification, or escalation relationships.
3. The topology or policy that generates it is a load-bearing, inspectable system artifact.

## Not graph data engineering (the name collision)

There is an established practice also called graph engineering: **building systems on graph-shaped data** — graph databases (Neo4j, Neptune), query languages (Cypher, GQL, SPARQL), graph analytics, GNNs, knowledge graphs, and GraphRAG. That is a *data* concern; this list scopes the term to agent organization. The overlap is real but narrow: a knowledge graph can serve an agent organization as shared state, and an agent team can build knowledge graphs. The test is the principal meaning of the nodes and edges: if they represent data entities and relationships, plain graph data engineering is outside this repository; if multiple independently scoped agents and their coordination are the load-bearing graph, it may be in scope. (GraphQL is neither — it is an API query language.)

## Org graph vs. run/work graph

This repository uses two **analytical views** to reason about different timescales. The labels are not claimed as universal standards, and an implementation may store both views in one runtime structure.

| | Org graph view | Run/work graph view |
| --- | --- | --- |
| Typical lifetime | Survives across runs | Scoped to one run or objective |
| Nodes | Reusable roles or services with standing scope ("Security owns auth") | Agent/task instances created, joined, or cancelled during execution |
| Edges | Persistent delegation, permission, and ownership policy | The run's actual dependencies, transfers, gates, and lineage |
| Changes when | The team learns something about the *domain* | Evidence arrives about the *task* |
| Answers | Who? | What, right now? |

Separating the views can expose two failure modes: redesigning standing roles and permissions on every run, or freezing a task plan that should adapt to evidence. A planner may rewrite the run/work graph within enforced budgets without thereby gaining authority to rewrite the org graph. See [ANTI-PATTERNS.md](ANTI-PATTERNS.md).

## Not workflow orchestration (Airflow, Temporal, BPMN)

Classical orchestrators run graphs of predefined steps; they are strong at scheduling, retries, and durable state. The distinction is not the graph-shaped diagram but **genuine agent scope at multiple nodes**: an agent node can interpret bounded goals and choose actions, while an ordinary workflow step executes predefined behavior. A deterministic DAG by itself is workflow orchestration, not an agent organization. The two compose well: deterministic tools, tests, human approvals, and durable-execution runtimes can be nodes or gates inside an otherwise qualifying agent graph. No rule requires every agent node to run its own retry loop.

## Classical multi-agent systems: foundation and overlap

Multi-agent-systems (MAS) research — agent-oriented programming, BDI architectures, blackboards, FIPA protocols, game-theoretic coordination, and learned communication — is a direct foundation and substantial overlap, not a blanket nonexample. LLM-based agents add unusually general and language-mediated nodes, but do not erase that lineage. This repository emphasizes engineering roles, handoffs, verification, reliability, and cost while including relevant MAS work in [Research Foundations](README.md#research-foundations).

## One agent vs. a graph

The most important comparison, because the honest answer is often *one agent*. A single agent avoids explicit inter-agent handoff loss and coordination overhead, and it may be cheaper and easier to debug when the task fits one context and one competence. Single-agent tool use, a task dependency graph internal to one agent, and graph/tree-of-thought prompting do not meet this repository's minimum inclusion test by themselves.

A graph earns its overhead when at least one of these is true:

- **The work parallelizes** — independent subtasks that would serialize inside one context (research sweeps, per-file migrations, review panels).
- **Contexts must be isolated** — a judge that shouldn't see the draft's reasoning, a red team that shouldn't share the blue team's state, untrusted input quarantined at one node.
- **Specialization pays** — stable roles accumulate domain context that a generalist re-derives every run, or cheaper models handle worker nodes while a frontier model orchestrates.
- **The job outlives any context** — long-horizon work where shared artifacts and run lineage, not any single context window, are the system of record.

If none apply, build a better loop instead — and if you do build the graph, put evidence gates on its edges, because a graph without verification is error propagation at machine speed.
