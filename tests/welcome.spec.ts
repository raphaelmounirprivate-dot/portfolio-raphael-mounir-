import { test, expect } from "@playwright/test";

test("la bordure étoilée anime le bouton et suit la préférence de mouvement", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Entrer dans le site" });
  const border = button.locator("canvas");
  await expect(button).toHaveAttribute("data-star-motion", "animated");
  const first = await border.evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  await expect.poll(() => border.evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL())).not.toBe(first);
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".welcome-image").evaluate((image: HTMLImageElement) => image.decode());
  await page.screenshot({ path: `.local/star-border-${testInfo.project.name}.png` });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(button).toHaveAttribute("data-star-motion", "static");
  // Plusieurs raf du navigateur vérifient que la bordure reste vraiment immobile.
  const snapshots = await border.evaluate(async (canvas: HTMLCanvasElement) => {
    const before = canvas.toDataURL();
    for (let index = 0; index < 5; index++) await new Promise(requestAnimationFrame);
    return [before, canvas.toDataURL()];
  });
  expect(snapshots[0]).toBe(snapshots[1]);
  const motionControl = page.getByRole("button", { name: "Animer le contour du bouton" });
  await expect(motionControl).toBeVisible();
  await motionControl.click();
  await expect(button).toHaveAttribute("data-star-motion", "animated");
  await expect.poll(() => border.evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL())).not.toBe(snapshots[1]);
  await page.getByRole("button", { name: "Arrêter le contour animé" }).click();
  await expect(button).toHaveAttribute("data-star-motion", "static");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(button).toHaveAttribute("data-star-motion", "animated");
  await expect(motionControl).toBeHidden();
  await page.evaluate(() => dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
  const restored = await border.evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  await expect.poll(() => border.evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL())).not.toBe(restored);
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".welcome, .star-border-light")).toHaveCount(0);
  await expect(page.locator("#depart")).toBeFocused();
  expect(errors).toEqual([]);
});

for (const failure of ["sans-webgl", "sans-textures-flottantes", "mouvements-réduits"]) {
  test(`le curseur reste visible : ${failure}`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: failure === "mouvements-réduits" ? "reduce" : "no-preference" });
    if (failure === "sans-webgl") {
      await page.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type: string, ...options: unknown[]) {
          return type === "webgl2" ? null : original.call(this, type as "2d", ...options);
        } as typeof original;
      });
    }
    if (failure === "sans-textures-flottantes") {
      await page.addInitScript(() => {
        const original = WebGL2RenderingContext.prototype.getExtension;
        WebGL2RenderingContext.prototype.getExtension = function (name: string) {
          return name === "EXT_color_buffer_float" ? null : original.call(this, name);
        };
      });
    }
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/");
    const welcome = page.locator(".welcome");
    await expect(welcome).toHaveAttribute("data-cursor-renderer", failure === "mouvements-réduits" ? "halo" : "canvas");
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".welcome-image").evaluate((image: HTMLImageElement) => image.decode());
    const before = await page.screenshot();
    await page.mouse.move(100, 180);
    for (let index = 0; index < 12; index++) await page.mouse.move(110 + index * 10, 190 + Math.sin(index / 2) * 40);
    if (failure === "mouvements-réduits") {
      await expect(page.locator(".welcome-pointer")).toBeVisible();
    } else {
      await expect.poll(() => page.locator(".welcome-glow").evaluate((canvas: HTMLCanvasElement) => {
        const pixels = canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height).data;
        return pixels.some((value, index) => index % 4 === 3 && value > 0);
      })).toBe(true);
    }
    const after = await page.screenshot({ path: `.local/cursor-${testInfo.project.name}-${failure}.png` });
    expect(after.equals(before)).toBe(false);
    await page.getByRole("button", { name: "Entrer dans le site" }).click();
    await expect(page.locator(".welcome, .welcome-pointer")).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test("une perte du contexte graphique active la traînée de secours", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  test.skip(await page.locator(".welcome").getAttribute("data-cursor-renderer") !== "webgl", "Le rendu de secours est déjà actif sur ce navigateur.");
  const supported = await page.locator(".welcome-glow").evaluate((canvas: HTMLCanvasElement) => {
    const extension = canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context");
    extension?.loseContext();
    return Boolean(extension);
  });
  test.skip(!supported, "La perte de contexte ne peut pas être simulée par ce navigateur.");
  await expect(page.locator(".welcome")).toHaveAttribute("data-cursor-renderer", "canvas");
  await page.mouse.move(100, 180);
  await page.mouse.move(220, 230, { steps: 8 });
  await expect.poll(() => page.locator(".welcome-glow").evaluate((canvas: HTMLCanvasElement) => {
    const pixels = canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height).data;
    return pixels.some((value, index) => index % 4 === 3 && value > 0);
  })).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".welcome")).toHaveAttribute("data-cursor-renderer", "halo");
  await page.getByRole("button", { name: "Entrer dans le site" }).click();
  await expect(page.locator(".welcome, .welcome-pointer")).toHaveCount(0);
});

test("l’accueil montre l’image, puis ouvre le portfolio au clavier ou au toucher", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const welcome = page.locator(".welcome");
  const enter = page.getByRole("button", { name: "Entrer dans le site" });
  await expect(welcome).toBeVisible();
  await expect(page).toHaveTitle("Un besoin, Des solutions");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Un besoin,Des solutions.");
  await expect.poll(() => page.locator(".welcome-image").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth === 1376)).toBe(true);
  await expect(page.locator("#app")).toHaveAttribute("inert", "");
  await page.mouse.move(150, 200);
  for (let i = 0; i < 18; i++) await page.mouse.move(160 + i * 8, 220 + Math.sin(i / 3) * 60);
  await page.screenshot({ path: `.local/welcome-${testInfo.project.name}.png` });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if (testInfo.project.name === "mobile") {
    await enter.tap();
  } else {
    await page.keyboard.press("Tab");
    await expect(enter).toBeFocused();
    await page.keyboard.press("Enter");
  }
  await expect(welcome).toHaveCount(0);
  await expect(page.locator("#depart")).toBeFocused();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Je connecte les idées.");
  await page.getByRole("button", { name: "Vue d’ensemble" }).click();
  await expect(page.locator("#overview")).toBeVisible();
  expect(errors).toEqual([]);
});

test("l’accueil revient à l’ouverture et les liens directs restent utilisables", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Entrer dans le site" }).click();
  await page.reload();
  await expect(page.locator(".welcome")).toBeVisible();
  await page.goto("/#telecom");
  await expect(page.locator(".welcome")).toHaveCount(0);
  await expect(page.locator("#telecom")).toBeVisible();
});
