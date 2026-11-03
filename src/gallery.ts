import type { Project } from "./data/projects";

export function initGalleries(projects: Project[]): void {
  document.querySelectorAll<HTMLElement>("[data-gallery]").forEach((root) => {
    const project = projects.find((p) => p.id === root.dataset.gallery)!;
    let index = 0;
    const img = root.querySelector("img")!;
    const show = (delta: number): void => {
      index =
        (index + delta + project.screenshots.length) %
        project.screenshots.length;
      const shot = project.screenshots[index];
      img.src = shot.src;
      img.alt = shot.alt;
      img.width = shot.width;
      img.height = shot.height;
      root.querySelector("[data-caption]")!.textContent = shot.caption;
      root.querySelector("[data-counter]")!.textContent =
        `${index + 1} / ${project.screenshots.length}`;
    };
    root
      .querySelector("[data-prev]")!
      .addEventListener("click", () => show(-1));
    root.querySelector("[data-next]")!.addEventListener("click", () => show(1));
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        show(e.key === "ArrowRight" ? 1 : -1);
      }
    });
    let startX = 0;
    let startY = 0;
    root.addEventListener(
      "touchstart",
      (e) => {
        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY;
      },
      { passive: true },
    );
    root.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy))
          show(dx < 0 ? 1 : -1);
      },
      { passive: true },
    );
  });
}
