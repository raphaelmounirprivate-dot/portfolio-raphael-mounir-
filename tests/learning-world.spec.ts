import { test, expect } from "@playwright/test";

test("Math et Déclic retrouvent Pixel, leurs missions et les XP de démo", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  for (const [kind, correct] of [
    ["math", "64"],
    ["declic", "arrivées"],
  ]) {
    const world = page.locator(`[data-demo="${kind}"]`);
    await expect(world).toHaveClass(/learning-world/);
    await expect(
      world.getByAltText("Pixel, la mascotte des sites Déclic"),
    ).toBeVisible();
    await expect
      .poll(() =>
        world
          .locator(".pixel-mascot")
          .evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
      )
      .toBe(true);
    await expect(world.locator("[data-learning-step]")).toHaveCount(3);
    await expect(world.locator("[data-learning-xp]")).toHaveText("0");
    await world.getByRole("button", { name: correct, exact: true }).click();
    await expect(world.locator("[data-learning-xp]")).toHaveText("10");
    await expect(world.locator("[data-learning-meter]")).toHaveAttribute(
      "value",
      "1",
    );
    await expect(world.locator("[data-pixel-message]")).toContainText(
      "Bien joué",
    );
    await expect(
      world.locator('[data-learning-step="0"] [data-step-result]'),
    ).toHaveText("Réussi");
    await world.locator("[data-next-question]").click();
    await expect(world.locator('[data-learning-step="1"]')).toHaveAttribute(
      "aria-current",
      "step",
    );
    await world.locator("[data-hint]").click();
    await expect(world.locator("[data-pixel-message]")).toContainText(
      "coup de pouce",
    );
    await world.locator("[data-reset]").click();
    await expect(world.locator("[data-learning-xp]")).toHaveText("0");
    await expect(world.locator("[data-learning-meter]")).toHaveAttribute(
      "value",
      "0",
    );
    await expect(world.locator('[data-learning-step="0"]')).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(
      await world
        .locator("h3")
        .evaluate((el) => getComputedStyle(el).fontFamily),
    ).toContain("Nunito");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await world.screenshot({
      path: `.local/learning/${testInfo.project.name}-${kind}.png`,
      style: ".journey-map,.skip-link{visibility:hidden!important}",
    });
  }
  await page.getByRole("button", { name: "Vue d’ensemble" }).click();
  await expect(page.locator(".learning-overview")).toHaveCount(2);
  await expect(page.locator('a[href*="github.com"]')).toHaveCount(0);
});

test("Pixel encourage après une erreur sans ajouter de points et respecte les mouvements réduits", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#math");
  const math = page.locator('[data-demo="math"]');
  await math.getByRole("button", { name: "12", exact: true }).click();
  await expect(math.locator("[data-learning-xp]")).toHaveText("0");
  await expect(math.locator("[data-pixel-message]")).toContainText(
    "Les erreurs font partie du jeu",
  );
  await expect(
    math.locator('[data-learning-step="0"] [data-step-result]'),
  ).toHaveText("À revoir");
  await math.locator("[data-reset]").click();
  await math.getByRole("button", { name: "64", exact: true }).click();
  expect(
    await math
      .locator(".pixel-mascot")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
