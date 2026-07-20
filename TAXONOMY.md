# The Nine Layers of Graph Engineering

Nine design lenses organize decisions and resources for AI-agent organizations. They are not a maturity ladder, and a system need not implement all nine. Every resource in the [README](README.md) and [Resource Atlas](https://chaoyue0307.github.io/awesome-graph-engineering/#atlas) maps to one primary layer.

| # | Layer | The question it answers | Design concerns |
| --- | --- | --- | --- |
| 1 | **Roles** | Who exists, and what does each own? | Node specialization, capability boundaries, context ownership, model-tier staffing (frontier orchestrator, cheaper workers) |
| 2 | **Topology** | How are the roles arranged? | Pipelines, orchestrator–worker, councils and debate, hierarchies, meshes; matching shape to task |
| 3 | **Handoffs** | What crosses each edge, and in what shape? | Edge contracts, structured outputs, artifact vs message passing, protocols (MCP, A2A), context quarantine |
| 4 | **Work graphs** | What structure does this run need, right now? | Task decomposition, DAG generation, routers, fan-out/fan-in, dynamic spawning and cancellation |
| 5 | **State** | What do nodes share, and what must stay isolated? | Blackboards and shared memory, artifact stores, checkpointing, worktree isolation, write conflicts |
| 6 | **Gates** | Where does evidence decide instead of vibes? | Judge nodes, quorum votes, anti-groupthink checks, tests and CI as oracles between stages |
| 7 | **Reliability** | What happens when a node fails mid-graph? | Error cascades, retries and budgets, resume/replay, kill switches, human escalation as a node |
| 8 | **Observability & cost** | Can you see the graph, and can you afford it? | Trace views, token economics per node, critical-path latency, cost-per-outcome |
| 9 | **Evolution** | When does the graph redesign itself? | Dynamic agent orgs, topology search and optimization, learned communication structures |

## How to use the taxonomy

- **Placing a system**: qualification requires multiple independently scoped agent roles or instances, explicit coordination semantics, and an inspectable artifact recording the topology or generating policy. Start with the layers implicated by the task; add others when observed failure modes demand them. Treat layer 9 as a research frontier rather than settled practice.
- **Placing a decision**: architecture arguments are usually one layer masquerading as another. "Which framework?" (topology) is often really "what are our edge contracts?" (handoffs) or "who pays for the tokens?" (cost). Naming the layer keeps the argument honest.
- **Placing a resource**: most resources serve one primary layer; cross-cutting material (surveys, case studies, courses) is tagged by the layer it teaches best.

## Boundary notes

- **Org graph and run/work graph are analytical views, not proposed universal standards.** The org view emphasizes reusable roles, standing permissions, and durable coordination policy; the run/work view emphasizes the task instances, dependencies, and lineage created for one execution. A runtime may store both in one structure. Separating the views is useful because they often change on different timescales and for different reasons.
- **Layer 6 makes a graph evidence-bearing.** Gates may be deterministic tests, agent judges, human approval, or combinations of them. Without checks at consequential boundaries, each handoff can propagate an unverified claim at machine speed.
- **You do not need all nine.** A declared pipeline of three independently scoped roles with typed handoffs is already a qualifying graph; a deterministic test or judge can make it safer without changing that boundary. Add layers when the failure modes demand them, not before.
