# Translation hub

Awesome Graph Engineering uses **localized front doors with one canonical English
corpus**. This gives readers a trustworthy introduction in their language without
creating seven drifting copies of the generated resource catalog.

## Available introductions

| Language | Locale | Status | Localized guide |
| --- | --- | --- | --- |
| English | `en` | Canonical | [README](../README.md) |
| 简体中文 | `zh-Hans` | Initial editorial translation; review welcome | [阅读](zh-Hans/README.md) |
| Español | `es` | Initial editorial translation; review welcome | [Leer](es/README.md) |
| Français | `fr` | Initial editorial translation; review welcome | [Lire](fr/README.md) |
| Deutsch | `de` | Initial editorial translation; review welcome | [Lesen](de/README.md) |
| 日本語 | `ja` | Initial editorial translation; review welcome | [読む](ja/README.md) |
| 한국어 | `ko` | Initial editorial translation; review welcome | [읽기](ko/README.md) |
| Português (Brasil) | `pt-BR` | Initial editorial translation; review welcome | [Ler](pt-BR/README.md) |

The [interactive website](https://chaoyue0307.github.io/awesome-graph-engineering/)
also localizes its launch view through the language selector. Resource titles,
authors, venues, URLs, and canonical dataset fields remain in English.

## What each translation covers

Every published introduction must preserve these load-bearing ideas:

1. Graph engineering is an **emerging working term**, not a settled academic field
   or accepted industry standard.
2. The repository is about graph-structured **AI-agent systems**, not general graph
   databases, knowledge graphs, GNNs, GraphRAG, charts, or diagrams.
3. In-scope systems need multiple bounded agent nodes, explicit coordination
   semantics, and an inspectable graph artifact that materially constrains execution.
4. An org graph and a run/work graph are complementary analytical views, not claimed
   universal standards.
5. Adding agents is not automatically an improvement; the graph must justify its
   coordination cost against a smaller reliable alternative.
6. The author name **He Chaoyue**, citation key, URLs, code, dataset identifiers, and
   original paper or project titles must remain unchanged.

See [`glossary.yml`](glossary.yml) for preferred terminology and
[`manifest.yml`](manifest.yml) for the machine-readable locale inventory.

## Translation workflow

1. Open a translation issue or a focused pull request. Use one locale per PR when
   possible.
2. Start from the English working definition, minimum test, boundaries, primitives,
   and reader pathways. Do not duplicate the generated resource tables.
3. Keep research and project titles in their original language. An informal
   translation may follow in parentheses when it helps readers.
4. Check every technical term against the glossary. Translate by meaning—especially
   “load-bearing,” which means *materially constrains execution*.
5. Request review from a native-language reader and a reviewer familiar with agent
   systems. Until both happen, retain the initial-translation notice.
6. Run Markdown and link checks, then note the English source date in
   [`manifest.yml`](manifest.yml).

Machine translation can seed a draft, but it must not silently overwrite a reviewed
translation. A shorter accurate guide is preferable to a complete but misleading one.

## Next languages

Traditional Chinese, Arabic, Hindi, Italian, and Russian are welcome once a native
technical reviewer volunteers. Open a
[translation request](https://github.com/ChaoYue0307/awesome-graph-engineering/issues/new?template=translation.yml)
to coordinate ownership and terminology before translating the full guide.
