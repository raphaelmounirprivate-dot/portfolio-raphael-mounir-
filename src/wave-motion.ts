export function initWaveMotion(): void {
  const root = document.documentElement;
  const button = document.querySelector<HTMLButtonElement>("#wave-toggle")!;
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let chosen: boolean | undefined;
  try {
    const saved = localStorage.getItem("portfolio-wave-motion");
    if (saved === "on" || saved === "off") chosen = saved === "on";
  } catch { /* La commande reste utilisable sans stockage. */ }
  const paint = (): void => {
    const playing = chosen ?? !preference.matches;
    root.dataset.waveMotion = playing ? "on" : "off";
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", playing ? "Mettre la vague en pause" : "Animer la vague");
    button.querySelector("[data-wave-label]")!.textContent = playing ? "Pause de la vague" : "Animer la vague";
    button.querySelector("[data-wave-icon]")!.setAttribute("d", playing ? "M9 5v14M15 5v14" : "M9 5l10 7-10 7z");
  };
  button.addEventListener("click", () => {
    chosen = root.dataset.waveMotion !== "on";
    try { localStorage.setItem("portfolio-wave-motion", chosen ? "on" : "off"); }
    catch { /* Le choix s’applique aussi quand sa mémorisation est bloquée. */ }
    paint();
  });
  preference.addEventListener("change", paint);
  paint();
}
