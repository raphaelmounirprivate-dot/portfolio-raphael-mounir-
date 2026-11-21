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
  ".jpg": "image/jpeg",
  ".wasm": "application/wasm",
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
    await page.getByRole("button", { name: "Entrer dans le site" }).click();
    await page.locator("#mon-coach-sport").scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      for (const img of document.images) {
        img.loading = "eager";
        await img.decode();
      }
    });
    await page.locator(".real-captures > summary").click();
    await page.getByRole("button", { name: "Capture suivante" }).click();
    if ((await page.locator("[data-counter]").textContent()) !== "2 / 3")
      throw Error("gallery");
    if (width <= 960) {
      await page.locator("#map-toggle").click();
      if (
        (await page.locator("#map-toggle").getAttribute("aria-expanded")) !==
        "true"
      )
        throw Error("map");
    }
    await page.locator('[data-map="pandemic-horizon"]').click();
    if (!page.url().endsWith("#pandemic-horizon")) throw Error("anchor");

    if ((await page.locator("[data-demo]").count()) !== 8)
      throw Error("huit démos");
    if ((await page.locator('a[href*="github.com"]').count()) !== 0)
      throw Error("github link");
    const budget = page.locator('[data-demo="budget"]');
    await budget.locator("[data-pay]").click();
    if (
      !(await budget.locator("[data-feedback]").textContent()).includes(
        "double déduction",
      )
    )
      throw Error("budget");
    const math = page.locator('[data-demo="math"]');
    await math.getByRole("button", { name: "64", exact: true }).click();
    if (
      !(await math.locator("[data-feedback]").textContent()).includes(
        "Bonne réponse",
      )
    )
      throw Error("math");
    const cisco = page.locator("[data-cisco]");
    await cisco.locator("input").evaluate((input) => {
      const transfer = new DataTransfer();
      transfer.setData(
        "text",
        [
          "enable",
          "configure terminal",
          "vlan 10",
          "name BUREAU",
          "exit",
          "interface fa0/1",
          "switchport mode access",
          "switchport access vlan 10",
          "no shutdown",
          "exit",
          "interface fa0/2",
          "switchport mode access",
          "switchport access vlan 10",
          "no shutdown",
          "end",
        ].join("\n"),
      );
      input.dispatchEvent(
        new ClipboardEvent("paste", {
          clipboardData: transfer,
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    await cisco.locator("[data-cisco-test]").click();
    if (
      !(await cisco.locator("[data-cisco-status]").textContent()).includes(
        "Mission réussie",
      )
    )
      throw Error("Cisco VLAN");
    const launch = page.locator('[data-horizon-launch]');
    await launch.click();
    const frame = page.frameLocator('[data-horizon-frame]');
    await frame.locator('canvas').evaluate(async canvas => {
      const deadline = performance.now() + 60000;
      while (canvas.width <= 300) {
        if (performance.now() > deadline) throw Error('Game canvas did not initialize');
        await new Promise(requestAnimationFrame);
      }
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
    await frame.locator('#status').waitFor({state:'hidden',timeout:60000});
    await frame.locator('canvas').screenshot({path:'.local/production-horizon-'+width+'.png'});
    await page.getByRole('button',{name:'Revenir au portfolio'}).click();
    await page.locator('[data-horizon-frame]').waitFor({state:'detached'});
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
