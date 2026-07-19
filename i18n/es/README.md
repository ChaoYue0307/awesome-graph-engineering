<p align="center">
  <a href="https://chaoyue0307.github.io/awesome-graph-engineering/">
    <img src="../../assets/logo.svg" width="112" alt="Logotipo de Awesome Graph Engineering">
  </a>
</p>

<h1 align="center">Awesome Graph Engineering</h1>

<p align="center">
  <strong>Diseña la organización, no solo el agente.</strong><br>
  Guía de campo, conjunto de datos abierto y atlas interactivo para organizaciones programables de agentes de IA.
</p>

<p align="center">
  <a href="../../README.md">English</a> ·
  <a href="../zh-Hans/README.md">简体中文</a> ·
  <strong><a href="./README.md">Español</a></strong> ·
  <a href="../fr/README.md">Français</a> ·
  <a href="../de/README.md">Deutsch</a> ·
  <a href="../ja/README.md">日本語</a> ·
  <a href="../ko/README.md">한국어</a> ·
  <a href="../pt-BR/README.md">Português (Brasil)</a>
</p>

> [!NOTE]
> Esta es una **traducción editorial inicial**; se agradece la revisión técnica de hablantes nativos. El [README en inglés](../../README.md) es la versión canónica.

<!-- -->

> [!IMPORTANT]
> Aquí, *graph engineering* se refiere a sistemas de agentes de IA. No es una guía sobre bases de datos de grafos, grafos de conocimiento, ETL de grafos ni redes neuronales de grafos.

## Definición de trabajo

**Graph engineering es la práctica de especificar, ejecutar, observar y evolucionar un sistema de agentes estructurado como grafo: sus roles e instancias en ejecución, los contratos que los conectan, el estado y los artefactos que comparten, y la evidencia con la que se juzga su comportamiento colectivo; todo ello para controlar, probar y mejorar el sistema como un conjunto diseñado.**

El grafo debe ser operativo, no decorativo: su topología declarada, el grafo realizado en una ejecución o la política que lo genera debe condicionar materialmente la ejecución y ser suficientemente inspeccionable para versionarse, rastrearse, evaluarse o modificarse de forma deliberada.

Usamos este concepto como **término de trabajo para una práctica emergente**, no como un estándar académico o industrial ya establecido. La definición sintetiza investigación sobre sistemas multiagente, protocolos, ejecución durable, observabilidad, evaluación y resultados negativos; no procede de una única fuente. Consulta el [mapa de afirmaciones y evidencias](../../DEFINITION.md#evidence-map-for-the-synthesis).

## Prueba mínima: las tres condiciones son necesarias

1. **Múltiples nodos de agentes con alcance independiente:** roles o instancias distintos controlan su contexto, autoridad u objetivos.
2. **Semántica explícita de coordinación:** las aristas definen qué puede pasar, cuándo se transfiere el control y cómo se aceptan o rechazan los resultados.
3. **Un artefacto de grafo inspeccionable:** la topología, el grafo de ejecución o su política generadora puede versionarse, rastrearse, evaluarse o cambiarse deliberadamente.

## Límites del alcance

- Un único agente con muchas herramientas sigue siendo un solo nodo.
- Un DAG determinista de funciones ordinarias es ingeniería de flujos de trabajo, salvo que sirva de sustrato para nodos realmente agentivos.
- Un chat de personajes sin contratos, límites de estado ni puertas de evidencia no basta.
- Una visualización posterior o un organigrama estático no cuenta si no condiciona la ejecución ni permite diagnosticarla.
- Las bases de datos de grafos, GraphRAG, los grafos de conocimiento y las GNN solo entran en alcance cuando sostienen directamente la coordinación de una organización de agentes.
- Más agentes no implica un sistema mejor: el grafo debe justificar su coste de coordinación frente a la alternativa fiable más pequeña.

## Primitivas esenciales

| Primitiva | Pregunta de ingeniería |
| --- | --- |
| **Nodo de agente** | ¿Quién controla este contexto, objetivo, capacidad y límite de permisos? |
| **Arista tipada** | ¿Qué atraviesa esta relación, con qué esquema y precondiciones? |
| **Grafo organizativo** | ¿Qué roles reutilizables pueden delegar, verificar o escalar? |
| **Grafo de ejecución/trabajo** | ¿Qué tareas, dependencias y evidencias requiere esta ejecución? |
| **Puerta de evidencia** | ¿Qué prueba permite avanzar, rechazar o escalar el trabajo? |
| **Límite de estado** | ¿Qué se comparte, aísla, guarda o considera autoritativo? |
| **Política del grafo** | ¿Quién puede crear, redirigir, cancelar o reescribir nodos y aristas? |

El grafo organizativo describe autoridad y relaciones permitidas; el grafo de ejecución describe lo que ocurrió o debe ocurrir en un trabajo concreto. Son vistas analíticas complementarias, no estándares universales.

## Explora y participa

- 🧭 [Atlas interactivo y visualización del sistema](https://chaoyue0307.github.io/awesome-graph-engineering/)
- 🤗 [Conjunto de datos en Hugging Face](https://huggingface.co/datasets/cy0307/awesome-graph-engineering)
- 🔬 [Definición completa y mapa de evidencias](../../DEFINITION.md)
- 🧱 [Taxonomía de nueve capas](../../TAXONOMY.md) y [comparación de conceptos](../../COMPARISON.md)
- 🛠️ [Cómo contribuir o proponer una traducción](../../CONTRIBUTING.md)
- 📚 [Metodología de selección](../../METHODOLOGY.md) y [metadatos de citación](../../CITATION.cff)

No dupliques las tablas de recursos en esta traducción: el [directorio canónico](../../README.md#resource-directory), el atlas y el conjunto de datos se generan desde la misma fuente estructurada.

## Cómo citar

Nombre del autor: **He Chaoyue**. Conserva el título original del proyecto al citarlo:

```bibtex
@misc{he2026awesomegraphengineering,
  author = {He, Chaoyue},
  title  = {Awesome Graph Engineering},
  year   = {2026},
  url    = {https://github.com/ChaoYue0307/awesome-graph-engineering}
}
```

Los datos y metadatos originales se publican bajo [CC0-1.0](../../LICENSE); cada obra enlazada conserva la licencia de su autor.
