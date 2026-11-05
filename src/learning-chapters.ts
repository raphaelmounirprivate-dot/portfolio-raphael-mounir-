import { learningChapters } from "./data/learning-chapters";
import { escape } from "./html";
import type { LearningKind } from "./learning-world";
import "./learning-chapters.css";

export function learningModes(kind: LearningKind): string {
  return `<div class="learning-modes" role="group" aria-label="Apprendre et s’entraîner en ${learningChapters[kind].subject.toLocaleLowerCase("fr")}">
    <button type="button" data-learning-mode="chapter" aria-pressed="false" aria-controls="chapter-${kind}">Lire le chapitre</button>
    <button type="button" data-learning-mode="practice" aria-pressed="true" aria-controls="practice-${kind}">S’entraîner</button>
  </div>`;
}

export function learningChapter(kind: LearningKind): string {
  const chapter = learningChapters[kind];
  return `<article class="learning-chapter" id="chapter-${kind}" hidden aria-labelledby="chapter-title-${kind}">
    <div class="chapter-heading"><h3 id="chapter-title-${kind}" tabindex="-1">${escape(chapter.title)}</h3>
    <p class="chapter-introduction">${escape(chapter.introduction)}</p></div>
    <div class="chapter-pages">
    <ol class="chapter-steps">${chapter.steps.map((step, index) => `<li data-chapter-page="${index}"${index ? " hidden" : ""}><h4>${escape(step.title)}</h4><p>${escape(step.explanation)}</p><p class="chapter-example">${escape(step.example)}</p><p>${escape(step.reasoning)}</p></li>`).join("")}</ol>
    <div class="chapter-wrapup" data-chapter-page="3" hidden><details class="chapter-reminders"><summary>La méthode à retenir</summary><ul>${chapter.reminders.map(reminder => `<li>${escape(reminder)}</li>`).join("")}</ul></details>
    <div class="chapter-application"><h4>À toi d’essayer</h4><p>${escape(chapter.application.question)}</p><details><summary>Voir la correction</summary><p>${escape(chapter.application.answer)}</p></details></div>
    <button type="button" class="demo-primary" data-chapter-practice>Passer aux trois défis</button></div></div>
    <nav class="chapter-navigation" aria-label="Étapes du chapitre"><button type="button" data-chapter-previous disabled>Précédent</button><span data-chapter-position role="status">Étape 1 / 4</span><button type="button" data-chapter-next>Suivant</button></nav>
  </article>`;
}

export function initLearningChapters(): void {
  document.querySelectorAll<HTMLElement>(".learning-world").forEach(root => {
    const practice = root.querySelector<HTMLElement>(".demo-content")!;
    const chapter = root.querySelector<HTMLElement>(".learning-chapter")!;
    const buttons = root.querySelectorAll<HTMLButtonElement>("[data-learning-mode]");
    const pages = chapter.querySelectorAll<HTMLElement>("[data-chapter-page]");
    const previous = chapter.querySelector<HTMLButtonElement>("[data-chapter-previous]")!;
    const next = chapter.querySelector<HTMLButtonElement>("[data-chapter-next]")!;
    let page = 0;
    const turnPage = (direction: number): void => {
      page = Math.max(0, Math.min(pages.length - 1, page + direction));
      pages.forEach((element, index) => { element.hidden = index !== page; });
      previous.disabled = page === 0;
      next.disabled = page === pages.length - 1;
      chapter.querySelector("[data-chapter-position]")!.textContent = `Étape ${page + 1} / ${pages.length}`;
      // Garder le focus sur une commande utilisable aux extrémités du chapitre.
      if (next.disabled && document.activeElement === next) previous.focus({ preventScroll: true });
      if (previous.disabled && document.activeElement === previous) next.focus({ preventScroll: true });
    };
    previous.addEventListener("click", () => turnPage(-1));
    next.addEventListener("click", () => turnPage(1));
    const show = (mode: "chapter" | "practice"): void => {
      practice.hidden = mode !== "practice";
      chapter.hidden = mode !== "chapter";
      buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.learningMode === mode)));
    };
    buttons.forEach(button => button.addEventListener("click", () => {
      show(button.dataset.learningMode === "chapter" ? "chapter" : "practice");
    }));
    root.querySelector("[data-chapter-practice]")!.addEventListener("click", () => {
      show("practice");
      const target = practice.querySelector<HTMLElement>("[data-choices] button:not(:disabled), [data-next-question]:not(:disabled), [data-reset]");
      target?.focus();
    });
  });
}
