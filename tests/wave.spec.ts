import { test, expect } from "@playwright/test";

test("la vague peut être réactivée avec les mouvements réduits et mémorise le choix", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#depart");
  const signal = page.locator(".signal");
  const play = page.getByRole("button", { name: "Animer la vague", exact: true });
  await expect(play).toBeVisible();
  expect(await signal.evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  await play.focus();
  await page.keyboard.press("Enter");
  const pause = page.getByRole("button", { name: "Mettre la vague en pause", exact: true });
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  expect(await signal.evaluate(el => getComputedStyle(el).animationName)).toBe("signal");
  const offset = await signal.evaluate(el => getComputedStyle(el).strokeDashoffset);
  await expect.poll(() => signal.evaluate(el => getComputedStyle(el).strokeDashoffset)).not.toBe(offset);
  expect(await page.locator("html").evaluate(el => getComputedStyle(el).scrollBehavior)).toBe("auto");
  await page.reload();
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  expect(await signal.evaluate(el => getComputedStyle(el).animationName)).toBe("signal");
  await pause.click();
  await expect(play).toHaveAttribute("aria-pressed", "false");
  await page.reload();
  await expect(play).toHaveAttribute("aria-pressed", "false");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  expect(await signal.evaluate(el => getComputedStyle(el).animationPlayState)).toBe("paused");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await play.click();
  await page.locator("#depart").screenshot({ path: `.local/wave-${testInfo.project.name}.png`, style: ".skip-link{visibility:hidden!important}" });
});

test("la vague est animée normalement après l’écran de lancement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("button", { name: "Entrer dans le site" }).click();
  await expect(page.getByRole("button", { name: "Mettre la vague en pause", exact: true })).toHaveAttribute("aria-pressed", "true");
  const signal = page.locator(".signal");
  const offset = await signal.evaluate(el => getComputedStyle(el).strokeDashoffset);
  await expect.poll(() => signal.evaluate(el => getComputedStyle(el).strokeDashoffset)).not.toBe(offset);
});
