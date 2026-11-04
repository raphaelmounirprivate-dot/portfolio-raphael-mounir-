// Adaptation TypeScript sans React du StarBorder fourni dans le brief.
const BLEED = 20;
const DURATION = 4;
const TAU = Math.PI * 2;

interface Point { x: number; y: number }

export function initStarBorder(button: HTMLButtonElement): () => void {
  const canvas = document.createElement("canvas");
  canvas.className = "star-border-light";
  canvas.setAttribute("aria-hidden", "true");
  button.prepend(canvas);
  const context = canvas.getContext("2d");
  if (!context) {
    canvas.remove();
    return () => {};
  }
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let radius = 0;
  let perimeter = 1;
  let dpr = 1;
  let phase = 0;
  let lap = 0;
  let flash = 0;
  let previous = 0;
  let frame = 0;
  let disposed = false;

  // Les droites et quarts de cercle gardent une vitesse uniforme sur tout le contour.
  function pointAt(distance: number): Point {
    let remaining = ((distance % perimeter) + perimeter) % perimeter;
    const across = width - 2 * radius;
    const down = height - 2 * radius;
    const arc = Math.PI * radius / 2;
    const lengths = [across, arc, down, arc, across, arc, down, arc];
    for (let index = 0; index < lengths.length; index++) {
      const length = lengths[index];
      if (remaining > length || length === 0) {
        remaining -= length;
        continue;
      }
      switch (index) {
        case 0: return { x: radius + remaining, y: 0 };
        case 2: return { x: width, y: radius + remaining };
        case 4: return { x: width - radius - remaining, y: height };
        case 6: return { x: 0, y: height - radius - remaining };
        default: {
          const angle = (index - 3) * Math.PI / 4 + remaining / radius;
          const x = index < 4 ? width - radius : radius;
          const y = index === 1 || index === 7 ? radius : height - radius;
          return { x: x + Math.cos(angle) * radius, y: y + Math.sin(angle) * radius };
        }
      }
    }
    return { x: radius, y: 0 };
  }

  function draw(): void {
    if (!context) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width + BLEED * 2 + 2, height + BLEED * 2 + 2);
    context.translate(BLEED + 1, BLEED + 1);
    const trail = perimeter * 0.3;
    const steps = 70;
    context.lineCap = "round";
    for (let index = 0; index < steps; index++) {
      const strength = (index + 1) / steps;
      const from = pointAt(phase - trail + trail * index / steps);
      const to = pointAt(phase - trail + trail * (index + 1) / steps);
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.strokeStyle = `rgba(124,229,241,${strength * strength * (0.85 + flash * 0.15)})`;
      context.lineWidth = 1.5 + flash;
      context.shadowColor = "#7ce5f1";
      context.shadowBlur = 7;
      context.stroke();
    }
    const head = pointAt(phase);
    context.shadowBlur = 0;
    const glow = context.createRadialGradient(head.x, head.y, 0, head.x, head.y, 12);
    glow.addColorStop(0, "rgba(240,255,255,0.95)");
    glow.addColorStop(0.15, "rgba(124,229,241,0.8)");
    glow.addColorStop(1, "rgba(124,229,241,0)");
    context.fillStyle = glow;
    context.fillRect(head.x - 12, head.y - 12, 24, 24);
    context.fillStyle = "#fff";
    context.beginPath();
    context.arc(head.x, head.y, 1.5, 0, TAU);
    context.fill();
  }

  function animate(now: number): void {
    frame = 0;
    // Appliquer la préférence dès la prochaine image, même si son événement est retardé.
    if (motion.matches) {
      sync();
      return;
    }
    const elapsed = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    phase = (phase + elapsed * perimeter * (1 / DURATION + (lap > 0 ? 1 / 0.9 : 0))) % perimeter;
    lap = Math.max(0, lap - elapsed);
    flash = Math.max(0, flash - elapsed * 4);
    draw();
    if (!disposed && !motion.matches && !document.hidden) frame = requestAnimationFrame(animate);
  }

  function sync(): void {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    button.dataset.starMotion = motion.matches ? "static" : "animated";
    draw();
    if (!disposed && !motion.matches && !document.hidden) frame = requestAnimationFrame(animate);
  }

  function measure(): void {
    width = Math.max(1, button.offsetWidth - 2);
    height = Math.max(1, button.offsetHeight - 2);
    radius = Math.max(0, Math.min(parseFloat(getComputedStyle(button).borderRadius) - 1, width / 2, height / 2));
    perimeter = 2 * (width + height - 4 * radius) + TAU * radius;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.ceil((width + 2 + BLEED * 2) * dpr);
    canvas.height = Math.ceil((height + 2 + BLEED * 2) * dpr);
    sync();
  }

  function engage(): void { if (!motion.matches) lap = 0.9; }
  function pulse(): void { if (!motion.matches) flash = 1; }
  const observer = new ResizeObserver(measure);
  observer.observe(button);
  button.addEventListener("pointerenter", engage);
  button.addEventListener("focus", engage);
  button.addEventListener("pointerdown", pulse);
  motion.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  measure();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    motion.removeEventListener("change", sync);
    document.removeEventListener("visibilitychange", sync);
    button.removeEventListener("pointerenter", engage);
    button.removeEventListener("focus", engage);
    button.removeEventListener("pointerdown", pulse);
    canvas.remove();
    delete button.dataset.starMotion;
  };
}
