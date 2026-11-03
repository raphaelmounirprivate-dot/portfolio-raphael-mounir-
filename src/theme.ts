export function initTheme(): void {
  const button = document.querySelector<HTMLButtonElement>("#theme-toggle")!;
  const system = matchMedia("(prefers-color-scheme: light)");
  const update = (): void => {
    const light = document.documentElement.dataset.theme === "light";
    button.setAttribute(
      "aria-label",
      light ? "Activer le thème sombre" : "Activer le thème clair",
    );
    button.setAttribute("aria-pressed", String(light));
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", light ? "#f0f3f7" : "#080f1c");
  };
  button.addEventListener("click", () => {
    document.documentElement.dataset.theme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem(
        "portfolio-theme",
        document.documentElement.dataset.theme,
      );
    } catch {
      /* Le thème fonctionne aussi sans stockage. */
    }
    update();
  });
  system.addEventListener("change", () => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("portfolio-theme");
    } catch {
      /* Stockage facultatif. */
    }
    if (saved !== "light" && saved !== "dark") {
      document.documentElement.dataset.theme = system.matches
        ? "light"
        : "dark";
      update();
    }
  });
  update();
}
