# Contributing

Thanks for helping make this the most useful map of graph engineering. Contributions of every size are welcome — a fixed typo, a corrected project status, or a new resource.

## What belongs here

A resource qualifies when it helps someone **design, run, verify, or understand AI-agent organizations as graphs** — the discipline above loop engineering. That includes orchestration frameworks and SDKs, topology and coordination research, org design and role patterns, handoff protocols (MCP, A2A), work-graph planning, shared state and memory, verification gates, failure and reliability engineering, observability and cost, benchmarks, production case studies, the classic multi-agent and distributed-systems foundations, and serious critiques of all of the above.

A resource does not qualify when it is:

- **Graph data engineering** — graph databases, GNNs, knowledge-graph construction, or GraphRAG-as-document-retrieval; that is a different field sharing the name (see [COMPARISON.md](COMPARISON.md)). Exception: graph-shaped memory infrastructure serving agent organizations.
- Single-agent content with no organizational angle (belongs in [awesome-loop-engineering](https://github.com/ChaoYue0307/awesome-loop-engineering))
- Marketing copy with no technical substance, or a thin listicle rewrite of primary sources
- A deterministic workflow tool with no agency at the nodes, unless it serves as an agent-graph substrate
- Abandoned software with no historical significance

Quality bar: **every entry must be something a practitioner would thank you for.** Prefer primary sources (official docs, the original paper, the first-party engineering blog) over aggregators.

## Entry format

Resources live in `README.md` tables and in `data/resources.csv` + `data/resources.jsonl`. A README row looks like:

```markdown
| 🧰 **[Resource Name](https://example.com/)**<br><sub>Tool</sub> | **example.com**<br><sub>Author or Org</sub> | One to two sentences stating the concrete contribution — what it does, why it matters, distinctive facts. No marketing fluff. | **Maintained OSS project**<br><sub>Check repository activity and license</sub> |
```

Rules:

1. **Type marker** — pick one: 📄 Paper · 📝 Blog · 📚 Docs · 🧰 Tool · 🧪 Benchmark · 🗃️ Dataset · 📕 Book · 🎓 Course · 🎬 Video · 🧭 List · 📐 Standard · ⚠️ Critique
2. **Canonical URL** — arXiv abstract page for papers, official docs or repo for tools, publisher page for books. No trackers, no affiliate links, no paywalled mirrors when an open canonical version exists.
3. **Description** — 1–2 sentences, concrete and specific. State what it is and what makes it distinctive (scale numbers, dates, architectural approach). Write in plain language.
4. **Evidence label** — one of: Peer-reviewed research · Research preprint · Practitioner analysis · Official documentation · Maintained OSS project · Industry standard · Benchmark/dataset · Book/course · Community resource
5. **Status honesty** — if a project is archived, discontinued, or absorbed, say so in the description. Only include dead projects when they are historically seminal.

## How to contribute

1. **Small fix** (typo, dead link, status change): edit `README.md` directly and open a PR.
2. **New resource**: add the row to the right README section **and** append a matching record to `data/resources.csv` and `data/resources.jsonl`, then run `python3 scripts/validate.py` locally. One resource per PR is easiest to review; batches are fine if they are all in one section.
3. **New section or structural change**: open an issue or discussion first so we can agree on the shape.

### PR checklist

- [ ] The entry follows the format above (marker, canonical URL, concrete description, evidence label)
- [ ] The URL loads and is the canonical source
- [ ] `data/resources.csv` and `data/resources.jsonl` updated for added/removed resources
- [ ] `python3 scripts/validate.py` passes
- [ ] No duplicate of an existing entry (search the README first)

CI runs markdownlint, data validation, and a link check on every PR.

## Removing resources

Removal PRs are as valuable as addition PRs. Grounds for removal: link rot with no canonical replacement, the project died without historical significance, or the content aged into being misleading. State the reason in the PR description.

## License

By contributing, you agree that your contributions are released under [CC0-1.0](LICENSE), the same license as the rest of the repository.
