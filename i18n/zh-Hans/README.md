<p align="center">
  <a href="https://chaoyue0307.github.io/awesome-graph-engineering/zh-Hans/">
    <img src="../../assets/logo.svg" width="112" alt="Awesome Graph Engineering 标志">
  </a>
</p>

<h1 align="center">Awesome Graph Engineering</h1>

<p align="center">
  <strong>工程化整个智能体组织，而不只是单个智能体。</strong><br>
  面向可编程 AI 智能体组织的实践指南、开放数据集与交互式图谱。
</p>

<p align="center">
  <a href="https://chaoyue0307.github.io/awesome-graph-engineering/zh-Hans/">
    <img src="../../assets/visual-abstract.webp" alt="五个专业化 AI 智能体模块通过中央证据门连接到持久化产物" width="900">
  </a>
</p>

<p align="center">
  <a href="../../README.md">English</a> ·
  <strong><a href="README.md">简体中文</a></strong> ·
  <a href="../es/README.md">Español</a> ·
  <a href="../fr/README.md">Français</a> ·
  <a href="../de/README.md">Deutsch</a> ·
  <a href="../ja/README.md">日本語</a> ·
  <a href="../ko/README.md">한국어</a> ·
  <a href="../pt-BR/README.md">Português (Brasil)</a>
</p>

> [!IMPORTANT]
> 这里的 **Graph Engineering（图工程）**特指 AI 智能体系统。图数据库、知识图谱、图 ETL 和图神经网络不属于这一范围。

## 工作定义

**图工程是一种对图结构化智能体系统进行规范、执行、观测和演化的实践：它涵盖系统中的角色与运行时实例、连接它们的契约、共享的状态与产物，以及用于判断集体行为的证据，从而使整个系统能够作为一个工程整体被控制、测试和改进。**

图必须是“承重”的，而非装饰：声明的拓扑、实际发生的运行图或生成图的策略，必须实质性地约束执行，并且足够可检查，以便进行版本管理、追踪、评估或有意修改。

**Graph Engineering 是一个用于描述新兴实践的暂定术语，并非已经确立的学术领域或行业标准。** 本定义综合了多智能体系统、分布式系统、工作流编排和语言智能体图等相关研究；[证据图](../../DEFINITION.md)列出了各项主张及其来源。

## 最低三项检验

一个系统只有同时满足以下三项承重条件，才属于核心范围：

1. **多个边界明确的智能体实例**：至少两个可独立问责的运行时实例，分别拥有上下文、权限、目标或职责，并能在边界内选择下一步行动。
2. **契约化协调**：至少一条显式关系规定控制权、上下文、状态、产物或评估如何传递，以及何时接受、拒绝或升级结果。
3. **承重且可检查的图结构产物**：拓扑、运行图或图生成策略真实约束执行，并可被版本化、追踪、评估或有意修改。

## 不属于核心范围

- 只有许多工具的单一智能体，仍然只是一个智能体节点。
- 由普通确定性函数组成的 DAG 属于工作流工程；它可以承载智能体图，但本身并不自动成为图工程。
- 没有契约、权限边界、状态规则或证据门的“角色群聊”不满足定义。
- 仅用于展示的组织图或事后可视化，如果不约束执行，也不满足定义。
- 图数据库、知识图谱、GNN 与 GraphRAG 只有在直接支撑智能体组织的协调或执行时才进入范围。
- 增加智能体并不天然更好；若单一智能体更可靠、更便宜，就应优先采用更小的系统。

## 核心原语

| 原语 | 关键工程问题 |
| --- | --- |
| **智能体节点** | 谁拥有此上下文、目标、能力与权限边界？ |
| **类型化边** | 什么可以沿关系传递，触发条件、模式与失败行为是什么？ |
| **组织图** | 哪些可复用角色可以委派、协作、验证或升级？ |
| **运行／工作图** | 这一次任务实际需要哪些依赖、分支、实例与产物？ |
| **证据门** | 哪些外部证据允许工作继续、拒绝或转交人工？ |
| **状态边界** | 什么被共享、隔离、检查点化，并以谁的记录为准？ |
| **图策略** | 谁可以创建、路由、重写、取消节点或边？ |

组织图回答“谁可以做什么、验证什么”；运行／工作图回答“本次执行下一步必须发生什么”。二者是互补的分析视角，并非强制要求实现两个物理图对象。

## 从这里开始

- 🌐 [探索交互式 Resource Atlas](https://chaoyue0307.github.io/awesome-graph-engineering/zh-Hans/)：查看动态组织图、九个工程层与可筛选资源。
- 🤗 [使用 Hugging Face 数据集](https://huggingface.co/datasets/cy0307/awesome-graph-engineering)：浏览或加载结构化资源记录。
- 🧭 [阅读完整定义与证据图](../../DEFINITION.md)：核查每个边界声明及其独立来源。
- 🧱 [查看分类体系](../../TAXONOMY.md)与[对比指南](../../COMPARISON.md)：区分图、循环、工作流和相关领域。
- 🛠️ [参与贡献](../../CONTRIBUTING.md)：修正翻译、提交资料或改进证据。
- 📚 [返回英文主目录](../../README.md)：浏览完整资源目录。

## 引用

Curated by He Chaoyue.

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

机器可读元数据见 [`CITATION.cff`](../../CITATION.cff)。

## 许可

本仓库的资源筛选、数据结构、摘要和原创内容采用 [CC0 1.0 Universal](../../LICENSE) 发布。外部链接作品仍遵循其各自的许可证与著作权。CC0 不放弃商标权或专利权，且不提供担保。欢迎为学术溯源进行引用，但 CC0 不要求引用。
