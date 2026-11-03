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
  await page.goto("/#mon-coach-sport");
  const demo = page.locator('[data-demo="sport"]');
  await demo.locator("[data-weight]").fill("-1");
  await demo.locator("[data-validate]").click();
  await expect(demo.locator('[data-set="1"]')).toContainText("À faire");
  await demo.locator("[data-weight]").fill("40");
  await demo.locator("[data-validate]").click();
  await expect(demo.locator('[data-set="1"]')).toContainText("40 kg × 12");
  await page.clock.fastForward(30000);
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
  await expect(demo.locator("[data-reps]")).toHaveValue("12");
  await page.clock.fastForward(10000);
  await expect(demo.locator("[data-timer]")).toHaveText("02:00");
});

test("simulation : comparer les stratégies et rejouer", async ({ page }) => {
  await page.goto("/#pandemic-horizon");
  const demo = page.locator('[data-demo="simulation"]');
  for (let i = 0; i < 3; i++) await demo.locator("[data-advance]").click();
  await expect(demo.locator("[data-connected]")).toHaveText("6 / 6");
  await expect(demo.locator("[data-remedy]")).toHaveText("90 %");
  await expect(demo.locator("[data-advance]")).toBeDisabled();
  await demo.locator("[data-reset]").click();
  await demo.getByRole("radio", { name: /Discrétion/ }).check();
  for (let i = 0; i < 5; i++) await demo.locator("[data-advance]").click();
  await expect(demo.locator("[data-connected]")).toHaveText("6 / 6");
  await expect(demo.locator("[data-remedy]")).toHaveText("75 %");
});

for (const [kind, wrong, correct] of [
  ["telecom", "75 W", "25 W"],
  ["math", "12", "64"],
  ["declic", "arrivé", "arrivées"],
]) {
  test(`${kind} : erreur expliquée, indice, bilan et nouvel essai`, async ({
    page,
  }) => {
    await page.goto("/");
    const demo = page.locator(`[data-demo="${kind}"]`);
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
  await page.goto("/");
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
