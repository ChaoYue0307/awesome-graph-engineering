<p align="center">
  <a href="https://chaoyue0307.github.io/awesome-graph-engineering/">
    <img src="../../assets/logo.svg" width="112" alt="Logo d’Awesome Graph Engineering">
  </a>
</p>

<h1 align="center">Awesome Graph Engineering</h1>

<p align="center">
  <strong>Concevez l’organisation, pas seulement l’agent.</strong><br>
  Guide pratique, jeu de données ouvert et atlas interactif pour les organisations programmables d’agents IA.
</p>

<p align="center">
  <a href="../../README.md">English</a> ·
  <a href="../zh-Hans/README.md">简体中文</a> ·
  <a href="../es/README.md">Español</a> ·
  <strong><a href="./README.md">Français</a></strong> ·
  <a href="../de/README.md">Deutsch</a> ·
  <a href="../ja/README.md">日本語</a> ·
  <a href="../ko/README.md">한국어</a> ·
  <a href="../pt-BR/README.md">Português (Brasil)</a>
</p>

> [!NOTE]
> Cette page est une **première traduction éditoriale** ; une relecture technique par des locuteurs natifs est la bienvenue. Le [README anglais](../../README.md) demeure la version canonique.

<!-- -->

> [!IMPORTANT]
> Ici, *graph engineering* désigne les systèmes d’agents IA. Ce guide ne porte pas sur les bases de données de graphes, les graphes de connaissances, l’ETL de graphes ni les réseaux neuronaux de graphes.

## Définition de travail

**Le graph engineering est la pratique qui consiste à spécifier, exécuter, observer et faire évoluer un système d’agents structuré en graphe : ses rôles et instances d’exécution, les contrats qui les relient, l’état et les artefacts qu’ils partagent, ainsi que les preuves permettant de juger leur comportement collectif, afin de contrôler, tester et améliorer le système comme un tout conçu.**

Le graphe doit être opérant et non décoratif : sa topologie déclarée, le graphe réalisé lors d’une exécution ou la politique qui le génère doit contraindre matériellement l’exécution et rester suffisamment inspectable pour être versionné, tracé, évalué ou modifié de manière délibérée.

Nous employons cette expression comme **terme de travail pour une pratique émergente**, et non comme une norme académique ou industrielle établie. La définition synthétise des travaux sur les systèmes multi-agents, les protocoles, l’exécution durable, l’observabilité, l’évaluation et les résultats négatifs ; elle ne provient pas d’une source unique. Voir la [carte des affirmations et des preuves](../../DEFINITION.md#evidence-map-for-the-synthesis).

## Test minimal : trois conditions nécessaires

1. **Plusieurs nœuds agents aux périmètres indépendants :** des rôles ou instances distincts possèdent leur contexte, leur autorité ou leurs objectifs.
2. **Une sémantique de coordination explicite :** les arêtes précisent ce qui peut circuler, quand le contrôle est transféré et comment les résultats sont acceptés ou rejetés.
3. **Un artefact de graphe inspectable :** la topologie, le graphe d’exécution ou sa politique génératrice peut être versionné, tracé, évalué ou modifié intentionnellement.

## Limites du périmètre

- Un agent unique doté de nombreux outils reste un seul nœud.
- Un DAG déterministe de fonctions ordinaires relève de l’ingénierie des workflows, sauf s’il sert de substrat à de véritables nœuds agents.
- Une discussion entre personnages sans contrats, frontières d’état ni portes de validation ne suffit pas.
- Une visualisation a posteriori ou un organigramme statique ne compte pas s’il ne contraint pas l’exécution et n’aide pas à la diagnostiquer.
- Les bases de données de graphes, GraphRAG, graphes de connaissances et GNN n’entrent dans le périmètre que s’ils soutiennent directement la coordination d’une organisation d’agents.
- Davantage d’agents ne signifie pas automatiquement un meilleur système : le graphe doit justifier son coût de coordination face à la plus petite solution fiable.

## Primitives essentielles

| Primitive | Question d’ingénierie |
| --- | --- |
| **Nœud agent** | Qui possède ce contexte, cet objectif, cette capacité et cette frontière d’autorisation ? |
| **Arête typée** | Qu’est-ce qui traverse cette relation, selon quel schéma et quelles préconditions ? |
| **Graphe organisationnel** | Quels rôles réutilisables peuvent déléguer, vérifier ou escalader ? |
| **Graphe d’exécution/de travail** | Quelles tâches, dépendances et preuves cette exécution exige-t-elle ? |
| **Porte de validation** | Quelle preuve permet d’avancer, de rejeter ou d’escalader le travail ? |
| **Frontière d’état** | Qu’est-ce qui est partagé, isolé, sauvegardé ou considéré comme référence ? |
| **Politique du graphe** | Qui peut créer, rediriger, annuler ou réécrire les nœuds et arêtes ? |

Le graphe organisationnel décrit l’autorité et les relations permises ; le graphe d’exécution décrit ce qui s’est produit ou doit se produire pour un travail donné. Ce sont des vues analytiques complémentaires, pas des standards universels.

## Explorer et contribuer

- 🧭 [Atlas interactif et visualisation du système](https://chaoyue0307.github.io/awesome-graph-engineering/)
- 🤗 [Jeu de données sur Hugging Face](https://huggingface.co/datasets/cy0307/awesome-graph-engineering)
- 🔬 [Définition complète et carte des preuves](../../DEFINITION.md)
- 🧱 [Taxonomie en neuf couches](../../TAXONOMY.md) et [comparaison des concepts](../../COMPARISON.md)
- 🛠️ [Contribuer ou proposer une traduction](../../CONTRIBUTING.md)
- 📚 [Méthode de sélection](../../METHODOLOGY.md) et [métadonnées de citation](../../CITATION.cff)

Ne dupliquez pas les tableaux de ressources dans cette traduction : le [répertoire canonique](../../README.md#resource-directory), l’atlas et le jeu de données sont produits depuis la même source structurée.

## Citer le projet

Nom de l’auteur : **He Chaoyue**. Conservez le titre original du projet dans toute citation :

```bibtex
@misc{he2026awesomegraphengineering,
  author = {He, Chaoyue},
  title  = {Awesome Graph Engineering},
  year   = {2026},
  url    = {https://github.com/ChaoYue0307/awesome-graph-engineering}
}
```

Les données et métadonnées originales sont publiées sous [CC0-1.0](../../LICENSE) ; chaque œuvre liée conserve la licence de son auteur.
