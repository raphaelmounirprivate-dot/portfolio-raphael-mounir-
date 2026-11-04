import { test, expect } from "@playwright/test";

test("chaque escale occupe un écran et garde ses commandes accessibles", async ({ page }, testInfo) => {
  await page.goto("/");
  const destinations = page.locator("[data-destination]");
  for (const section of await destinations.all()) {
    await section.evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
    const bounds = await section.boundingBox();
    expect(Math.abs(bounds!.height - page.viewportSize()!.height)).toBeLessThan(2);
    const scroll = section.locator(".experience-scroll");
    const area = await scroll.boundingBox();
    expect(area!.height).toBeGreaterThan(180);
    expect(area!.y).toBeGreaterThanOrEqual(0);
    expect(area!.y + area!.height).toBeLessThan(page.viewportSize()!.height - 65);
    const marker = await section.locator(".stop-marker").boundingBox();
    const map = await page.locator(".journey-map").boundingBox();
    if (map!.y < 100) expect(marker!.y).toBeGreaterThanOrEqual(map!.y + map!.height);
    const button = scroll.locator("button:not(:disabled)").first();
    await button.scrollIntoViewIfNeeded();
    const action = await button.boundingBox();
    expect(action!.y).toBeGreaterThanOrEqual(area!.y - 1);
    expect(action!.y + action!.height).toBeLessThanOrEqual(area!.y + area!.height + 1);
    const details = section.locator(".project-description");
    await details.locator("summary").click();
    await expect(details).toHaveAttribute("open", "");
    expect((await section.boundingBox())!.height).toBeCloseTo(bounds!.height, 0);
    await details.locator("summary").click();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const id of ["mon-coach-sport", "telecom", "math"]) {
    const section = page.locator(`#${id}`);
    await section.evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
    await section.locator(".experience-scroll").evaluate(element => { element.scrollTop = 0; });
    await section.screenshot({ path: `.local/viewport-${testInfo.project.name}-${id}.png` });
  }
});

test("un glissement tactile fait défiler la démo dans son écran", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Geste tactile contrôlé sur le format téléphone.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#math");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#math").evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
  const scroll = page.locator("#math .experience-scroll");
  const area = (await scroll.boundingBox())!;
  const documentTop = await page.evaluate(() => scrollY);
  const session = await page.context().newCDPSession(page);
  const x = area.x + 10;
  const y = area.y + area.height * 0.75;
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
  try {
    for (let step = 1; step <= 6; step++) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y - step * 20 }] });
      await page.evaluate(() => new Promise(requestAnimationFrame));
    }
    await expect.poll(() => scroll.evaluate(element => element.scrollTop)).toBeGreaterThan(30);
    expect(Math.abs(await page.evaluate(() => scrollY) - documentTop)).toBeLessThan(3);
  } finally {
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await session.detach();
  }
});
