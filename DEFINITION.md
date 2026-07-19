# Graph Engineering: Working Definition

**Graph engineering is the discipline of designing AI-agent organizations as programmable structures.** Where loop engineering makes one agent's behavior programmable — trigger, act, verify, retry, persist — graph engineering makes the *organization of agents* programmable: which agents exist, what each is for, how work and context flow between them, where results get verified, and how the structure itself changes as evidence arrives.

The primitives:

- **Nodes are agents, and every serious node runs its own loop.** A graph is not an alternative to loops; it is what you build once you have loops worth coordinating.
- **Edges are designed dependencies** — handoffs, data flows, verification gates, escalations. An edge is a contract: what crosses it, in what shape, and what must be true before it fires.
- **Two graphs run at once.** The **org graph** is stable and long-lived: named roles with capability boundaries and accumulated context — it answers *who*. The **work graph** is ephemeral: the task structure generated for this job, whose edges split, merge, reorder, and disappear at runtime — it answers *what, right now*.
- **A dynamic agent org** is the far end of the practice: a system that rewrites its own work graph — spawning, cancelling, and rewiring nodes — based on evidence rather than a fixed plan.

## Where it sits

Each layer of the stack governs a larger unit of behavior:

| Layer | Governs | Unit |
| --- | --- | --- |
| Prompt engineering | One model response | The instruction |
| Context engineering | What the model can see | The window |
| Harness engineering | One run's tools, permissions, checks | The run |
| Loop engineering | One agent across runs | The loop |
| **Graph engineering** | **Many agents as one system** | **The organization** |

## The minimal test

A system is a graph engineering system when all four hold:

1. **Multiple agent nodes with distinct roles and contexts** — not one agent with many tools, and not the same prompt copy-pasted N times.
2. **Explicit, designed edges.** Who hands off to whom, in what format, under what condition, is decided by an engineer (or an engineered generator) — not left to an open group chat.
3. **Nodes run loops.** Each node can act, check its work, and retry within its own budget; the graph coordinates loops rather than replacing them.
4. **The structure is an artifact.** The topology can be reviewed, versioned, observed in traces, and changed deliberately — including by the system itself, if you have earned that.

## What it is not

- **Not graph data engineering.** Graph databases, GNNs, knowledge graphs, and GraphRAG belong to a different discipline that shares the name — see [COMPARISON.md](COMPARISON.md) for the full disambiguation. A knowledge graph may *serve* an agent org as memory, but storing connected data is not organizing agents.
- **Not a workflow DAG with model calls in it.** A pipeline whose steps cannot act, verify, or retry on their own is orchestration, not an organization. The difference is agency at the nodes.
- **Not an org chart of personas.** Naming nodes "CEO agent" and "engineer agent" does nothing. Roles earn their place through capability boundaries, dedicated context, and edges that carry real contracts.
- **Not always the answer.** A single agent with one long context beats a badly designed committee, and the token bill for a graph can run many times a solo run. The critiques are collected in the [README](README.md#critiques-and-limits) — read them before you build.

## Lineage

None of the mechanics are new — supervisors and workers, blackboard systems, and the actor model predate the label by decades, and practitioners were wiring sub-agents together well before July 2026. What changed is the accessibility layer: models reliable enough to run as autonomous nodes, frameworks mature enough to wire them together, and a shared vocabulary — org graph, work graph, dynamic agent org — for the layer above the loop. The taxonomy that operationalizes this definition is in [TAXONOMY.md](TAXONOMY.md).
