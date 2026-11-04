export type DemoKind =
  "sport" | "simulation" | "telecom" | "budget" | "math" | "declic";

export interface QuizQuestion {
  prompt: string;
  choices: string[];
  correct: number;
  explanation: string;
  hint?: string;
}

export const telecomQuestions: QuizQuestion[] = [
  {
    prompt:
      "Un switch dispose de 100 W. Trois bornes consomment 20 W chacune et une caméra 15 W. Que reste-t-il ?",
    choices: ["25 W", "65 W", "75 W"],
    correct: 0,
    explanation:
      "3 × 20 + 15 = 75 W utilisés. Il reste 100 − 75 = 25 W. Cas simplifié : aucun matériel précis n’est représenté.",
  },
  {
    prompt:
      "Il reste 25 W au total. Un port limité à 15 W peut-il alimenter un terminal qui demande 18 W ?",
    choices: [
      "Oui, le total suffit",
      "Non, le port est insuffisant",
      "Oui, avec un autre VLAN",
    ],
    correct: 1,
    explanation:
      "Le budget total et la limite du port doivent tous les deux convenir. Changer le VLAN n’augmente pas la puissance du port.",
  },
  {
    prompt:
      "Le terminal est alimenté et reçoit un bail DHCP, mais son service ne répond pas. Que vérifier ensuite ?",
    choices: [
      "Augmenter la puissance PoE",
      "Le trajet IP, les règles et le service",
      "Changer tous les connecteurs",
    ],
    correct: 1,
    explanation:
      "Un bail DHCP ne valide pas le service applicatif. Le diagnostic continue sur la connectivité, les règles et l’application.",
  },
];

export const mathQuestions: QuizQuestion[] = [
  {
    prompt: "Calcule 4³.",
    choices: ["12", "64", "16"],
    correct: 1,
    hint: "L’exposant compte les facteurs : 4 × 4 × 4.",
    explanation:
      "4 × 4 = 16, puis 16 × 4 = 64. L’exposant ne multiplie pas la base.",
  },
  {
    prompt: "Calcule 5².",
    choices: ["10", "25", "32"],
    correct: 1,
    hint: "Écris deux facteurs égaux à 5.",
    explanation: "5² = 5 × 5 = 25.",
  },
  {
    prompt: "Complète : 2ⁿ = 32. Combien vaut n ?",
    choices: ["4", "5", "16"],
    correct: 1,
    hint: "Double successivement : 2, 4, 8, 16…",
    explanation: "2 × 2 × 2 × 2 × 2 = 32. Il faut cinq facteurs : n = 5.",
  },
];

export const declicQuestions: QuizQuestion[] = [
  {
    prompt: "Lina et Zoé sont ___ au concert.",
    choices: ["arrivé", "arrivés", "arrivées"],
    correct: 2,
    hint: "Avec être, cherche le sujet.",
    explanation:
      "Lina et Zoé désigne deux filles. Avec être, on accorde au féminin pluriel : arrivées.",
  },
  {
    prompt: "Ces photos, tu les as ___. (prendre)",
    choices: ["pris", "prises", "prise"],
    correct: 1,
    hint: "« Les » remplace les photos. Où est ce COD ?",
    explanation:
      "« Les » est le COD placé avant le participe et représente ces photos, féminin pluriel : prises.",
  },
  {
    prompt: "Elles se sont ___ les mains.",
    choices: ["lavées", "lavés", "lavé"],
    correct: 2,
    hint: "Elles ont lavé quoi ? Repère le COD.",
    explanation:
      "Les mains est le COD, placé après. « Se » est indirect ici : lavé reste invariable.",
  },
];

export const demoLabels: Record<
  DemoKind,
  { title: string; action: string; preview: string; note: string }
> = {
  sport: {
    title: "Une série à la fois",
    action: "Essayer une séance",
    preview: "Valider une série et lancer le repos",
    note: "Interaction adaptée du suivi de séance. Réglages fictifs, sans sauvegarde.",
  },
  simulation: {
    title: "Faites circuler la stratégie",
    action: "Jouer la mini-simulation",
    preview: "Choisir une stratégie, observer sa propagation",
    note: "Mini-simulation adaptée : 6 nœuds fictifs, règles simplifiées. Ce n’est pas le jeu complet ni son équilibrage.",
  },
  telecom: {
    title: "Un switch. À vous de jouer.",
    action: "Essayer la console Cisco",
    preview: "Créer un VLAN et connecter deux PC",
    note: "Console Cisco simplifiée et diagnostic PoE. Scénarios fictifs, sans connexion à un équipement.",
  },
  budget: {
    title: "Un budget qui reste juste",
    action: "Manipuler le budget",
    preview: "Payer une facture sans la déduire deux fois",
    note: "Montants entièrement fictifs. Démo locale du calcul, sans compte ni opération bancaire.",
  },
  math: {
    title: "Un calcul. Un déclic.",
    action: "Résoudre un défi",
    preview: "Essayer, prendre un indice, comprendre",
    note: "Trois exercices adaptés du cours. Progression de démo uniquement, sans compte.",
  },
  declic: {
    title: "L’accord parfait ? À toi de jouer.",
    action: "Jouer une mission",
    preview: "Être, avoir et les petits pièges",
    note: "Trois phrases issues de Déclic Ados. Corrections expliquées, sans enregistrer de résultat scolaire.",
  },
};
