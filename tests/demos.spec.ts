import { test, expect } from "@playwright/test";

test("budget : paiement sans double déduction et dépense unique", async ({
  page,
}) => {
  await page.goto("/#mon-app");
  const demo = page.locator('[data-demo="budget"]');
  await expect(demo.locator("[data-available]")).toHaveText(/920,00/);
  await demo.locator("[data-pay]").click();
  await expect(demo.locator("[data-balance]")).toHaveText(/1\s?120,00/);
  await expect(demo.locator("[data-available]")).toHaveText(/920,00/);
  await expect(demo.locator("[data-pay]")).toBeDisabled();
  await demo.locator("[data-pay]").dispatchEvent("click");
  await expect(demo.locator("[data-balance]")).toHaveText(/1\s?120,00/);
  await demo.locator("[data-expense]").click();
  await expect(demo.locator("[data-available]")).toHaveText(/895,00/);
  await expect(demo.locator("[data-expense]")).toBeDisabled();
  await demo.locator("[data-reset]").click();
  await expect(demo.locator("[data-available]")).toHaveText(/920,00/);
  await expect(demo.locator("[data-pay]")).toBeEnabled();
});

test("sport : validation, chrono, pause et réinitialisation", async ({
  page,
}) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#mon-coach-sport");
  const demo = page.locator('[data-demo="sport"]');
  const technique = demo.getByRole("button", { name: "Technique de l’exercice", exact: true });
  const session = demo.getByRole("button", { name: "Séance", exact: true });
  await expect(technique).toHaveAttribute("aria-pressed", "true");
  await expect(session).toHaveClass(/sport-invite/);
  expect(await session.evaluate(el => getComputedStyle(el).animationName)).toBe("sport-invite");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await session.evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(demo.locator("#sport-practice")).toBeHidden();
  const illustration = demo.getByRole("img", { name: /Presse à cuisses inclinée/ });
  await illustration.scrollIntoViewIfNeeded();
  await expect.poll(() => illustration.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth === 1534)).toBe(true);
  await expect(demo.getByRole("heading", { name: "Repères techniques" })).toBeVisible();
  await expect(demo.locator(".exercise-technique")).toContainText("sans décoller le bassin");
  await expect(demo.locator(".exercise-technique")).toContainText("pas de rebond");
  await demo.screenshot({ path: `.local/demos/${test.info().project.name}-sport-technique.png`, style: ".journey-map,.skip-link{visibility:hidden!important}" });
  const techniqueHeight = await demo.evaluate(el => el.getBoundingClientRect().height);
  await session.click();
  await expect(session).not.toHaveClass(/sport-invite/);
  expect(await session.evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  await expect(demo.locator("#sport-technique")).toBeHidden();
  const practiceHeight = await demo.evaluate(el => el.getBoundingClientRect().height);
  if (await demo.evaluate(el => el.getBoundingClientRect().width) >= 600) {
    expect(Math.abs(practiceHeight - techniqueHeight)).toBeLessThan(2);
  } else {
    expect(practiceHeight).toBeLessThan(techniqueHeight);
  }
  await demo.locator("[data-weight]").fill("-1");
  await demo.locator("[data-validate]").click();
  await expect(demo.locator('[data-set="1"]')).toContainText("À faire");
  await demo.locator("[data-weight]").fill("40");
  await demo.locator("[data-validate]").click();
  await expect(demo.locator('[data-set="1"]')).toContainText("40 kg × 12");
  await page.clock.fastForward(30000);
  await expect(demo.locator("[data-timer]")).toHaveText("01:30");
  await technique.click();
  await expect(session).not.toHaveClass(/sport-invite/);
  await demo.getByRole("button", { name: "Séance", exact: true }).click();
  await expect(demo.locator('[data-set="1"]')).toContainText("40 kg × 12");
  await expect(demo.locator("[data-timer]")).toHaveText("01:30");
  await demo.locator("[data-pause]").click();
  await page.clock.fastForward(30000);
  await expect(demo.locator("[data-timer]")).toHaveText("01:30");
  await demo.locator("[data-pause]").click();
  await page.clock.fastForward(90000);
  await expect(demo.locator("[data-timer]")).toHaveText("00:00");
  await expect(demo.locator("[data-feedback]")).toHaveText(
    "Repos terminé. Vous pouvez continuer.",
  );
  await demo.locator("[data-validate]").click();
  await expect(demo.locator("[data-validate]")).toBeDisabled();
  await demo.locator("[data-reset]").click();
  await expect(demo.locator("[data-timer]")).toHaveText("02:00");
  await expect(demo.locator("[data-weight]")).toHaveValue("40");
  await expect(session).not.toHaveClass(/sport-invite/);
  await expect(demo.locator("[data-reps]")).toHaveValue("12");
  await page.clock.fastForward(10000);
  await expect(demo.locator("[data-timer]")).toHaveText("02:00");
});

test("Pandemic : chargement au clic, fermeture et retour du focus", async ({ page }) => {
  // This test owns the dialog lifecycle. The real engine has its separate smoke test.
  await page.route("**/horizon-game/index.html", route => route.fulfill({ contentType: "text/html", body: "<title>Cadre du jeu</title>" }));
  await page.goto("/#pandemic-horizon");
  const demo = page.locator('[data-demo="simulation"]');
  await expect(page.locator("[data-horizon-frame]")).toHaveCount(0);
  await demo.locator("[data-horizon-launch]").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("[data-horizon-frame]")).toHaveAttribute("src", /horizon-game\/index.html/);
  await page.getByRole("button", {name: "Revenir au portfolio"}).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator("[data-horizon-frame]")).toHaveCount(0);
  await expect(demo.locator("[data-horizon-launch]")).toBeFocused();
  await demo.locator("[data-horizon-launch]").click();
  await page.frameLocator("[data-horizon-frame]").locator("body").press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(demo.locator("[data-horizon-launch]")).toBeFocused();
});

for (const [kind, wrong, correct] of [
  ["telecom", "75 W", "25 W"],
  ["math", "12", "64"],
  ["declic", "arrivé", "arrivées"],
]) {
  test(`${kind} : erreur expliquée, indice, bilan et nouvel essai`, async ({
    page,
  }) => {
    await page.goto("/#depart");
    const demo = page.locator(`[data-demo="${kind}"]`);
    if (kind === "telecom") await demo.locator(".cisco-poe > summary").click();
    await demo.getByRole("button", { name: wrong, exact: true }).click();
    await expect(demo.locator("[data-feedback]")).toContainText("À retenir");
    await expect(
      demo.getByRole("button", { name: correct, exact: true }),
    ).toBeDisabled();
    await expect(demo.locator("[data-score]")).toHaveText("0 bonne réponse");
    await demo.locator("[data-next-question]").click();
    if (kind !== "telecom") {
      await demo.locator("[data-hint]").click();
      await expect(demo.locator("[data-hint-text]")).toBeVisible();
    }
    await demo.locator("[data-choices] button").first().click();
    await demo.locator("[data-next-question]").click();
    await demo.locator("[data-choices] button").first().click();
    await demo
      .getByRole("button", { name: "Voir le bilan", exact: true })
      .click();
    await expect(demo.locator("[data-feedback]")).toContainText(
      "Démo terminée",
    );
    await demo.locator("[data-reset]").click();
    await demo.getByRole("button", { name: correct, exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(demo.locator("[data-score]")).toHaveText("1 bonne réponse");
  });
}

test("les six démos restent lisibles et utilisables sur chaque format", async ({
  page,
}, testInfo) => {
  await page.goto("/#depart");
  for (const kind of [
    "sport",
    "simulation",
    "telecom",
    "budget",
    "math",
    "declic",
  ]) {
    const demo = page.locator(`[data-demo="${kind}"]`);
    await demo.scrollIntoViewIfNeeded();
    await expect(demo).toBeVisible();
    const action = demo.locator("button:not(:disabled)").first();
    await action.scrollIntoViewIfNeeded();
    const actionBox = await action.boundingBox();
    const mapBox = await page.locator(".journey-map").boundingBox();
    if (actionBox && mapBox) {
      const overlap =
        actionBox.x < mapBox.x + mapBox.width &&
        actionBox.x + actionBox.width > mapBox.x &&
        actionBox.y < mapBox.y + mapBox.height &&
        actionBox.y + actionBox.height > mapBox.y;
      expect(overlap).toBe(false);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await demo.screenshot({
      path: `.local/demos/${testInfo.project.name}-${kind}.png`,
    });
  }
});
