import { expect, test } from "@playwright/test";

test("Pulse Music lit l’extrait et permet de choisir un fichier local", async ({ page }) => {
  await page.goto("/#pulse-music");
  const demo = page.locator('[data-demo="music"]');
  const audio = demo.locator("audio");
  await demo.getByRole("button", { name: "Écouter l’extrait" }).click();
  await expect.poll(() => audio.evaluate((player) => player.currentTime)).toBeGreaterThan(0);

  await demo.getByLabel("Choisir un fichier audio").setInputFiles("public/audio/pulse-extrait.wav");
  await expect(demo.locator("[data-music-title]")).toHaveText("pulse-extrait.wav");
  await expect.poll(() => audio.evaluate((player) => player.duration)).toBe(4);
  await expect(audio).toHaveAttribute("src", /^blob:/);
  await expect.poll(() => audio.evaluate((player) => player.paused)).toBe(true);

  await demo.getByRole("button", { name: "Écouter l’extrait" }).click();
  await expect(audio).toHaveAttribute("src", /audio\/pulse-extrait\.wav$/);
  await expect.poll(() => audio.evaluate((player) => player.currentTime)).toBeGreaterThan(0);
});
