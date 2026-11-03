export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  type: "Application Android" | "Jeu PC" | "Site web";
  universe: string;
  tagline: string;
  summary: string;
  story?: string;
  technologies: string[];
  screenshots: Screenshot[];
  links: { label: string; url: string }[];
  accentColor: string;
  status: string;
}

export const githubUrl = "https://github.com/raphaelmounirprivate-dot";
const asset = (name: string): string =>
  `${import.meta.env.BASE_URL}images/${name}`;

export const projects: Project[] = [
  {
    id: "mon-coach-sport",
    title: "Mon Coach Sport",
    type: "Application Android",
    universe: "Le mouvement",
    tagline: "Une séance. Un repère. Puis la suivante.",
    summary:
      "Retrouver mon programme Full Body, noter mes séries et suivre ma progression. Une application personnelle qui m’accompagne à la salle, même sans connexion.",
    story:
      "Le projet part d’un besoin concret : garder mon programme et mes réglages à portée de main. Le suivi des séances, le minuteur de repos et l’historique se retrouvent au même endroit, sur le téléphone.",
    technologies: ["Kotlin", "Jetpack Compose", "Room", "DataStore"],
    screenshots: [
      {
        src: asset("sport-accueil.png"),
        alt: "Accueil réel de Mon Coach Sport en thème sombre, avec la prochaine séance Full Body et les repères de régularité.",
        caption: "L’accueil · refonte du 2 novembre 2026",
        width: 432,
        height: 936,
      },
      {
        src: asset("sport-seance.png"),
        alt: "Écran réel d’une séance de Mon Coach Sport avec le minuteur de repos.",
        caption: "La séance et le temps de repos",
        width: 432,
        height: 936,
      },
      {
        src: asset("sport-progression.png"),
        alt: "Écran réel de progression de Mon Coach Sport.",
        caption: "Les repères de progression",
        width: 432,
        height: 936,
      },
    ],
    links: [
      { label: "Explorer le code", url: `${githubUrl}/full-body` },
      {
        label: "Télécharger l’APK 0.9.1",
        url: `${githubUrl}/full-body/releases/tag/v0.9.1`,
      },
    ],
    accentColor: "#ffb57b",
    status: "Projet personnel · Android · hors ligne",
  },
  {
    id: "pandemic-horizon",
    title: "Pandemic Horizon",
    type: "Jeu PC",
    universe: "La simulation",
    tagline: "Un monde connecté. Des choix qui se propagent.",
    summary:
      "Un jeu de stratégie original en français : faire évoluer un agent fictif dans un monde de 24 régions, composer avec les transports et réagir à la recherche d’un remède.",
    story:
      "Une autre manière d’explorer les connexions : ici, les réseaux deviennent le terrain du jeu. Le projet est expérimental et se joue hors ligne sur Windows. Son ancien nom de travail était « plague-inc-evolved » ; il est indépendant du jeu commercial Plague Inc.",
    technologies: ["Godot", "GDScript", "Windows"],
    screenshots: [],
    links: [
      { label: "Explorer le projet", url: `${githubUrl}/pandemic-horizon` },
    ],
    accentColor: "#b6a4ee",
    status: "Jeu original · version expérimentale",
  },
];
