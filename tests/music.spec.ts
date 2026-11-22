import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("Pulse Music lit le MP3 de démo et les morceaux locaux", async ({ page }) => {
  await page.goto("/#pulse-music");
  const demo = page.locator('[data-demo="music"]');
  const audio = demo.locator("audio");
  const queue = demo.locator(".music-queue");
  const openQueue = queue.locator("summary");
  const socialMedia = queue.getByRole("button", { name: "Social Media" });
  const wave = queue.getByRole("button", { name: "Wave Clear Koro" });
  const title = demo.locator("[data-music-title]");
  await expect(audio).toHaveAttribute("src", /sub_clair-social-media-634730\.mp3$/);
  await expect(queue).toHaveJSProperty("open", false);
  await openQueue.focus();
  await openQueue.press("Enter");
  await socialMedia.press("Enter");
  await expect(openQueue).toBeFocused();
  await expect.poll(() => audio.evaluate((player) => player.currentTime)).toBeGreaterThan(0);
  const progress = demo.locator(".music-progress");
  const disc = progress.locator(".music-disc");
  await expect(progress).toBeVisible();
  await expect(progress).toHaveClass(/is-playing/);
  await expect(disc).toHaveCSS("animation-play-state", "running");
  await expect.poll(() => progress.evaluate((ring) =>
    Number.parseFloat(getComputedStyle(ring).getPropertyValue("--music-position")),
  )).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(disc).toHaveCSS("animation-name", "none");
  const bounds = await progress.boundingBox();
  const discBounds = await disc.boundingBox();
  const labelBounds = await disc.locator("span").boundingBox();
  expect(bounds!.width).toBeGreaterThanOrEqual(128);
  expect(Math.abs(bounds!.x + bounds!.width / 2 - discBounds!.x - discBounds!.width / 2)).toBeLessThan(1);
  expect(Math.abs(bounds!.y + bounds!.height / 2 - discBounds!.y - discBounds!.height / 2)).toBeLessThan(1);
  expect(Math.abs(labelBounds!.x + labelBounds!.width / 2 - bounds!.x - bounds!.width / 2)).toBeLessThan(1);
  await progress.click({ position: { x: bounds!.width - 5, y: bounds!.height / 2 } });
  await expect.poll(() => audio.evaluate((player) => player.currentTime / player.duration))
    .toBeGreaterThanOrEqual(0.24);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await audio.evaluate((player) => player.pause());
  await expect(disc).toHaveCSS("animation-play-state", "paused");
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

  await openQueue.click();
  await socialMedia.click();
  await expect(title).toHaveText("Social Media");
  await expect.poll(() => audio.evaluate((player) => player.currentTime)).toBeGreaterThan(0);
  await tracks.selectOption({ label: "Premier.mp3" });
  await expect(title).toHaveText("Premier.mp3");

  await openQueue.click();
  await wave.click();
  await expect(title).toHaveText("Wave Clear Koro");
  await expect(audio).toHaveAttribute("src", /wave-clear-koro\.mp3$/);
  await expect(queue).toHaveJSProperty("open", false);
  await openQueue.click();
  await expect(wave).toHaveAttribute("aria-current", "true");
  await expect(disc).toHaveAttribute("data-tone", "blue");
  await expect.poll(() => audio.evaluate((player) => player.currentTime)).toBeGreaterThan(0);
});
