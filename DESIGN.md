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

## Pandemic Horizon : jeu original

Le panneau présente une capture réelle du moteur, 24 régions et trois agents, puis ouvre le jeu dans une fenêtre couvrant le navigateur. Son interface Godot conserve son identité et ses règles. Le poids approximatif du lancement et la préférence pour un ordinateur sont visibles avant le clic. La fermeture reste accessible au-dessus du jeu et rend le focus au bouton initial ; le moteur est alors déchargé. Les ressources lourdes ne sont pas préchargées.

## Escales sur un écran

Chaque destination mesure 100dvh. Présentation et démo sont côte à côte sur grand écran, empilées sur téléphone. Résumé, histoire et technologies sont réunis dans un volet ; le texte garde sa taille lisible. La démonstration et les captures ont une zone défilante au clavier et au toucher. Le plan du voyage conserve son espace réservé en bas sur ordinateur et en haut sur petit écran. Le défilement général reste libre, sans défilement forcé par crans.
