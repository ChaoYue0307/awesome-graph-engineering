const localeConfig = {
  en: { og: "en_US" },
  "zh-Hans": { og: "zh_CN" },
  es: { og: "es_ES" },
  fr: { og: "fr_FR" },
  de: { og: "de_DE" },
  ja: { og: "ja_JP" },
  ko: { og: "ko_KR" },
  "pt-BR": { og: "pt_BR" },
};

const siteUrl = "https://chaoyue0307.github.io/awesome-graph-engineering/";

const copy = {
  en: {
    metaTitle: "Awesome Graph Engineering — engineer the organization, not just the agent",
    metaDescription: "A curated field guide, structured dataset, and interactive atlas for graph-structured multi-agent systems and programmable AI-agent organizations.",
    "nav.fieldGuide": "Field guide",
    "nav.layers": "Layers",
    "nav.atlas": "Atlas",
    "nav.contribute": "Contribute",
    "hero.project": "Awesome Graph Engineering · Open field guide",
    "hero.line1": "Engineer the",
    "hero.line2": "organization, not",
    "hero.line3": "just the agent.",
    "hero.lede": "A curated field guide to graph-structured multi-agent systems — programmable AI-agent organizations with explicit roles, topologies, handoffs, work graphs, verification, reliability, and observability.",
    "hero.explore": "Explore the atlas",
    "hero.github": "View on GitHub",
    "hero.layers": "design layers",
    "hero.resources": "curated resources",
    "hero.dataset": "open dataset",
    "hero.quality": "schema validated",
    "hero.collision": "Here, graph nodes are AI agents — not data entities. Looking for graph databases, GNNs, knowledge graphs, or GraphRAG?",
    "hero.boundary": "See the boundary guide.",
    "definition.title": "Graph engineering, in 30 seconds",
    "definition.body": "Graph engineering is the practice of specifying, executing, observing, and evolving a graph-structured agent system—its roles and runtime instances, connecting contracts, shared state and artifacts, and the evidence by which collective behavior is judged. A qualifying system runs at least two separately accountable agentic runtime instances; they may share a role or model. Each agent may contain a local loop; tests, audit loops, humans, and real-world anchors may be non-agent controls. The graph must materially constrain execution and remain inspectable.",
    "definition.note": "The term is emerging and overloaded, so the scope is deliberately narrow. It describes a practical engineering layer across agent orchestration, multi-agent systems, and durable workflows; it is not an industry standard.",
    "definition.link": "Read the full definition and scope",
    "paths.artLink": "Explore the interactive model",
    "license.title": "License",
    "license.scope": "Repository-created metadata, schema, summaries, documentation, code, and visual assets are dedicated to the public domain under CC0 1.0 Universal.",
    "license.exclusions": "Linked papers, software, names, logos, and other third-party materials retain their own rights and licenses. CC0 does not waive trademark or patent rights and provides the work without warranties. Citation is appreciated for scholarly traceability but is not required by CC0.",
    "license.link": "Read the full license",
    "footer.languages": "Languages",
    "footer.license": "License",
    "footer.scope": "Repository-created metadata, summaries, documentation, code, and visuals: CC0 1.0 Universal",
    "footer.rights": "Linked works retain their own rights and licenses",
  },
  "zh-Hans": {
    metaTitle: "Awesome Graph Engineering — 工程化整个智能体组织",
    metaDescription: "面向可编程 AI 智能体组织的精选实践指南、结构化数据集与交互式资源图谱。",
    "nav.fieldGuide": "实践指南",
    "nav.layers": "工程层",
    "nav.atlas": "资源图谱",
    "nav.contribute": "参与贡献",
    "hero.project": "Awesome Graph Engineering · 开放实践指南",
    "hero.line1": "工程化的不只是",
    "hero.line2": "单个智能体，",
    "hero.line3": "而是整个组织。",
    "hero.lede": "面向可编程 AI 智能体组织的精选实践指南——涵盖角色、拓扑、交接、工作图、验证、可靠性与可观测性。",
    "hero.explore": "浏览资源图谱",
    "hero.github": "在 GitHub 上查看",
    "hero.layers": "个工程层",
    "hero.resources": "项精选资源",
    "hero.dataset": "开放数据集",
    "hero.quality": "数据结构已验证",
    "hero.collision": "在这里，图的节点是 AI 智能体，而不是数据实体。若你寻找的是图数据库、GNN、知识图谱或 GraphRAG，",
    "hero.boundary": "请查看边界指南。",
    "definition.title": "30 秒理解 Graph Engineering",
    "definition.body": "Graph Engineering 是对图结构智能体系统进行规范、执行、观测和演进的工程实践；它涵盖角色与运行时实例、连接它们的契约、共享状态与产物，以及评判集体行为的证据。合格系统至少运行两个可独立问责的智能体运行时实例；它们可以共享角色或模型。每个智能体可以包含本地循环；测试、审计循环、人类与现实世界锚点可以作为非智能体控制节点。该图必须实质性约束执行，并保持可检查。",
    "definition.note": "该术语仍在形成且存在多种含义，因此这里将范围明确限定为智能体编排、多智能体系统和持久工作流中的实用工程层；它并非行业标准。",
    "definition.link": "阅读完整定义与范围",
    "paths.artLink": "探索交互式模型",
    "license.title": "许可",
    "license.scope": "本仓库原创的元数据、数据结构、摘要、文档、代码和视觉资产均依据 CC0 1.0 Universal 贡献至公共领域。",
    "license.exclusions": "外部链接的论文、软件、名称、标志及其他第三方材料仍受其各自权利和许可证约束。CC0 不放弃商标权或专利权，且不对作品提供任何保证。欢迎为学术溯源进行引用，但 CC0 不要求引用。",
    "license.link": "阅读完整许可",
    "footer.languages": "语言",
    "footer.license": "许可",
    "footer.scope": "本仓库原创的元数据、摘要、文档、代码和视觉资产：CC0 1.0 Universal",
    "footer.rights": "外部链接作品仍受各自的权利和许可证约束",
  },
  es: {
    metaTitle: "Awesome Graph Engineering — diseña la organización, no solo el agente",
    metaDescription: "Guía práctica, conjunto de datos estructurado y atlas interactivo para diseñar organizaciones de agentes de IA como grafos programables.",
    "nav.fieldGuide": "Guía",
    "nav.layers": "Capas",
    "nav.atlas": "Atlas",
    "nav.contribute": "Contribuir",
    "hero.project": "Awesome Graph Engineering · Guía abierta",
    "hero.line1": "Diseña la",
    "hero.line2": "organización, no",
    "hero.line3": "solo el agente.",
    "hero.lede": "Una guía seleccionada para diseñar organizaciones de agentes de IA como grafos programables: roles, topologías, traspasos, grafos de trabajo, verificación, fiabilidad y observabilidad.",
    "hero.explore": "Explorar el atlas",
    "hero.github": "Ver en GitHub",
    "hero.layers": "capas de diseño",
    "hero.resources": "recursos seleccionados",
    "hero.dataset": "conjunto de datos abierto",
    "hero.quality": "esquema validado",
    "hero.collision": "Aquí, los nodos del grafo son agentes de IA, no entidades de datos. ¿Buscas bases de datos de grafos, GNN, grafos de conocimiento o GraphRAG?",
    "hero.boundary": "Consulta la guía de límites.",
    "definition.title": "Graph engineering en 30 segundos",
    "definition.body": "Graph engineering es la práctica de especificar, ejecutar, observar y evolucionar un sistema de agentes estructurado como grafo: sus roles e instancias de ejecución, los contratos que los conectan, el estado y los artefactos compartidos y la evidencia con la que se juzga su comportamiento colectivo. Un sistema que califica ejecuta al menos dos instancias de agentes responsables por separado; pueden compartir rol o modelo. Cada agente puede contener un bucle local; las pruebas, auditorías, decisiones humanas y anclajes al mundo real pueden actuar como controles no agentes. El grafo debe condicionar materialmente la ejecución y seguir siendo inspeccionable.",
    "definition.note": "El término es emergente y polisémico, por lo que el alcance se limita a una capa práctica de ingeniería presente en la orquestación de agentes, los sistemas multiagente y los flujos de trabajo duraderos; no es un estándar industrial.",
    "definition.link": "Leer la definición y el alcance completos",
    "paths.artLink": "Explorar el modelo interactivo",
    "license.title": "Licencia",
    "license.scope": "Los metadatos, el esquema, los resúmenes, la documentación, el código y los recursos visuales creados para este repositorio se dedican al dominio público bajo CC0 1.0 Universal.",
    "license.exclusions": "Los artículos, el software, los nombres, los logotipos y demás materiales de terceros enlazados conservan sus propios derechos y licencias. CC0 no implica la renuncia a derechos de marca o patente y la obra se ofrece sin garantías. Se agradece la cita por trazabilidad académica, pero CC0 no la exige.",
    "license.link": "Leer la licencia completa",
    "footer.languages": "Idiomas",
    "footer.license": "Licencia",
    "footer.scope": "Metadatos, resúmenes, documentación, código y recursos visuales creados para el repositorio: CC0 1.0 Universal",
    "footer.rights": "Las obras enlazadas conservan sus propios derechos y licencias",
  },
  fr: {
    metaTitle: "Awesome Graph Engineering — organisations d’agents IA",
    metaDescription: "Guide pratique, jeu de données structuré et atlas interactif pour concevoir des organisations d’agents IA comme des graphes programmables.",
    "nav.fieldGuide": "Guide",
    "nav.layers": "Couches",
    "nav.atlas": "Atlas",
    "nav.contribute": "Contribuer",
    "hero.project": "Awesome Graph Engineering · Guide ouvert",
    "hero.line1": "Concevez",
    "hero.line2": "l’organisation, pas",
    "hero.line3": "seulement l’agent.",
    "hero.lede": "Un guide sélectionné pour concevoir des organisations d’agents IA comme des graphes programmables : rôles, topologies, transferts, graphes de travail, vérification, fiabilité et observabilité.",
    "hero.explore": "Explorer l’atlas",
    "hero.github": "Voir sur GitHub",
    "hero.layers": "couches de conception",
    "hero.resources": "ressources sélectionnées",
    "hero.dataset": "jeu de données ouvert",
    "hero.quality": "schéma validé",
    "hero.collision": "Ici, les nœuds du graphe sont des agents IA, non des entités de données. Vous cherchez des bases de données de graphes, des GNN, des graphes de connaissances ou GraphRAG ?",
    "hero.boundary": "Voir le guide des limites.",
    "definition.title": "Le graph engineering en 30 secondes",
    "definition.body": "Le graph engineering consiste à spécifier, exécuter, observer et faire évoluer un système d’agents structuré en graphe : ses rôles et instances d’exécution, les contrats qui les relient, l’état et les artefacts partagés, ainsi que les preuves utilisées pour juger le comportement collectif. Un système admissible exécute au moins deux instances d’agents responsables séparément ; elles peuvent partager un rôle ou un modèle. Chaque agent peut contenir une boucle locale ; tests, boucles d’audit, humains et ancrages dans le réel peuvent être des contrôles non agents. Le graphe doit contraindre réellement l’exécution et rester inspectable.",
    "definition.note": "Le terme est émergent et polysémique ; le périmètre se limite donc à une couche d’ingénierie pratique présente dans l’orchestration d’agents, les systèmes multi-agents et les workflows durables. Il ne constitue pas une norme industrielle.",
    "definition.link": "Lire la définition et le périmètre complets",
    "paths.artLink": "Explorer le modèle interactif",
    "license.title": "Licence",
    "license.scope": "Les métadonnées, le schéma, les résumés, la documentation, le code et les ressources visuelles créés pour ce dépôt sont placés dans le domaine public selon CC0 1.0 Universal.",
    "license.exclusions": "Les articles, logiciels, noms, logos et autres contenus tiers référencés conservent leurs propres droits et licences. La licence CC0 n’emporte aucune renonciation aux droits de marque ou de brevet, et l’œuvre est fournie sans garantie. La citation est appréciée pour la traçabilité scientifique, mais elle n’est pas exigée par CC0.",
    "license.link": "Lire la licence complète",
    "footer.languages": "Langues",
    "footer.license": "Licence",
    "footer.scope": "Métadonnées, résumés, documentation, code et ressources visuelles créés pour le dépôt : CC0 1.0 Universal",
    "footer.rights": "Les œuvres externes référencées conservent leurs propres droits et licences",
  },
  de: {
    metaTitle: "Awesome Graph Engineering — KI-Agentenorganisationen entwickeln",
    metaDescription: "Praxisleitfaden, strukturierter Datensatz und interaktiver Atlas für programmierbare Organisationen von KI-Agenten.",
    "nav.fieldGuide": "Leitfaden",
    "nav.layers": "Ebenen",
    "nav.atlas": "Atlas",
    "nav.contribute": "Mitwirken",
    "hero.project": "Awesome Graph Engineering · Offener Leitfaden",
    "hero.line1": "Entwickle die",
    "hero.line2": "Organisation, nicht",
    "hero.line3": "nur den Agenten.",
    "hero.lede": "Ein kuratierter Leitfaden für KI-Agenten-Organisationen als programmierbare Graphen: Rollen, Topologien, Übergaben, Arbeitsgraphen, Verifikation, Zuverlässigkeit und Beobachtbarkeit.",
    "hero.explore": "Atlas erkunden",
    "hero.github": "Auf GitHub ansehen",
    "hero.layers": "Entwurfsebenen",
    "hero.resources": "kuratierte Ressourcen",
    "hero.dataset": "offener Datensatz",
    "hero.quality": "Schema validiert",
    "hero.collision": "Hier sind die Knoten des Graphen KI-Agenten, keine Datenobjekte. Suchst du Graphdatenbanken, GNNs, Wissensgraphen oder GraphRAG?",
    "hero.boundary": "Zum Abgrenzungsleitfaden.",
    "definition.title": "Graph Engineering in 30 Sekunden",
    "definition.body": "Graph Engineering ist die Praxis, ein graphstrukturiertes Agentensystem zu spezifizieren, auszuführen, zu beobachten und weiterzuentwickeln: seine Rollen und Laufzeitinstanzen, die verbindenden Verträge, gemeinsam genutzten Zustände und Artefakte sowie die Evidenz, nach der das kollektive Verhalten beurteilt wird. Ein qualifizierendes System führt mindestens zwei getrennt zurechenbare Agenten-Laufzeitinstanzen aus; sie dürfen dieselbe Rolle oder dasselbe Modell verwenden. Jeder Agent kann eine lokale Schleife enthalten; Tests, Audit-Schleifen, Menschen und Realitätsanker können Nicht-Agenten-Kontrollen sein. Der Graph muss die Ausführung tatsächlich einschränken und überprüfbar bleiben.",
    "definition.note": "Der Begriff ist neu und mehrdeutig; der Umfang ist daher auf eine praktische Engineering-Ebene in Agenten-Orchestrierung, Multi-Agenten-Systemen und dauerhaften Workflows begrenzt. Er ist kein Industriestandard.",
    "definition.link": "Vollständige Definition und Abgrenzung lesen",
    "paths.artLink": "Interaktives Modell erkunden",
    "license.title": "Lizenz",
    "license.scope": "Die für dieses Repository erstellten Metadaten, das Schema, die Zusammenfassungen, die Dokumentation, der Code und die visuellen Inhalte sind unter CC0 1.0 Universal der Gemeinfreiheit gewidmet.",
    "license.exclusions": "Verlinkte Veröffentlichungen, Software, Namen, Logos und andere Materialien Dritter unterliegen weiterhin ihren jeweiligen Rechten und Lizenzen. CC0 verzichtet nicht auf Marken- oder Patentrechte und stellt das Werk ohne Gewährleistung bereit. Eine Zitierung ist für die wissenschaftliche Nachvollziehbarkeit erwünscht, aber nach CC0 nicht erforderlich.",
    "license.link": "Vollständige Lizenz lesen",
    "footer.languages": "Sprachen",
    "footer.license": "Lizenz",
    "footer.scope": "Für das Repository erstellte Metadaten, Zusammenfassungen, Dokumentation, Code und visuelle Inhalte: CC0 1.0 Universal",
    "footer.rights": "Für verlinkte Werke gelten weiterhin die jeweiligen Rechte und Lizenzen",
  },
  ja: {
    metaTitle: "Awesome Graph Engineering — 単一エージェントではなく組織を設計する",
    metaDescription: "AI エージェント組織をプログラム可能なグラフとして設計するための実践ガイド、構造化データセット、対話型アトラス。",
    "nav.fieldGuide": "実践ガイド",
    "nav.layers": "設計レイヤー",
    "nav.atlas": "アトラス",
    "nav.contribute": "貢献する",
    "hero.project": "Awesome Graph Engineering · オープンガイド",
    "hero.line1": "設計するのは",
    "hero.line2": "単一エージェントではなく、",
    "hero.line3": "組織全体。",
    "hero.lede": "AI エージェント組織をプログラム可能なグラフとして設計するための厳選ガイド。役割、トポロジー、引き継ぎ、作業グラフ、検証、信頼性、可観測性を扱います。",
    "hero.explore": "アトラスを見る",
    "hero.github": "GitHub で見る",
    "hero.layers": "設計レイヤー",
    "hero.resources": "厳選リソース",
    "hero.dataset": "オープンデータセット",
    "hero.quality": "スキーマ検証済み",
    "hero.collision": "ここでのグラフのノードはデータ実体ではなく AI エージェントです。グラフデータベース、GNN、知識グラフ、GraphRAG を探していますか？",
    "hero.boundary": "境界ガイドを見る。",
    "definition.title": "30 秒でわかる Graph Engineering",
    "definition.body": "Graph Engineering とは、グラフ構造を持つエージェントシステムを仕様化・実行・観測・進化させる実践です。役割と実行時インスタンス、それらを結ぶ契約、共有状態と成果物、集団の振る舞いを判断する証拠までを対象にします。対象となるシステムでは、個別に説明責任を持つエージェント実行時インスタンスが少なくとも二つ動作します。役割やモデルは共有できます。各エージェントはローカルなループを持てます。テスト、監査ループ、人間、現実世界のアンカーは非エージェント制御ノードになり得ます。グラフは実行を実質的に制約し、検査可能でなければなりません。",
    "definition.note": "この用語は新しく多義的であるため、対象範囲をエージェント・オーケストレーション、マルチエージェントシステム、耐久性のあるワークフローにまたがる実践的な工学レイヤーに限定しています。業界標準ではありません。",
    "definition.link": "定義と対象範囲を詳しく読む",
    "paths.artLink": "インタラクティブモデルを見る",
    "license.title": "ライセンス",
    "license.scope": "本リポジトリで作成したメタデータ、スキーマ、要約、文書、コード、ビジュアル素材は、CC0 1.0 Universal に基づきパブリックドメインに提供されています。",
    "license.exclusions": "リンク先の論文、ソフトウェア、名称、ロゴ、その他の第三者素材には、それぞれの権利とライセンスが適用されます。CC0 は商標権や特許権を放棄するものではなく、本作品は無保証で提供されます。学術的な追跡可能性のための引用を推奨しますが、CC0 上の要件ではありません。",
    "license.link": "ライセンス全文を読む",
    "footer.languages": "言語",
    "footer.license": "ライセンス",
    "footer.scope": "本リポジトリで作成したメタデータ、要約、文書、コード、ビジュアル素材：CC0 1.0 Universal",
    "footer.rights": "リンク先の著作物には、それぞれの権利とライセンスが適用されます",
  },
  ko: {
    metaTitle: "Awesome Graph Engineering — 에이전트 하나가 아니라 조직 전체를 설계하세요",
    metaDescription: "AI 에이전트 조직을 프로그래밍 가능한 그래프로 설계하기 위한 실전 가이드, 구조화 데이터셋, 인터랙티브 아틀라스입니다.",
    "nav.fieldGuide": "실전 가이드",
    "nav.layers": "설계 계층",
    "nav.atlas": "아틀라스",
    "nav.contribute": "기여하기",
    "hero.project": "Awesome Graph Engineering · 오픈 가이드",
    "hero.line1": "설계할 대상은",
    "hero.line2": "에이전트 하나가 아니라",
    "hero.line3": "조직 전체입니다.",
    "hero.lede": "AI 에이전트 조직을 프로그래밍 가능한 그래프로 설계하기 위한 엄선된 가이드입니다. 역할, 토폴로지, 핸드오프, 작업 그래프, 검증, 신뢰성, 관측 가능성을 다룹니다.",
    "hero.explore": "아틀라스 둘러보기",
    "hero.github": "GitHub에서 보기",
    "hero.layers": "설계 계층",
    "hero.resources": "엄선된 리소스",
    "hero.dataset": "오픈 데이터셋",
    "hero.quality": "스키마 검증 완료",
    "hero.collision": "여기서 그래프의 노드는 데이터 엔터티가 아니라 AI 에이전트입니다. 그래프 데이터베이스, GNN, 지식 그래프 또는 GraphRAG를 찾고 있나요?",
    "hero.boundary": "범위 안내를 확인하세요.",
    "definition.title": "30초 만에 이해하는 Graph Engineering",
    "definition.body": "Graph Engineering은 그래프 구조의 에이전트 시스템을 명세하고, 실행하고, 관측하고, 진화시키는 실천입니다. 역할과 런타임 인스턴스, 이들을 잇는 계약, 공유 상태와 산출물, 집단 행동을 판단하는 근거를 함께 다룹니다. 범위에 포함되는 시스템은 개별적으로 책임을 추적할 수 있는 에이전트 런타임 인스턴스를 최소 두 개 실행해야 하며, 역할이나 모델은 공유할 수 있습니다. 각 에이전트는 로컬 루프를 가질 수 있으며 테스트, 감사 루프, 사람, 현실 세계의 앵커는 비에이전트 제어 노드가 될 수 있습니다. 그래프는 실행을 실질적으로 제약하고 검사 가능해야 합니다.",
    "definition.note": "이 용어는 새롭고 여러 의미로 쓰이므로 범위를 에이전트 오케스트레이션, 멀티에이전트 시스템, 지속 실행형 워크플로에 걸친 실용적 엔지니어링 계층으로 한정합니다. 업계 표준은 아닙니다.",
    "definition.link": "전체 정의와 범위 읽기",
    "paths.artLink": "인터랙티브 모델 살펴보기",
    "license.title": "라이선스",
    "license.scope": "이 저장소에서 만든 메타데이터, 스키마, 요약, 문서, 코드 및 시각 자료는 CC0 1.0 Universal에 따라 퍼블릭 도메인으로 공개됩니다.",
    "license.exclusions": "링크된 논문, 소프트웨어, 명칭, 로고 및 기타 제3자 자료에는 각각의 권리와 라이선스가 적용됩니다. CC0는 상표권이나 특허권을 포기하지 않으며, 저작물은 어떠한 보증도 없이 제공됩니다. 학술적 추적 가능성을 위한 인용은 권장하지만 CC0의 의무 사항은 아닙니다.",
    "license.link": "전체 라이선스 보기",
    "footer.languages": "언어",
    "footer.license": "라이선스",
    "footer.scope": "저장소에서 만든 메타데이터, 요약, 문서, 코드 및 시각 자료: CC0 1.0 Universal",
    "footer.rights": "링크된 저작물에는 각각의 권리와 라이선스가 적용됩니다",
  },
  "pt-BR": {
    metaTitle: "Awesome Graph Engineering — projete a organização, não apenas o agente",
    metaDescription: "Guia prático, conjunto de dados estruturado e atlas interativo para projetar organizações de agentes de IA como grafos programáveis.",
    "nav.fieldGuide": "Guia",
    "nav.layers": "Camadas",
    "nav.atlas": "Atlas",
    "nav.contribute": "Contribuir",
    "hero.project": "Awesome Graph Engineering · Guia aberto",
    "hero.line1": "Projete a",
    "hero.line2": "organização, não",
    "hero.line3": "apenas o agente.",
    "hero.lede": "Um guia selecionado para projetar organizações de agentes de IA como grafos programáveis: papéis, topologias, transferências, grafos de trabalho, verificação, confiabilidade e observabilidade.",
    "hero.explore": "Explorar o atlas",
    "hero.github": "Ver no GitHub",
    "hero.layers": "camadas de projeto",
    "hero.resources": "recursos selecionados",
    "hero.dataset": "conjunto de dados aberto",
    "hero.quality": "esquema validado",
    "hero.collision": "Aqui, os nós do grafo são agentes de IA, não entidades de dados. Procurando bancos de dados em grafo, GNNs, grafos de conhecimento ou GraphRAG?",
    "hero.boundary": "Veja o guia de escopo.",
    "definition.title": "Graph engineering em 30 segundos",
    "definition.body": "Graph engineering é a prática de especificar, executar, observar e evoluir um sistema de agentes estruturado como grafo: seus papéis e instâncias em execução, os contratos que os conectam, o estado e os artefatos compartilhados e as evidências usadas para avaliar o comportamento coletivo. Um sistema qualificado executa pelo menos duas instâncias de agentes responsabilizáveis separadamente; elas podem compartilhar um papel ou modelo. Cada agente pode conter um loop local; testes, loops de auditoria, pessoas e âncoras no mundo real podem atuar como controles não agentes. O grafo deve restringir materialmente a execução e permanecer inspecionável.",
    "definition.note": "O termo é emergente e polissêmico; por isso, o escopo se limita a uma camada prática de engenharia presente na orquestração de agentes, em sistemas multiagente e em fluxos de trabalho duráveis. Não é um padrão da indústria.",
    "definition.link": "Ler a definição e o escopo completos",
    "paths.artLink": "Explorar o modelo interativo",
    "license.title": "Licença",
    "license.scope": "Os metadados, o esquema, os resumos, a documentação, o código e os recursos visuais criados para este repositório são dedicados ao domínio público sob a CC0 1.0 Universal.",
    "license.exclusions": "Artigos, software, nomes, logotipos e outros materiais de terceiros referenciados por links mantêm seus próprios direitos e licenças. A CC0 não renuncia a direitos de marca ou patente, e a obra é fornecida sem garantias. A citação é apreciada para fins de rastreabilidade acadêmica, mas não é exigida pela CC0.",
    "license.link": "Ler a licença completa",
    "footer.languages": "Idiomas",
    "footer.license": "Licença",
    "footer.scope": "Metadados, resumos, documentação, código e recursos visuais criados para o repositório: CC0 1.0 Universal",
    "footer.rights": "Obras externas referenciadas mantêm seus próprios direitos e licenças",
  },
};

function setMeta(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) element.setAttribute("content", value);
}

function setLink(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) element.setAttribute("href", value);
}

function localizeWebPageSchema(locale, strings, url) {
  const script = document.querySelector('script[type="application/ld+json"]');
  if (!script) return;
  try {
    const payload = JSON.parse(script.textContent);
    const graph = Array.isArray(payload["@graph"]) ? payload["@graph"] : [];
    const page = graph.find((node) => {
      const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
      return types.includes("WebPage");
    });
    if (!page) return;
    page["@id"] = `${url}#webpage`;
    page.url = url;
    page.name = strings.metaTitle;
    page.description = strings.metaDescription;
    page.inLanguage = locale;
    script.textContent = JSON.stringify(payload);
  } catch {
    // The static source is validated in CI; leave it intact if a mirror mutates it.
  }
}

function pathLocale(pathname = location.pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.at(-1)?.toLowerCase() === "index.html") segments.pop();
  const candidate = segments.at(-1);
  return candidate && Object.hasOwn(localeConfig, candidate) ? candidate : null;
}

function siteRootPath(pathname = location.pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.at(-1)?.toLowerCase() === "index.html") segments.pop();
  if (segments.at(-1) && Object.hasOwn(localeConfig, segments.at(-1))) segments.pop();
  return segments.length ? `/${segments.join("/")}/` : "/";
}

export function localeUrl(locale, current = location) {
  const next = new URL(current.href);
  next.pathname = `${siteRootPath(current.pathname)}${locale === "en" ? "" : `${locale}/`}`;
  next.searchParams.delete("lang");
  next.hash = current.hash;
  return next;
}

export function canonicalLocaleUrl(locale) {
  return new URL(locale === "en" ? siteUrl : `${siteUrl}${locale}/`);
}

export function getLocale() {
  const requested = new URLSearchParams(location.search).get("lang");
  if (requested && Object.hasOwn(localeConfig, requested)) return requested;
  return pathLocale() || "en";
}

export function setupLocalization() {
  const locale = getLocale();
  const strings = copy[locale] || copy.en;
  const picker = document.getElementById("language-picker");
  const html = document.documentElement;

  html.lang = locale;
  html.dataset.locale = locale;
  document.title = strings.metaTitle;
  setMeta('meta[name="description"]', strings.metaDescription);
  setMeta('meta[property="og:title"]', strings.metaTitle.split(" — ")[0]);
  setMeta('meta[property="og:description"]', strings.metaDescription);
  setMeta('meta[property="og:locale"]', localeConfig[locale].og);
  setMeta('meta[name="twitter:title"]', strings.metaTitle.split(" — ")[0]);
  setMeta('meta[name="twitter:description"]', strings.metaDescription);

  const canonical = canonicalLocaleUrl(locale);
  setLink('link[rel="canonical"]', canonical.href);
  setMeta('meta[property="og:url"]', canonical.href);
  localizeWebPageSchema(locale, strings, canonical.href);
  Object.keys(localeConfig).forEach((candidate) => {
    const alternate = canonicalLocaleUrl(candidate);
    setLink(`link[rel="alternate"][hreflang="${candidate}"]`, alternate.href);
  });
  const defaultLocale = canonicalLocaleUrl("en");
  setLink('link[rel="alternate"][hreflang="x-default"]', defaultLocale.href);

  if (locale !== "en") {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = strings[element.dataset.i18n];
      if (value) element.textContent = value;
    });
  }

  const heading = document.querySelector(".hero h1");
  if (heading) heading.setAttribute("aria-label", [strings["hero.line1"], strings["hero.line2"], strings["hero.line3"]].join(" "));

  if (picker) {
    picker.value = locale;
    picker.addEventListener("change", () => {
      const next = localeUrl(picker.value);
      location.assign(next.href);
    });
  }

  return locale;
}

export { copy, localeConfig, siteUrl };
