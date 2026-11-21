import { expect, test } from "@playwright/test";

test("Échec et Mat charge son site à la demande et rend le focus", async ({ page }) => {
  const url = "https://echec-et-mat.vercel.app/";
  await page.route(url, route => route.fulfill({ contentType: "text/html; charset=utf-8", body: "<h1>Académie d’échecs</h1>" }));
  await page.goto("/#echec-et-mat");
  const demo = page.locator('[data-demo="chess"]');
  const play = demo.getByRole("button", { name: "Jouer à Échec et Mat" });
  await expect(demo.locator("iframe")).toHaveCount(0);
  await expect(demo.getByRole("link", { name: "Ouvrir le site dans un nouvel onglet" })).toHaveAttribute("href", url);
  await play.click();
  const dialog = demo.getByRole("dialog", { name: "Échec et Mat" });
  await expect(dialog).toBeVisible();
  await expect(dialog.frameLocator("iframe").getByRole("heading", { name: "Académie d’échecs" })).toBeVisible();
  await dialog.getByRole("button", { name: "Revenir au portfolio" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(demo.locator("iframe")).toHaveCount(0);
  await expect(play).toBeFocused();
});
