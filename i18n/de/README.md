<p align="center">
  <a href="https://chaoyue0307.github.io/awesome-graph-engineering/de/">
    <img src="../../assets/logo.svg" width="112" alt="Logo von Awesome Graph Engineering">
  </a>
</p>

<h1 align="center">Awesome Graph Engineering</h1>

<p align="center">
  <strong>Entwickle die Organisation, nicht nur den Agenten.</strong><br>
  Praxisleitfaden, offener Datensatz und interaktiver Atlas für programmierbare Organisationen von KI-Agenten.
</p>

<p align="center">
  <a href="https://chaoyue0307.github.io/awesome-graph-engineering/de/">
    <img src="../../assets/visual-abstract.webp" alt="Fünf spezialisierte KI-Agentenmodule, die über ein zentrales Evidenz-Gate mit einem dauerhaften Artefakt verbunden sind" width="900">
  </a>
</p>

<p align="center">
  <a href="../../README.md">English</a> ·
  <a href="../zh-Hans/README.md">简体中文</a> ·
  <a href="../es/README.md">Español</a> ·
  <a href="../fr/README.md">Français</a> ·
  <strong><a href="./README.md">Deutsch</a></strong> ·
  <a href="../ja/README.md">日本語</a> ·
  <a href="../ko/README.md">한국어</a> ·
  <a href="../pt-BR/README.md">Português (Brasil)</a>
</p>

> [!IMPORTANT]
> *Graph Engineering* bezeichnet hier Systeme aus KI-Agenten. Dies ist kein Leitfaden für Graphdatenbanken, Wissensgraphen, Graph-ETL oder Graph Neural Networks.

## Arbeitsdefinition

**Graph Engineering ist die Praxis, ein graphstrukturiertes Agentensystem zu spezifizieren, auszuführen, zu beobachten und weiterzuentwickeln – seine Rollen und Laufzeitinstanzen, die sie verbindenden Verträge, ihren gemeinsamen Zustand und ihre Artefakte sowie die Evidenz, anhand der ihr kollektives Verhalten beurteilt wird –, damit das Gesamtsystem kontrolliert, getestet und gezielt verbessert werden kann.**

Der Graph muss tragend und nicht bloß dekorativ sein: Seine deklarierte Topologie, der in einem Lauf realisierte Graph oder die graphenerzeugende Richtlinie beeinflusst die Ausführung wesentlich und bleibt so weit inspizierbar, dass er versioniert, nachverfolgt, bewertet oder bewusst verändert werden kann.

**Graph Engineering ist ein Arbeitsbegriff für eine entstehende Praxis, kein etablierter akademischer oder industrieller Standard.** Die Definition stützt sich auf Arbeiten zu Multi-Agenten-Systemen, Protokollen, dauerhafter Ausführung, Beobachtbarkeit, Evaluation und negativen Ergebnissen. Die [Evidenzübersicht](../../DEFINITION.md#evidence-map-for-the-synthesis) ordnet die Aussagen ihren Quellen zu.

## Mindesttest: Alle drei Bedingungen sind erforderlich

1. **Mehrere begrenzt handlungsfähige Agenteninstanzen:** Mindestens zwei getrennt zurechenbare Laufzeitinstanzen können jeweils innerhalb ihrer Grenzen Ausführungsentscheidungen treffen; sie dürfen dieselbe Rolle oder dasselbe Modell verwenden.
2. **Explizite Koordinationssemantik:** Kanten legen fest, was übertragen werden darf, wann Kontrolle wechselt und wie Ergebnisse angenommen oder abgelehnt werden.
3. **Ein inspizierbares Graphartefakt:** Topologie, Ausführungsgraph oder graphenerzeugende Richtlinie kann versioniert, nachverfolgt, bewertet oder bewusst verändert werden.

## Abgrenzung

- Ein einzelner Agent mit vielen Werkzeugen bleibt ein Knoten.
- Ein deterministischer DAG aus gewöhnlichen Funktionen ist Workflow Engineering, außer er dient als Substrat für tatsächlich agentische Knoten.
- Ein Persona-Gruppenchat ohne Verträge, Zustandsgrenzen und Evidenz-Gates genügt nicht.
- Eine nachträgliche Visualisierung oder ein statisches Organigramm zählt nicht, wenn es die Ausführung weder einschränkt noch diagnostizierbar macht.
- Graphdatenbanken, GraphRAG, Wissensgraphen und GNNs gehören nur dann zum Umfang, wenn sie die Koordination einer Agentenorganisation direkt unterstützen.
- Mehr Agenten bedeuten nicht automatisch ein besseres System: Der Graph muss seinen Koordinationsaufwand gegenüber der kleinsten zuverlässigen Lösung rechtfertigen.

## Zentrale Bausteine

| Baustein | Engineering-Frage |
| --- | --- |
| **Agentenknoten** | Wer besitzt diesen Kontext, dieses Ziel, diese Fähigkeit und diese Berechtigungsgrenze? |
| **Typisierte Kante** | Was fließt über diese Beziehung, mit welchem Schema und welchen Vorbedingungen? |
| **Organisationsgraph** | Welche wiederverwendbaren Rollen dürfen delegieren, prüfen oder eskalieren? |
| **Ausführungs-/Arbeitsgraph** | Welche Aufgaben, Abhängigkeiten und Nachweise benötigt dieser Lauf? |
| **Evidenz-Gate** | Welcher Nachweis lässt Arbeit fortschreiten, scheitern oder eskalieren? |
| **Zustandsgrenze** | Was wird geteilt, isoliert, gespeichert oder als maßgeblich behandelt? |
| **Graph-Richtlinie** | Wer darf Knoten und Kanten erzeugen, umleiten, abbrechen oder umschreiben? |

Der Organisationsgraph beschreibt Befugnisse und erlaubte Beziehungen; der Ausführungsgraph beschreibt, was bei einer konkreten Arbeit geschah oder geschehen muss. Beides sind ergänzende Analyseansichten, keine universellen Standards.

## Erkunden und mitwirken

- 🧭 [Interaktiver Atlas und Systemvisualisierung](https://chaoyue0307.github.io/awesome-graph-engineering/de/)
- 🤗 [Datensatz auf Hugging Face](https://huggingface.co/datasets/cy0307/awesome-graph-engineering)
- 🔬 [Vollständige Definition und Evidenzübersicht](../../DEFINITION.md)
- 🧱 [Taxonomie der neun Ebenen](../../TAXONOMY.md) und [Begriffsvergleich](../../COMPARISON.md)
- 🛠️ [Mitwirken oder eine Übersetzung vorschlagen](../../CONTRIBUTING.md)
- 📚 [Auswahlmethodik](../../METHODOLOGY.md) und [Zitationsmetadaten](../../CITATION.cff)

Das vollständige [Ressourcenverzeichnis](../../README.md#resource-directory), der Atlas und der Datensatz werden aus derselben strukturierten Quelle erstellt.

## Zitieren

Curated by He Chaoyue.

```bibtex
@misc{he2026awesomegraphengineering,
  author       = {He, Chaoyue},
  title        = {Awesome Graph Engineering: A Field Guide, Dataset, and Interactive Atlas for Programmable AI-Agent Organizations},
  year         = {2026},
  version      = {1.3.0},
  publisher    = {GitHub},
  howpublished = {\url{https://github.com/ChaoYue0307/awesome-graph-engineering/releases/tag/v1.3.0}},
  url          = {https://github.com/ChaoYue0307/awesome-graph-engineering/releases/tag/v1.3.0}
}
```

## Lizenz

Die Kuratierung, das Schema, die Zusammenfassungen und die eigens für dieses Repository erstellten Inhalte stehen unter [CC0 1.0 Universal](../../LICENSE). Für verlinkte Werke gelten weiterhin die jeweiligen Lizenzen und Urheberrechte. CC0 lässt Marken- und Patentrechte unberührt und bietet keine Gewährleistung. Eine Zitierung ist für die wissenschaftliche Nachvollziehbarkeit erwünscht, aber nach CC0 nicht erforderlich.
