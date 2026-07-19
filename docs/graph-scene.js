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

function mix(a, b, t) {
  return a + (b - a) * t;
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
    this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.rotationX = options.rotationX ?? -0.18;
    this.rotationY = options.rotationY ?? -0.42;
    this.targetRotationX = this.rotationX;
    this.targetRotationY = this.rotationY;
    this.zoom = options.zoom ?? 1;
    this.targetZoom = this.zoom;
    this.canvas.dataset.zoom = this.zoom.toFixed(2);
    this.canvas.dataset.graphMode = this.mode;
    this.pointer = null;
    this.lastTime = 0;
    this.raf = 0;
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.bind();
    this.resize();
    this.renderFrame = this.renderFrame.bind(this);
    if (this.reducedMotion) this.draw(performance.now());
    else this.raf = requestAnimationFrame(this.renderFrame);
  }

  get graph() {
    if (this.mode === "org") return ORG_GRAPH;
    if (this.mode === "work") return WORK_GRAPH;
    return HERO_GRAPH;
  }

  setMode(mode) {
    if (!['org', 'work', 'hero'].includes(mode)) return;
    this.mode = mode;
    this.canvas.dataset.graphMode = mode;
    this.rotationY = mode === "work" ? -0.08 : -0.34;
    this.targetRotationY = this.rotationY;
    this.targetZoom = mode === "work" ? 0.9 : 1;
    this.draw(performance.now());
  }

  setZoom(value) {
    this.autoRotate = false;
    this.targetZoom = Math.max(0.72, Math.min(1.28, value));
    this.canvas.dataset.zoom = this.targetZoom.toFixed(2);
    if (this.reducedMotion) {
      this.zoom = this.targetZoom;
      this.draw(performance.now());
    }
  }

  resetView() {
    this.autoRotate = false;
    this.targetRotationX = this.mode === "hero" ? -0.21 : -0.12;
    this.targetRotationY = this.mode === "work" ? -0.08 : this.mode === "hero" ? -0.46 : -0.32;
    this.targetZoom = this.mode === "work" ? 0.9 : 1;
    this.canvas.dataset.zoom = this.targetZoom.toFixed(2);
    if (this.reducedMotion) {
      this.rotationX = this.targetRotationX;
      this.rotationY = this.targetRotationY;
      this.zoom = this.targetZoom;
      this.draw(performance.now());
    }
  }

  bind() {
    if (!this.interactive) return;
    this.onPointerDown = (event) => {
      this.canvas.focus({ preventScroll: true });
      this.pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
      this.canvas.setPointerCapture?.(event.pointerId);
      this.autoRotate = false;
    };
    this.onPointerMove = (event) => {
      if (!this.pointer || this.pointer.id !== event.pointerId) return;
      const dx = event.clientX - this.pointer.x;
      const dy = event.clientY - this.pointer.y;
      this.targetRotationY += dx * 0.008;
      this.targetRotationX = Math.max(-0.8, Math.min(0.45, this.targetRotationX + dy * 0.006));
      this.pointer.x = event.clientX;
      this.pointer.y = event.clientY;
      if (this.reducedMotion) {
        this.rotationX = this.targetRotationX;
        this.rotationY = this.targetRotationY;
        this.draw(performance.now());
      }
    };
    this.onPointerUp = (event) => {
      if (this.pointer?.id === event.pointerId) this.pointer = null;
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
        ArrowUp: () => { this.targetRotationX = Math.max(-0.8, this.targetRotationX - 0.1); },
        ArrowDown: () => { this.targetRotationX = Math.min(0.45, this.targetRotationX + 0.1); },
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
      if (this.reducedMotion) {
        this.rotationX = this.targetRotationX;
        this.rotationY = this.targetRotationY;
        this.draw(performance.now());
      }
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
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.dpr = dpr;
      this.cssWidth = rect.width;
      this.cssHeight = rect.height;
      this.draw(performance.now());
    }
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

  project(point) {
    const [x, y, z] = this.rotate(point);
    const workScale = this.mode === "work" ? 0.88 : 1;
    const base = Math.min(this.cssWidth / 6.2, this.cssHeight / 4.6) * this.zoom * workScale;
    const perspective = 1 / (1 + z * 0.08);
    return {
      x: this.cssWidth * 0.5 + x * base * perspective,
      y: this.cssHeight * 0.49 - y * base * perspective,
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

  drawNode(node, time) {
    const ctx = this.ctx;
    const projected = this.project(node.p);
    const baseRadius = node.gate ? 28 : 31;
    const radius = baseRadius * projected.s * Math.min(1.1, this.zoom);
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
      ctx.font = `700 ${Math.max(12, radius * 0.5)}px ${getComputedStyle(document.documentElement).getPropertyValue('--mono')}`;
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

    const labelY = projected.y + radius + 18;
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = palette.text;
    ctx.font = `700 ${this.mode === 'hero' ? 11 : 12}px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillText(node.label, projected.x, labelY);
    if (this.cssWidth > 560 && node.role) {
      ctx.fillStyle = palette.muted;
      ctx.font = `10px ui-monospace, monospace`;
      ctx.fillText(node.role, projected.x, labelY + 17);
    }
    ctx.restore();
  }

  draw(time) {
    if (!this.ctx || !this.cssWidth || !this.cssHeight) return;
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.cssWidth, this.cssHeight);
    this.drawGrid();
    const graph = this.graph;
    const map = new Map(graph.nodes.map((node) => [node.id, node]));
    graph.edges.forEach(([a, b], index) => this.drawEdge(map.get(a), map.get(b), index, time));
    [...graph.nodes]
      .sort((a, b) => this.rotate(a.p)[2] - this.rotate(b.p)[2])
      .forEach((node) => this.drawNode(node, time));
  }

  renderFrame(time) {
    const elapsed = this.lastTime ? Math.min(40, time - this.lastTime) : 16;
    this.lastTime = time;
    if (this.autoRotate && !this.reducedMotion && !this.pointer) this.targetRotationY += elapsed * 0.00005;
    this.rotationX = mix(this.rotationX, this.targetRotationX, 0.12);
    this.rotationY = mix(this.rotationY, this.targetRotationY, 0.12);
    this.zoom = mix(this.zoom, this.targetZoom, 0.1);
    this.draw(time);
    this.raf = requestAnimationFrame(this.renderFrame);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    if (!this.interactive) return;
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerup", this.onPointerUp);
    this.canvas.removeEventListener("pointercancel", this.onPointerUp);
    this.canvas.removeEventListener("wheel", this.onWheel);
  }
}
