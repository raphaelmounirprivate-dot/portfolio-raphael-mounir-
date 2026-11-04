interface LearningChapter {
  subject: string;
  title: string;
  introduction: string;
  steps: { title: string; explanation: string; example: string; reasoning: string }[];
  reminders: string[];
  application: { question: string; answer: string };
}

export const learningChapters: Record<"math" | "declic", LearningChapter> = {
  math: {
    subject: "Mathématiques",
    title: "Comprendre les puissances",
    introduction: "Une puissance raccourcit une multiplication de facteurs identiques. Ce chapitre traite des exposants entiers à partir de 1.",
    steps: [
      {
        title: "Lire la base et l’exposant",
        explanation: "Dans 3⁴, la base est 3 et l’exposant est 4. Il faut écrire quatre facteurs égaux à 3.",
        example: "3⁴ = 3 × 3 × 3 × 3 = 81",
        reasoning: "Calcule progressivement : 3 × 3 = 9, puis 9 × 3 = 27, puis 27 × 3 = 81.",
      },
      {
        title: "Reconnaître le carré et le cube",
        explanation: "L’exposant 2 se lit « au carré » ; l’exposant 3, « au cube ».",
        example: "6² = 6 × 6 = 36 · 2³ = 2 × 2 × 2 = 8",
        reasoning: "Attention : 6² n’est pas égal à 6 × 2. L’exposant compte les facteurs, il ne multiplie pas la base.",
      },
      {
        title: "Retrouver un exposant",
        explanation: "Écris les facteurs identiques jusqu’au résultat recherché, puis compte-les.",
        example: "2 × 2 × 2 × 2 = 16, donc 2⁴ = 16",
        reasoning: "Le produit contient quatre facteurs égaux à 2 : l’exposant vaut 4.",
      },
    ],
    reminders: ["Repère la base.", "Écris le nombre de facteurs indiqué.", "Multiplie étape par étape."],
    application: {
      question: "À toi : développe 3³ et calcule le résultat.",
      answer: "3³ = 3 × 3 × 3 = 27. Il y a trois facteurs égaux à 3.",
    },
  },
  declic: {
    subject: "Français",
    title: "Accorder le participe passé",
    introduction: "Avant d’accorder, repère l’auxiliaire, le sujet et, si nécessaire, le complément d’objet direct (COD). Voici les cas utiles aux trois défis.",
    steps: [
      {
        title: "Avec être : regarder le sujet",
        explanation: "Pour un verbe non pronominal conjugué avec être, le participe passé s’accorde avec le sujet en genre et en nombre.",
        example: "Nora est arrivée. Nora et Inès sont arrivées.",
        reasoning: "Nora et Inès désigne deux filles : on ajoute e et s à arrivé.",
      },
      {
        title: "Avec avoir : trouver le COD",
        explanation: "Pose la question « qui ? » ou « quoi ? » après le verbe pour chercher le COD. Le participe s’accorde avec ce COD s’il est placé avant. S’il est après, ou absent, le participe ne s’accorde pas.",
        example: "J’ai pris les photos. Les photos que j’ai prises sont nettes.",
        reasoning: "Dans la seconde phrase, « que » reprend « les photos ». Ce COD précède le participe : « prises » porte le féminin pluriel.",
      },
      {
        title: "Le cas de « se laver les mains »",
        explanation: "Dans cette phrase, elles ont lavé quoi ? Les mains. Ce COD est après le participe : il n’y a pas d’accord. Se signifie ici « à elles-mêmes ».",
        example: "Elles se sont lavé les mains.",
        reasoning: "Les verbes pronominaux demandent une analyse particulière. La présence de être ne suffit pas à décider de l’accord.",
      },
    ],
    reminders: ["Avec être, repère le sujet pour un verbe non pronominal.", "Avec avoir, vérifie la place du COD.", "Pour un verbe pronominal, examine aussi le rôle de se."],
    application: {
      question: "À toi : « Les lettres que Sam a ___ sont sur la table. » Complète avec le participe passé de écrire.",
      answer: "On écrit « écrites ». Le COD « que » reprend « les lettres », féminin pluriel, et précède le participe passé.",
    },
  },
};
