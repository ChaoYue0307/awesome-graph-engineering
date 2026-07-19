# Graph Engineering Anti-Patterns

Fourteen recurring ways agent organizations fail, each with the symptom that reveals it and the corrective move.

## Org design

### 1. Org-chart cosplay

**Symptom:** nodes named "CEO agent," "CTO agent," "engineer agent" — with identical prompts, identical tools, and no capability boundaries. The titles do nothing.
**Move:** a role earns its node through independent scope — a distinct goal, responsibility, context boundary, or authority — plus explicit relationships to other nodes. Not every dimension must differ, but a title alone is not scope. Record the roles and edge policy in an inspectable artifact rather than leaving the organization implicit in prompts.

### 2. Multi-agent when one context would win

**Symptom:** a committee of five agents relays partial summaries to each other to solve a task that fits comfortably in one model's context window — slower, costlier, and lossier than a single loop.
**Move:** apply the [one-agent-vs-graph test](COMPARISON.md#one-agent-vs-a-graph) before designing any topology. Parallelism, isolation, specialization, or horizon — no box checked, no graph.

### 3. Demo-topology worship

**Symptom:** the architecture is a diagram someone shipped in a viral post — a council of 18 personas, a "society" of specialists — adopted for its aesthetics, with no argument from the task's shape.
**Move:** derive topology from the work graph the task actually needs: what parallelizes, what must be isolated, where evidence gates belong. Start with the smallest graph that models the job; grow it when failure modes demand.

### 4. Frontier models on worker tickets

**Symptom:** every node runs the most expensive model available; the token bill is a multiple of single-agent cost with no quality gain on the routine nodes.
**Move:** staff nodes like a team: frontier model where judgment concentrates (orchestrator, judge), cheaper models where tasks are well-specified (workers). Measure quality-per-dollar per node, not per system.

## Edges and handoffs

### 5. Vibes-based handoffs

**Symptom:** nodes pass free-form prose to each other; downstream agents misparse upstream conclusions; nobody can say what a "done" handoff contains.
**Move:** every edge gets a contract — structured output schema, required evidence fields, and a defined failure shape. Artifacts (files, diffs, reports) beat chat transcripts as edge payloads.

### 6. Context leakage across edges

**Symptom:** the judge saw the draft's reasoning and rubber-stamps it; the red team inherited the blue team's assumptions; untrusted input from one node's web fetch steers a privileged node downstream.
**Move:** isolation is a design decision per edge, not a default. Decide deliberately what crosses: conclusions but not reasoning, data but not instructions, evidence but not access.

### 7. The telephone-game pipeline

**Symptom:** five sequential summarize-and-forward hops; each loses 20% of the signal; the final node acts on a rumor of the original task.
**Move:** shorten chains; pass source artifacts alongside summaries so any node can re-ground; let deep nodes read the original brief, not just their predecessor's digest.

## Work graphs and state

### 8. Static plan, dynamic world

**Symptom:** the work graph was fixed at kickoff; halfway through, evidence shows the decomposition was wrong, and agents keep executing the obsolete plan to completion.
**Move:** make re-planning a first-class operation. Cheap checkpoints ("does the plan still fit the evidence?") gate each phase; the orchestrator may cancel, respawn, and rewire the run/work graph within enforced budgets. That authority does not imply permission to rewrite standing org roles or access policy.

### 9. Unbounded spawning

**Symptom:** an orchestrator that can create sub-agents creates sub-agents that create sub-agents; the fleet grows until the budget, the rate limit, or the on-call engineer stops it.
**Move:** hard caps as infrastructure, not prompt suggestions: max depth, max fan-out, max total nodes, max spend — enforced by the harness with a kill switch a human can reach.

### 10. Shared-state free-for-all

**Symptom:** two agents write the same file; a third reads a half-updated blackboard; the graph's "shared memory" is a race condition with a token bill.
**Move:** single-writer ownership per artifact, worktree or namespace isolation for parallel workers, and merges as explicit nodes — the same discipline distributed systems learned, at agent granularity.

## Verification

### 11. The rumor mill

**Symptom:** no evidence gates anywhere; each node trusts its upstream completely; one early hallucination compounds through every downstream hop and ships with confidence.
**Move:** add gates at the edges that matter most: deterministic oracles (tests, builds, schema checks) where possible, agent judges where judgment is required, human approval where stakes demand it, and quorum where a single judge would be gamed. Gates do not all need to be agents. A graph without verification propagates errors at machine speed.

### 12. Consensus theater

**Symptom:** a council of agents "debates" and converges instantly — same base model, same context, same conclusion, sycophancy compounding into false confidence.
**Move:** engineered disagreement: distinct lenses per judge (correctness, security, cost), refuter roles with a mandate to kill claims, information withheld asymmetrically, and votes counted only when dissent was possible.

## Operations

### 13. The invisible graph

**Symptom:** a run fails and nobody can say which node, which edge, or which handoff — the only artifact is a bill and a wrong answer.
**Move:** trace the graph as a graph: per-node spans, edge payloads recorded, cost and latency per node, and replayable state. If you cannot see the topology in your traces, you do not operate it — it operates you.

### 14. Cascade-blind failure handling

**Symptom:** one node times out; its dependents receive nothing, hallucinate a substitute, and the graph "completes successfully" with fabricated inputs in its lineage.
**Move:** partial failure is the default case, not the exception: explicit failure shapes on every edge, dependents that block or degrade deliberately, resumable checkpoints, and human escalation wired as an explicit, reachable control path with a real pager.
