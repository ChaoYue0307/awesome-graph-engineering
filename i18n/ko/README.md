<p align="center">
  <a href="https://chaoyue0307.github.io/awesome-graph-engineering/ko/">
    <img src="../../assets/logo.svg" width="112" alt="Awesome Graph Engineering 로고">
  </a>
</p>

<h1 align="center">Awesome Graph Engineering</h1>

<p align="center">
  <strong>개별 에이전트가 아니라 조직 전체를 엔지니어링하세요.</strong><br>
  프로그래밍 가능한 AI 에이전트 조직을 위한 실전 가이드, 오픈 데이터셋, 인터랙티브 아틀라스입니다.
</p>

<p align="center">
  <a href="https://chaoyue0307.github.io/awesome-graph-engineering/ko/">
    <img src="../../assets/visual-abstract.webp" alt="5개의 전문 AI 에이전트 모듈이 중앙 증거 게이트를 거쳐 영구 산출물로 연결된 모습" width="900">
  </a>
</p>

<p align="center">
  <a href="../../README.md">English</a> ·
  <a href="../zh-Hans/README.md">简体中文</a> ·
  <a href="../es/README.md">Español</a> ·
  <a href="../fr/README.md">Français</a> ·
  <a href="../de/README.md">Deutsch</a> ·
  <a href="../ja/README.md">日本語</a> ·
  <strong><a href="README.md">한국어</a></strong> ·
  <a href="../pt-BR/README.md">Português (Brasil)</a>
</p>

> [!IMPORTANT]
> 여기서 **Graph Engineering(그래프 엔지니어링)**은 AI 에이전트 시스템을 뜻합니다. 그래프 데이터베이스, 지식 그래프, 그래프 ETL, 그래프 신경망은 이 범위에 포함되지 않습니다.

## 실무 정의

**그래프 엔지니어링은 그래프 구조의 에이전트 시스템을 명세하고, 실행하고, 관측하고, 발전시키는 실천입니다. 여기에는 역할과 런타임 인스턴스, 이들을 연결하는 계약, 공유하는 상태와 산출물, 집단 행동을 판단하는 증거가 포함되며, 이를 통해 시스템 전체를 하나의 엔지니어링 대상으로 제어·테스트·개선할 수 있게 합니다.**

그래프는 장식이 아니라 실행을 떠받치는 구조여야 합니다. 선언된 토폴로지, 실제로 형성된 실행 그래프 또는 그래프 생성 정책이 실행을 실질적으로 제약하고, 버전 관리·추적·평가·의도적 변경이 가능할 만큼 검사할 수 있어야 합니다.

**Graph Engineering은 새롭게 형성되는 실무를 가리키는 잠정적 용어이며, 확립된 학문 분야나 업계 표준은 아닙니다.** 이 정의는 다중 에이전트 시스템, 분산 시스템, 워크플로 오케스트레이션, 언어 에이전트 그래프 연구를 종합합니다. [근거 지도](../../DEFINITION.md)에서 각 주장과 출처를 확인할 수 있습니다.

## 최소 세 가지 조건

시스템이 핵심 범위에 들어오려면 다음 세 조건이 모두 실행에 실질적인 영향을 주어야 합니다.

1. **경계가 분명한 복수의 에이전트 인스턴스**: 개별적으로 책임을 추적할 수 있는 런타임 인스턴스가 최소 두 개 있으며, 각각 컨텍스트, 권한, 목표 또는 책임을 소유하고 정해진 범위 안에서 다음 행동을 선택할 수 있어야 합니다.
2. **계약에 따른 조정**: 제어, 컨텍스트, 상태, 산출물 또는 평가가 어떻게 전달되는지, 그리고 결과를 언제 수락·거부·에스컬레이션하는지를 하나 이상의 명시적 관계가 규정해야 합니다.
3. **실행을 지탱하며 검사 가능한 그래프 산출물**: 토폴로지, 실행 그래프 또는 그래프 생성 정책이 실행을 실제로 제약하고 버전 관리·추적·평가·의도적 변경이 가능해야 합니다.

## 핵심 범위에 포함되지 않는 것

- 도구가 많더라도 단일 에이전트는 여전히 하나의 에이전트 노드입니다.
- 일반적인 결정론적 함수로만 이루어진 DAG는 워크플로 엔지니어링입니다. 에이전트 그래프의 기반이 될 수는 있지만 그 자체가 자동으로 그래프 엔지니어링이 되지는 않습니다.
- 계약, 권한 경계, 상태 규칙, 근거 게이트가 없는 “페르소나 그룹 채팅”은 조건을 충족하지 않습니다.
- 실행을 제약하지 않는 정적 조직도나 사후 시각화만으로는 충분하지 않습니다.
- 그래프 데이터베이스, 지식 그래프, GNN, GraphRAG는 에이전트 조직의 조정 또는 실행을 직접 지원할 때만 범위에 들어옵니다.
- 에이전트가 많다고 항상 더 좋은 것은 아닙니다. 단일 에이전트가 더 안정적이고 저렴하다면 더 작은 시스템을 선택해야 합니다.

## 핵심 프리미티브

| 프리미티브 | 핵심 엔지니어링 질문 |
| --- | --- |
| **에이전트 노드** | 이 컨텍스트, 목표, 역량, 권한 경계를 누가 소유하는가? |
| **타입이 지정된 엣지** | 무엇이 어떤 조건·스키마·실패 규칙에 따라 관계를 건너가는가? |
| **조직 그래프** | 어떤 재사용 가능한 역할이 위임·협업·검증·에스컬레이션할 수 있는가? |
| **실행／작업 그래프** | 이번 작업에 필요한 의존성, 분기, 인스턴스, 산출물은 무엇인가? |
| **근거 게이트** | 어떤 외부 증거가 진행·거부·사람에게 이관을 허용하는가? |
| **상태 경계** | 무엇을 공유·격리·체크포인트하고, 누가 공식 기록으로 관리하는가? |
| **그래프 정책** | 누가 노드와 엣지를 생성·라우팅·재작성·취소할 수 있는가? |

조직 그래프는 “누가 무엇을 수행하고 검증할 수 있는가?”에 답하고, 실행／작업 그래프는 “이번 실행에서 다음에 무엇이 일어나야 하는가?”에 답합니다. 둘은 상호 보완적인 분석 관점이지, 물리적 그래프 객체 두 개의 구현을 강제하는 표준이 아닙니다.

## 시작 경로

- 🌐 [인터랙티브 Resource Atlas](https://chaoyue0307.github.io/awesome-graph-engineering/ko/)에서 동적 조직 그래프, 아홉 개 엔지니어링 계층, 검색 가능한 자료를 살펴보세요.
- 🤗 [Hugging Face 데이터셋](https://huggingface.co/datasets/cy0307/awesome-graph-engineering)에서 구조화된 자료 레코드를 탐색하거나 불러오세요.
- 🧭 [전체 정의와 근거 지도](../../DEFINITION.md)에서 각 경계 주장과 독립 출처를 검토하세요.
- 🧱 [분류 체계](../../TAXONOMY.md)와 [비교 가이드](../../COMPARISON.md)에서 그래프, 루프, 워크플로, 인접 분야를 구분하세요.
- 🛠️ [기여하기](../../CONTRIBUTING.md)를 통해 번역 수정, 자료 제안, 근거 개선에 참여하세요.
- 📚 [영문 기본 디렉터리](../../README.md)에서 전체 자료 목록을 확인하세요.

## 인용

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

기계 판독 가능한 메타데이터는 [`CITATION.cff`](../../CITATION.cff)에 있습니다.

## 라이선스

이 저장소의 큐레이션, 스키마, 요약 및 자체 제작 자료는 [CC0 1.0 Universal](../../LICENSE)으로 공개합니다. 링크된 외부 저작물에는 각각의 라이선스와 저작권이 적용됩니다. CC0는 상표권이나 특허권을 포기하지 않으며 어떠한 보증도 제공하지 않습니다. 학술적 추적 가능성을 위한 인용은 권장하지만 CC0의 의무 사항은 아닙니다.
