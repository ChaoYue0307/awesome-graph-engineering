const palette = {
  ink: "#050811",
  cyan: "#61e4ff",
  cyanSoft: "rgba(97, 228, 255, 0.28)",
  violet: "#9d7dff",
  violetSoft: "rgba(157, 125, 255, 0.26)",
  green: "#b8f24a",
  text: "#f6f8fc",
  muted: "#9aa6b8",
  plate: "#0e1a2d",
};

const ORG_GRAPH = {
  nodes: [
    { id: "orchestrator", label: "Orchestrator", role: "route + re-plan", p: [0, 1.45, 0.15], color: "cyan" },
    { id: "research", label: "Research", role: "find evidence", p: [-1.65, 0.15, 0.45], color: "cyan" },
    { id: "build", label: "Build", role: "make artifacts", p: [1.65, 0.15, 0.1], color: "violet" },
    { id: "review", label: "Review", role: "verify output", p: [0, -1.35, 0.55], color: "green", gate: true },
  ],
  edges: [
    ["orchestrator", "research"], ["orchestrator", "build"], ["research", "build"],
    ["research", "review"], ["build", "review"], ["review", "orchestrator"],
  ],
};

const WORK_GRAPH = {
  nodes: [
    { id: "plan", label: "Plan", role: "T0", p: [-2.4, 0, 0.15], color: "cyan" },
    { id: "r1", label: "Research A", role: "T1", p: [-1.25, 1.05, 0.5], color: "violet" },
    { id: "r2", label: "Research B", role: "T2", p: [-1.25, 0.25, -0.15], color: "violet" },
    { id: "i1", label: "Implement A", role: "T3", p: [-1.25, -0.55, 0.2], color: "violet" },
    { id: "i2", label: "Implement B", role: "T4", p: [-1.25, -1.35, -0.3], color: "violet" },
    { id: "gate", label: "Evidence gate", role: "G1", p: [0.15, 0, 0.45], color: "green", gate: true },
    { id: "synth", label: "Synthesize", role: "T5", p: [1.35, 0.7, 0.05], color: "violet" },
    { id: "refine", label: "Refine", role: "T6", p: [1.35, -0.7, 0.35], color: "violet" },
    { id: "deliver", label: "Deliver", role: "T7", p: [2.4, 0, 0.1], color: "cyan" },
  ],
  edges: [
    ["plan", "r1"], ["plan", "r2"], ["plan", "i1"], ["plan", "i2"],
    ["r1", "gate"], ["r2", "gate"], ["i1", "gate"], ["i2", "gate"],
    ["gate", "synth"], ["gate", "refine"], ["synth", "deliver"], ["refine", "deliver"],
  ],
};

const HERO_GRAPH = {
  nodes: [
    { id: "lead", label: "Lead", role: "orchestrate", p: [-0.25, 1.25, 0.15], color: "cyan" },
    { id: "research", label: "Research", role: "specialist", p: [-1.8, 0.55, 0.65], color: "cyan" },
    { id: "planner", label: "Plan", role: "specialist", p: [1.4, 1.05, -0.1], color: "violet" },
    { id: "buildA", label: "Build A", role: "worker", p: [-1.4, -0.75, 0.15], color: "violet" },
    { id: "gate", label: "Gate", role: "evidence", p: [0.15, 0.05, 0.7], color: "green", gate: true },
    { id: "buildB", label: "Build B", role: "worker", p: [1.55, -0.35, 0.2], color: "cyan" },
    { id: "review", label: "Review", role: "judge", p: [0.25, -1.35, -0.15], color: "violet" },
    { id: "human", label: "Human", role: "escalation", p: [2.25, 0.75, 0.6], color: "cyan" },
  ],
  edges: [
    ["lead", "research"], ["lead", "planner"], ["research", "gate"], ["planner", "gate"],
    ["gate", "buildA"], ["gate", "buildB"], ["buildA", "review"], ["buildB", "review"],
    ["review", "lead"], ["gate", "human"], ["human", "buildB"],
  ],
};

const HERO_GRAPH_COMPACT = {
  nodes: [
    { id: "lead", label: "Lead", role: "orchestrate", p: [-0.9, 1.8, 0.15], color: "cyan" },
    { id: "research", label: "Research", role: "specialist", p: [-1.2, 0.8, 0.4], color: "cyan" },
    { id: "planner", label: "Plan", role: "specialist", p: [1.2, 0.8, -0.1], color: "violet" },
    { id: "buildA", label: "Build A", role: "worker", p: [-1.2, -0.8, 0.2], color: "violet" },
    { id: "gate", label: "Gate", role: "evidence", p: [0, 0, 0.65], color: "green", gate: true },
    { id: "buildB", label: "Build B", role: "worker", p: [1.2, -0.8, 0.2], color: "cyan" },
    { id: "review", label: "Review", role: "judge", p: [0, -1.7, -0.1], color: "violet" },
    { id: "human", label: "Human", role: "escalation", p: [0.9, 1.8, 0.5], color: "cyan" },
  ],
  edges: HERO_GRAPH.edges,
};

const HERO_GRAPH_LANDSCAPE = {
  nodes: [
    { id: "lead", label: "Lead", role: "orchestrate", p: [-2.7, 1, 0.15], color: "cyan" },
    { id: "research", label: "Research", role: "specialist", p: [-0.9, 1, 0.4], color: "cyan" },
    { id: "planner", label: "Plan", role: "specialist", p: [1.8, 1, -0.1], color: "violet" },
    { id: "human", label: "Human", role: "escalation", p: [3.2, 1, 0.5], color: "cyan" },
    { id: "gate", label: "Gate", role: "evidence", p: [0, 0, 0.65], color: "green", gate: true },
    { id: "buildA", label: "Build A", role: "worker", p: [-2, -1.25, 0.2], color: "violet" },
    { id: "buildB", label: "Build B", role: "worker", p: [0, -1.25, 0.2], color: "cyan" },
    { id: "review", label: "Review", role: "judge", p: [2, -1.25, -0.1], color: "violet" },
  ],
  edges: HERO_GRAPH.edges,
};

const ORG_GRAPH_COMPACT = {
  nodes: [
    { id: "orchestrator", label: "Orchestrator", role: "route + re-plan", p: [0, 1.8, 0.15], color: "cyan" },
    { id: "research", label: "Research", role: "find evidence", p: [-1.25, 0.2, 0.45], color: "cyan" },
    { id: "build", label: "Build", role: "make artifacts", p: [1.25, 0.2, 0.1], color: "violet" },
    { id: "review", label: "Review", role: "verify output", p: [0, -1.8, 0.55], color: "green", gate: true },
  ],
  edges: ORG_GRAPH.edges,
};

const WORK_GRAPH_COMPACT = {
  nodes: [
    { id: "plan", label: "Plan", role: "T0", p: [0, 2.2, 0.15], color: "cyan" },
    { id: "r1", label: "Research A", role: "T1", p: [-1.25, 1.25, 0.5], color: "violet" },
    { id: "r2", label: "Research B", role: "T2", p: [1.25, 1.25, -0.15], color: "violet" },
    { id: "i1", label: "Implement A", role: "T3", p: [-1.25, 0.25, 0.2], color: "violet" },
    { id: "i2", label: "Implement B", role: "T4", p: [1.25, 0.25, -0.3], color: "violet" },
    { id: "gate", label: "Evidence gate", role: "G1", p: [0, -0.55, 0.45], color: "green", gate: true },
    { id: "synth", label: "Synthesize", role: "T5", p: [-1.25, -1.35, 0.05], color: "violet" },
    { id: "refine", label: "Refine", role: "T6", p: [1.25, -1.35, 0.35], color: "violet" },
    { id: "deliver", label: "Deliver", role: "T7", p: [0, -2.2, 0.1], color: "cyan" },
  ],
  edges: WORK_GRAPH.edges,
};

function mix(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function boxesOverlap(a, b, gap = 0) {
  return a.left < b.right + gap
    && a.right > b.left - gap
    && a.top < b.bottom + gap
    && a.bottom > b.top - gap;
}

function colorFor(node) {
  return palette[node.color] || palette.cyan;
}

function softColorFor(node) {
  if (node.color === "green") return "rgba(184, 242, 74, 0.26)";
  if (node.color === "violet") return palette.violetSoft;
  return palette.cyanSoft;
}

export class GraphScene {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.mode = options.mode || "hero";
    this.autoRotate = options.autoRotate ?? false;
    this.interactive = options.interactive ?? true;
    this.motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    this.reducedMotion = this.motionQuery.matches;
    this.rotationX = options.rotationX ?? -0.18;
    this.rotationY = options.rotationY ?? -0.42;
    this.targetRotationX = this.rotationX;
    this.targetRotationY = this.rotationY;
    this.baseRotationX = this.rotationX;
    this.baseRotationY = this.rotationY;
    this.zoom = options.zoom ?? 1;
    this.targetZoom = this.zoom;
    this.canvas.dataset.zoom = this.zoom.toFixed(2);
    this.canvas.dataset.graphMode = this.mode;
    this.pointer = null;
    this.raf = 0;
    this.lastDecorativeFrame = 0;
    this.monoFont = getComputedStyle(document.documentElement).getPropertyValue("--mono").trim() || "monospace";
    this.inViewport = true;
    this.renderFrame = this.renderFrame.bind(this);
    this.onViewportResize = () => this.resize();
    this.onMotionChange = (event) => {
      this.reducedMotion = event.matches;
      if (this.reducedMotion) {
        this.pause();
        this.rotationX = this.targetRotationX;
        this.rotationY = this.targetRotationY;
        this.zoom = this.targetZoom;
        this.draw(performance.now());
      } else {
        this.requestFrame();
      }
    };
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.bind();
    this.resize();
    this.onVisibilityChange = () => {
      if (document.hidden) this.pause();
      else this.requestFrame();
    };
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.inViewport = Boolean(entry?.isIntersecting);
      if (this.inViewport) this.requestFrame();
      else this.pause();
    }, { rootMargin: "120px 0px" });
    this.intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    window.addEventListener("orientationchange", this.onViewportResize);
    window.visualViewport?.addEventListener("resize", this.onViewportResize);
    this.motionQuery.addEventListener?.("change", this.onMotionChange);
    this.requestFrame();
  }

  get usesCompactGraph() {
    if (this.mode === "hero") return this.cssWidth <= 640;
    return this.cssWidth <= 720;
  }

  get usesLandscapeGraph() {
    return this.mode === "hero" && this.cssWidth > 640 && this.cssHeight <= 360;
  }

  get graph() {
    if (this.mode === "org") return this.usesCompactGraph ? ORG_GRAPH_COMPACT : ORG_GRAPH;
    if (this.mode === "work") return this.usesCompactGraph ? WORK_GRAPH_COMPACT : WORK_GRAPH;
    if (this.usesLandscapeGraph) return HERO_GRAPH_LANDSCAPE;
    return this.usesCompactGraph ? HERO_GRAPH_COMPACT : HERO_GRAPH;
  }

  get maximumZoom() {
    if (this.usesCompactGraph) return 1.1;
    return this.mode === "work" ? 1.14 : 1.18;
  }

  viewForMode(mode = this.mode) {
    if (mode === "hero") return { x: -0.21, y: -0.46, zoom: 1.03 };
    if (mode === "work") return { x: -0.12, y: -0.08, zoom: this.cssWidth <= 720 ? 0.98 : 0.92 };
    return { x: -0.12, y: -0.32, zoom: 1 };
  }

  rotationBounds(mode = this.mode) {
    if (mode === "hero") return { minX: -0.4, maxX: 0.1, minY: -0.62, maxY: -0.22 };
    if (mode === "work") return { minX: -0.34, maxX: 0.18, minY: -0.28, maxY: 0.12 };
    return { minX: -0.4, maxX: 0.18, minY: -0.55, maxY: -0.1 };
  }

  clampRotationTargets() {
    const bounds = this.rotationBounds();
    this.targetRotationX = clamp(this.targetRotationX, bounds.minX, bounds.maxX);
    this.targetRotationY = clamp(this.targetRotationY, bounds.minY, bounds.maxY);
  }

  requestFrame() {
    if (!this.inViewport || document.hidden) return;
    if (this.reducedMotion) {
      this.draw(performance.now());
      return;
    }
    if (!this.raf) this.raf = requestAnimationFrame(this.renderFrame);
  }

  pause() {
    if (!this.raf) return;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  setMode(mode) {
    if (!['org', 'work', 'hero'].includes(mode)) return;
    this.mode = mode;
    this.canvas.dataset.graphMode = mode;
    const view = this.viewForMode(mode);
    this.baseRotationX = view.x;
    this.baseRotationY = view.y;
    this.rotationX = view.x;
    this.rotationY = view.y;
    this.targetRotationX = view.x;
    this.targetRotationY = view.y;
    this.zoom = view.zoom;
    this.targetZoom = view.zoom;
    this.canvas.dataset.zoom = this.targetZoom.toFixed(2);
    this.requestFrame();
  }

  setZoom(value) {
    this.autoRotate = false;
    this.targetZoom = clamp(value, 0.74, this.maximumZoom);
    this.canvas.dataset.zoom = this.targetZoom.toFixed(2);
    if (this.reducedMotion) {
      this.zoom = this.targetZoom;
    }
    this.requestFrame();
  }

  resetView() {
    this.autoRotate = false;
    const view = this.viewForMode();
    this.baseRotationX = view.x;
    this.baseRotationY = view.y;
    this.targetRotationX = view.x;
    this.targetRotationY = view.y;
    this.targetZoom = view.zoom;
    this.canvas.dataset.zoom = this.targetZoom.toFixed(2);
    if (this.reducedMotion) {
      this.rotationX = this.targetRotationX;
      this.rotationY = this.targetRotationY;
      this.zoom = this.targetZoom;
    }
    this.requestFrame();
  }

  bind() {
    if (!this.interactive) return;
    this.onPointerDown = (event) => {
      this.canvas.focus({ preventScroll: true });
      this.pointer = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        startX: event.clientX,
        startY: event.clientY,
        type: event.pointerType,
        dragging: event.pointerType !== "touch",
      };
      if (event.pointerType !== "touch") this.canvas.setPointerCapture?.(event.pointerId);
      this.autoRotate = false;
      this.requestFrame();
    };
    this.onPointerMove = (event) => {
      if (!this.pointer || this.pointer.id !== event.pointerId) return;
      if (this.pointer.type === "touch" && !this.pointer.dragging) {
        const totalX = event.clientX - this.pointer.startX;
        const totalY = event.clientY - this.pointer.startY;
        if (Math.abs(totalY) > 8 && Math.abs(totalY) > Math.abs(totalX)) {
          this.pointer = null;
          return;
        }
        if (Math.abs(totalX) < 8 || Math.abs(totalX) <= Math.abs(totalY)) return;
        this.pointer.dragging = true;
        this.canvas.setPointerCapture?.(event.pointerId);
      }
      const dx = event.clientX - this.pointer.x;
      const dy = event.clientY - this.pointer.y;
      this.targetRotationY += dx * 0.008;
      this.targetRotationX += dy * 0.006;
      this.clampRotationTargets();
      this.pointer.x = event.clientX;
      this.pointer.y = event.clientY;
      if (this.reducedMotion) {
        this.rotationX = this.targetRotationX;
        this.rotationY = this.targetRotationY;
      }
      this.requestFrame();
    };
    this.onPointerUp = (event) => {
      if (this.pointer?.id !== event.pointerId) return;
      if (this.canvas.hasPointerCapture?.(event.pointerId)) this.canvas.releasePointerCapture(event.pointerId);
      this.pointer = null;
      this.requestFrame();
    };
    this.onWheel = (event) => {
      if (!this.canvas.matches(":focus") || !event.altKey) return;
      event.preventDefault();
      this.setZoom(this.targetZoom - event.deltaY * 0.0008);
    };
    this.onKeyDown = (event) => {
      const actions = {
        ArrowLeft: () => { this.targetRotationY -= 0.12; },
        ArrowRight: () => { this.targetRotationY += 0.12; },
        ArrowUp: () => { this.targetRotationX -= 0.1; },
        ArrowDown: () => { this.targetRotationX += 0.1; },
        "+": () => this.setZoom(this.targetZoom + 0.1),
        "=": () => this.setZoom(this.targetZoom + 0.1),
        "-": () => this.setZoom(this.targetZoom - 0.1),
        "0": () => this.resetView(),
      };
      const action = actions[event.key];
      if (!action) return;
      event.preventDefault();
      this.autoRotate = false;
      action();
      this.clampRotationTargets();
      if (this.reducedMotion) {
        this.rotationX = this.targetRotationX;
        this.rotationY = this.targetRotationY;
      }
      this.requestFrame();
    };
    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    this.canvas.addEventListener("pointermove", this.onPointerMove);
    this.canvas.addEventListener("pointerup", this.onPointerUp);
    this.canvas.addEventListener("pointercancel", this.onPointerUp);
    this.canvas.addEventListener("wheel", this.onWheel, { passive: false });
    this.canvas.addEventListener("keydown", this.onKeyDown);
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    const changed = this.canvas.width !== width
      || this.canvas.height !== height
      || this.dpr !== dpr
      || this.cssWidth !== rect.width
      || this.cssHeight !== rect.height;
    this.dpr = dpr;
    this.cssWidth = rect.width;
    this.cssHeight = rect.height;
    this.canvas.dataset.layoutViewport = `${Math.round(rect.width)}x${Math.round(rect.height)}`;
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    if (changed) this.draw(performance.now());
  }

  rotate([x, y, z]) {
    const cy = Math.cos(this.rotationY);
    const sy = Math.sin(this.rotationY);
    const cx = Math.cos(this.rotationX);
    const sx = Math.sin(this.rotationX);
    const x1 = x * cy - z * sy;
    const z1 = x * sy + z * cy;
    const y1 = y * cx - z1 * sx;
    const z2 = y * sx + z1 * cx;
    return [x1, y1, z2];
  }

  safeRect() {
    const compactPad = this.cssWidth <= 360 ? 10 : 16;
    const horizontalPad = this.usesCompactGraph ? compactPad : 30;
    const toolbarIsInline = matchMedia("(max-width: 720px)").matches;
    const heroKeyIsInline = matchMedia("(max-width: 920px)").matches;
    const top = this.mode !== "hero" && !toolbarIsInline ? 82 : 18;
    const bottomInset = this.mode === "hero" && !heroKeyIsInline ? 72 : 18;
    return {
      left: horizontalPad,
      right: Math.max(horizontalPad + 1, this.cssWidth - horizontalPad),
      top,
      bottom: Math.max(top + 1, this.cssHeight - bottomInset),
    };
  }

  labelStyle(node) {
    const compact = this.usesCompactGraph;
    const fontSize = compact ? 10 : this.mode === "hero" ? 11 : 12;
    const showRole = !compact && !this.usesLandscapeGraph && this.cssWidth > 780 && Boolean(node.role);
    const roleFontSize = 10;
    this.ctx.font = `700 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
    const labelWidth = this.ctx.measureText(node.label).width;
    let roleWidth = 0;
    if (showRole) {
      this.ctx.font = `${roleFontSize}px ui-monospace, monospace`;
      roleWidth = this.ctx.measureText(node.role).width;
    }
    return {
      fontSize,
      roleFontSize,
      showRole,
      width: Math.ceil(Math.max(labelWidth, roleWidth) + 6),
      height: fontSize + (showRole ? roleFontSize + 7 : 2),
    };
  }

  nodeRadius(node, perspective = 1) {
    const base = this.usesCompactGraph ? (node.gate ? 21 : 23) : (node.gate ? 28 : 31);
    const minimum = this.usesCompactGraph ? 19 : 23;
    const maximum = this.usesCompactGraph ? 25 : 34;
    return clamp(base * perspective, minimum, maximum);
  }

  computeProjectionLayout() {
    const safe = this.safeRect();
    const points = this.graph.nodes.map((node) => {
      const [x, y, z] = this.rotate(node.p);
      const perspective = 1 / (1 + z * 0.08);
      return { node, u: x * perspective, v: -y * perspective, z, perspective };
    });
    const minU = Math.min(...points.map((point) => point.u));
    const maxU = Math.max(...points.map((point) => point.u));
    const minV = Math.min(...points.map((point) => point.v));
    const maxV = Math.max(...points.map((point) => point.v));
    const styles = points.map(({ node }) => this.labelStyle(node));
    const maxLabelWidth = Math.max(...styles.map((style) => style.width));
    const maxLabelHeight = Math.max(...styles.map((style) => style.height));
    const maxRadius = Math.max(...points.map(({ node, perspective }) => this.nodeRadius(node, perspective) * (node.gate ? 1.12 : 1)));
    const horizontalMargin = Math.max(maxRadius + 7, maxLabelWidth * 0.5 + 5);
    const verticalMargin = maxRadius + maxLabelHeight + 12;
    const availableWidth = Math.max(1, safe.right - safe.left - horizontalMargin * 2);
    const availableHeight = Math.max(1, safe.bottom - safe.top - verticalMargin * 2);
    const spanU = Math.max(0.1, maxU - minU);
    const spanV = Math.max(0.1, maxV - minV);
    const fittedScale = Math.min(availableWidth / spanU, availableHeight / spanV);
    const headroom = this.usesCompactGraph ? 0.88 : 0.84;
    const scale = Math.max(18, fittedScale * headroom * this.zoom);
    const centerX = (safe.left + safe.right) * 0.5 - (minU + maxU) * 0.5 * scale;
    const centerY = (safe.top + safe.bottom) * 0.5 - (minV + maxV) * 0.5 * scale;
    return { safe, scale, centerX, centerY };
  }

  project(point) {
    const [x, y, z] = this.rotate(point);
    const perspective = 1 / (1 + z * 0.08);
    return {
      x: this.projectionLayout.centerX + x * this.projectionLayout.scale * perspective,
      y: this.projectionLayout.centerY - y * this.projectionLayout.scale * perspective,
      z,
      s: perspective,
    };
  }

  drawGrid() {
    const ctx = this.ctx;
    const w = this.cssWidth;
    const h = this.cssHeight;
    ctx.save();
    ctx.strokeStyle = "rgba(97, 228, 255, 0.055)";
    ctx.lineWidth = 1;
    const horizon = h * 0.55;
    for (let i = -8; i <= 8; i += 1) {
      const x = w / 2 + i * (w / 15);
      ctx.beginPath();
      ctx.moveTo(w / 2 + i * 8, horizon * 0.35);
      ctx.lineTo(x, h * 0.96);
      ctx.stroke();
    }
    for (let i = 0; i < 10; i += 1) {
      const t = i / 9;
      const y = mix(horizon * 0.42, h * 0.96, t * t);
      ctx.globalAlpha = mix(0.25, 0.95, t);
      ctx.beginPath();
      ctx.moveTo(w * 0.03, y);
      ctx.lineTo(w * 0.97, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawEdge(a, b, index, time) {
    const ctx = this.ctx;
    const start = this.project(a.p);
    const end = this.project(b.p);
    const isGateEdge = a.gate || b.gate;
    const color = isGateEdge ? palette.green : this.mode === "work" ? palette.violet : palette.cyan;
    ctx.save();
    ctx.lineWidth = isGateEdge ? 2 : 1.4;
    ctx.strokeStyle = color;
    ctx.globalAlpha = isGateEdge ? 0.74 : 0.48;
    if (this.mode === "work") ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.setLineDash([]);

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy);
    if (length > 42) {
      const angle = Math.atan2(dy, dx);
      const arrowT = 0.72;
      const ax = start.x + dx * arrowT;
      const ay = start.y + dy * arrowT;
      ctx.globalAlpha = 0.78;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ax + Math.cos(angle) * 6, ay + Math.sin(angle) * 6);
      ctx.lineTo(ax + Math.cos(angle + 2.55) * 5, ay + Math.sin(angle + 2.55) * 5);
      ctx.lineTo(ax + Math.cos(angle - 2.55) * 5, ay + Math.sin(angle - 2.55) * 5);
      ctx.closePath();
      ctx.fill();
    }

    if (!this.reducedMotion) {
      const pulseT = (time * 0.00016 + index * 0.19) % 1;
      const px = mix(start.x, end.x, pulseT);
      const py = mix(start.y, end.y, pulseT);
      ctx.globalAlpha = 0.95;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px, py, isGateEdge ? 2.8 : 2.1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  polygonPath(x, y, radius, sides = 6, offset = -Math.PI / 2) {
    const ctx = this.ctx;
    ctx.beginPath();
    for (let i = 0; i < sides; i += 1) {
      const angle = offset + (i / sides) * Math.PI * 2;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  nodeMetrics(node) {
    const projected = this.project(node.p);
    const radius = this.nodeRadius(node, projected.s);
    const collisionRadius = radius * (node.gate ? 1.12 : 1);
    return {
      node,
      projected,
      radius,
      collisionRadius,
      box: {
        left: projected.x - collisionRadius,
        right: projected.x + collisionRadius,
        top: projected.y - collisionRadius,
        bottom: projected.y + collisionRadius + 7 * projected.s,
        owner: node.id,
      },
    };
  }

  drawNodeGlyph(metrics, time) {
    const ctx = this.ctx;
    const { node, projected, radius } = metrics;
    const color = colorFor(node);
    const offset = node.gate ? Math.PI / 4 : Math.PI / 6;
    const sides = node.gate ? 4 : 6;
    const lift = 7 * projected.s;
    const pulse = node.gate && !this.reducedMotion ? Math.sin(time * 0.0025) * 0.12 + 1 : 1;
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = node.gate ? 28 : 18;
    this.polygonPath(projected.x, projected.y + lift, radius * pulse, sides, offset);
    ctx.fillStyle = "rgba(1, 5, 12, 0.92)";
    ctx.fill();
    ctx.shadowBlur = 0;
    this.polygonPath(projected.x, projected.y, radius * pulse, sides, offset);
    const gradient = ctx.createRadialGradient(projected.x - radius * 0.25, projected.y - radius * 0.3, 2, projected.x, projected.y, radius * 1.1);
    gradient.addColorStop(0, softColorFor(node));
    gradient.addColorStop(1, palette.plate);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.lineWidth = node.gate ? 2.4 : 1.8;
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.96;
    ctx.stroke();

    if (node.gate) {
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.9;
      ctx.font = `700 ${Math.max(12, radius * 0.5)}px ${this.monoFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✓", projected.x, projected.y + 1);
    } else {
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.92;
      ctx.beginPath();
      ctx.arc(projected.x, projected.y - radius * 0.17, radius * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(projected.x - radius * 0.24, projected.y + radius * 0.03, radius * 0.48, radius * 0.27, radius * 0.12);
      ctx.fill();
    }

    ctx.restore();
  }

  labelCandidates(metrics, style) {
    const { projected, radius } = metrics;
    const gap = 9;
    const width = style.width;
    const height = style.height;
    return [
      { left: projected.x - width / 2, top: projected.y + radius + gap },
      { left: projected.x - width / 2, top: projected.y - radius - gap - height },
      { left: projected.x + radius + gap, top: projected.y - height / 2 },
      { left: projected.x - radius - gap - width, top: projected.y - height / 2 },
      { left: projected.x + radius * 0.55, top: projected.y + radius * 0.7 },
      { left: projected.x - radius * 0.55 - width, top: projected.y + radius * 0.7 },
      { left: projected.x + radius * 0.55, top: projected.y - radius * 0.7 - height },
      { left: projected.x - radius * 0.55 - width, top: projected.y - radius * 0.7 - height },
    ].map((candidate) => ({
      left: clamp(candidate.left, this.projectionLayout.safe.left, this.projectionLayout.safe.right - width),
      right: clamp(candidate.left, this.projectionLayout.safe.left, this.projectionLayout.safe.right - width) + width,
      top: clamp(candidate.top, this.projectionLayout.safe.top, this.projectionLayout.safe.bottom - height),
      bottom: clamp(candidate.top, this.projectionLayout.safe.top, this.projectionLayout.safe.bottom - height) + height,
      owner: metrics.node.id,
    }));
  }

  drawNodeLabel(metrics, nodeBoxes, acceptedLabels) {
    const ctx = this.ctx;
    const style = this.labelStyle(metrics.node);
    const candidates = this.labelCandidates(metrics, style);
    const conflicts = (candidate) => nodeBoxes.some((box) => box.owner !== metrics.node.id && boxesOverlap(candidate, box, 3))
      || acceptedLabels.some((box) => boxesOverlap(candidate, box, 4));
    const box = candidates.find((candidate) => !conflicts(candidate))
      || candidates.reduce((best, candidate) => {
        const score = nodeBoxes.filter((nodeBox) => nodeBox.owner !== metrics.node.id && boxesOverlap(candidate, nodeBox, 1)).length
          + acceptedLabels.filter((labelBox) => boxesOverlap(candidate, labelBox, 2)).length;
        return score < best.score ? { candidate, score } : best;
      }, { candidate: candidates[0], score: Number.POSITIVE_INFINITY }).candidate;

    const centerX = (box.left + box.right) * 0.5;
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = palette.text;
    ctx.font = `700 ${style.fontSize}px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillText(metrics.node.label, centerX, box.top);
    if (style.showRole) {
      ctx.fillStyle = palette.muted;
      ctx.font = `${style.roleFontSize}px ui-monospace, monospace`;
      ctx.fillText(metrics.node.role, centerX, box.top + style.fontSize + 6);
    }
    ctx.restore();
    return box;
  }

  recordLayoutDiagnostics(metrics, labelBoxes) {
    let collisions = 0;
    let escapes = 0;
    const collisionDetails = [];
    const safe = this.projectionLayout.safe;
    for (let i = 0; i < metrics.length; i += 1) {
      const current = metrics[i];
      const nodeInside = current.box.left >= safe.left
        && current.box.right <= safe.right
        && current.box.top >= safe.top
        && current.box.bottom <= safe.bottom;
      if (!nodeInside) escapes += 1;
      for (let j = i + 1; j < metrics.length; j += 1) {
        const other = metrics[j];
        if (Math.hypot(current.projected.x - other.projected.x, current.projected.y - other.projected.y)
          < current.collisionRadius + other.collisionRadius + 3) {
          collisions += 1;
          collisionDetails.push(`node:${current.node.id}:${other.node.id}`);
        }
      }
    }
    for (let i = 0; i < labelBoxes.length; i += 1) {
      const label = labelBoxes[i];
      const labelInside = label.left >= safe.left
        && label.right <= safe.right
        && label.top >= safe.top
        && label.bottom <= safe.bottom;
      if (!labelInside) escapes += 1;
      for (let j = i + 1; j < labelBoxes.length; j += 1) {
        if (boxesOverlap(label, labelBoxes[j], 2)) {
          collisions += 1;
          collisionDetails.push(`label:${label.owner}:${labelBoxes[j].owner}`);
        }
      }
      for (const metric of metrics) {
        if (metric.node.id !== label.owner && boxesOverlap(label, metric.box, 1)) {
          collisions += 1;
          collisionDetails.push(`label-node:${label.owner}:${metric.node.id}`);
        }
      }
    }
    this.canvas.dataset.layoutVariant = this.usesLandscapeGraph ? "landscape" : this.usesCompactGraph ? "compact" : "standard";
    this.canvas.dataset.layoutCollisions = String(collisions);
    this.canvas.dataset.layoutCollisionDetail = collisionDetails.join(",");
    this.canvas.dataset.layoutEscapes = String(escapes);
    this.canvas.dataset.layoutNodes = String(metrics.length);
  }

  draw(time) {
    if (!this.ctx || !this.cssWidth || !this.cssHeight) return;
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.cssWidth, this.cssHeight);
    this.projectionLayout = this.computeProjectionLayout();
    this.drawGrid();
    const graph = this.graph;
    const map = new Map(graph.nodes.map((node) => [node.id, node]));
    graph.edges.forEach(([a, b], index) => this.drawEdge(map.get(a), map.get(b), index, time));
    const metrics = [...graph.nodes]
      .sort((a, b) => this.rotate(a.p)[2] - this.rotate(b.p)[2])
      .map((node) => this.nodeMetrics(node));
    metrics.forEach((nodeMetrics) => this.drawNodeGlyph(nodeMetrics, time));
    const nodeBoxes = metrics.map((nodeMetrics) => nodeMetrics.box);
    const labelBoxes = [];
    [...metrics]
      .sort((a, b) => a.projected.y - b.projected.y)
      .forEach((nodeMetrics) => labelBoxes.push(this.drawNodeLabel(nodeMetrics, nodeBoxes, labelBoxes)));
    this.recordLayoutDiagnostics(metrics, labelBoxes);
  }

  renderFrame(time) {
    this.raf = 0;
    if (!this.inViewport || document.hidden) return;
    const autoMoving = this.autoRotate
      && !this.reducedMotion
      && !this.pointer
      && this.cssWidth > 720
      && this.cssHeight > 480;
    if (autoMoving && time - this.lastDecorativeFrame < 32) {
      this.requestFrame();
      return;
    }
    if (autoMoving) this.lastDecorativeFrame = time;
    if (autoMoving) {
      const bounds = this.rotationBounds();
      this.targetRotationY = clamp(this.baseRotationY + Math.sin(time * 0.00022) * 0.11, bounds.minY, bounds.maxY);
    }
    this.clampRotationTargets();
    this.rotationX = mix(this.rotationX, this.targetRotationX, 0.12);
    this.rotationY = mix(this.rotationY, this.targetRotationY, 0.12);
    this.zoom = mix(this.zoom, this.targetZoom, 0.1);
    this.draw(time);
    const moving = autoMoving
      || Boolean(this.pointer)
      || Math.abs(this.rotationX - this.targetRotationX) > 0.001
      || Math.abs(this.rotationY - this.targetRotationY) > 0.001
      || Math.abs(this.zoom - this.targetZoom) > 0.001;
    if (moving) this.requestFrame();
  }

  destroy() {
    this.pause();
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    window.removeEventListener("orientationchange", this.onViewportResize);
    window.visualViewport?.removeEventListener("resize", this.onViewportResize);
    this.motionQuery.removeEventListener?.("change", this.onMotionChange);
    if (!this.interactive) return;
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerup", this.onPointerUp);
    this.canvas.removeEventListener("pointercancel", this.onPointerUp);
    this.canvas.removeEventListener("wheel", this.onWheel);
    this.canvas.removeEventListener("keydown", this.onKeyDown);
  }
}
