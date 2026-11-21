const chessUrl = "https://echec-et-mat.vercel.app/";

export function renderChess(): string {
  return `<div class="chess-preview">
    <img src="${import.meta.env.BASE_URL}images/echec-et-mat.jpg" alt="Échiquier 3D du jeu Échec et Mat avec ses pièces claires et foncées" width="699" height="398" loading="lazy" decoding="async" />
    <p>Suivez une leçon, résolvez un problème tactique ou jouez une partie contre un bot.</p>
    <button class="demo-primary" type="button" data-chess-launch>Jouer à Échec et Mat</button>
    <a href="${chessUrl}" target="_blank" rel="noopener">Ouvrir le site dans un nouvel onglet</a>
  </div>
  <dialog class="chess-dialog" aria-labelledby="chess-dialog-title">
    <header><h2 id="chess-dialog-title">Échec et Mat</h2><button type="button" data-chess-close autofocus>Revenir au portfolio</button></header>
    <div data-chess-stage></div>
  </dialog>`;
}

export function initChess(): void {
  const launch = document.querySelector<HTMLButtonElement>("[data-chess-launch]")!;
  const dialog = document.querySelector<HTMLDialogElement>(".chess-dialog")!;
  const stage = dialog.querySelector<HTMLElement>("[data-chess-stage]")!;

  launch.addEventListener("click", () => {
    const frame = document.createElement("iframe");
    frame.title = "Échec et Mat, application complète";
    frame.src = chessUrl;
    stage.replaceChildren(frame);
    dialog.showModal();
  });
  dialog.querySelector("[data-chess-close]")!.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    stage.replaceChildren();
    launch.focus({ preventScroll: true });
  });
}
