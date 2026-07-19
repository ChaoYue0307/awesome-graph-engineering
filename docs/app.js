import { GraphScene } from "./graph-scene.js";

const repoUrl = "https://github.com/ChaoYue0307/awesome-graph-engineering";
const layerOrder = [
  "Roles",
  "Topology",
  "Handoffs",
  "Work graphs",
  "State",
  "Gates",
  "Reliability",
  "Observability & cost",
  "Evolution",
  "Cross-layer",
];

const typeCodes = {
  Paper: "PPR",
  Blog: "ESS",
  Docs: "DOC",
  Tool: "SDK",
  Benchmark: "BNCH",
  Dataset: "DATA",
  Book: "BOOK",
  Course: "CRS",
  Video: "VID",
  List: "LIST",
  Standard: "SPEC",
  Critique: "CRIT",
};

function parseData() {
  const source = document.getElementById("atlas-data");
  if (!source) return [];
  try {
    const value = JSON.parse(source.textContent);
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.error("Unable to parse the embedded resource atlas.", error);
    return [];
  }
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : repoUrl;
  } catch {
    return repoUrl;
  }
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function fillSelect(select, values) {
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  const close = () => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".sr-only").textContent = "Open navigation";
  };

  toggle.addEventListener("click", () => {
    const open = !links.classList.contains("is-open");
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Close navigation" : "Open navigation";
  });

  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function setupGraphScenes() {
  const heroCanvas = document.getElementById("hero-graph");
  const modelCanvas = document.getElementById("model-graph");
  let heroScene;
  let modelScene;

  try {
    if (heroCanvas) {
      heroScene = new GraphScene(heroCanvas, {
        mode: "hero",
        autoRotate: true,
        rotationX: -0.21,
        rotationY: -0.46,
        zoom: 1.03,
      });
    }
    if (modelCanvas) {
      modelScene = new GraphScene(modelCanvas, {
        mode: "org",
        autoRotate: false,
        rotationX: -0.12,
        rotationY: -0.32,
      });
    }
  } catch (error) {
    console.error("The interactive graph could not initialize.", error);
  }

  const modeButtons = document.querySelectorAll("[data-graph-mode]");
  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.graphMode;
      modelScene?.setMode(mode);
      modeButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      document.querySelectorAll("[data-mode-copy]").forEach((copy) => {
        copy.hidden = copy.dataset.modeCopy !== mode;
      });
    });
  });

  return { heroScene, modelScene };
}

function setupAtlas(data) {
  const query = document.getElementById("atlas-query");
  const layer = document.getElementById("layer-filter");
  const type = document.getElementById("type-filter");
  const evidence = document.getElementById("evidence-filter");
  const results = document.getElementById("atlas-results");
  const count = document.getElementById("result-count");
  const clear = document.getElementById("clear-filters");
  const showMore = document.getElementById("show-more");
  const empty = document.getElementById("atlas-empty");
  const resourceStat = document.getElementById("resource-stat");

  if (!query || !layer || !type || !evidence || !results || !count || !clear || !showMore || !empty) return;

  const availableLayers = unique(data.map((row) => row.layer));
  fillSelect(layer, layerOrder.filter((name) => availableLayers.includes(name)).concat(availableLayers.filter((name) => !layerOrder.includes(name)).sort()));
  fillSelect(type, unique(data.map((row) => row.rtype)).sort());
  fillSelect(evidence, unique(data.map((row) => row.evidence)).sort());
  if (resourceStat) resourceStat.textContent = String(data.length || 0);

  const params = new URLSearchParams(location.search);
  query.value = params.get("q") || "";
  layer.value = params.get("layer") || "";
  type.value = params.get("type") || "";
  evidence.value = params.get("evidence") || "";

  const state = { shown: 12, rows: [] };

  function match(row) {
    if (layer.value && row.layer !== layer.value) return false;
    if (type.value && row.rtype !== type.value) return false;
    if (evidence.value && row.evidence !== evidence.value) return false;
    const terms = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return true;
    const haystack = [row.title, row.description, row.why, row.venue, row.authors, row.rtype, row.layer, row.section, row.subcategory]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase();
    return terms.every((term) => haystack.includes(term));
  }

  function updateUrl() {
    const next = new URLSearchParams();
    if (query.value.trim()) next.set("q", query.value.trim());
    if (layer.value) next.set("layer", layer.value);
    if (type.value) next.set("type", type.value);
    if (evidence.value) next.set("evidence", evidence.value);
    const suffix = next.toString();
    history.replaceState(null, "", `${location.pathname}${suffix ? `?${suffix}` : ""}${location.hash}`);
  }

  function createResource(row, index) {
    const item = document.createElement("article");
    item.className = "resource-item";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "resource-row";
    button.setAttribute("aria-expanded", "false");
    const detailId = `resource-detail-${row.id || index}`;
    button.setAttribute("aria-controls", detailId);

    const title = document.createElement("span");
    title.className = "resource-title";
    const typeCode = document.createElement("span");
    typeCode.className = "resource-type";
    typeCode.textContent = typeCodes[row.rtype] || "REF";
    const titleText = document.createElement("span");
    const strong = document.createElement("b");
    strong.textContent = row.title || "Untitled resource";
    const description = document.createElement("small");
    description.textContent = row.description || "No description available.";
    titleText.append(strong, description);
    title.append(typeCode, titleText);

    const meta = document.createElement("span");
    meta.className = "resource-meta";
    meta.textContent = [row.venue, row.year].filter(Boolean).join(" · ") || "—";

    const resourceLayer = document.createElement("span");
    resourceLayer.className = "resource-layer";
    resourceLayer.textContent = row.layer || "Cross-layer";

    const resourceEvidence = document.createElement("span");
    resourceEvidence.className = "resource-evidence";
    resourceEvidence.textContent = row.evidence || "Unlabeled";
    button.append(title, meta, resourceLayer, resourceEvidence);

    const details = document.createElement("div");
    details.className = "resource-details";
    details.id = detailId;
    details.hidden = true;
    const why = document.createElement("p");
    why.textContent = row.why || `Why it matters: ${row.description || "This resource is part of the curated field guide."}`;
    const link = document.createElement("a");
    link.href = safeUrl(row.url);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Open primary source ↗";
    details.append(why, link);

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      details.hidden = expanded;
    });

    item.append(button, details);
    return item;
  }

  function render({ reset = false } = {}) {
    if (reset) state.shown = 12;
    state.rows = data.filter(match);
    const visible = state.rows.slice(0, state.shown);
    results.replaceChildren(...visible.map(createResource));
    const filtersActive = Boolean(query.value.trim() || layer.value || type.value || evidence.value);
    count.textContent = `${state.rows.length} of ${data.length} resources${filtersActive ? " match" : ""}`;
    empty.hidden = state.rows.length !== 0;
    showMore.hidden = state.rows.length <= state.shown;
    clear.hidden = !filtersActive;
    updateUrl();
  }

  let inputTimer;
  query.addEventListener("input", () => {
    clearTimeout(inputTimer);
    inputTimer = setTimeout(() => render({ reset: true }), 80);
  });
  [layer, type, evidence].forEach((control) => control.addEventListener("change", () => render({ reset: true })));
  clear.addEventListener("click", () => {
    query.value = "";
    layer.value = "";
    type.value = "";
    evidence.value = "";
    render({ reset: true });
    query.focus();
  });
  showMore.addEventListener("click", () => {
    state.shown += 12;
    render();
  });

  document.querySelectorAll("[data-layer]").forEach((button) => {
    button.addEventListener("click", () => {
      layer.value = button.dataset.layer;
      render({ reset: true });
      document.getElementById("atlas")?.scrollIntoView({ behavior: "smooth" });
    });
  });
  document.querySelectorAll("[data-query]").forEach((link) => {
    link.addEventListener("click", () => {
      query.value = link.dataset.query;
      render({ reset: true });
    });
  });
  document.querySelectorAll("[data-layer-link]").forEach((link) => {
    link.addEventListener("click", () => {
      layer.value = link.dataset.layerLink;
      render({ reset: true });
    });
  });
  document.querySelectorAll("[data-section-link]").forEach((link) => {
    link.addEventListener("click", () => {
      query.value = link.dataset.sectionLink;
      render({ reset: true });
    });
  });

  render({ reset: true });
}

setupNavigation();
setupGraphScenes();
setupAtlas(parseData());
