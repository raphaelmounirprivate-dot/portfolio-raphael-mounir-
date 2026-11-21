import { test, expect } from "@playwright/test";

test("le voyage et les ressources se chargent sans erreur", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error") errors.push(e.text());
  });
  await page.goto("/#depart");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const order = ["pulse-music", "echec-et-mat", "telecom", "pandemic-horizon", "math", "mon-coach-sport", "mon-app", "declic-ados"];
  expect(await page.locator("[data-destination]").evaluateAll(sections => sections.map(section => section.id))).toEqual(order);
  expect(await page.locator("[data-map]").evaluateAll(links => links.map(link => link.getAttribute("data-map")))).toEqual(["depart", ...order, "contact"]);
  expect(await page.locator("[data-overview-link]").evaluateAll(links => links.map(link => link.getAttribute("href")))).toEqual(order.map(id => `#${id}`));
  await page.locator(".real-captures > summary").click();
  await page.locator("#mon-coach-sport").scrollIntoViewIfNeeded();
  await expect(page.locator(".phone img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".phone img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  for (const id of [
    "depart",
    ...order,
    "a-propos",
    "contact",
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await expect(page.getByText("Coif’heure", { exact: false })).toHaveCount(0);
  await expect(page.locator('a[href*="github.com"]')).toHaveCount(0);
  expect(errors).toEqual([]);
  await page.evaluate(async () => {
    for (const image of document.images) {
      if (image.loading === "lazy") image.loading = "eager";
      await image.decode();
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".project-copy").evaluateAll(async (elements) => {
    await Promise.all(
      elements.flatMap((el) =>
        el.getAnimations().map((animation) => animation.finished),
      ),
    );
  });
  await page.screenshot({
    path: `.local/${testInfo.project.name}-accueil.png`,
    fullPage: true,
  });
});

test("galerie par boutons, clavier et balayage", async ({ page }) => {
  await page.goto("/#mon-coach-sport");
  await page.locator(".real-captures > summary").click();
  const gallery = page.locator("[data-gallery]");
  await gallery.getByRole("button", { name: "Capture suivante" }).click();
  await expect(gallery.locator("[data-counter]")).toHaveText("2 / 3");
  await gallery.focus();
  await page.keyboard.press("ArrowRight");
  await expect(gallery.locator("[data-counter]")).toHaveText("3 / 3");
  await gallery.getByRole("button", { name: "Capture suivante" }).click();
  await expect(gallery.locator("[data-counter]")).toHaveText("1 / 3");
  await gallery.evaluate((el) => {
    el.dispatchEvent(
      new TouchEvent("touchstart", {
        changedTouches: [
          new Touch({ identifier: 1, target: el, clientX: 250, clientY: 100 }),
        ],
      }),
    );
    el.dispatchEvent(
      new TouchEvent("touchend", {
        changedTouches: [
          new Touch({ identifier: 1, target: el, clientX: 100, clientY: 105 }),
        ],
      }),
    );
  });
  await expect(gallery.locator("[data-counter]")).toHaveText("2 / 3");
});

test("vue d’ensemble, liens directs et retour au focus", async ({ page }) => {
  await page.goto("/#depart");
  const opener = page.getByRole("button", { name: "Vue d’ensemble" });
  await opener.click();
  await expect(page.locator("#overview")).toBeFocused();
  await expect(page.locator("[data-overview-link]")).toHaveCount(8);
  await page.getByRole("button", { name: "Revenir au voyage" }).click();
  await expect(opener).toBeFocused();
  await opener.click();
  await page.locator('[data-overview-link][href="#pandemic-horizon"]').click();
  await expect(page.locator("#journey")).toBeVisible();
  await expect(page).toHaveURL(/#pandemic-horizon$/);
  await expect(page.locator("#pandemic-horizon")).toBeFocused();
});

test("thème persistant, clavier et mouvements réduits", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Entrer dans le site" })).toBeFocused();
  await page.keyboard.press("Enter");
  await page.getByRole("link", { name: "Aller au contenu" }).focus();
  await expect(
    page.getByRole("link", { name: "Aller au contenu" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#contenu")).toBeFocused();
  await page.getByRole("button", { name: "Activer le thème clair" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(
    await page
      .locator(".signal")
      .evaluateAll((elements) => elements.map(el => getComputedStyle(el).animationName)),
  ).toEqual(Array(5).fill("signal"));
  expect(
    await page.locator(".signal").evaluateAll(elements => elements.map(el => getComputedStyle(el).animationDuration)),
  ).toEqual(Array(5).fill("24s"));
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  await page.evaluate(async () => {
    for (const image of document.images) {
      image.loading = "eager";
      await image.decode();
    }
  });
  await page.screenshot({
    path: `.local/theme-clair-${test.info().project.name}.png`,
    fullPage: true,
  });
});

test("une destination ajoutée alimente le voyage, la carte et la grille", async ({
  page,
}) => {
  await page.goto("/#depart");
  const result = await page.evaluate(async () => {
    // Le test vérifie le contrat public du rendu avec une donnée supplémentaire.
    const { render } = await import("/src/render.ts");
    const { projects } = await import("/src/data/projects.ts");
    const root = document.createElement("div");
    root.innerHTML = render([
      ...projects,
      { ...projects[0], id: "destination-test", title: "Destination de test" },
    ]);
    return [
      root.querySelectorAll("#destination-test").length,
      root.querySelectorAll('[data-map="destination-test"]').length,
      root.querySelectorAll('[data-overview-link][href="#destination-test"]')
        .length,
    ];
  });
  expect(result).toEqual([1, 1, 1]);
});
