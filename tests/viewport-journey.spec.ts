import { test, expect } from "@playwright/test";

test("les escales affichent tout leur contenu sans cadre défilant", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#depart");
  await page.evaluate(() => document.fonts.ready);
  const scrollers = () => page.locator("[data-destination]").evaluateAll(sections => sections.flatMap(section =>
    Array.from(section.querySelectorAll<HTMLElement>("*")).filter(element => {
      const style = getComputedStyle(element);
      return /^(auto|scroll)$/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1;
    }).map(element => element.className)
  ));
  for (const section of await page.locator("[data-destination]").all()) {
    const panel = section.locator(".demo-panel");
    const panelBox = (await panel.boundingBox())!;
    const sectionBox = (await section.boundingBox())!;
    expect(panelBox.y).toBeGreaterThanOrEqual(sectionBox.y);
    expect(panelBox.y + panelBox.height).toBeLessThanOrEqual(sectionBox.y + sectionBox.height);
    for (const control of await panel.locator("button:visible, input:visible, [data-feedback]:visible").all()) {
      const box = (await control.boundingBox())!;
      expect(box.y).toBeGreaterThanOrEqual(panelBox.y - 1);
      expect(box.y + box.height).toBeLessThanOrEqual(panelBox.y + panelBox.height + 1);
    }
    const details = section.locator(".project-description");
    await details.locator("summary").click();
    await expect(details).toHaveAttribute("open", "");
    const expanded = (await section.boundingBox())!;
    const text = (await details.boundingBox())!;
    expect(text.y + text.height).toBeLessThan(expanded.y + expanded.height);
    await details.locator("summary").click();
  }
  expect(await scrollers()).toEqual([]);
  for (const kind of ["math", "declic"]) {
    const panel = page.locator(`[data-demo="${kind}"]`);
    await panel.locator("[data-hint]").click();
    await panel.locator("[data-choices] button").first().click();
    const panelBox = (await panel.boundingBox())!;
    const feedback = (await panel.locator("[data-feedback]").boundingBox())!;
    const next = (await panel.locator("[data-next-question]").boundingBox())!;
    expect(feedback.y + feedback.height).toBeLessThan(panelBox.y + panelBox.height);
    expect(next.y + next.height).toBeLessThan(panelBox.y + panelBox.height);
    await panel.locator("[data-reset]").click();
  }
  await page.locator(".cisco-guide summary").click();
  await page.locator(".real-captures > summary").click();
  expect(await scrollers()).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const kind of ["sport", "simulation", "telecom", "budget", "math", "declic", "chess"]) {
    await page.locator(`[data-demo="${kind}"]`).screenshot({path: `.local/fit-${testInfo.project.name}-${kind}.png`});
  }
});

test("un glissement dans la démo déplace la page sur téléphone", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Geste tactile contrôlé sur téléphone.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#math");
  await page.evaluate(() => document.fonts.ready);
  await page.locator('[data-demo="math"]').evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
  const documentTop = await page.evaluate(() => scrollY);
  const session = await page.context().newCDPSession(page);
  const box = (await page.locator('[data-demo="math"]').boundingBox())!;
  const x = box.x + 8;
  const y = 450;
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
  try {
    for (let step = 1; step <= 6; step++) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y - step * 20 }] });
      await page.evaluate(() => new Promise(requestAnimationFrame));
    }
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(documentTop + 30);
  } finally {
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await session.detach();
  }
});
