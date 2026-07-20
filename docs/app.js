import { GraphScene } from "./graph-scene.js?v=20260720-16";
import { setupLocalization } from "./i18n.js?v=20260720-7";

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

  const close = ({ returnFocus = false } = {}) => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".sr-only").textContent = "Open navigation";
    document.body.classList.remove("nav-open");
    if (returnFocus) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener("click", () => {
    const open = !links.classList.contains("is-open");
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Close navigation" : "Open navigation";
    document.body.classList.toggle("nav-open", open);
  });

  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && links.classList.contains("is-open")) close({ returnFocus: true });
  });

  document.addEventListener("pointerdown", (event) => {
    if (!links.classList.contains("is-open")) return;
    if (links.contains(event.target) || toggle.contains(event.target)) return;
    close();
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

  document.querySelectorAll("[data-graph-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!modelScene) return;
      const action = button.dataset.graphZoom;
      if (action === "in") modelScene.setZoom(modelScene.targetZoom + 0.1);
      if (action === "out") modelScene.setZoom(modelScene.targetZoom - 0.1);
      if (action === "reset") modelScene.resetView();
      modelCanvas?.focus({ preventScroll: true });
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
  const copyView = document.getElementById("copy-view");
  const shareView = document.getElementById("share-view");
  const shareStatus = document.getElementById("share-status");
  const filterToggle = document.getElementById("filter-toggle");
  const filterFields = document.getElementById("atlas-filter-fields");
  const filterCount = document.getElementById("filter-count");

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

  const anchorId = location.hash ? decodeURIComponent(location.hash.slice(1)) : "";
  const anchorIndex = anchorId ? data.findIndex((row) => row.id === anchorId) : -1;
  const state = { shown: anchorIndex >= 0 ? Math.ceil((anchorIndex + 1) / 12) * 12 : 12, rows: [] };
  let anchorHandled = false;

  function setFiltersOpen(open) {
    if (!filterToggle || !filterFields) return;
    filterFields.classList.toggle("is-open", open);
    filterToggle.setAttribute("aria-expanded", String(open));
  }

  function updateFilterDisclosure() {
    const active = [layer.value, type.value, evidence.value].filter(Boolean).length;
    if (filterCount) {
      filterCount.hidden = active === 0;
      filterCount.textContent = `${active} active`;
    }
    if (active > 0 && matchMedia("(max-width: 620px)").matches) setFiltersOpen(true);
  }

  filterToggle?.addEventListener("click", () => {
    setFiltersOpen(filterToggle.getAttribute("aria-expanded") !== "true");
  });

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
    const locale = new URLSearchParams(location.search).get("lang");
    if (locale && locale !== "en") next.set("lang", locale);
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
    item.id = row.id || `resource-${index}`;

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
    const permalink = document.createElement("button");
    permalink.type = "button";
    permalink.className = "resource-permalink";
    permalink.textContent = "Copy permalink";
    permalink.addEventListener("click", async () => {
      const url = new URL(location.href);
      url.hash = item.id;
      try {
        await navigator.clipboard.writeText(url.href);
        if (shareStatus) shareStatus.textContent = `Copied permalink for ${row.title}.`;
        permalink.textContent = "Copied ✓";
        setTimeout(() => { permalink.textContent = "Copy permalink"; }, 1600);
      } catch {
        location.hash = item.id;
        if (shareStatus) shareStatus.textContent = "The permalink is now in the address bar.";
      }
    });
    const detailActions = document.createElement("div");
    detailActions.className = "resource-detail-actions";
    detailActions.append(link, permalink);
    details.append(why, detailActions);

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
    if (!anchorHandled && anchorId) {
      const filteredAnchorIndex = state.rows.findIndex((row) => row.id === anchorId);
      if (filteredAnchorIndex >= state.shown) state.shown = Math.ceil((filteredAnchorIndex + 1) / 12) * 12;
    }
    const visible = state.rows.slice(0, state.shown);
    results.replaceChildren(...visible.map(createResource));
    const filtersActive = Boolean(query.value.trim() || layer.value || type.value || evidence.value);
    count.textContent = `${state.rows.length} of ${data.length} resources${filtersActive ? " match" : ""}`;
    empty.hidden = state.rows.length !== 0;
    showMore.hidden = state.rows.length <= state.shown;
    clear.hidden = !filtersActive;
    updateFilterDisclosure();
    updateUrl();

    const anchored = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (anchored?.classList.contains("resource-item")) {
      const anchoredButton = anchored.querySelector(".resource-row");
      const anchoredDetails = anchored.querySelector(".resource-details");
      if (anchoredButton && anchoredDetails) {
        anchoredButton.setAttribute("aria-expanded", "true");
        anchoredDetails.hidden = false;
        if (!anchorHandled) {
          anchorHandled = true;
          requestAnimationFrame(() => anchored.scrollIntoView({ block: "start", behavior: "auto" }));
        }
      }
    }
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
    setFiltersOpen(false);
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
      const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("atlas")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
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

  const announce = (message) => {
    if (shareStatus) shareStatus.textContent = message;
  };

  copyView?.addEventListener("click", async () => {
    updateUrl();
    try {
      await navigator.clipboard.writeText(location.href);
      announce("Filtered atlas link copied.");
      copyView.textContent = "Copied ✓";
      setTimeout(() => { copyView.textContent = "Copy filtered view"; }, 1600);
    } catch {
      announce("Copy was unavailable. The filtered link is in the address bar.");
    }
  });

  shareView?.addEventListener("click", async () => {
    updateUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Awesome Graph Engineering",
          text: "Explore this filtered view of the graph engineering atlas.",
          url: location.href,
        });
        announce("Share sheet opened.");
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(location.href);
      announce("Share link copied.");
    } catch {
      announce("The share link is ready in the address bar.");
    }
  });

  render({ reset: true });
}

setupLocalization();
setupNavigation();
setupGraphScenes();
setupAtlas(parseData());
