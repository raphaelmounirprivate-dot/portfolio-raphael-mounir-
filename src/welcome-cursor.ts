import { initGlowCursor } from "./glow-cursor.js";

function pointerHalo(container: HTMLElement): () => void {
  const halo = document.createElement("div");
  halo.className = "welcome-pointer";
  halo.setAttribute("aria-hidden", "true");
  halo.hidden = true;
  container.append(halo);
  const move = (event: PointerEvent): void => {
    const rect = container.getBoundingClientRect();
    halo.style.left = `${event.clientX - rect.left}px`;
    halo.style.top = `${event.clientY - rect.top}px`;
    halo.hidden = false;
  };
  const leave = (): void => { halo.hidden = true; };
  container.addEventListener("pointermove", move, { passive: true });
  container.addEventListener("pointerleave", leave);
  return () => {
    container.removeEventListener("pointermove", move);
    container.removeEventListener("pointerleave", leave);
    halo.remove();
  };
}

function canvasTrail(container: HTMLElement, canvas: HTMLCanvasElement): (() => void) | undefined {
  const context = canvas.getContext("2d");
  if (!context) return undefined;
  let points: { x: number; y: number; time: number }[] = [];
  let frame = 0;
  let width = 0;
  let height = 0;
  const clear = (): void => {
    points = [];
    cancelAnimationFrame(frame);
    frame = 0;
    context.clearRect(0, 0, width, height);
  };
  const resize = (): void => {
    width = container.clientWidth;
    height = container.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    clear();
  };
  const draw = (now: number): void => {
    frame = 0;
    points = points.filter(point => now - point.time < 900);
    context.clearRect(0, 0, width, height);
    context.lineCap = "round";
    context.lineJoin = "round";
    for (let index = 1; index < points.length; index++) {
      const point = points[index];
      const previous = points[index - 1];
      const opacity = Math.pow(1 - (now - point.time) / 900, 1.5);
      context.beginPath();
      context.moveTo(previous.x, previous.y);
      context.lineTo(point.x, point.y);
      context.lineWidth = 5;
      context.strokeStyle = `rgba(95,139,255,${opacity})`;
      context.shadowColor = "#5f8bff";
      context.shadowBlur = 18;
      context.stroke();
      context.lineWidth = 1.5;
      context.strokeStyle = `rgba(224,252,255,${opacity})`;
      context.stroke();
    }
    context.shadowBlur = 0;
    const last = points.at(-1);
    if (last) {
      const opacity = 1 - (now - last.time) / 900;
      const glow = context.createRadialGradient(last.x, last.y, 0, last.x, last.y, 30);
      glow.addColorStop(0, `rgba(224,252,255,${opacity})`);
      glow.addColorStop(.15, `rgba(124,229,241,${opacity * .8})`);
      glow.addColorStop(1, "rgba(95,139,255,0)");
      context.fillStyle = glow;
      context.fillRect(last.x - 30, last.y - 30, 60, 60);
      frame = requestAnimationFrame(draw);
    }
  };
  const move = (event: PointerEvent): void => {
    if (document.hidden) return;
    const rect = container.getBoundingClientRect();
    points.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, time: performance.now() });
    if (points.length > 80) points.shift();
    if (!frame) frame = requestAnimationFrame(draw);
  };
  const visibility = (): void => { if (document.hidden) clear(); };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  container.addEventListener("pointermove", move, { passive: true });
  container.addEventListener("pointerleave", clear);
  document.addEventListener("visibilitychange", visibility);
  resize();
  return () => {
    clear();
    observer.disconnect();
    container.removeEventListener("pointermove", move);
    container.removeEventListener("pointerleave", clear);
    document.removeEventListener("visibilitychange", visibility);
  };
}

export function initWelcomeCursor(container: HTMLElement, initialCanvas: HTMLCanvasElement): () => void {
  let canvas = initialCanvas;
  let dispose: () => void = () => {};
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const replaceCanvas = (): void => {
    const replacement = canvas.cloneNode(false) as HTMLCanvasElement;
    replacement.hidden = false;
    canvas.replaceWith(replacement);
    canvas = replacement;
  };
  const fallback = (): void => {
    dispose();
    canvas.removeEventListener("webglcontextlost", lost);
    // Un canevas déjà lié à WebGL ne peut pas recevoir de contexte 2D.
    replaceCanvas();
    const trail = preference.matches ? undefined : canvasTrail(container, canvas);
    if (trail) {
      dispose = trail;
      container.dataset.cursorRenderer = "canvas";
    } else {
      canvas.hidden = true;
      dispose = pointerHalo(container);
      container.dataset.cursorRenderer = "halo";
    }
  };
  const lost = (event: Event): void => {
    event.preventDefault();
    fallback();
  };
  const mount = (): void => {
    dispose();
    dispose = () => {};
    canvas.removeEventListener("webglcontextlost", lost);
    replaceCanvas();
    if (preference.matches) { fallback(); return; }
    let stop: (() => void) | undefined;
    try { stop = initGlowCursor(container, canvas); } catch { /* Le rendu de secours reste disponible. */ }
    if (stop) {
      dispose = stop;
      container.dataset.cursorRenderer = "webgl";
      canvas.addEventListener("webglcontextlost", lost);
    } else fallback();
  };
  mount();
  preference.addEventListener("change", mount);
  return () => {
    preference.removeEventListener("change", mount);
    canvas.removeEventListener("webglcontextlost", lost);
    dispose();
    delete container.dataset.cursorRenderer;
  };
}
