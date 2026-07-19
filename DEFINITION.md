# Graph Engineering: A Working Definition

> **Status:** *Graph engineering* is an emerging practitioner term, not a settled academic field or an agreed industry standard. This repository uses the following working definition so that its scope can be discussed, tested, and corrected in public.

**Graph engineering is the practice of specifying, executing, observing, and evolving a graph-structured agent system—its roles and runtime instances, the contracts that connect them, the state and artifacts they share, and the evidence by which their collective behavior is judged—so that the system can be controlled, tested, and improved as an engineered whole.**

The graph must be load-bearing rather than decorative: its declared topology, realized run graph, or graph-generating policy materially constrains execution and remains inspectable enough to version, trace, evaluate, or deliberately change.

An agent instance commonly contains a local observe–decide–act–check loop. At graph scale, the engineering question becomes relational: which bounded loop may inform, delegate to, monitor, constrain, or veto which other loop, and what evidence crosses that edge? Deterministic tests, audit cycles, human decisions, and external ground-truth anchors can therefore be control nodes or gates without becoming agents. Not every node needs its own retry loop.

Here, an **agentic runtime instance** is a separately accountable execution that can choose its next action, tool call, handoff, or stopping condition from observations and local state, within explicit authority and resource bounds. It need not use a unique model, persona, or prompt. A graph may be static or dynamic, centralized or decentralized, acyclic or cyclic; a DAG is one useful topology, not the definition.

## Scope

Graph engineering covers decisions that become necessary when several bounded agentic executions must behave as one system:

- role and capability boundaries, delegation, authority, and human participation;
- topology, routing, scheduling, fan-out and fan-in, cycles, and dynamic reconfiguration;
- typed handoffs, communication protocols, context boundaries, and evaluation gates;
- shared and isolated state, memory, artifacts, checkpoints, and ownership of writes;
- failure containment, retries, budgets, security, observability, latency, and cost; and
- evaluation and optimization of nodes, edges, and whole-system outcomes.

The repository focuses on AI-agent systems, especially systems built with generative models. It draws on broader multi-agent and distributed-systems research when that work supplies a directly useful coordination primitive. A system does not have to store its architecture in a graph database or render a diagram: the graph is the explicit, engineerable structure of relationships and execution.

## Core primitives

An executable system can be treated as a time-varying, directed, labeled graph. Implementations differ, but the following distinctions should remain visible.

| Primitive | Working meaning |
| --- | --- |
| **Role specification** | A reusable description of responsibility, capabilities, authority, policies, context boundaries, tools, and success criteria. A role is a design-time contract, not necessarily a live process. |
| **Runtime instance** | A concrete, separately traceable execution enacting a role for a run. One role may produce many instances, including parallel replicas; an instance has an identity, local state, budget, and lifecycle. |
| **Edge contract** | A directed relationship that governs delegation, control, communication, state access, artifact transfer, or evaluation. A useful edge defines its endpoints, trigger or guard, payload or artifact shape, completion evidence, and failure behavior. |
| **State and artifacts** | The mutable state and durable work products through which instances coordinate. Their ownership, provenance, visibility, version, isolation, and merge rules are part of the design. |
| **Topology and lifecycle** | Which nodes and edges exist, when they may run, and how they are spawned, joined, paused, retried, cancelled, replaced, or rewired. Topology is allowed to change during a run, but the change policy is itself engineered. |
| **Evidence and trace** | Tests, evaluator decisions, approvals, provenance, events, outputs, costs, and timings that explain why an edge fired and what an instance did. Evidence drives gates; a trace makes the realized graph inspectable and replayable where feasible. |

## Minimal three-part inclusion test

A system falls within this working definition only when all three conditions hold:

1. **Plural bounded agency:** it runs at least two separately accountable agentic instances, each able to make bounded execution decisions. They may share a role or model; they are more than deterministic transforms or repeated calls hidden inside one undifferentiated agent.
2. **Contracted coordination:** at least one explicit relationship governs how control, context, state, artifacts, or evaluation passes between instances, including the condition under which the relationship is used.
3. **Load-bearing, inspectable graph artifact:** a declared topology, realized run graph, or graph-generating policy materially constrains execution and can be versioned, traced, evaluated, or deliberately changed. A post-hoc diagram alone does not qualify.

This is a test for systems, not a reason to discard foundational literature. The collection may include a workflow substrate, protocol, or classic architecture that contributes one of these primitives even when that resource does not implement a complete modern agent graph by itself.

## Evidence map for the synthesis

No single paper, framework, or social post defines this repository's use of *graph engineering*. The definition is a cautious synthesis: the sources below establish independently observable parts of the design space, while the final column states the repository's inference. This separation matters because a source can support a primitive without using the emerging label.

| Boundary claim | Independent evidence | Repository inference and limit |
| --- | --- | --- |
| **Principal adaptive nodes must be genuinely agentic.** | [Shoham's agent-oriented programming framework](https://doi.org/10.1016/0004-3702(93)90034-9) makes agents programmable entities with explicit state and communication; [Wooldridge and Jennings](https://doi.org/10.1017/S0269888900008122) distinguish autonomous agents from ordinary software components. | Separate accountability and bounded choice—not a box in a diagram—make something an agent node. Deterministic functions, tests, and humans may still participate as non-agent nodes or gates. |
| **Topology is an engineering variable, not presentation.** | [DyLAN](https://openreview.net/forum?id=XII0Wp1XA9) constructs task-dependent agent networks; [GPTSwarm](https://proceedings.mlr.press/v235/zhuge24a.html) represents language-agent systems as optimizable graphs; [G-Designer](https://proceedings.mlr.press/v267/zhang25cu.html) and [AFlow](https://openreview.net/forum?id=z5uVAKwmjf) search communication topologies and workflows. | Static and dynamic graphs are both valid, but the topology or generating policy must materially influence execution and be open to deliberate evaluation or change. These studies do not prove that learned topology is always better. |
| **Edges require semantics and cost discipline.** | [TarMAC](https://proceedings.mlr.press/v97/das19a.html) learns recipient-aware communication; the [A2A specification](https://a2a-protocol.org/latest/specification/) defines discovery, task, message, artifact, and update semantics; the [MCP specification](https://modelcontextprotocol.io/specification/latest) defines tool and context exchange boundaries. | An edge should specify trigger, allowed payload or artifact, ownership transfer, acceptance evidence, and failure behavior. A2A, MCP, and in-process handoffs solve different edge problems; none is a complete graph architecture by itself. |
| **Shared state and artifacts are architectural, not prompt residue.** | [Nii's blackboard model](https://doi.org/10.1609/aimag.v7i2.537) coordinates independent specialists through shared problem state; [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence) exposes checkpoints, replay, and state inspection; [OpenAI Agents SDK sessions](https://openai.github.io/openai-agents-python/sessions/) documents bounded persistent conversation state. | Ownership, provenance, visibility, isolation, checkpoint, and merge rules belong in the graph design. Official documentation establishes intended mechanisms, not independent proof that an implementation is reliable. |
| **Independent, grounded evidence must control consequential edges.** | [CRITIC](https://proceedings.iclr.cc/paper_files/paper/2024/hash/fef126561bbf9d4467dbb8d27334b8fe-Abstract-Conference.html) improves critique using external tools; [Huang et al.](https://proceedings.iclr.cc/paper_files/paper/2024/hash/8b4add8b0aa8749d80a34ca5d941c355-Abstract-Conference.html) show that intrinsic self-correction can fail or regress; [Perez's practitioner essay](https://x.com/IntuitMachine/status/2078419526354378975) argues for independent counter-metrics, frozen rules, and reality anchors. | Another agent's opinion is not automatically evidence. Prefer executable tests, external observations, held-out evaluation, provenance, or appropriately independent human judgment. Perez supplies useful contemporary language, not the sole authority for this rule. |
| **A graph is an operated system across time.** | [Dapr Agents](https://docs.dapr.io/developing-ai/dapr-agents/dapr-agents-introduction/) combines agents with durable actors and workflows; [Temporal's Agents SDK integration](https://github.com/temporalio/sdk-python/tree/main/temporalio/contrib/openai_agents) supplies replay and recovery; [OpenAI tracing](https://openai.github.io/openai-agents-python/tracing/) and [OpenTelemetry GenAI conventions](https://github.com/open-telemetry/semantic-conventions-genai) expose node and edge behavior. | Retry, resume, cancellation, tracing, lineage, latency, token cost, and escalation are part of graph engineering rather than post-launch add-ons. These operational interfaces must still be evaluated in the deployment context. |
| **More nodes are not presumptively better.** | [MultiAgentBench](https://aclanthology.org/2025.acl-long.421/) measures collaboration processes; [Why Do Multi-Agent LLM Systems Fail?](https://nips.cc/virtual/2025/poster/121528) classifies coordination failures; controlled studies on [agent-system scaling](https://arxiv.org/abs/2512.08296) and [equal-token single-versus-multi-agent reasoning](https://arxiv.org/abs/2604.02460) test when coordination helps or hurts. | The correct baseline is the smallest reliable system under comparable quality, latency, and token budgets. A graph must earn its coordination overhead; the repository includes negative results to resist graph-by-default advocacy. |

Taken together, these sources support the primitives and boundary tests. They do **not** establish that *graph engineering* is a standardized field name, that all agent systems should be graphs, or that this taxonomy is the only valid one. Source types and selection rules are documented in [METHODOLOGY.md](METHODOLOGY.md).

## Two complementary analytical views

“Agent-organization graph” and “run/work graph” are projections of the same system, not claims that every implementation maintains two literal graph objects.

| View | Typical nodes | Typical edges | Main question | Timescale |
| --- | --- | --- | --- | --- |
| **Agent-organization graph** | Role specifications or standing agent identities | Authority, delegation, allowed communication, review, and escalation | Who may do what, with whom? | Relatively stable and versioned across runs |
| **Run/work graph** | Runtime instances, task units, decisions, and produced artifacts | Concrete dependencies, handoffs, events, evidence, and state transitions | What must happen—or did happen—in this run? | Created or realized for a particular objective |

The mapping is many-to-many: one role can spawn several runtime instances, one work item can pass through several roles, and a dynamic system can revise the run graph without changing the standing organization. Keeping the views separate prevents an org chart from being mistaken for an execution trace and prevents one successful trace from being mistaken for the durable design.

## Relationship to prompts, context, harnesses, and loops

These are interacting design dimensions, not a universal maturity ladder:

- **Prompt engineering** shapes an instruction or policy at a model invocation or node.
- **Context engineering** determines what observations, memory, state, and artifacts an instance can see; edge contracts determine much of what crosses those boundaries.
- **Harness engineering** supplies the runtime, tools, permissions, isolation, interfaces, checks, and telemetry that make nodes and edges executable.
- **Loop engineering** governs iteration, feedback, retry, and stopping. A loop can live inside one instance or appear as a cycle across several instances.
- **Graph engineering** governs the relationships among roles, instances, operations, and evidence across the collective system.

A graph does not replace prompts, context, harnesses, or loops. Changing an edge can change a node's context; a harness enforces edge and lifecycle contracts; loops may traverse graph cycles; and weak instructions or evaluation evidence can still make a sophisticated topology fail.

## Boundaries and non-examples

- **Graph data engineering is different.** Graph databases, knowledge graphs, graph neural networks, and GraphRAG organize or compute over connected data. They enter scope only when they directly support the coordination or execution of an agent graph. See [COMPARISON.md](COMPARISON.md).
- **A single agent with many tools is not yet an agent graph.** Its tool-call trace may be graph-shaped, but it does not satisfy plural bounded agency.
- **A deterministic workflow DAG is a substrate, not automatically graph engineering.** It can host an agent graph, but ordinary steps with no bounded agency do not become agents because they are drawn as nodes.
- **An open group chat of personas is insufficient.** Names and messages do not substitute for edge contracts, authority boundaries, lifecycle rules, or attributable evidence.
- **A static org chart or post-hoc visualization is insufficient.** A diagram that neither constrains execution nor supports diagnosis does not make the underlying system graph-engineered.
- **More agents are not inherently better.** If one bounded agent can achieve the objective more reliably and cheaply, adding a graph is unnecessary complexity.

## Lineage, without an origin myth

This agent-system use of the label is currently emerging; the underlying ideas are not. The definition is a synthesis of overlapping traditions, not a claim that one post or framework created a new field.

- **Blackboard architectures:** Erman and Lesser's [1975 HEARSAY-II organization](https://www.ijcai.org/Proceedings/75/Papers/072.pdf) coordinated diverse knowledge sources through shared state, and Nii's [1986 account of the blackboard model](https://doi.org/10.1609/aimag.v7i2.537) documented the architecture and its evolution.
- **Distributed AI and multi-agent systems:** Durfee, Lesser, and Corkill's [1989 survey of cooperative distributed problem solving](https://doi.org/10.1109/69.43404) examined coordination among loosely coupled problem-solving nodes, while Wooldridge and Jennings' [1995 review](https://www.cs.ox.ac.uk/people/michael.wooldridge/pubs/ker95/ker95-html.html) organized core questions about agent theory, architectures, and languages.
- **Agent-oriented programming:** Shoham's [1993 AOP framework](https://doi.org/10.1016/0004-3702(93)90034-9) treated agents as programmed entities with explicit state and communication primitives.
- **LLM-powered dynamic networks:** [DyLAN](https://arxiv.org/abs/2310.02170) (2023) selected teams and dynamic communication structures for tasks; [GPTSwarm](https://arxiv.org/abs/2402.16823) (2024) represented language-agent systems as optimizable computational graphs and optimized both nodes and connectivity.
- **Recent conversation markers:** in a brief [18 July 2026 post](https://x.com/steipete/status/2078277297791189132), Peter Steinberger asked, “Are we still talking loops or did we shift to graphs yet?” [Carlos E. Perez’s response essay](https://x.com/IntuitMachine/status/2078419526354378975) interpreted the shift as *loop architecture*: improvement loops connected by monitoring, constraint, veto, and audit edges, grounded by independent measurements, frozen rules, and human-chosen root objectives. This repository adopts those control principles while focusing its core scope on AI-agent organizations. Neither post supplies a consensus definition or originates graph-based agent coordination.

This repository uses *graph engineering* as a practical umbrella for that design space. [TAXONOMY.md](TAXONOMY.md) operationalizes the scope; [METHODOLOGY.md](METHODOLOGY.md) explains how resources are selected and labeled.
