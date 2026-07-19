# Graph Engineering vs. Its Neighbors

The word "graph" is badly overloaded, and the discipline sits on top of four older ones. These are the boundaries that cause real confusion, with honest guidance on when the neighbor is the right choice.

## The engineering stack: prompt → context → harness → loop → graph

Five layers, each governing a larger unit of behavior. You climb them in order — a graph built on weak loops fails at every edge.

| Layer | Governs | You have a problem at this layer when… |
| --- | --- | --- |
| **Prompt engineering** | One model response | The model misunderstands the instruction |
| **Context engineering** | What the model can see | The model lacks (or drowns in) information |
| **Harness engineering** | One run's tools, permissions, isolation, checks | The agent can't act safely or verify locally |
| **Loop engineering** | One agent across runs: trigger → act → verify → retry → persist | Work recurs and single runs don't finish it |
| **Graph engineering** | Many agents as one organization | One loop can't hold the whole job — or you're paying frontier prices for work a cheaper specialist could own |

Loops made agent behavior programmable. Graphs make agent *organizations* programmable. The loop layer has its own field guide: [awesome-loop-engineering](https://github.com/ChaoYue0307/awesome-loop-engineering).

## Not graph data engineering (the name collision)

There is an established discipline also called graph engineering: **building systems on graph-shaped data** — graph databases (Neo4j, Neptune), query languages (Cypher, GQL, SPARQL), graph analytics, GNNs, knowledge graphs, and GraphRAG. That is a *data* discipline; this list covers an *organizational* one. The overlap is real but narrow: a knowledge graph can serve an agent org as shared memory (Graphiti, Zep), and an agent team can build knowledge graphs. The test: if the nodes are *data entities*, you're in graph data engineering; if the nodes are *agents doing work*, you're here. (And GraphQL is neither — it's an API query protocol.)

## Org graph vs. work graph

The two graphs inside every serious system, running on different timescales:

| | Org graph | Work graph |
| --- | --- | --- |
| Lifetime | Months — survives across jobs | Minutes to hours — one job |
| Nodes | Stable roles with accumulated context ("Security owns auth") | Task instances, spawned and cancelled at runtime |
| Edges | Standing dependencies and ownership boundaries | This job's actual data flow — splits, merges, reorders |
| Changes when | The team learns something about the *domain* | Evidence arrives about the *task* |
| Answers | Who? | What, right now? |

Conflating them is the root of several anti-patterns: redesigning stable roles every run, or freezing a task plan that should have adapted. See [ANTI-PATTERNS.md](ANTI-PATTERNS.md).

## Not workflow orchestration (Airflow, Temporal, BPMN)

Classical orchestrators run DAGs of deterministic steps; they are superb at scheduling, retries, and durable state, and terrible at judgment. The difference is **agency at the nodes**: an agent node can interpret its task, act, check its own work, and retry with a different approach — a workflow step just executes. The two compose rather than compete: durable-execution runtimes (Temporal, Inngest, Restate) increasingly serve as the *substrate* under agent graphs, handling replay and persistence while agents handle judgment. If every node in your design is deterministic, you want an orchestrator, not an agent org — it will be faster, cheaper, and debuggable.

## Not classical multi-agent systems (the academic field)

MAS research — actor model, BDI architectures, FIPA protocols, game-theoretic coordination — worked out much of the theory decades ago, and the best of it transfers (supervision trees, blackboard architectures, communication cost models). What changed is the node: an LLM agent is a general-purpose worker you *staff* rather than an algorithm you specify, which moves the discipline's center of gravity from protocol theory to organization design — roles, handoffs, verification, and cost. The classics are in [Research Foundations](README.md#research-foundations); skipping them means rediscovering their failure modes at token prices.

## One agent vs. a graph

The most important comparison, because the honest answer is often *one agent*. A single agent with a long context window shares everything with itself for free — no handoff loss, no coordination overhead, no multiplied token bill. Cognition's "Don't Build Multi-Agents" makes this case well, and it wins whenever the task fits one context and one competence.

A graph earns its overhead when at least one of these is true:

- **The work parallelizes** — independent subtasks that would serialize inside one context (research sweeps, per-file migrations, review panels).
- **Contexts must be isolated** — a judge that shouldn't see the draft's reasoning, a red team that shouldn't share the blue team's state, untrusted input quarantined at one node.
- **Specialization pays** — stable roles accumulate domain context that a generalist re-derives every run, or cheaper models handle worker nodes while a frontier model orchestrates.
- **The job outlives any context** — long-horizon work where the graph's state, not any single window, is the system of record.

If none apply, build a better loop instead — and if you do build the graph, put evidence gates on its edges, because a graph without verification is error propagation at machine speed.
