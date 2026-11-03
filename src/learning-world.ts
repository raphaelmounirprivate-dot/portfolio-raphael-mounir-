export type LearningKind = "math" | "declic";

const pixelUrl = `${import.meta.env.BASE_URL}images/pixel.svg`;

export function learningWelcome(kind: LearningKind): string {
  const math = kind === "math";
  return `<div class="learning-brand-row"><span class="learning-brand">déclic<span>.</span><small>${math ? "Math" : "Français"}</small></span><span class="learning-xp"><span data-learning-xp>0</span> XP <small>démo</small></span></div><div class="pixel-playground"><img class="pixel-mascot" src="${pixelUrl}" alt="Pixel, la mascotte des sites Déclic" width="120" height="120"/><p class="pixel-bubble" data-pixel-message>${math ? "Pas besoin de tout savoir. On apprend en essayant !" : "Moi, c’est Pixel. On passe un niveau ensemble ?"}</p><span class="pixel-sticker">${math ? "Tu peux te tromper. Et réessayer !" : "Les erreurs font partie du jeu."}</span></div>`;
}

export function learningMissions(kind: LearningKind): string {
  const labels =
    kind === "math" ? ["4³", "5²", "2ⁿ"] : ["Être", "Avoir", "Pièges"];
  return `<ol class="learning-missions" aria-label="Les trois étapes de la démo">${labels.map((label, i) => `<li data-learning-step="${i}" ${i === 0 ? 'aria-current="step"' : ""}><span class="mission-number">${i + 1}</span><span>${label}</span><span class="mission-result" data-step-result></span></li>`).join("")}</ol><div class="learning-progress"><span data-learning-progress>0 / 3 défis essayés</span><progress data-learning-meter max="3" value="0" aria-label="Défis essayés"></progress></div>`;
}

export function learningOverview(kind: LearningKind): string {
  return `<div class="learning-overview"><span class="learning-brand">déclic<span>.</span></span><img src="${pixelUrl}" alt="" width="100" height="100" loading="lazy"/><strong>${kind === "math" ? "Un calcul. Un déclic." : "L’accord parfait ? À toi de jouer."}</strong><span>Une mission à essayer avec Pixel</span></div>`;
}
