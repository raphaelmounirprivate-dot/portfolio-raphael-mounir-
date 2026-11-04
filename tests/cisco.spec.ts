import { test, expect } from "@playwright/test";
const scenario = [
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
  "show vlan brief",
  "show interfaces status",
];

async function pasteCommands(
  input: ReturnType<import("@playwright/test").Page["locator"]>,
  commands: string[],
) {
  await input.evaluate((element, text) => {
    const clipboard = new DataTransfer();
    clipboard.setData("text", text);
    element.dispatchEvent(
      new ClipboardEvent("paste", {
        clipboardData: clipboard,
        bubbles: true,
        cancelable: true,
      }),
    );
  }, commands.join("\n"));
}

test("Cisco : modes, aide, historique et sortie de configuration", async ({
  page,
}) => {
  await page.goto("/#telecom");
  const lab = page.locator("[data-cisco]");
  const input = lab.locator("input");
  await input.fill("vlan 10");
  await input.press("Enter");
  await expect(lab.locator("[data-cisco-output]")).toContainText(
    "Commande non prise en charge",
  );
  await expect(lab.locator("[data-cisco-prompt]")).toHaveText("SW1>");
  await input.fill("enable");
  await input.press("Enter");
  await expect(lab.locator("[data-cisco-prompt]")).toHaveText("SW1#");
  await lab.getByRole("button", { name: "Aide ?", exact: true }).click();
  await expect(lab.locator("[data-cisco-output]")).toContainText(
    "show vlan brief",
  );
  await input.fill("conf t");
  await input.press("Enter");
  await expect(lab.locator("[data-cisco-prompt]")).toHaveText("SW1(config)#");
  await input.press("ArrowUp");
  await expect(input).toHaveValue("conf t");
  await input.press("ArrowDown");
  await expect(input).toHaveValue("");
  await input.press("Control+z");
  await expect(lab.locator("[data-cisco-prompt]")).toHaveText("SW1#");
});

test("Cisco : VLAN, ports, connectivité, sauvegarde et réinitialisation", async ({
  page,
}, testInfo) => {
  await page.goto("/#telecom");
  const lab = page.locator("[data-cisco]");
  const input = lab.locator("input");
  await lab
    .getByRole("button", { name: "Tester PC-A → PC-B", exact: true })
    .click();
  await expect(lab.locator("[data-cisco-status]")).toContainText(
    "Communication impossible",
  );
  await pasteCommands(input, scenario);
  await expect(lab.locator("[data-port-a]")).toContainText("actif · VLAN 10");
  await expect(lab.locator("[data-port-b]")).toContainText("actif · VLAN 10");
  await expect(lab.locator("[data-cisco-output]")).toContainText("BUREAU");
  await lab
    .getByRole("button", { name: "Tester PC-A → PC-B", exact: true })
    .click();
  await expect(lab.locator("[data-cisco-status]")).toContainText(
    "Mission réussie",
  );
  await pasteCommands(input, [
    "write memory",
    "configure terminal",
    "interface fa0/2",
    "shutdown",
    "end",
  ]);
  await lab
    .getByRole("button", { name: "Tester PC-A → PC-B", exact: true })
    .click();
  await expect(lab.locator("[data-cisco-status]")).toContainText(
    "Communication impossible",
  );
  await input.fill("reload");
  await input.press("Enter");
  await expect(lab.locator("[data-cisco-prompt]")).toHaveText("SW1>");
  await lab
    .getByRole("button", { name: "Tester PC-A → PC-B", exact: true })
    .click();
  await expect(lab.locator("[data-cisco-status]")).toContainText(
    "Mission réussie",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await lab.screenshot({
    path: `.local/cisco/${testInfo.project.name}.png`,
    style: ".journey-map,.skip-link{visibility:hidden!important}",
  });
  await lab
    .getByRole("button", { name: "Réinitialiser le labo Cisco", exact: true })
    .click();
  await expect(lab.locator("[data-port-a]")).toContainText("coupé · VLAN 1");
  await expect(lab.locator("[data-cisco-output]")).not.toContainText("BUREAU");
});

test("Cisco : saisies inertes et collage borné", async ({ page }) => {
  await page.goto("/#telecom");
  const lab = page.locator("[data-cisco]");
  const input = lab.locator("input");
  await input.fill("<img src=x onerror=alert(1)>");
  await input.press("Enter");
  await expect(lab.locator("[data-cisco-output]")).toContainText("<img src=x");
  await expect(lab.locator("[data-cisco-output] img")).toHaveCount(0);
  await pasteCommands(input, Array(21).fill("enable"));
  await expect(lab.locator("[data-cisco-status]")).toHaveText(
    "Collez au maximum 20 commandes à la fois.",
  );
  await expect(lab.locator("[data-cisco-prompt]")).toHaveText("SW1>");
});
