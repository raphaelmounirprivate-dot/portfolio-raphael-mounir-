export function initNavigation(): void {
  const journey = document.querySelector<HTMLElement>("#journey")!;
  const overview = document.querySelector<HTMLElement>("#overview")!;
  const opener = document.querySelector<HTMLButtonElement>("#open-overview")!;
  const map = document.querySelector<HTMLElement>(".journey-map")!;
  document.querySelector(".header")!.after(map);
  const toggle = document.querySelector<HTMLButtonElement>("#map-toggle")!;
  let previousScroll = 0;
  const close = (restore: boolean): void => {
    overview.hidden = true;
    journey.hidden = false;
    map.hidden = false;
    if (restore) {
      window.scrollTo({ top: previousScroll, behavior: "instant" });
      opener.focus({ preventScroll: true });
    }
  };
  opener.addEventListener("click", () => {
    previousScroll = window.scrollY;
    journey.hidden = true;
    map.hidden = true;
    overview.hidden = false;
    overview.scrollIntoView({ behavior: "instant" });
    overview.focus({ preventScroll: true });
  });
  document
    .querySelector("#return-journey")!
    .addEventListener("click", () => close(true));
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) =>
    link.addEventListener("click", (event) => {
      if (link.classList.contains("demo-jump")) {
        event.preventDefault();
        link.closest(".destination")?.querySelector(".experience-scroll")?.scrollTo({ top: 0 });
      }
      if (!overview.hidden) close(false);
      map.classList.remove("expanded");
      toggle.setAttribute("aria-expanded", "false");
      const target = document.getElementById(link.hash.slice(1));
      if (target) {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    }),
  );
  toggle.addEventListener("click", () => {
    const expanded = map.classList.toggle("expanded");
    toggle.setAttribute("aria-expanded", String(expanded));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!overview.hidden) close(true);
      if (map.classList.contains("expanded")) {
        map.classList.remove("expanded");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    }
  });
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          document
            .querySelectorAll<HTMLAnchorElement>("[data-map]")
            .forEach((link) => {
              if (link.dataset.map === entry.target.id)
                link.setAttribute("aria-current", "location");
              else link.removeAttribute("aria-current");
            });
        }
    },
    { rootMargin: "-20% 0px -45% 0px", threshold: 0 },
  );
  document
    .querySelectorAll("#depart, [data-destination], #contact")
    .forEach((section) => observer.observe(section));
  window.addEventListener("hashchange", () => {
    if (!overview.hidden) close(false);
  });
}
