---
name: Une fibre, six univers
description: Le portfolio de Raphaël Mounir au fil de la fibre
colors:
  background: "#080f1c"
  surface: "#101c2e"
  text: "#f1f3f6"
  muted: "#a7b4c8"
  signal: "#7ce5f1"
  line: "#29364b"
  learning-bg: "#f5f6fc"
  learning-paper: "#ffffff"
  learning-ink: "#192345"
  learning-muted: "#53607c"
  learning-blue: "#3657e8"
  learning-blue-hover: "#2947c7"
  learning-mint: "#bdf46b"
  learning-mint-ink: "#233812"
  learning-coral: "#ff8b70"
  learning-line: "#dce1f0"
  learning-soft: "#edf0ff"
  learning-stage-blue: "#dfe6ff"
  learning-stage-green: "#e9f8d8"
  learning-success-bg: "#effbdf"
  learning-success-border: "#5e9224"
  learning-success-ink: "#17663b"
  learning-retry-bg: "#fff0ea"
  learning-retry-border: "#b95438"
  learning-retry-chip: "#ffe5dc"
  learning-retry-ink: "#933a27"
typography:
  learning-display:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "33px"
    fontWeight: 900
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(2.6rem, 5.8vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.04em"
rounded:
  button: "6px"
  preview: "12px"
  navigation: "8px"
  learning-sticker: "9px"
  learning-number: "10px"
  learning-soft: "14px"
  learning-feedback: "16px"
  learning-bubble: "18px"
  learning-exercise: "20px"
  learning-stage-mobile: "22px"
  learning-frame: "24px"
  learning-stage: "26px"
spacing:
  small: "8px"
  medium: "24px"
  large: "32px"
---
# Une fibre, six univers

## Overview

Concept : un signal lumineux chemine entre les créations de Raphaël Mounir.
Mode : Experience. Audience présumée : visiteurs curieux et recruteurs.
Le brief fixe la fibre, le bleu nuit et le cyan ; ces choix priment sur les variantes des skills.
Le cadrage retenu transpose un schéma de liaison en parcours éditorial libre.

- Fond sombre #080f1c ; surface #101c2e ; texte #f1f3f6 ; secondaire #a7b4c8.
- Fond clair #f0f3f7 ; surface #ffffff ; texte #111c2d ; secondaire #4d5d70.
- Signal sombre #7ce5f1 ; signal clair #006779. Magenta ponctuel #df86ca.
- Police : Outfit auto-hébergée, graisses 300, 400 et 500 ; repli sans-serif.
- Titres clamp(2.7rem, 6vw, 5.5rem), interligne 1.04, approche -0.04em.
- Texte 17px / 1.7 ; mesure 60ch. Légendes 13–14px / 1.5.
- Largeur maximale 1280px ; marges 6vw ; sections 112px minimum.
- Boutons de 48px minimum ; bord fin ; rayon 6px. Aucun rayon sur les sections.
- Mockup smartphone rayon 38px ; navigateur rayon 12px : exception liée aux objets.
- Focus : contour 3px, décalage 5px. Sélection cyan sur bleu nuit.
- Ruptures : 640px et 960px. Carte du parcours repliable sur mobile.
- Signature : la fibre dans l’accueil, la ligne du trajet et le plan de navigation.
- Point focal : typographie et grande boucle de fibre ; captures réelles à l’escale sport.
- Tension : la courbe libre traverse une composition typographique alignée.
- Animation : signal en pointillés sur la fibre, progression verticale liée au scroll.
- Durée 180–500ms, ease-out ; aucune capture masquée au démarrage.
- Réduction des mouvements : signal et transitions supprimés, aucun scroll animé.
- Galerie : image réelle, légende, boutons précédent/suivant, balayage et flèches clavier.
- Vue d’ensemble : section intégrée, retour au point de départ avec restauration du focus.
- Chaque escale place sa démo interactive dans une surface de travail à côté du récit. La galerie sport se déplie sous sa démo. Aucune redirection GitHub.
- Le thème existant reste commun ; la variété vient des tâches réelles : séance, simulation, diagnostic, budget et apprentissages.
- Risque honnête : les démos sont adaptées, les données fictives et la simulation du jeu simplifiée ; la note sous chaque essai le précise.
- Critère de qualité : six destinations identifiables, lisibles et accessibles sans animation, avec une interaction réellement utilisable et réinitialisable.

La carte conserve son dock sur grand écran. À 960 px et moins, elle passe dans une barre compacte sticky sous l’en-tête, avec menu déroulant : aucun contrôle ou retour de démo ne doit être masqué. Le minutage se lit comme un timer, sans annonce automatique chaque seconde.

## Identité des univers pédagogiques

Math et Déclic présentent une miniature du thème clair des sites d’origine, même dans le portfolio sombre : papier #F5F6FC / blanc, encre #192345, secondaire #53607C, bleu #3657E8, menthe #BDF46B et corail #FF8B70. Ces couleurs sont limitées aux démos et à leurs vignettes. Nunito 800/900 auto-hébergée porte la marque et les titres. Pixel reprend la géométrie de la mascotte originale, visible publiquement sur Déclic ; ce n’est pas un nouveau personnage généré. Bulles, missions numérotées, coins de 14 à 26 px, encouragements et XP de démonstration reprennent le langage des sites. Les chiffres ne sont pas un profil ou des notes réelles. Une bonne réponse déclenche une courte réaction de Pixel ; la réduction des mouvements la supprime.

La console Cisco utilise une surface #080F1C, texte #DFF9F8 et prompt #7CE5F1, y compris dans le portfolio clair. Consolas/Courier New sert uniquement aux commandes et sorties. Journal de hauteur bornée, texte repliable, commande et bouton de 44 px minimum. Topologie à trois nœuds, état des ports en texte ; pas d’animation réseau décorative. Sur mobile, Exécuter passe sous la saisie si nécessaire. Le guide et le quiz PoE se déplient sur place.

## Guide de l’exercice Mon Coach Sport

Dans Mon Coach Sport, deux boutons « Séance » et « Technique de l’exercice » séparent le suivi des séries du guide. La technique est affichée par défaut. Le bouton « Séance » pulse doucement jusqu’à sa première activation, puis reste sans animation, même en revenant à la technique. En mouvements réduits, le repère reste statique ; hors écran ou dans un onglet masqué, le clignotement est en pause. Changer de vue conserve les charges, séries et le chronomètre. L’illustration du guide original reste entière, avec légende, et les repères « Réglage », « Mouvement » et « À contrôler » sont groupés à côté dès 600 px disponibles. Sur grand panneau, les deux vues occupent la même cellule de grille pour conserver une hauteur stable. Sous 600 px disponibles, chaque vue retrouve sa hauteur naturelle pour éviter une grande zone vide dans la séance. Aucun cadre défilant. La vue masquée est invisible et absente de la navigation clavier. Image fluide et texte lisible dans les deux thèmes.

## Pandemic Horizon : jeu original

Le panneau présente une capture réelle du moteur, 24 régions et trois agents, puis ouvre le jeu dans une fenêtre couvrant le navigateur. Son interface Godot conserve son identité et ses règles. Le poids approximatif du lancement et la préférence pour un ordinateur sont visibles avant le clic. La fermeture reste accessible au-dessus du jeu et rend le focus au bouton initial ; le moteur est alors déchargé. Les ressources lourdes ne sont pas préchargées.

## Escales sans défilement interne

Chaque destination mesure au moins un écran sur ordinateur et s’allonge avec son contenu ; sur téléphone la hauteur reste naturelle. Présentation et démo sont côte à côte sur grand écran, empilées sur téléphone. Les cadres défilants sont supprimés : démonstrations, textes, captures, console et guide Cisco suivent le document. Math et Déclic passent en deux colonnes dans leur panneau dès 600 px disponibles, avec des choix en ligne dès 420 px. Les titres, marges et zones de retour sont plus compacts, les cibles tactiles restent à 44 px minimum. Résumé, histoire et technologies restent repliables, sans hauteur imposée. Le plan du voyage garde sa position basse sur ordinateur et haute sur petit écran. Le défilement général reste libre.

## Lecture des chapitres

Deux boutons à état pressé donnent accès au cours et aux défis dans les panneaux Math et Français. Le cours remplace visuellement les exercices, conservés dans le DOM et retrouvés dans leur état précédent. Article en hauteur naturelle, corps 15 px / 1,7 et titres Nunito de 26 à 34 px. Trois étapes numérotées pour la méthode, exemples sur papier blanc, rappel menthe et correction facultative. Le bouton final rend le focus au prochain contrôle utile des défis. Sur mobile, la marge de défilement du document réserve 72 px à la carte fixe ; les contrôles restent accessibles sous la navigation.
Les chapitres Math et Français sont répartis en quatre étapes : trois notions, puis méthode et application. Précédent/Suivant et un compteur annoncé permettent la lecture sans grand bloc vertical. Les étapes partagent une grille dont la hauteur suit le contenu le plus long ; leur changement ne déplace pas la suite de la page. Typographie, marges et socle de hauteur sont communs aux deux chapitres, sans hauteur maximale ni défilement interne. Revenir aux défis conserve les réponses et les XP ; revenir au chapitre conserve l’étape lue.

La hauteur commune des chapitres est calculée à partir de leurs dimensions réelles, y compris pour le chapitre masqué. Elle est recalculée après chargement des polices, changement de largeur et ouverture d’une correction ou d’un rappel. Aucun texte n’est tronqué et le document garde son défilement naturel.

## Curseur de l’écran d’entrée

Le bouton « Entrer dans le site » utilise une adaptation TypeScript/Canvas du StarBorder fourni par l’utilisateur : fond bleu nuit, texte clair, étoile blanche et traînée cyan sur le contour, tour de quatre secondes. Survol et focus accélèrent un tour ; la pression éclaire brièvement la bordure. La préférence de réduction des mouvements conserve un contour statique. Le rendu s’arrête dans un onglet masqué et est détruit à l’entrée dans le portfolio. Aucun ajout de React ou de bibliothèque.

Le moteur GlowCursor reste prioritaire. Si WebGL ou les textures flottantes sont indisponibles, une traînée Canvas 2D conserve le signal lumineux bleu/cyan, sans dépendance. Une perte du contexte graphique active également ce secours. En mouvements réduits, un halo de 64 px se positionne directement sous le pointeur, sans inertie ni animation continue. Les écouteurs, observateurs et boucles sont supprimés à l’entrée dans le portfolio. Le changement de préférence système reconfigure le rendu pendant l’accueil.
## Lecture et pause de la vague

Une commande visible près de « Suivez le fil » active ou met en pause le signal de la fibre, sur ordinateur comme sur téléphone. Sans choix enregistré, elle suit la préférence de réduction des mouvements. Une activation volontaire autorise uniquement cette vague, même en mouvements réduits ; les autres animations gardent leur préférence système. Le choix est mémorisé localement quand le stockage est disponible. Un décalage initial de deux secondes place le signal sur la partie visible dès son activation.

Chacune des cinq lignes porte son propre signal. Les trajets sont normalisés pour un cycle commun de douze secondes ; un décalage de 2,4 secondes entre lignes distingue les départs et les arrivées. La commande de pause agit sur les cinq vagues ensemble.
