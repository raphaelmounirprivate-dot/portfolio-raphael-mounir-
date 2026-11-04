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
    <h3 id="chapter-title-${kind}" tabindex="-1">${escape(chapter.title)}</h3>
    <p class="chapter-introduction">${escape(chapter.introduction)}</p>
    <ol class="chapter-steps">${chapter.steps.map(step => `<li><h4>${escape(step.title)}</h4><p>${escape(step.explanation)}</p><p class="chapter-example">${escape(step.example)}</p><p>${escape(step.reasoning)}</p></li>`).join("")}</ol>
    <aside class="chapter-reminders" aria-label="Méthode à retenir"><h4>La méthode à retenir</h4><ul>${chapter.reminders.map(reminder => `<li>${escape(reminder)}</li>`).join("")}</ul></aside>
    <div class="chapter-application"><h4>À toi d’essayer</h4><p>${escape(chapter.application.question)}</p><details><summary>Voir la correction</summary><p>${escape(chapter.application.answer)}</p></details></div>
    <button type="button" class="demo-primary" data-chapter-practice>Passer aux trois défis</button>
  </article>`;
}

export function initLearningChapters(): void {
  document.querySelectorAll<HTMLElement>(".learning-world").forEach(root => {
    const practice = root.querySelector<HTMLElement>(".demo-content")!;
    const chapter = root.querySelector<HTMLElement>(".learning-chapter")!;
    const buttons = root.querySelectorAll<HTMLButtonElement>("[data-learning-mode]");
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
