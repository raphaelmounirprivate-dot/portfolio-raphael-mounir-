import { initWaveMotion } from "./wave-motion";

export function initAnimations(): void {
  initWaveMotion();
  const progress = document.querySelector<HTMLElement>("#route-progress")!;
  const route = document.querySelector<HTMLElement>(".route-container")!;
  let pending = false;
  const update = (): void => {
    const rect = route.getBoundingClientRect();
    const amount = Math.max(
      0,
      Math.min(1, (innerHeight * 0.55 - rect.top) / rect.height),
    );
    progress.style.transform = `scaleY(${amount})`;
    pending = false;
  };
  addEventListener(
    "scroll",
    () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  addEventListener("resize", update, { passive: true });
  update();
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => {
            entry.target.animate(
              [
                { opacity: 0.7, transform: "translateY(16px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 500, easing: "ease-out" },
            );
            reveal.unobserve(entry.target);
          });
      },
      { threshold: 0.2 },
    );
    document
      .querySelectorAll(".project-copy")
      .forEach((copy) => reveal.observe(copy));
  }
}
