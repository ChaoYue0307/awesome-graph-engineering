# Graph Engineering vs. Its Neighbors

The word "graph" is heavily overloaded. In AI-agent systems, **graph engineering** is also an emerging, non-standard label. The scope below connects established disciplines while identifying when a neighboring term is more precise.

## Five interacting engineering dimensions

Prompt, context, harness, loop, and graph engineering govern different concerns. They often interact and nest, but they are **not** a strict maturity sequence: a team can improve an edge contract without operating a persistent loop, or use a durable loop around one node inside a larger graph.

| Layer | Governs | You have a problem at this layer when… |
| --- | --- | --- |
| **Prompt engineering** | One model response | The model misunderstands the instruction |
| **Context engineering** | What the model can see | The model lacks (or drowns in) information |
| **Harness engineering** | One run's tools, permissions, isolation, checks | The agent can't act safely or verify locally |
| **Loop engineering** | A temporal control cycle: trigger → act → verify → retry or persist | Work recurs, needs feedback, or cannot finish reliably in one pass |
| **Graph engineering** | Relationships among multiple separately accountable agentic runtime instances | Coordination, isolation, specialization, or parallel work must be explicit and inspectable |

A loop is principally a temporal view; a graph is principally a relational view. A node may run a loop, but graph membership does not require every node to own one. The complementary loop field guide is [awesome-loop-engineering](https://github.com/ChaoYue0307/awesome-loop-engineering).

A system is in scope only when all three conditions hold:

1. It runs at least two separately accountable agentic runtime instances that can each make bounded execution decisions; instances may share a role or model.
2. Their coordination semantics are explicit — for example typed delegation, context or artifact transfer, verification, or escalation relationships.
3. The topology or policy that generates it is a load-bearing, inspectable system artifact.

## How loops and graphs compose

Loop engineering and graph engineering are complementary views, not competing labels. A loop explains how behavior changes across time; a graph explains how responsibility, information, control, and evidence move among bounded parts of a system.

| Composition pattern | Temporal loop | Relational graph | Concrete evidence |
| --- | --- | --- | --- |
| **Node-local loop** | One agent observes, acts, checks, and retries | The node still has bounded inputs, outputs, authority, and neighbors | One reliable agent loop may be sufficient when no coordination boundary is needed. |
| **Edge-gated repair** | A failed check sends work back for revision | The producer, verifier, acceptance rule, and repair edge are explicit | [VeriMAP](https://aclanthology.org/2026.eacl-long.353/) attaches verification functions to dependency-graph subtasks. |
| **Run-level orchestration** | A workflow can pause, retry, resume, or cycle | Agent, tool, function, join, and human-control nodes retain distinct semantics | [ADK for Go 2.0](https://developers.googleblog.com/announcing-adk-go-20/) documents cycles, retries, durable human input, state, and graph telemetry. |
| **Outer-loop evolution** | Execution evidence updates prompts, roles, routes, or topology across trials | The graph or its generating policy is the object being changed | [GPTSwarm](https://proceedings.mlr.press/v235/zhuge24a.html) and [EvoMAS](https://openreview.net/forum?id=ic0AGRIkmY) optimize inspectable agent-system structure from task feedback. |

Neither view implies the other. A single agent can run a sophisticated loop without forming an agent graph; a multi-agent DAG can execute once without a persistent improvement loop.

## Not graph data engineering (the name collision)

There is an established practice also called graph engineering: **building systems on graph-shaped data** — graph databases (Neo4j, Neptune), query languages (Cypher, GQL, SPARQL), graph analytics, GNNs, knowledge graphs, and GraphRAG. That is a *data* concern; the agent-system scope here is narrower. A knowledge graph or graph-shaped long-term memory can serve an agent organization as shared state, and an agent team can build or query such a graph. It does not, by itself, turn one agent into an agent graph. The test is the principal meaning of the nodes and edges: entities, events, memories, and their relationships belong to graph data or memory engineering; multiple independently scoped agents connected by load-bearing coordination may belong to graph engineering as defined here. A system may contain both and should name the two graphs separately. (GraphQL is neither — it is an API query language.)

## Org graph vs. run/work graph

Two **analytical views** separate standing authority from run-specific execution. They are not universal standards, and an implementation may store both in one runtime structure.

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

Multi-agent-systems (MAS) research — agent-oriented programming, BDI architectures, blackboards, FIPA protocols, game-theoretic coordination, and learned communication — is a direct foundation and substantial overlap, not a blanket nonexample. LLM-based agents add unusually general and language-mediated nodes, but do not erase that lineage. The catalog emphasizes engineering roles, handoffs, verification, reliability, and cost while including relevant MAS work in [Research Foundations](README.md#research-foundations).

## One agent vs. a graph

The most important comparison, because the appropriate answer is often *one agent*. A single agent avoids explicit inter-agent handoff loss and coordination overhead, and it may be cheaper and easier to debug when the task fits one context and one competence. Single-agent tool use, an internal task-dependency graph, and graph/tree-of-thought prompting do not meet the minimum inclusion test by themselves.

A graph earns its overhead when at least one of these is true:

- **The work parallelizes** — independent subtasks that would serialize inside one context (research sweeps, per-file migrations, review panels).
- **Contexts must be isolated** — a judge that shouldn't see the draft's reasoning, a red team that shouldn't share the blue team's state, untrusted input quarantined at one node.
- **Specialization pays** — stable roles accumulate domain context that a generalist re-derives every run, or cheaper models handle worker nodes while a frontier model orchestrates.
- **The job outlives any context** — long-horizon work where shared artifacts and run lineage, not any single context window, are the system of record.

If none apply, build a better loop instead — and if you do build the graph, put evidence gates on its edges, because a graph without verification is error propagation at machine speed.
