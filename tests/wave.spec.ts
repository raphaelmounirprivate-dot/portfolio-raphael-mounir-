import { test, expect } from "@playwright/test";

test("chaque fibre porte une vague avec un départ et une arrivée décalés", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#depart");
  const signals = page.locator(".signal");
  await expect(signals).toHaveCount(5);
  const states = await signals.evaluateAll(elements => elements.map((element, index) => {
    const style = getComputedStyle(element);
    const strand = document.querySelectorAll(".fiber-strands path")[index];
    return {
      samePath: element.getAttribute("d") === strand.getAttribute("d"),
      duration: style.animationDuration,
      delay: style.animationDelay,
      offset: style.strokeDashoffset,
    };
  }));
  expect(states.every(state => state.samePath && state.duration === "12s")).toBe(true);
  expect(new Set(states.map(state => state.delay)).size).toBe(5);
  expect(new Set(states.map(state => state.offset)).size).toBe(5);
  await expect.poll(() => signals.evaluateAll(elements => elements.map(el => getComputedStyle(el).strokeDashoffset)))
    .not.toEqual(states.map(state => state.offset));
  await page.getByRole("button", { name: "Mettre la vague en pause", exact: true }).click();
  const paused = await signals.evaluateAll(async elements => {
    // Laisser le navigateur appliquer la pause à sa prochaine image composée.
    for (let index = 0; index < 2; index++) await new Promise(requestAnimationFrame);
    return elements.map(el => getComputedStyle(el).strokeDashoffset);
  });
  const later = await signals.evaluateAll(async elements => {
    for (let index = 0; index < 5; index++) await new Promise(requestAnimationFrame);
    return elements.map(el => getComputedStyle(el).strokeDashoffset);
  });
  expect(later).toEqual(paused);
  await page.locator("#depart").screenshot({ path: `.local/waves-staggered-${testInfo.project.name}.png`, style: ".skip-link{visibility:hidden!important}" });
  await page.getByRole("button", { name: "Animer la vague", exact: true }).click();
  await expect.poll(() => signals.evaluateAll(elements => elements.map(el => getComputedStyle(el).strokeDashoffset))).not.toEqual(paused);
});

test("la vague démarre plus lentement avec les mouvements réduits et reste contrôlable", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#depart");
  const signal = page.locator(".signal").first();
  const play = page.getByRole("button", { name: "Animer la vague", exact: true });
  const pause = page.getByRole("button", { name: "Mettre la vague en pause", exact: true });
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  expect(await signal.evaluate(el => getComputedStyle(el).animationDuration)).toBe("24s");
  await pause.click();
  await play.focus();
  await page.keyboard.press("Enter");
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  expect(await signal.evaluate(el => getComputedStyle(el).animationName)).toBe("signal");
  const offset = await signal.evaluate(el => getComputedStyle(el).strokeDashoffset);
  await expect.poll(() => signal.evaluate(el => getComputedStyle(el).strokeDashoffset)).not.toBe(offset);
  expect(await page.locator("html").evaluate(el => getComputedStyle(el).scrollBehavior)).toBe("auto");
  await page.reload();
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  await pause.click();
  await expect(play).toHaveAttribute("aria-pressed", "false");
  await page.reload();
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  await pause.click();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  expect(await signal.evaluate(el => getComputedStyle(el).animationPlayState)).toBe("paused");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await play.click();
  await page.locator("#depart").screenshot({ path: `.local/wave-${testInfo.project.name}.png`, style: ".skip-link{visibility:hidden!important}" });
});

test("la vague est animée normalement après l’écran de lancement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => localStorage.setItem("portfolio-wave-motion", "off"));
  await page.goto("/");
  await page.getByRole("button", { name: "Entrer dans le site" }).click();
  await expect(page.getByRole("button", { name: "Mettre la vague en pause", exact: true })).toHaveAttribute("aria-pressed", "true");
  const signal = page.locator(".signal").first();
  const offset = await signal.evaluate(el => getComputedStyle(el).strokeDashoffset);
  await expect.poll(() => signal.evaluate(el => getComputedStyle(el).strokeDashoffset)).not.toBe(offset);
  await page.getByRole("button", { name: "Mettre la vague en pause", exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: "Entrer dans le site" }).click();
  await expect(page.getByRole("button", { name: "Mettre la vague en pause", exact: true })).toHaveAttribute("aria-pressed", "true");
  const restartedOffset = await signal.evaluate(el => getComputedStyle(el).strokeDashoffset);
  await expect.poll(() => signal.evaluate(el => getComputedStyle(el).strokeDashoffset)).not.toBe(restartedOffset);
});
