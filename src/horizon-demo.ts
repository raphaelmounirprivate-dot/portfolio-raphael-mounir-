export function renderHorizon(): string {
  return `<div class="horizon-preview"><img src="${import.meta.env.BASE_URL}images/horizon-game.jpg" alt="Écran du jeu original Pandemic Horizon : carte mondiale et tableau de stratégie" width="1280" height="800" loading="lazy" /><p class="horizon-kicker">LE JEU ORIGINAL · GODOT · PROTOTYPE 0.26</p><h4>Chaque région compte.</h4><p>Choisissez NACRE, ONDE ou VOILE. Faites évoluer votre agent, suivez les routes terrestres, aériennes et maritimes, puis adaptez vos décisions à la recherche du remède.</p><dl class="horizon-features"><div><dt>24</dt><dd>régions reliées</dd></div><div><dt>3</dt><dd>agents à explorer</dd></div><div><dt>Vos choix</dt><dd>évolutions, crises et décisions</dd></div></dl><button class="demo-primary" data-horizon-launch>Jouer à Pandemic Horizon <span aria-hidden="true">↗</span></button><p class="horizon-hint">Environ 40 Mo au lancement. Ordinateur et souris conseillés ; sur téléphone, préférez le paysage. Le tutoriel guidé est disponible dans le jeu.</p></div><dialog class="horizon-dialog" aria-labelledby="horizon-dialog-title"><header><h2 id="horizon-dialog-title">Pandemic Horizon <span>Adaptation Web expérimentale</span></h2><button type="button" data-horizon-close autofocus>Revenir au portfolio</button></header><p class="horizon-loading" role="status">Le jeu se charge dans la fenêtre ci-dessous. Son indicateur affiche la progression. Échap pour revenir au portfolio.</p><div data-horizon-stage></div></dialog>`;
}

export function initHorizon(): void {
  const launch = document.querySelector<HTMLButtonElement>("[data-horizon-launch]")!;
  const dialog = document.querySelector<HTMLDialogElement>(".horizon-dialog")!;
  const stage = dialog.querySelector<HTMLElement>("[data-horizon-stage]")!;
  const close = (): void => dialog.close();
  launch.addEventListener("click", () => {
    const frame = document.createElement("iframe");
    frame.dataset.horizonFrame = "";
    frame.title = "Pandemic Horizon, jeu de stratégie original";
    frame.src = `${import.meta.env.BASE_URL}horizon-game/index.html`;
    frame.allow = "autoplay; fullscreen";
    // Keyboard events stay inside the frame: preserve an exit from the canvas.
    frame.addEventListener("load", () => {
      frame.contentDocument?.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        event.stopImmediatePropagation();
        close();
      }, { capture: true });
    });
    stage.replaceChildren(frame);
    dialog.showModal();
    document.documentElement.classList.add("horizon-playing");
  });
  dialog.querySelector("[data-horizon-close]")!.addEventListener("click", close);
  dialog.addEventListener("close", () => {
    stage.replaceChildren();
    document.documentElement.classList.remove("horizon-playing");
    launch.focus({ preventScroll: true });
  });
}
