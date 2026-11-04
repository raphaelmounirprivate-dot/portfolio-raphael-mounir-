export type CiscoMode = "user" | "privileged" | "config" | "vlan" | "interface";
type PortName = "Fa0/1" | "Fa0/2";
interface CiscoPort {
  vlan: 1 | 10;
  access: boolean;
  enabled: boolean;
}
interface Configuration {
  vlanName: string | null;
  ports: Record<PortName, CiscoPort>;
}
export interface CiscoState extends Configuration {
  mode: CiscoMode;
  selected: PortName;
  saved: Configuration;
}

const configuration = (): Configuration => ({
  vlanName: null,
  ports: {
    "Fa0/1": { vlan: 1, access: false, enabled: false },
    "Fa0/2": { vlan: 1, access: false, enabled: false },
  },
});
const copy = (value: Configuration): Configuration => ({
  vlanName: value.vlanName,
  ports: {
    "Fa0/1": { ...value.ports["Fa0/1"] },
    "Fa0/2": { ...value.ports["Fa0/2"] },
  },
});
export const initialCisco = (): CiscoState => ({
  ...configuration(),
  mode: "user",
  selected: "Fa0/1",
  saved: configuration(),
});
export const ciscoPrompt = (state: CiscoState): string =>
  `SW1${{ user: ">", privileged: "#", config: "(config)#", vlan: "(config-vlan)#", interface: "(config-if)#" }[state.mode]}`;

export function ciscoConnected(state: CiscoState): boolean {
  return (
    state.vlanName !== null &&
    Object.values(state.ports).every(
      (port) => port.access && port.enabled && port.vlan === 10,
    )
  );
}

export function ciscoHelp(state: CiscoState): string {
  const common = "? : aide · exit : mode précédent";
  if (state.mode === "user") return `${common}\nenable : mode privilégié`;
  if (state.mode === "privileged")
    return `${common}\nconfigure terminal (ou conf t)\nshow vlan brief\nshow interfaces status\nshow running-config\nwrite memory · reload · disable`;
  if (state.mode === "config")
    return `${common}\nvlan 10\ninterface fa0/1 · interface fa0/2\nend : retour au mode privilégié`;
  if (state.mode === "vlan")
    return `${common}\nname BUREAU\nend : retour au mode privilégié`;
  return `${common}\nswitchport mode access\nswitchport access vlan 10\nno shutdown · shutdown\nend : retour au mode privilégié`;
}

export function executeCisco(
  state: CiscoState,
  input: string,
): { state: CiscoState; output: string } {
  const next: CiscoState = {
    ...copy(state),
    mode: state.mode,
    selected: state.selected,
    saved: copy(state.saved),
  };
  const raw = input.trim().replace(/\s+/g, " ");
  const command = raw.toLowerCase();
  const result = (output = ""): { state: CiscoState; output: string } => ({
    state: next,
    output,
  });
  const error = () =>
    result("% Commande non prise en charge dans ce mode. Tapez ? pour l’aide.");
  if (raw.length > 120)
    return result("% Commande trop longue : 120 caractères maximum.");
  if (!command) return result();
  if (command === "?") return result(ciscoHelp(next));
  if (command === "exit") {
    next.mode =
      next.mode === "interface" || next.mode === "vlan"
        ? "config"
        : next.mode === "config"
          ? "privileged"
          : "user";
    return result();
  }
  if (
    command === "end" &&
    ["config", "vlan", "interface"].includes(next.mode)
  ) {
    next.mode = "privileged";
    return result();
  }
  if (command === "enable" && ["user", "privileged"].includes(next.mode)) {
    next.mode = "privileged";
    return result();
  }
  if (command === "disable" && next.mode === "privileged") {
    next.mode = "user";
    return result();
  }
  if (next.mode === "privileged") {
    if (command === "configure terminal" || command === "conf t") {
      next.mode = "config";
      return result(
        "Entrez les commandes de configuration. end pour terminer.",
      );
    }
    if (command === "show vlan brief") {
      const ports = (vlan: number) =>
        Object.entries(next.ports)
          .filter(([, port]) => port.vlan === vlan)
          .map(([name]) => name)
          .join(", ") || "—";
      return result(
        `VLAN  Nom       État / Ports\n1     default   active\n      ${ports(1)}${next.vlanName ? `\n10    ${next.vlanName}   active\n      ${ports(10)}` : ""}`,
      );
    }
    if (command === "show interfaces status")
      return result(
        Object.entries(next.ports)
          .map(
            ([name, port]) =>
              `${name}  ${port.enabled ? "connected" : "disabled"}  VLAN ${port.vlan}`,
          )
          .join("\n"),
      );
    if (command === "show running-config")
      return result(
        `${next.vlanName ? `vlan 10\n name ${next.vlanName}\n!\n` : ""}${Object.entries(
          next.ports,
        )
          .map(
            ([name, port]) =>
              `interface ${name}\n${port.access ? " switchport mode access\n" : ""} switchport access vlan ${port.vlan}\n ${port.enabled ? "no shutdown" : "shutdown"}`,
          )
          .join("\n!\n")}`,
      );
    if (command === "write memory") {
      next.saved = copy(next);
      return result("Configuration sauvegardée pour le reload simulé.\n[OK]");
    }
    if (command === "reload") {
      const saved = copy(next.saved);
      return {
        state: {
          ...saved,
          saved: copy(saved),
          mode: "user",
          selected: "Fa0/1",
        },
        output: "Redémarrage simulé. Configuration sauvegardée restaurée.",
      };
    }
    return error();
  }
  if (next.mode === "config") {
    if (command === "vlan 10") {
      if (next.vlanName === null) next.vlanName = "VLAN0010";
      next.mode = "vlan";
      return result();
    }
    const port = command.match(
      /^(?:interface|int) (?:fa|fastethernet)0\/([12])$/,
    );
    if (port) {
      next.selected = `Fa0/${port[1]}` as PortName;
      next.mode = "interface";
      return result();
    }
    return error();
  }
  if (next.mode === "vlan") {
    const name = raw.match(/^name ([a-z0-9_-]{1,24})$/i);
    if (name) {
      next.vlanName = name[1];
      return result();
    }
    return error();
  }
  if (next.mode === "interface") {
    const port = next.ports[next.selected];
    if (command === "switchport mode access") {
      port.access = true;
      return result();
    }
    if (command === "switchport access vlan 10") {
      if (next.vlanName === null)
        return result(
          "% Pour ce scénario guidé, créez d’abord le VLAN 10 avec vlan 10 en configuration globale.",
        );
      port.vlan = 10;
      return result();
    }
    if (command === "switchport access vlan 1") {
      port.vlan = 1;
      return result();
    }
    if (command === "shutdown" || command === "no shutdown") {
      port.enabled = command === "no shutdown";
      return result(
        `% ${next.selected} : ${port.enabled ? "lien activé" : "lien désactivé"} dans la simulation.`,
      );
    }
  }
  return error();
}
