import { test, expect } from "@playwright/test";

test("l’accueil montre l’image, puis ouvre le portfolio au clavier ou au toucher", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const welcome = page.locator(".welcome");
  const enter = page.getByRole("button", { name: "Entrer dans le site" });
  await expect(welcome).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("D’une connexionà l’autre.");
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
