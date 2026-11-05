import { test, expect } from "@playwright/test";

test("les chapitres de maths et de français expliquent les règles sans perdre la progression", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#depart");
  let sharedChapterHeight: number | undefined;
  for (const [kind, answer, title, correction] of [
    ["math", "64", "Comprendre les puissances", "3³ = 3 × 3 × 3 = 27"],
    ["declic", "arrivées", "Accorder le participe passé", "On écrit « écrites »"],
  ]) {
    const world = page.locator(`[data-demo="${kind}"]`);
    const chapter = world.locator(".learning-chapter");
    await world.getByRole("button", { name: answer, exact: true }).click();
    await world.locator("[data-next-question]").click();
    const question = await world.locator("[data-question]").textContent();
    const read = world.getByRole("button", { name: "Lire le chapitre", exact: true });
    await read.focus();
    await page.keyboard.press("Enter");
    await expect(read).toHaveAttribute("aria-pressed", "true");
    await expect(world.locator(".demo-content")).toBeHidden();
    await expect(chapter.getByRole("heading", { name: title, exact: true })).toBeVisible();
    await expect(chapter.locator(".chapter-steps > li")).toHaveCount(3);
    const chapterHeight = await chapter.evaluate(el => el.getBoundingClientRect().height);
    if (sharedChapterHeight !== undefined) expect(Math.abs(chapterHeight - sharedChapterHeight)).toBeLessThan(2);
    sharedChapterHeight = chapterHeight;
    for (let step = 0; step < 3; step++) {
      await expect(chapter.locator("[data-chapter-page]:visible")).toHaveCount(1);
      await chapter.getByRole("button", { name: "Suivant", exact: true }).click();
      expect(Math.abs(await chapter.evaluate(el => el.getBoundingClientRect().height) - chapterHeight)).toBeLessThan(2);
    }
    await expect(chapter.locator("[data-chapter-position]")).toHaveText("Étape 4 / 4");
    await expect(chapter.getByRole("button", { name: "Suivant", exact: true })).toBeDisabled();
    await chapter.getByText("Voir la correction", { exact: true }).click();
    await expect(chapter.locator(".chapter-application details p")).toContainText(correction);
    const scrollers = await chapter.evaluate(root => Array.from(root.querySelectorAll("*")).filter(element => /^(auto|scroll)$/.test(getComputedStyle(element).overflowY) && element.scrollHeight > element.clientHeight + 1).length);
    expect(scrollers).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await chapter.screenshot({ path: `.local/chapters/${testInfo.project.name}-${kind}.png`, style: ".journey-map,.skip-link{visibility:hidden!important}" });
    await chapter.getByRole("button", { name: "Passer aux trois défis" }).click();
    await expect(chapter).toBeHidden();
    await expect(world.locator("[data-question]")).toHaveText(question!);
    await expect(world.locator("[data-learning-xp]")).toHaveText("10");
    await expect(world.locator("[data-quiz-progress]")).toHaveText("Défi 2 / 3");
    await expect(world.locator("[data-choices] button").first()).toBeFocused();
    await read.click();
    await world.getByRole("button", { name: "S’entraîner", exact: true }).click();
    await expect(world.locator(".demo-content")).toBeVisible();
  }
});

test("Math et Déclic retrouvent Pixel, leurs missions et les XP de démo", async ({
  page,
}, testInfo) => {
  await page.goto("/#depart");
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
        .locator(".demo-content h3")
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
