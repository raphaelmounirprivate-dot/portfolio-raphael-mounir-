import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("Pulse Music lit le MP3 de démo et les morceaux locaux", async ({ page }) => {
  await page.goto("/#pulse-music");
  const demo = page.locator('[data-demo="music"]');
  const audio = demo.locator("audio");
  const playDemo = demo.getByRole("button", { name: "Écouter le morceau de démo" });
  const title = demo.locator("[data-music-title]");
  await expect(audio).toHaveAttribute("src", /sub_clair-social-media-634730\.mp3$/);
  await playDemo.click();
  await expect.poll(() => audio.evaluate((player) => player.currentTime)).toBeGreaterThan(0);
  const progress = demo.locator(".music-progress");
  await expect(progress).toHaveClass(/is-playing/);
  await expect.poll(() => progress.evaluate((ring) =>
    Number.parseFloat(getComputedStyle(ring).getPropertyValue("--music-position")),
  )).toBeGreaterThan(0);
  const loop = demo.getByRole("checkbox", { name: "Boucler le titre" });
  await loop.check();
  await expect(audio).toHaveJSProperty("loop", true);
  await loop.uncheck();
  await expect(audio).toHaveJSProperty("loop", false);

  const buffer = await readFile("public/audio/sub_clair-social-media-634730.mp3");
  await demo.getByLabel("Choisir mes fichiers audio").setInputFiles(
    ["Premier.mp3", "Second.mp3"].map((name) => ({ name, mimeType: "audio/mpeg", buffer })),
  );
  await expect(title).toHaveText("Premier.mp3");
  await expect(audio).toHaveAttribute("src", /^blob:/);
  await expect.poll(() => audio.evaluate((player) => player.paused)).toBe(true);
  await expect(progress).not.toHaveClass(/is-playing/);

  const tracks = demo.getByRole("combobox", { name: "Mes morceaux" });
  await tracks.selectOption({ label: "Second.mp3" });
  await expect(title).toHaveText("Second.mp3");
  await audio.evaluate((player) => player.play());
  await expect.poll(() => audio.evaluate((player) => player.currentTime)).toBeGreaterThan(0);

  await playDemo.click();
  await expect(title).toHaveText("Social Media");
  await expect.poll(() => audio.evaluate((player) => player.currentTime)).toBeGreaterThan(0);
  await tracks.selectOption({ label: "Premier.mp3" });
  await expect(title).toHaveText("Premier.mp3");

  await demo.getByRole("combobox", { name: "Morceau de démo" }).selectOption({ label: "Wave Clear Koro" });
  await expect(title).toHaveText("Wave Clear Koro");
  await expect(audio).toHaveAttribute("src", /wave-clear-koro\.mp3$/);
  await playDemo.click();
  await expect.poll(() => audio.evaluate((player) => player.currentTime)).toBeGreaterThan(0);
});
