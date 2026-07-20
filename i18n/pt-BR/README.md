<p align="center">
  <a href="https://chaoyue0307.github.io/awesome-graph-engineering/?lang=pt-BR">
    <img src="../../assets/logo.svg" width="112" alt="Logotipo do Awesome Graph Engineering">
  </a>
</p>

<h1 align="center">Awesome Graph Engineering</h1>

<p align="center">
  <strong>Projete a organização, não apenas o agente.</strong><br>
  Guia de campo, conjunto de dados aberto e atlas interativo para organizações programáveis de agentes de IA.
</p>

<p align="center">
  <a href="../../README.md">English</a> ·
  <a href="../zh-Hans/README.md">简体中文</a> ·
  <a href="../es/README.md">Español</a> ·
  <a href="../fr/README.md">Français</a> ·
  <a href="../de/README.md">Deutsch</a> ·
  <a href="../ja/README.md">日本語</a> ·
  <a href="../ko/README.md">한국어</a> ·
  <strong><a href="./README.md">Português (Brasil)</a></strong>
</p>

> [!IMPORTANT]
> Aqui, *graph engineering* se refere a sistemas de agentes de IA. Bancos de dados em grafo, grafos de conhecimento, ETL de grafos e redes neurais de grafos ficam fora desse escopo.

## Definição de trabalho

**Graph engineering é a prática de especificar, executar, observar e evoluir um sistema de agentes estruturado como grafo: seus papéis e instâncias em execução, os contratos que os conectam, o estado e os artefatos que compartilham e as evidências usadas para julgar seu comportamento coletivo, para que o sistema possa ser controlado, testado e aprimorado como um todo.**

O grafo deve sustentar o funcionamento, e não ser apenas decorativo: sua topologia declarada, o grafo realizado durante uma execução ou a política que o gera precisa restringir materialmente a execução e permanecer inspecionável o bastante para ser versionado, rastreado, avaliado ou alterado de forma deliberada.

**Graph engineering é um termo de trabalho para uma prática emergente, não um padrão acadêmico ou industrial estabelecido.** A definição se apoia em pesquisas sobre sistemas multiagentes, protocolos, execução durável, observabilidade, avaliação e resultados negativos. O [mapa de evidências](../../DEFINITION.md#evidence-map-for-the-synthesis) relaciona cada afirmação às fontes correspondentes.

## Teste mínimo: as três condições são necessárias

1. **Múltiplos nós de agentes com escopos independentes:** papéis ou instâncias distintos controlam contexto, autoridade ou objetivos próprios.
2. **Semântica explícita de coordenação:** as arestas definem o que pode circular, quando o controle é transferido e como os resultados são aceitos ou rejeitados.
3. **Um artefato de grafo inspecionável:** a topologia, o grafo de execução ou sua política geradora pode ser versionado, rastreado, avaliado ou alterado deliberadamente.

## Limites de escopo

- Um único agente com muitas ferramentas ainda é apenas um nó.
- Um DAG determinístico de funções comuns é engenharia de fluxos de trabalho, exceto quando serve de substrato para nós que realmente atuam como agentes.
- Um bate-papo de personas sem contratos, limites de estado ou portas de evidência não é suficiente.
- Uma visualização posterior ou um organograma estático não conta se não restringir a execução nem ajudar a diagnosticá-la.
- Bancos de dados em grafo, GraphRAG, grafos de conhecimento e GNNs só entram no escopo quando sustentam diretamente a coordenação de uma organização de agentes.
- Mais agentes não significam um sistema melhor: o grafo precisa justificar seu custo de coordenação diante da menor alternativa confiável.

## Primitivas essenciais

| Primitiva | Pergunta de engenharia |
| --- | --- |
| **Nó de agente** | Quem controla este contexto, objetivo, capacidade e limite de permissão? |
| **Aresta tipada** | O que atravessa esta relação, sob qual esquema e quais pré-condições? |
| **Grafo organizacional** | Quais papéis reutilizáveis podem delegar, verificar ou escalar? |
| **Grafo de execução/trabalho** | Quais tarefas, dependências e evidências esta execução exige? |
| **Porta de evidência** | Qual evidência permite avançar, rejeitar ou escalar o trabalho? |
| **Limite de estado** | O que é compartilhado, isolado, persistido ou considerado fonte de referência? |
| **Política do grafo** | Quem pode criar, redirecionar, cancelar ou reescrever nós e arestas? |

O grafo organizacional descreve autoridade e relações permitidas; o grafo de execução descreve o que aconteceu ou precisa acontecer em um trabalho específico. São visões analíticas complementares, não padrões universais.

## Explore e contribua

- 🧭 [Atlas interativo e visualização do sistema](https://chaoyue0307.github.io/awesome-graph-engineering/?lang=pt-BR)
- 🤗 [Conjunto de dados no Hugging Face](https://huggingface.co/datasets/cy0307/awesome-graph-engineering)
- 🔬 [Definição completa e mapa de evidências](../../DEFINITION.md)
- 🧱 [Taxonomia em nove camadas](../../TAXONOMY.md) e [comparação de conceitos](../../COMPARISON.md)
- 🛠️ [Como contribuir ou propor uma tradução](../../CONTRIBUTING.md)
- 📚 [Metodologia de seleção](../../METHODOLOGY.md) e [metadados de citação](../../CITATION.cff)

O [diretório completo de recursos](../../README.md#resource-directory), o atlas e o conjunto de dados são gerados a partir da mesma fonte estruturada.

## Como citar

Cite o projeto assim: **He Chaoyue (2026), *Awesome Graph Engineering*.**

```bibtex
@misc{he2026awesomegraphengineering,
  author       = {He, Chaoyue},
  title        = {Awesome Graph Engineering: A Field Guide, Dataset, and Interactive Atlas for Programmable AI-Agent Organizations},
  year         = {2026},
  publisher    = {GitHub},
  howpublished = {\url{https://github.com/ChaoYue0307/awesome-graph-engineering}},
  url          = {https://github.com/ChaoYue0307/awesome-graph-engineering}
}
```

## Licença

A curadoria, o esquema, os resumos e os materiais criados para o repositório são disponibilizados sob [CC0 1.0 Universal](../../LICENSE). As obras externas referenciadas mantêm suas próprias licenças e direitos autorais. A CC0 não afeta direitos de marca ou patente e não oferece garantias. A citação é apreciada para fins de rastreabilidade acadêmica, mas não é exigida pela CC0.
