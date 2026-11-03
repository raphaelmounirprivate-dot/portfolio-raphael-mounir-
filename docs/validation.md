# Validation locale du 3 novembre 2026

## Première publication — résultats exécutés

- Installation npm : 19 paquets, audit de 20 paquets, zéro vulnérabilité signalée.
- `npm run build` : TypeScript strict puis Vite, succès. Dernière compilation : 13 modules, JavaScript 15,34 ko (5,97 ko gzip), CSS 17,15 ko (4,55 ko gzip). Images : environ 202 ko au total ; polices locales et aucun appel à Google Fonts.
- `npm test` : **15 tests réussis**, Chromium, trois formats : 1440 × 1000, 768 × 1024 et 390 × 844. Exécution complète après les dernières corrections.
- Console et erreurs JavaScript observées dans le test de parcours : aucune.
- Chargement réel de la capture sport : largeur naturelle vérifiée.
- Débordement horizontal : absent aux cinq principales sections dans les trois formats.
- Galerie : boutons, retour circulaire, flèches du clavier et événements tactiles simulant un balayage. Ce dernier contrôle n’est pas un essai sur téléphone physique.
- Vue d’ensemble : deux projets, retour au bouton d’origine, liens directs et focus vers l’escale choisie.
- Thème : sombre système, passage au clair et conservation après rechargement.
- Réduction des animations : aucune animation du signal, scroll non animé.
- Clavier : lien d’évitement fonctionnel, commandes de galerie et restauration du focus.
- Ajout d’une entrée de test aux données : présente dans le trajet, le mini-plan et la grille.
- Captures complètes ordinateur, tablette et mobile, sombre et clair, dans `.local/`. Capture mobile refaite après décodage des images pour éviter un faux téléphone vide lié au chargement différé.
- Diagnostic mécanique Impeccable exécuté : un avertissement sur une transition de largeur de soulignement ; remplacement effectué par une transformation, sans relancer un second diagnostic.
- Revue visuelle indépendante : quatre corrections examinées et résolues, disposition `ship` sur ce périmètre. Documentation et sidecar cohérents avec les tokens contrôlés.
- Version compilée servie sous `/portfolio-raphael-mounir-/` : contrôle réel des ressources, galerie, carte mobile et liens directs aux trois largeurs, sans erreur. Contrastes mesurés du texte principal et secondaire sur le fond sombre : 17,2:1 et 9,1:1. Script rejouable : `npm run test:production`.

## État de publication

Le dépôt public [portfolio-raphael-mounir-](https://github.com/raphaelmounirprivate-dot/portfolio-raphael-mounir-) a été créé par Raphaël puis alimenté par le connecteur GitHub. Le tiret final fait partie du nom réel et des chemins de publication. Commit du code : `bfdc1cc350d46999e2723598ddbda336d9fc73dd`. Les arbres local et distant correspondent exactement : `8391a3159311d33864f6d908620f18cdac35f202`, images incluses. La branche locale main a été synchronisée et suit origin/main ; l’ancien commit local reste sur local-before-publication.

Le [workflow 41704142105](https://github.com/raphaelmounirprivate-dot/portfolio-raphael-mounir-/actions/runs/41704142105) a réussi les tests Chromium, la compilation et l’envoi de l’artefact Pages. Après l’activation de Pages par Raphaël, la relance a terminé avec les jobs build et deploy en succès. Aucun dépôt existant n’a changé de visibilité.

**Site public vérifié : https://raphaelmounirprivate-dot.github.io/portfolio-raphael-mounir-/**. Contrôles navigateur réels sur cette URL en 1440, 768 et 390 pixels : ressources sans erreur HTTP, galerie, carte mobile, liens directs, vue d’ensemble et thèmes clair/sombre. Captures publiques ordinateur et mobile inspectées, disponibles dans `.local/public-1440.png` et `.local/public-390.png`. Ce contrôle utilise Chromium, sans test sur appareil physique.

## Limites

Pas de test sur appareil physique ni Safari/Firefox. Pas de capture du jeu fournie : mini-simulation adaptée et identifiée, sans présenter un faux écran original. Aucun email ou LinkedIn ajouté. Le contenu reste visible si l’animation échoue. Le site applicatif exige JavaScript ; un message noscript invite à activer JavaScript.

## Mise à jour — six démos sur place

- Ajout Télécom & Réseau, Mon App / Budget Belgique, Math et Déclic Ados. Boutons externes GitHub supprimés de toute l’interface, y compris le noscript.
- Six démos locales, sans compte distant, transmission, sauvegarde ni donnée personnelle. Les adaptations et les données fictives sont signalées.
- 36 tests navigateur réussis en 1440 × 1000, 768 × 1024 et 390 × 844 : six destinations, absence de liens GitHub, navigation, thème, galerie, séries et chrono (pause, reprise, échéance, reset), paiement idempotent, dépense unique, deux stratégies, quiz avec erreur/correction, indice, score et clavier.
- Vérification explicite de l’absence de chevauchement entre le premier bouton actif de chaque démo et la carte du parcours. Revue des captures : la carte initialement gênante a été déplacée en barre sticky sur mobile/tablette ; les commandes et explications sont dégagées.
- Revue visuelle effectuée dans le fil après indisponibilité du sous-agent de finition ; aucune revue indépendante de cette mise à jour annoncée. Le système visuel existant est conservé.
- Compilation TypeScript/Vite et test de la version compilée sous le sous-répertoire Pages réussis aux trois formats. Publication de cette mise à jour en cours.
