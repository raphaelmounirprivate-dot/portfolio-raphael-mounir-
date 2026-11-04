import type { DemoKind } from "./data/demo-content";
import { demoLabels } from "./data/demo-content";
import { learningWelcome, learningMissions } from "./learning-world";
import { renderCisco } from "./cisco-demo";

function sport(): string {
  return `<div class="workout-demo"><div class="demo-screen-heading"><span>Full Body · séance A</span><span>Exemple</span></div><h4>Presse à cuisses</h4><p class="demo-prescription">2 séries · 10 à 15 répétitions</p><div class="demo-fields"><label>Charge fictive<input type="number" required min="0" max="500" step="0.5" value="40" data-weight />kg</label><label>Répétitions<input type="number" required min="1" max="100" value="12" data-reps /></label></div><div class="set-list"><p data-set="1"><span>Série 1</span><span>À faire</span></p><p data-set="2"><span>Série 2</span><span>À faire</span></p></div><button class="demo-primary" data-validate>Valider une série</button><div class="rest-bar"><span>Repos<output data-timer role="timer" aria-live="off" aria-label="Temps de repos restant">02:00</output></span><button data-pause disabled>Pause</button></div><p class="demo-feedback" data-feedback role="status">À vous de jouer : validez votre première série.</p><button class="demo-reset" data-reset>Recommencer la séance</button></div>`;
}

function simulation(): string {
  const points = [
    [58, 64],
    [153, 36],
    [256, 64],
    [64, 178],
    [165, 155],
    [268, 184],
  ];
  const paths = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
  ];
  return `<div class="simulation-demo"><div class="demo-screen-heading"><span>Monde miniature</span><span data-day>Jour 0</span></div><svg class="network-demo" viewBox="0 0 330 230" role="img" aria-label="Réseau fictif de six nœuds. Le résultat est aussi indiqué sous la carte.">${paths.map(([a, b]) => `<path d="M${points[a][0]} ${points[a][1]}L${points[b][0]} ${points[b][1]}"/>`).join("")}${points.map(([x, y], i) => `<g data-node="${i}" class="${i === 0 ? "reached" : ""}"><circle cx="${x}" cy="${y}" r="16"/><text x="${x}" y="${y + 5}" text-anchor="middle">${i + 1}</text></g>`).join("")}</svg><fieldset class="strategy"><legend>Choisir une stratégie</legend><label><input type="radio" name="strategy" value="mobility" checked /> Mobilité<span>Propagation plus rapide</span></label><label><input type="radio" name="strategy" value="discretion" /> Discrétion<span>Moins de pression du remède</span></label></fieldset><div class="simulation-totals"><p>Nœuds touchés<strong data-connected>1 / 6</strong></p><p>Recherche du remède<strong data-remedy>0 %</strong></p></div><button class="demo-primary" data-advance>Passer au jour suivant</button><p class="demo-feedback" data-feedback role="status">Choisissez une stratégie, puis faites avancer le temps.</p><button class="demo-reset" data-reset>Rejouer la simulation</button></div>`;
}

function budget(): string {
  return `<div class="budget-demo"><div class="demo-screen-heading"><span>Mon App · Budget Belgique</span><span>Compte fictif</span></div><div class="available"><span>Disponible estimé</span><output data-available>920,00 €</output></div><dl class="budget-lines"><div><dt>Solde du compte</dt><dd data-balance>1 200,00 €</dd></div><div><dt>Facture encore à payer</dt><dd data-bill>−80,00 €</dd></div><div><dt>Épargne réservée</dt><dd>−200,00 €</dd></div></dl><div class="invoice-demo"><div><strong>Facture d’électricité</strong><span>80,00 € · exemple fictif</span></div><button data-pay>Marquer payée</button></div><button class="demo-primary" data-expense>Ajouter une dépense fictive de 25 €</button><p class="demo-feedback" data-feedback role="status">La facture de 80 € est déjà prévue dans le disponible.</p><button class="demo-reset" data-reset>Réinitialiser le budget</button></div>`;
}

function quiz(kind: DemoKind): string {
  const learning = kind === "math" || kind === "declic";
  return `<div class="quiz-demo">${learning ? learningMissions(kind) : ""}<div class="demo-screen-heading"><span data-quiz-progress>Défi 1 / 3</span><span data-score>0 bonne réponse</span></div><h4 data-question></h4><div class="quiz-choices" data-choices></div><button class="demo-reset" data-hint>Un indice ?</button><p class="demo-hint" data-hint-text hidden></p><p class="demo-feedback" data-feedback role="status">Choisissez une réponse pour découvrir l’explication.</p><div class="quiz-actions"><button class="demo-primary" data-next-question disabled>Question suivante</button><button class="demo-reset" data-reset>Recommencer</button></div></div>`;
}

export function renderDemo(kind: DemoKind, id: string): string {
  const label = demoLabels[kind];
  const body =
    kind === "sport"
      ? sport()
      : kind === "simulation"
        ? simulation()
        : kind === "budget"
          ? budget()
          : kind === "telecom"
            ? renderCisco() +
              `<details class="cisco-poe"><summary>Autre démo : diagnostic PoE</summary>${quiz(kind)}</details>`
            : quiz(kind);
  const learning = kind === "math" || kind === "declic";
  const title =
    kind === "math"
      ? "<span>Un calcul.</span><span>Un déclic.</span>"
      : kind === "declic"
        ? "<span>L’accord parfait&nbsp;?</span><span>À toi de jouer.</span>"
        : label.title;
  return `<div class="demo-panel demo-${kind}${learning ? " learning-world" : ""}" id="demo-${id}" data-demo="${kind}" tabindex="-1" role="region" aria-label="Démo de ${label.title}"><div class="demo-topbar"><span class="demo-live-dot" aria-hidden="true"></span><span>Démo interactive</span><span>${learning ? "L’univers d’origine" : "À essayer ici"}</span></div><div class="demo-content">${learning ? learningWelcome(kind) : ""}<h3>${title}</h3>${body}</div><p class="demo-note">${label.note}</p></div>`;
}
