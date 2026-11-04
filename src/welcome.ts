import { initGlowCursor } from "./glow-cursor.js";
import "./welcome.css";

export function initWelcome(): void {
  // Les liens vers une escale restent accessibles directement.
  if (location.hash && location.hash !== "#") return;
  const app = document.querySelector<HTMLElement>("#app")!;
  const skip = document.querySelector<HTMLElement>(".skip-link")!;
  const welcome = document.createElement("section");
  welcome.className = "welcome";
  welcome.setAttribute("aria-labelledby", "welcome-title");
  welcome.innerHTML = `
    <img class="welcome-image" src="${import.meta.env.BASE_URL}images/welcome-sunset.jpg" width="1376" height="768" alt="" fetchpriority="high" />
    <div class="welcome-shade" aria-hidden="true"></div>
    <canvas class="welcome-glow" aria-hidden="true"></canvas>
    <div class="welcome-content">
      <h1 id="welcome-title">D’une connexion<br>à l’autre.</h1>
      <button class="welcome-enter" type="button">Entrer dans le site <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button>
    </div>
    <p class="welcome-hint">Déplacez la souris. Suivez la lumière.</p>`;
  app.inert = true;
  app.setAttribute("aria-hidden", "true");
  skip.hidden = true;
  document.body.classList.add("welcome-open");
  document.body.append(welcome);
  const dispose = initGlowCursor(welcome, welcome.querySelector("canvas")!);
  const enter = (): void => {
    dispose?.();
    welcome.remove();
    document.body.classList.remove("welcome-open");
    app.inert = false;
    app.removeAttribute("aria-hidden");
    skip.hidden = false;
    const target = document.getElementById(location.hash.slice(1) || "depart");
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: "instant" });
    }
    window.removeEventListener("hashchange", enter);
  };
  welcome.querySelector("button")!.addEventListener("click", enter, { once: true });
  window.addEventListener("hashchange", enter, { once: true });
}
