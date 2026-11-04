import {
  ciscoConnected,
  ciscoPrompt,
  executeCisco,
  initialCisco,
} from "./cisco-engine";

export const ciscoWalkthrough = [
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

export function renderCisco(): string {
  return `<div class="cisco-demo" data-cisco><h4>Mini-labo Cisco</h4><p class="cisco-mission">Votre mission : relier PC-A et PC-B dans le VLAN 10. Les deux ports sont désactivés au départ.</p><div class="cisco-topology" aria-label="Deux PC reliés au switch SW1"><div><strong>PC-A</strong><span>192.0.2.10/24</span><small data-port-a>Fa0/1 · coupé · VLAN 1</small></div><span class="cisco-cable" aria-hidden="true"></span><div class="cisco-switch"><strong>SW1</strong><span>Switch simulé</span></div><span class="cisco-cable" aria-hidden="true"></span><div><strong>PC-B</strong><span>192.0.2.20/24</span><small data-port-b>Fa0/2 · coupé · VLAN 1</small></div></div><div class="cisco-terminal"><div class="cisco-terminal-title"><span>Console simulée · SW1</span><span>CLI</span></div><div class="cisco-output" data-cisco-output role="log" aria-label="Historique de la console Cisco" aria-live="polite" aria-relevant="additions" tabindex="0"></div><form data-cisco-form><label for="cisco-command">Commande Cisco</label><div class="cisco-command-row"><span data-cisco-prompt aria-hidden="true">SW1&gt;</span><input id="cisco-command" data-cisco-command type="text" maxlength="120" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="enable"/><button type="submit">Exécuter</button></div></form></div><div class="cisco-actions"><button type="button" data-cisco-help>Aide ?</button><button type="button" data-cisco-test>Tester PC-A → PC-B</button></div><p data-cisco-status role="status" class="cisco-status">Mission à réaliser : créer le VLAN 10, affecter les deux ports en accès et les activer.</p><details class="cisco-guide"><summary>Voir les commandes du parcours guidé</summary><p>Choisissez une commande pour la placer dans la console, puis exécutez-la.</p><ol>${ciscoWalkthrough.map((command) => `<li><button type="button" data-cisco-insert="${command}">${command}</button></li>`).join("")}</ol></details><button type="button" data-cisco-reset class="demo-reset">Réinitialiser le labo Cisco</button><p class="cisco-scope">Simulation pédagogique limitée à ce scénario, sans image IOS, paquet réel ni connexion à du matériel. Configuration conservée seulement dans cette page.</p></div>`;
}

export function initCisco(): void {
  document.querySelectorAll<HTMLElement>("[data-cisco]").forEach((root) => {
    let state = initialCisco();
    let history: string[] = [];
    let cursor = 0;
    let draft = "";
    const input = root.querySelector<HTMLInputElement>("[data-cisco-command]")!;
    const log = root.querySelector<HTMLElement>("[data-cisco-output]")!;
    const status = root.querySelector<HTMLElement>("[data-cisco-status]")!;
    const append = (text: string): void => {
      const row = document.createElement("pre");
      row.textContent = text;
      log.append(row);
      while (log.children.length > 40) log.firstElementChild!.remove();
      log.scrollTop = log.scrollHeight;
    };
    const paint = (): void => {
      const prompt = ciscoPrompt(state);
      root.querySelector("[data-cisco-prompt]")!.textContent = prompt;
      input.setAttribute("aria-label", `Commande Cisco, invite ${prompt}`);
      for (const [name, selector] of [
        ["Fa0/1", "[data-port-a]"],
        ["Fa0/2", "[data-port-b]"],
      ] as const) {
        const port = state.ports[name];
        root.querySelector(selector)!.textContent =
          `${name} · ${port.enabled ? "actif" : "coupé"} · VLAN ${port.vlan}`;
      }
      root.classList.toggle("cisco-connected", ciscoConnected(state));
      status.textContent = ciscoConnected(state)
        ? "Configuration prête : les deux ports sont actifs en accès dans le VLAN 10. Testez la communication."
        : "Mission à réaliser : créer le VLAN 10, affecter les deux ports en accès et les activer.";
    };
    const run = (command: string): void => {
      if (!command.trim()) return;
      history.push(command.slice(0, 120));
      if (history.length > 40) history.shift();
      cursor = history.length;
      draft = "";
      const prompt = ciscoPrompt(state);
      const result = executeCisco(state, command);
      state = result.state;
      append(
        `${prompt} ${command.slice(0, 120)}${result.output ? "\n" + result.output : ""}`,
      );
      paint();
      input.value = "";
    };
    root.querySelector("form")!.addEventListener("submit", (event) => {
      event.preventDefault();
      run(input.value);
      input.focus({ preventScroll: true });
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        if (cursor === history.length) draft = input.value;
        cursor = Math.max(
          0,
          Math.min(history.length, cursor + (event.key === "ArrowUp" ? -1 : 1)),
        );
        input.value = cursor === history.length ? draft : history[cursor];
      }
      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "z" &&
        ["config", "vlan", "interface"].includes(state.mode)
      ) {
        event.preventDefault();
        run("end");
      }
    });
    input.addEventListener("paste", (event) => {
      const text = event.clipboardData?.getData("text") ?? "";
      if (!/[\r\n]/.test(text)) return;
      event.preventDefault();
      const commands = text.split(/\r?\n/).filter((line) => line.trim());
      if (commands.length > 20) {
        status.textContent = "Collez au maximum 20 commandes à la fois.";
        return;
      }
      commands.forEach(run);
    });
    root
      .querySelector("[data-cisco-help]")!
      .addEventListener("click", () => run("?"));
    root.querySelector("[data-cisco-test]")!.addEventListener("click", () => {
      const connected = ciscoConnected(state);
      append(
        `PC-A> ping 192.0.2.20\n${connected ? "Réponse de PC-B : 4 / 4 paquets simulés reçus." : "Échec simulé : vérifiez VLAN 10, mode access et no shutdown sur les deux ports."}`,
      );
      status.textContent = connected
        ? "Mission réussie : PC-A et PC-B communiquent dans le VLAN 10."
        : "Communication impossible : consultez les ports avec show interfaces status en mode privilégié.";
    });
    root
      .querySelectorAll<HTMLButtonElement>("[data-cisco-insert]")
      .forEach((button) =>
        button.addEventListener("click", () => {
          input.value = button.dataset.ciscoInsert!;
          input.focus();
        }),
      );
    root.querySelector("[data-cisco-reset]")!.addEventListener("click", () => {
      state = initialCisco();
      history = [];
      cursor = 0;
      draft = "";
      input.value = "";
      log.replaceChildren();
      append(
        "Labo réinitialisé. Tapez enable pour commencer, ou ? pour l’aide.",
      );
      paint();
    });
    append(
      "Bienvenue dans le mini-labo Cisco.\nTapez enable pour commencer, ou ? pour l’aide.",
    );
    paint();
  });
}
