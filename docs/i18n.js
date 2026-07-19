const repoBase = "https://github.com/ChaoYue0307/awesome-graph-engineering/blob/main";

const localeConfig = {
  en: { og: "en_US", readme: `${repoBase}/i18n/README.md` },
  "zh-Hans": { og: "zh_CN", readme: `${repoBase}/i18n/zh-Hans/README.md` },
  es: { og: "es_ES", readme: `${repoBase}/i18n/es/README.md` },
  fr: { og: "fr_FR", readme: `${repoBase}/i18n/fr/README.md` },
  de: { og: "de_DE", readme: `${repoBase}/i18n/de/README.md` },
  ja: { og: "ja_JP", readme: `${repoBase}/i18n/ja/README.md` },
  ko: { og: "ko_KR", readme: `${repoBase}/i18n/ko/README.md` },
  "pt-BR": { og: "pt_BR", readme: `${repoBase}/i18n/pt-BR/README.md` },
};

const copy = {
  en: {
    metaTitle: "Awesome Graph Engineering — engineer the organization, not just the agent",
    metaDescription: "A curated field guide, structured dataset, and interactive atlas for engineering AI-agent organizations as programmable graphs.",
    "nav.fieldGuide": "Field guide",
    "nav.layers": "Layers",
    "nav.atlas": "Atlas",
    "nav.contribute": "Contribute",
    "hero.project": "Awesome Graph Engineering · Open field guide",
    "hero.line1": "Engineer the",
    "hero.line2": "organization, not",
    "hero.line3": "just the agent.",
    "hero.lede": "A curated field guide to engineering AI-agent organizations as programmable graphs — roles, topologies, handoffs, work graphs, verification, reliability, and observability.",
    "hero.explore": "Explore the atlas",
    "hero.github": "View on GitHub",
    "hero.layers": "design layers",
    "hero.resources": "curated resources",
    "hero.dataset": "open dataset",
    "hero.quality": "quality checked",
    "hero.collision": "Here, graph nodes are AI agents — not data entities. Looking for graph databases, GNNs, knowledge graphs, or GraphRAG?",
    "hero.boundary": "See the boundary guide.",
    "definition.title": "Graph engineering, in 30 seconds",
    "definition.body": "Graph engineering is the practice of specifying, executing, observing, and evolving a graph-structured agent system—its roles and runtime instances, connecting contracts, shared state and artifacts, and the evidence by which collective behavior is judged. Each agent may contain a local loop; tests, audit loops, humans, and real-world anchors may be non-agent controls. The graph must materially constrain execution and remain inspectable.",
    "definition.note": "This repository uses a deliberately narrow working definition for an emerging and overloaded term. It does not claim an industry standard or a new invention; it names a practical layer already visible across agent orchestration, multi-agent systems, and durable workflows.",
    "definition.link": "Read the full definition and scope",
    "definition.translationNote": "The introduction is available in eight languages. The canonical research catalog and resource metadata remain in English so citations and generated data stay consistent.",
    "definition.localizedLink": "Help translate →",
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
    "hero.quality": "质量检查通过",
    "hero.collision": "在这里，图的节点是 AI 智能体，而不是数据实体。若你寻找的是图数据库、GNN、知识图谱或 GraphRAG，",
    "hero.boundary": "请查看边界指南。",
    "definition.title": "30 秒理解 Graph Engineering",
    "definition.body": "Graph Engineering 是对图结构智能体系统进行规范、执行、观测和演进的工程实践；它涵盖角色与运行时实例、连接它们的契约、共享状态与工件，以及评判集体行为的证据。每个智能体可以包含本地循环；测试、审计循环、人类与现实世界锚点可以作为非智能体控制节点。该图必须实质性约束执行，并保持可检查。",
    "definition.note": "本仓库为一个新兴且含义重叠的术语采用刻意收窄的工作定义。它不声称这是行业标准或全新发明，而是为智能体编排、多智能体系统与持久工作流中已经存在的工程层提供一个可讨论的名称。",
    "definition.link": "阅读完整定义与范围",
    "definition.translationNote": "导言提供八种语言版本；为保持引用与生成数据一致，规范研究目录和资源元数据仍以英文为准。",
    "definition.localizedLink": "阅读中文导言 →",
  },
  es: {
    metaTitle: "Awesome Graph Engineering — diseña la organización, no solo el agente",
    metaDescription: "Guía práctica, dataset estructurado y atlas interactivo para diseñar organizaciones de agentes de IA como grafos programables.",
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
    "hero.dataset": "dataset abierto",
    "hero.quality": "calidad verificada",
    "hero.collision": "Aquí, los nodos del grafo son agentes de IA, no entidades de datos. ¿Buscas bases de datos de grafos, GNN, grafos de conocimiento o GraphRAG?",
    "hero.boundary": "Consulta la guía de límites.",
    "definition.title": "Graph engineering en 30 segundos",
    "definition.body": "Graph engineering es la práctica de especificar, ejecutar, observar y evolucionar un sistema de agentes estructurado como grafo: sus roles e instancias de ejecución, los contratos que los conectan, el estado y los artefactos compartidos y la evidencia con la que se juzga su comportamiento colectivo. Cada agente puede contener un bucle local; las pruebas, auditorías, decisiones humanas y anclajes al mundo real pueden actuar como controles no agentes. El grafo debe condicionar materialmente la ejecución y seguir siendo inspeccionable.",
    "definition.note": "Este repositorio adopta deliberadamente una definición de trabajo acotada para un término emergente y sobrecargado. No afirma que sea un estándar industrial ni una invención nueva; nombra una capa práctica ya visible en la orquestación de agentes, los sistemas multiagente y los flujos duraderos.",
    "definition.link": "Leer la definición y el alcance completos",
    "definition.translationNote": "La introducción está disponible en ocho idiomas. El catálogo de investigación y los metadatos canónicos permanecen en inglés para mantener coherentes las citas y los datos generados.",
    "definition.localizedLink": "Leer la introducción en español →",
  },
  fr: {
    metaTitle: "Awesome Graph Engineering — ingénierie de l’organisation, pas seulement de l’agent",
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
    "hero.quality": "qualité vérifiée",
    "hero.collision": "Ici, les nœuds du graphe sont des agents IA, non des entités de données. Vous cherchez des bases de graphes, des GNN, des graphes de connaissances ou GraphRAG ?",
    "hero.boundary": "Voir le guide des limites.",
    "definition.title": "Le graph engineering en 30 secondes",
    "definition.body": "Le graph engineering consiste à spécifier, exécuter, observer et faire évoluer un système d’agents structuré en graphe : ses rôles et instances d’exécution, les contrats qui les relient, l’état et les artefacts partagés, ainsi que les preuves utilisées pour juger le comportement collectif. Chaque agent peut contenir une boucle locale ; tests, boucles d’audit, humains et ancrages dans le réel peuvent être des contrôles non agents. Le graphe doit contraindre réellement l’exécution et rester inspectable.",
    "definition.note": "Ce dépôt adopte volontairement une définition de travail étroite pour un terme émergent et surchargé. Il ne prétend ni établir une norme industrielle ni annoncer une invention nouvelle ; il nomme une couche pratique déjà visible dans l’orchestration d’agents, les systèmes multi-agents et les workflows durables.",
    "definition.link": "Lire la définition et le périmètre complets",
    "definition.translationNote": "L’introduction existe en huit langues. Le catalogue de recherche et les métadonnées canoniques restent en anglais afin de préserver la cohérence des citations et des données générées.",
    "definition.localizedLink": "Lire l’introduction française →",
  },
  de: {
    metaTitle: "Awesome Graph Engineering — entwickle die Organisation, nicht nur den Agenten",
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
    "hero.quality": "qualitätsgeprüft",
    "hero.collision": "Hier sind die Knoten des Graphen KI-Agenten, keine Datenobjekte. Suchst du Graphdatenbanken, GNNs, Wissensgraphen oder GraphRAG?",
    "hero.boundary": "Zum Abgrenzungsleitfaden.",
    "definition.title": "Graph Engineering in 30 Sekunden",
    "definition.body": "Graph Engineering ist die Praxis, ein graphstrukturiertes Agentensystem zu spezifizieren, auszuführen, zu beobachten und weiterzuentwickeln: seine Rollen und Laufzeitinstanzen, die verbindenden Verträge, gemeinsam genutzten Zustände und Artefakte sowie die Evidenz, nach der das kollektive Verhalten beurteilt wird. Jeder Agent kann eine lokale Schleife enthalten; Tests, Audit-Schleifen, Menschen und Realitätsanker können Nicht-Agenten-Kontrollen sein. Der Graph muss die Ausführung tatsächlich einschränken und überprüfbar bleiben.",
    "definition.note": "Dieses Repository verwendet bewusst eine enge Arbeitsdefinition für einen neuen und mehrfach belegten Begriff. Es beansprucht weder einen Industriestandard noch eine neue Erfindung, sondern benennt eine praktische Ebene, die bereits in Agenten-Orchestrierung, Multi-Agenten-Systemen und dauerhaften Workflows sichtbar ist.",
    "definition.link": "Vollständige Definition und Abgrenzung lesen",
    "definition.translationNote": "Die Einführung ist in acht Sprachen verfügbar. Der kanonische Forschungskatalog und die Ressourcenmetadaten bleiben auf Englisch, damit Zitate und generierte Daten konsistent bleiben.",
    "definition.localizedLink": "Deutsche Einführung lesen →",
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
    "hero.quality": "品質チェック済み",
    "hero.collision": "ここでのグラフのノードはデータ実体ではなく AI エージェントです。グラフデータベース、GNN、知識グラフ、GraphRAG を探していますか？",
    "hero.boundary": "境界ガイドを見る。",
    "definition.title": "30 秒でわかる Graph Engineering",
    "definition.body": "Graph Engineering とは、グラフ構造を持つエージェントシステムを仕様化・実行・観測・進化させる実践です。役割と実行時インスタンス、それらを結ぶ契約、共有状態と成果物、集団の振る舞いを判断する証拠までを対象にします。各エージェントはローカルなループを持てます。テスト、監査ループ、人間、現実世界のアンカーは非エージェント制御ノードになり得ます。グラフは実行を実質的に制約し、検査可能でなければなりません。",
    "definition.note": "このリポジトリは、新しく多義的な用語に対して意図的に狭い作業定義を採用しています。業界標準や新発明を主張するものではなく、エージェント・オーケストレーション、マルチエージェントシステム、耐久性のあるワークフローに既に見られる実践層を名付けるものです。",
    "definition.link": "定義と対象範囲を詳しく読む",
    "definition.translationNote": "導入は 8 言語で利用できます。引用と生成データの一貫性を保つため、正規の研究カタログとリソースメタデータは英語のままです。",
    "definition.localizedLink": "日本語の導入を読む →",
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
    "hero.quality": "품질 검사 완료",
    "hero.collision": "여기서 그래프의 노드는 데이터 엔터티가 아니라 AI 에이전트입니다. 그래프 데이터베이스, GNN, 지식 그래프 또는 GraphRAG를 찾고 있나요?",
    "hero.boundary": "범위 안내를 확인하세요.",
    "definition.title": "30초 만에 이해하는 Graph Engineering",
    "definition.body": "Graph Engineering은 그래프 구조의 에이전트 시스템을 명세하고, 실행하고, 관측하고, 진화시키는 실천입니다. 역할과 런타임 인스턴스, 이들을 잇는 계약, 공유 상태와 산출물, 집단 행동을 판단하는 근거를 함께 다룹니다. 각 에이전트는 로컬 루프를 가질 수 있으며 테스트, 감사 루프, 사람, 현실 세계의 앵커는 비에이전트 제어 노드가 될 수 있습니다. 그래프는 실행을 실질적으로 제약하고 검사 가능해야 합니다.",
    "definition.note": "이 저장소는 새롭고 여러 의미로 쓰이는 용어에 대해 의도적으로 좁은 작업 정의를 사용합니다. 업계 표준이나 새로운 발명을 주장하지 않으며, 에이전트 오케스트레이션·멀티에이전트 시스템·내구성 있는 워크플로에 이미 보이는 실천 계층에 이름을 붙입니다.",
    "definition.link": "전체 정의와 범위 읽기",
    "definition.translationNote": "소개는 8개 언어로 제공됩니다. 인용과 생성 데이터의 일관성을 위해 정식 연구 카탈로그와 리소스 메타데이터는 영어로 유지됩니다.",
    "definition.localizedLink": "한국어 소개 읽기 →",
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
    "hero.dataset": "dataset aberto",
    "hero.quality": "qualidade verificada",
    "hero.collision": "Aqui, os nós do grafo são agentes de IA, não entidades de dados. Procurando bancos de dados em grafo, GNNs, grafos de conhecimento ou GraphRAG?",
    "hero.boundary": "Veja o guia de escopo.",
    "definition.title": "Graph engineering em 30 segundos",
    "definition.body": "Graph engineering é a prática de especificar, executar, observar e evoluir um sistema de agentes estruturado como grafo: seus papéis e instâncias em execução, os contratos que os conectam, o estado e os artefatos compartilhados e as evidências usadas para avaliar o comportamento coletivo. Cada agente pode conter um loop local; testes, loops de auditoria, pessoas e âncoras no mundo real podem atuar como controles não agentes. O grafo deve restringir materialmente a execução e permanecer inspecionável.",
    "definition.note": "Este repositório adota deliberadamente uma definição de trabalho restrita para um termo emergente e sobrecarregado. Ele não afirma ser um padrão da indústria nem uma invenção nova; nomeia uma camada prática já visível na orquestração de agentes, em sistemas multiagente e em workflows duráveis.",
    "definition.link": "Ler a definição e o escopo completos",
    "definition.translationNote": "A introdução está disponível em oito idiomas. O catálogo de pesquisa e os metadados canônicos permanecem em inglês para manter citações e dados gerados consistentes.",
    "definition.localizedLink": "Ler a introdução em português →",
  },
};

function setMeta(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) element.setAttribute("content", value);
}

export function getLocale() {
  const requested = new URLSearchParams(location.search).get("lang") || "en";
  return Object.hasOwn(localeConfig, requested) ? requested : "en";
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

  if (locale !== "en") {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = strings[element.dataset.i18n];
      if (value) element.textContent = value;
    });
  }

  const heading = document.querySelector(".hero h1");
  if (heading) heading.setAttribute("aria-label", [strings["hero.line1"], strings["hero.line2"], strings["hero.line3"]].join(" "));

  const localizedReadme = document.getElementById("localized-readme-link");
  if (localizedReadme) localizedReadme.href = localeConfig[locale].readme;

  if (picker) {
    picker.value = locale;
    picker.addEventListener("change", () => {
      const next = new URL(location.href);
      if (picker.value === "en") next.searchParams.delete("lang");
      else next.searchParams.set("lang", picker.value);
      location.assign(next.href);
    });
  }

  return locale;
}
