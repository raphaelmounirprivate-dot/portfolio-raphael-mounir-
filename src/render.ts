import { learningOverview } from "./learning-world";
import { type Project } from "./data/projects";

import { renderDemo } from "./demo-render";
import { demoLabels } from "./data/demo-content";
import { escape } from "./html";

export const arrow =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const number = (i: number): string => String(i + 1).padStart(2, "0");
const fiberPaths: readonly string[] = [
  "M-100 560C180 400 470 790 760 570S1060 290 1210 400 1520 650 1500 260",
  "M-100 568C180 408 475 798 765 578S1064 295 1215 405 1525 655 1505 265",
  "M-100 576C180 416 480 806 770 586S1068 300 1220 410 1530 660 1510 270",
  "M-100 584C180 424 485 814 775 594S1072 305 1225 415 1535 665 1515 275",
  "M-100 592C180 432 490 822 780 602S1076 310 1230 420 1540 670 1520 280",
];

export function gallery(project: Project): string {
  if (!project.screenshots.length) {
    return `<figure class="game-preview"><div class="game-orbit" aria-hidden="true"><span></span><span></span><span></span><i></i></div><div class="preview-title">${escape(project.title)}</div><figcaption>Aperçu à venir<span>Les images du jeu seront ajoutées ici.</span></figcaption></figure>`;
  }
  const shot = project.screenshots[0];
  return `<div class="gallery" data-gallery="${project.id}" role="region" aria-label="Captures de ${escape(project.title)}" tabindex="0">
    <div class="phone-scene"><div class="phone"><img src="${shot.src}" alt="${escape(shot.alt)}" width="${shot.width}" height="${shot.height}" loading="lazy" decoding="async" /></div><span class="device-note">Captures de l’application</span></div>
    <div class="gallery-controls"><button type="button" data-prev aria-label="Capture précédente">${arrow}</button><p aria-live="polite"><span data-caption>${escape(shot.caption)}</span><span data-counter>1 / ${project.screenshots.length}</span></p><button type="button" data-next aria-label="Capture suivante">${arrow}</button></div>
  </div>`;
}

export function projectSection(
  project: Project,
  i: number,
  projects: Project[],
): string {
  return `<section class="destination ${project.type === "Jeu PC" ? "game" : "sport"}" id="${project.id}" data-destination style="--project-accent:${project.accentColor}" aria-labelledby="title-${project.id}">
    <div class="stop-marker"><span>${number(i)}</span><p>${escape(project.universe)}</p><span class="stop-line"></span><span>${escape(project.type)}</span></div>
    <div class="destination-layout"><div class="project-copy"><h2 id="title-${project.id}">${escape(project.title)}</h2><p class="project-status">${escape(project.status)}</p><p class="project-tagline">${escape(project.tagline)}</p><details class="project-description"><summary>Découvrir le projet et ses technologies</summary><p>${escape(project.summary)}</p>${project.story ? `<p>${escape(project.story)}</p>` : ""}<ul class="technologies" aria-label="Technologies">${project.technologies.map((t) => `<li>${escape(t)}</li>`).join("")}</ul></details><div class="project-links"><a class="button primary demo-jump" href="#demo-${project.id}">${demoLabels[project.demo].action}${arrow}</a></div></div><div class="project-experience">${renderDemo(project.demo, project.id)}${project.screenshots.length ? '<details class="real-captures"><summary>Voir les captures réelles de l’application</summary>' + gallery(project) + "</details>" : ""}</div></div>
    ${projects[i + 1] ? `<a class="next-stop" href="#${projects[i + 1].id}">Prochaine connexion : ${escape(projects[i + 1].universe.toLocaleLowerCase("fr"))} ${arrow}</a>` : ""}
  </section>`;
}

export function overview(projects: Project[]): string {
  return `<section id="overview" class="overview wrap" hidden aria-labelledby="overview-title" tabindex="-1"><div class="overview-heading"><div><p>Choisissez votre destination</p><h2 id="overview-title">Tous les univers.</h2></div><button class="button secondary" id="return-journey">Revenir au voyage ${arrow}</button></div><div class="overview-grid">${projects.map((p, i) => `<a class="overview-item" href="#${p.id}" data-overview-link><span>${number(i)} / ${escape(p.type)}</span><div class="overview-visual ${p.screenshots.length ? "has-image" : ""}">${p.screenshots.length ? `<img src="${p.screenshots[0].src}" alt="${escape(p.screenshots[0].alt)}" width="${p.screenshots[0].width}" height="${p.screenshots[0].height}" loading="lazy" />` : p.demo === "math" || p.demo === "declic" ? learningOverview(p.demo) : `<div class="overview-demo-preview"><strong>${escape(demoLabels[p.demo].title)}</strong><span>${escape(demoLabels[p.demo].preview)}</span><span class="overview-try">Démo interactive ${arrow}</span></div>`}</div><h3>${escape(p.title)}${arrow}</h3><p>${escape(p.summary)}</p></a>`).join("")}</div></section>`;
}

export function render(projects: Project[]): string {
  return `<header class="header wrap"><a class="wordmark" href="#depart" aria-label="Raphaël Mounir, départ"><span class="brand-symbol" aria-hidden="true">rm<span>•</span></span><span>Raphaël Mounir</span></a><nav aria-label="Navigation principale"><a href="#trajet">Les projets</a><a href="#a-propos">À propos</a><a href="#contact">Contact</a></nav><button id="theme-toggle" class="theme-toggle" type="button" aria-label="Changer de thème"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg></button></header>
    <main id="contenu"><div id="journey"><section id="depart" class="hero"><div class="hero-location wrap"><span class="location-dot"></span> Namur, Belgique <span class="location-line"></span> Télécom & création numérique</div>
    <div class="hero-content wrap"><h1>Je connecte les idées.<br><span>Je crée des expériences.</span></h1><p class="hero-description">Technicien télécom en formation, je passe des connexions dans la fibre aux connexions entre les idées. Voici les univers que je construis.</p><div class="hero-actions"><a class="button primary" href="#trajet">Commencer le voyage ${arrow}</a><a class="text-link" href="#trajet">Voir les projets ${arrow}</a></div></div>
    <svg class="hero-fiber" viewBox="0 0 1440 720" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="fiber-color" x1="0" y1="700" x2="1400" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#7ce5f1" stop-opacity=".1"/><stop offset=".5" stop-color="#7ce5f1"/><stop offset="1" stop-color="#df86ca"/></linearGradient></defs><g class="fiber-strands">${fiberPaths.map(path => `<path d="${path}"/>`).join("")}</g><g class="fiber-signals">${fiberPaths.map((path, index) => `<path class="signal" pathLength="100" style="--signal-delay:${-2 - index * 2.4}s" d="${path}"/>`).join("")}</g></svg>
    <div class="fiber-label" aria-hidden="true"><span></span> Un signal. Plusieurs horizons.</div><div class="hero-bottom wrap"><div class="hero-controls"><a href="#trajet"><span class="scroll-symbol" aria-hidden="true"></span> Suivez le fil</a><button id="wave-toggle" class="wave-toggle" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path data-wave-icon d="M9 5l10 7-10 7z"/></svg><span data-wave-label>Animer la vague</span></button></div><span>Applications · Réseaux · Jeux · Apprentissages</span></div></section>
    <section id="trajet" class="journey-intro wrap" aria-labelledby="journey-title"><div><h2 id="journey-title">${projects.length} escales.<br>Une même curiosité.</h2></div><div><p>Bouger, simuler, connecter, organiser, apprendre : six portes à ouvrir. À chaque escale, essayez un petit morceau du projet.</p><button class="text-link" id="open-overview" type="button">Vue d’ensemble ${arrow}</button></div></section>
    <div class="route-container wrap"><div class="route-track" aria-hidden="true"><span id="route-progress"></span></div>${projects.map(projectSection).join("")}</div></div>
    ${overview(projects)}
    <section id="a-propos" class="about wrap" aria-labelledby="about-title"><span class="about-monogram" aria-hidden="true">rm.</span><div><h2 id="about-title">La fibre de créer.</h2><p class="about-lead">Je m’appelle Raphaël Mounir.<br>J’apprends à connecter. Et je crée au passage.</p><p>Basé à Namur, en Belgique, je suis technicien télécom en formation, spécialisé dans la fibre optique et le cuivre. Ma curiosité se prolonge dans la création d’applications et de sites web.</p><p>Ce portfolio relie ces univers. Chaque projet est une façon de mettre une idée à l’épreuve et de lui donner une forme.</p><ul class="about-skills" aria-label="Mes univers"><li>Fibre optique & cuivre</li><li>Applications</li><li>Sites web</li><li>Jeux</li></ul></div></section>
    <section id="contact" class="contact wrap" aria-labelledby="contact-title"><h2 id="contact-title">Et la prochaine destination,<br><span>on la crée ensemble ?</span></h2><a class="button primary" href="#trajet">Rejouer les six univers ${arrow}</a></section></main>
    <footer class="footer wrap"><p>Raphaël Mounir <span>·</span> Namur, Belgique</p><a href="#depart">Retour au départ ${arrow}</a></footer>
    <nav class="journey-map" aria-label="Carte du voyage"><button id="map-toggle" type="button" aria-expanded="false" aria-controls="map-stops">Carte du voyage <span aria-hidden="true">+</span></button><div id="map-stops"><a href="#depart" aria-label="Départ" data-map="depart"><span class="map-dot"></span><span>Départ</span></a>${projects.map((p, i) => `<a href="#${p.id}" data-map="${p.id}"><span class="map-dot"></span><span>${number(i)} ${escape(p.title)}</span></a>`).join("")}<a href="#contact" data-map="contact"><span class="map-dot"></span><span>La suite</span></a></div></nav>`;
}
