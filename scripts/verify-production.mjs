import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { chromium } from "@playwright/test";

const prefix = "/portfolio-raphael-mounir-/";
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (!path.startsWith(prefix)) {
      res.writeHead(404);
      res.end();
      return;
    }
    const file = resolve("dist", path.slice(prefix.length) || "index.html");
    if (!file.startsWith(resolve("dist"))) throw Error("path");
    const bytes = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    res.end(bytes);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(4173, "127.0.0.1", r));
let browser;
try {
  browser = await chromium.launch();
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      colorScheme: "dark",
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(`http://127.0.0.1:4173${prefix}`);
    await page.locator("#mon-coach-sport").scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      for (const img of document.images) {
        img.loading = "eager";
        await img.decode();
      }
    });
    await page.getByRole("button", { name: "Capture suivante" }).click();
    if ((await page.locator("[data-counter]").textContent()) !== "2 / 3")
      throw Error("gallery");
    if (width < 640) {
      await page.locator("#map-toggle").click();
      if (
        (await page.locator("#map-toggle").getAttribute("aria-expanded")) !==
        "true"
      )
        throw Error("map");
    }
    await page.locator('[data-map="pandemic-horizon"]').click();
    if (!page.url().endsWith("#pandemic-horizon")) throw Error("anchor");
    const contrast = await page.evaluate(() => {
      const rgb = (s) =>
        s
          .match(/[\d.]+/g)
          .slice(0, 3)
          .map(Number);
      const lum = (c) =>
        c
          .map((v) => {
            v /= 255;
            return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
          })
          .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
      const body = getComputedStyle(document.body);
      const bg = lum(
        rgb(getComputedStyle(document.documentElement).backgroundColor),
      );
      const text = lum(rgb(body.color));
      const muted = lum(
        rgb(getComputedStyle(document.querySelector("p")).color),
      );
      return [text, muted].map(
        (v) => (Math.max(bg, v) + 0.05) / (Math.min(bg, v) + 0.05),
      );
    });
    if (contrast.some((r) => r < 4.5)) throw Error("contrast");
    if (errors.length) throw Error(errors.join("\n"));
    console.log(
      `Production sous-répertoire ${width}px : ressources, galerie, carte, liens directs et contraste (${contrast.map((x) => x.toFixed(1)).join(", ")}) OK`,
    );
    await page.close();
  }
} finally {
  await browser?.close();
  server.close();
}
