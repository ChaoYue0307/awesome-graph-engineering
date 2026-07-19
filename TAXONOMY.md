# The Nine Layers of Graph Engineering

Nine design layers, from naming your first two roles to running an organization that redesigns itself. Every resource in the [README](README.md) and the [Resource Atlas](https://chaoyue0307.github.io/awesome-graph-engineering/#atlas) maps onto these layers.

| # | Layer | The question it answers | Design concerns |
| --- | --- | --- | --- |
| 1 | **Roles** | Who exists, and what does each own? | Node specialization, capability boundaries, context ownership, model-tier staffing (frontier orchestrator, cheaper workers) |
| 2 | **Topology** | How are the roles arranged? | Pipelines, orchestrator–worker, councils and debate, hierarchies, meshes; matching shape to task |
| 3 | **Handoffs** | What crosses each edge, and in what shape? | Edge contracts, structured outputs, artifact vs message passing, protocols (MCP, A2A), context quarantine |
| 4 | **Work graphs** | What structure does this job need, right now? | Task decomposition, DAG generation, routers, fan-out/fan-in, dynamic spawning and cancellation |
| 5 | **State** | What do nodes share, and what must stay isolated? | Blackboards and shared memory, artifact stores, checkpointing, worktree isolation, write conflicts |
| 6 | **Gates** | Where does evidence decide instead of vibes? | Judge nodes, quorum votes, anti-groupthink checks, tests and CI as oracles between stages |
| 7 | **Reliability** | What happens when a node fails mid-graph? | Error cascades, retries and budgets, resume/replay, kill switches, human escalation as a node |
| 8 | **Observability & cost** | Can you see the graph, and can you afford it? | Trace views, token economics per node, critical-path latency, cost-per-outcome |
| 9 | **Evolution** | When does the graph redesign itself? | Dynamic agent orgs, topology search and optimization, learned communication structures |

## How to use the taxonomy

- **Placing yourself**: layers 1–3 are where everyone starts — most teams' first graph is two roles and one handoff. Layers 4–6 make graphs do real work. Layers 7–8 make them survivable in production. Layer 9 is the frontier; treat resources there as promising rather than settled.
- **Placing a decision**: architecture arguments are usually one layer masquerading as another. "Which framework?" (topology) is often really "what are our edge contracts?" (handoffs) or "who pays for the tokens?" (cost). Naming the layer keeps the argument honest.
- **Placing a resource**: most resources serve one primary layer; cross-cutting material (surveys, case studies, courses) is tagged by the layer it teaches best.

## Boundary notes

- **Layers 1–2 are the org graph; layer 4 is the work graph.** Keeping the stable *who* separate from the ephemeral *what* is the single most useful distinction in the discipline — they change on different timescales and for different reasons.
- **Layer 6 is where graphs earn their keep.** Without evidence gates between nodes, a graph is a rumor mill with extra steps: each handoff propagates unverified claims at machine speed.
- **You do not need all nine.** A pipeline of three roles with typed handoffs and one judge node is a complete, respectable graph. Add layers when the failure modes demand them, not before.
