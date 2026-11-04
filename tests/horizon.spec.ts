import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";

test("le moteur Web original termine son scénario de contrôle exporté", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "ordinateur", "Le moteur est contrôlé une fois ; le cadre du jeu est testé dans les trois formats.");
  test.skip(!existsSync("public/horizon-game/index.wasm"), "Exécuter npm run build:game pour contrôler le moteur original.");
  test.setTimeout(120_000);
  const errors: string[] = [];
  const messages: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    messages.push(message.text());
    if (message.type() === "error") errors.push(message.text());
  });
  // Test-only launch arguments: exercise the unmodified game's own exported smoke test.
  await page.route("**/horizon-game/index.html", async route => {
    const response = await route.fetch();
    const html = (await response.text()).replace("engine.startGame({", `engine.startGame({
      'args': ['--audio-driver', 'Dummy', '--', '--smoke-test'],
      `);
    await route.fulfill({ response, body: html });
  });
  await page.goto("horizon-game/index.html");
  await expect.poll(() => messages.some(message => message.includes("RUNTIME_SMOKE_OK")), { timeout: 100_000 }).toBe(true);
  expect(errors).toEqual([]);
});
