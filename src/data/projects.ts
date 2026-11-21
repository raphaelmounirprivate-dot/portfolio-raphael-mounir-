import type { DemoKind } from "./demo-content";

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
  type: "Application Android" | "Jeu PC" | "Site web" | "Application budget";
  universe: string;
  tagline: string;
  summary: string;
  story?: string;
  technologies: string[];
  screenshots: Screenshot[];
  demo: DemoKind;
  accentColor: string;
  status: string;
}

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
    demo: "sport",
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
      "Une autre manière d’explorer les connexions : ici, les réseaux deviennent le terrain du jeu. Le projet Windows est expérimental. Son moteur original se joue aussi ici dans une adaptation Web. Son ancien nom de travail était « plague-inc-evolved » ; il est indépendant du jeu commercial Plague Inc.",
    technologies: ["Godot", "GDScript", "Windows", "WebAssembly"],
    screenshots: [],
    demo: "simulation",
    accentColor: "#b6a4ee",
    status: "Jeu original · version expérimentale",
  },
  {
    id: "telecom",
    title: "Télécom & Réseau",
    type: "Site web",
    universe: "Les connexions",
    tagline: "Comprendre le réseau en le pratiquant.",
    summary:
      "Des cours, exercices corrigés et simulateurs pour explorer l’adressage, les VLAN, les services IP, le cuivre et la fibre. L’atelier relie les explications aux essais.",
    story:
      "Le projet réunit un parcours pédagogique, des exercices réseau et des scénarios simulés Cisco, FortiGate et Meraki. Les équipements sont simulés : ils ne remplacent pas les manipulations en laboratoire.",
    technologies: ["TypeScript", "NestJS", "PostgreSQL"],
    screenshots: [],
    demo: "telecom",
    accentColor: "#7ce5f1",
    status: "Atelier pédagogique · réseaux simulés",
  },
  {
    id: "mon-app",
    title: "Mon App",
    type: "Application budget",
    universe: "Le quotidien",
    tagline: "Voir ce qui reste. Comprendre ce qui change.",
    summary:
      "Budget Belgique rassemble les revenus, dépenses, factures et objectifs d’épargne. Le disponible tient compte de ce qui est déjà payé et de ce qu’il faut encore prévoir.",
    story:
      "Une application personnelle en français, avec une interface React Native/Expo et un serveur local. Le paiement d’une facture déjà prévue crée sa dépense sans compter le même montant deux fois.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
    ],
    screenshots: [],
    demo: "budget",
    accentColor: "#a7d8ac",
    status: "Budget Belgique · application personnelle",
  },
  {
    id: "math",
    title: "Math",
    type: "Site web",
    universe: "Le raisonnement",
    tagline: "Une puissance se comprend pas à pas.",
    summary:
      "Huit leçons autour des puissances, avec exercices, indices, corrections et progression. L’univers Déclic accompagne la révision, du premier essai au bilan.",
    story:
      "Le cours propose 32 exercices, un diagnostic et des explications. La démo reprend trois questions d’introduction aux puissances, avec des réponses proposées pour les essayer rapidement.",
    technologies: ["TypeScript", "NestJS", "PostgreSQL"],
    screenshots: [],
    demo: "math",
    accentColor: "#e4c480",
    status: "Révision des puissances · exercices guidés",
  },
  {
    id: "declic-ados",
    title: "Déclic Ados",
    type: "Site web",
    universe: "Les mots",
    tagline: "Le bon accord commence par le bon indice.",
    summary:
      "Apprendre le participe passé à travers des missions, des exercices et des corrections expliquées. Avec être, avec avoir, ou dans les phrases qui demandent un peu plus d’attention.",
    story:
      "La version autonome propose cinq missions et trente exercices. Cette escale en reprend trois phrases pour découvrir les règles, choisir une réponse et comprendre la correction.",
    technologies: ["HTML", "CSS", "JavaScript"],
    screenshots: [],
    demo: "declic",
    accentColor: "#df86ca",
    status: "Français · participe passé · missions pédagogiques",
  },
  {
    id: "echec-et-mat",
    title: "Échec et Mat",
    type: "Site web",
    universe: "La stratégie",
    tagline: "Apprendre les échecs, un coup à la fois.",
    summary:
      "Une académie d’échecs en français avec des leçons, des ouvertures, des problèmes tactiques et des parties contre des bots.",
    story:
      "L’échiquier propose une vue 3D et une vue 2D. Après une partie, le bilan permet de revoir les coups. Le site accepte aussi l’import et l’export au format PGN.",
    technologies: ["JavaScript", "Three.js", "chess.js", "PWA"],
    screenshots: [],
    demo: "chess",
    accentColor: "#bef578",
    status: "Académie d’échecs · application web",
  },
];
