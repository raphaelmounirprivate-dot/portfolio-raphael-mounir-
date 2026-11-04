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

## Limites de la première publication

Pas de test sur appareil physique ni Safari/Firefox. Pas de capture du jeu fournie : mini-simulation adaptée et identifiée, sans présenter un faux écran original. Aucun email ou LinkedIn ajouté. Le contenu reste visible si l’animation échoue. Le site applicatif exige JavaScript ; un message noscript invite à activer JavaScript.

## Mise à jour — six démos sur place

- Ajout Télécom & Réseau, Mon App / Budget Belgique, Math et Déclic Ados. Boutons externes GitHub supprimés de toute l’interface, y compris le noscript.
- Six démos locales, sans compte distant, transmission, sauvegarde ni donnée personnelle. Les adaptations et les données fictives sont signalées.
- 36 tests navigateur réussis en 1440 × 1000, 768 × 1024 et 390 × 844 : six destinations, absence de liens GitHub, navigation, thème, galerie, séries et chrono (pause, reprise, échéance, reset), paiement idempotent, dépense unique, deux stratégies, quiz avec erreur/correction, indice, score et clavier.
- Vérification explicite de l’absence de chevauchement entre le premier bouton actif de chaque démo et la carte du parcours. Revue des captures : la carte initialement gênante a été déplacée en barre sticky sur mobile/tablette ; les commandes et explications sont dégagées.
- Revue visuelle effectuée dans le fil après indisponibilité du sous-agent de finition ; aucune revue indépendante de cette mise à jour annoncée. Le système visuel existant est conservé.
- Compilation TypeScript/Vite et test de la version compilée sous le sous-répertoire Pages réussis aux trois formats.
- Publication des descriptions et exercices adaptés des quatre dépôts privés explicitement autorisée par Raphaël dans la conversation, après revue de la liste précise des extraits. Aucun secret ou historique personnel inclus.
- Commit applicatif `bc5137da553e7cb2ea44e5c93c2403d061e0e513` publié. [Workflow 41708360019](https://github.com/raphaelmounirprivate-dot/portfolio-raphael-mounir-/actions/runs/41708360019) : tests, compilation et déploiement en succès.
- Vérification sur le site public : les six démos sont présentes, aucun lien GitHub dans l’interface, interactions Sport, simulation, budget, Télécom, Math et Déclic testées en Chromium aux largeurs 1440, 768 et 390 pixels. Galerie, carte, liens directs, vue d’ensemble et thèmes également contrôlés. Aucune erreur de ressource observée. Captures publiques ordinateur et mobile inspectées.

## Identité enfantine de Math et Déclic

- Identité relue dans les sources d’origine : palette, Nunito, géométrie de Pixel et titres. La mascotte est également visible sur la publication publique Déclic. Le Math public répond mais sa capture initiale reste sur la préparation de session ; pas de prétention à avoir vérifié son écran final.
- Démos Math et Déclic et leurs vignettes : fond clair de miniature, bleu/menthe/corail, Pixel, bulles, missions, progression et XP de démonstration. Les autres univers sont inchangés.
- 42 tests navigateur passent : les 36 précédents et six contrôles sur les trois formats pour la mascotte chargée, Nunito, les missions, les XP, les encouragements, la réinitialisation et la réduction des animations.
- Compilation et contrôle sous-répertoire Pages passent. Nunito auto-hébergée, licence OFL distribuée ; aucun appel Google Fonts ajouté.
- Revue visuelle réalisée dans le fil : captures des miniatures ordinateur/mobile, en masquant uniquement les éléments de navigation du portfolio pour les captures isolées. Titres corrigés pour retrouver les deux lignes et le bleu de l’original. Aucun débordement horizontal observé.
- Diagnostic mécanique exécuté une fois : avertissements sur les nouvelles couleurs, Nunito et rayons propres aux miniatures. Ces choix intentionnels sont désormais consignés dans DESIGN.md et le sidecar ; aucun second diagnostic annoncé.
- Commit applicatif `d4588b0a687db57b6a4f9349f7eeb5a2230a5da0` déployé. [Workflow 41710488469](https://github.com/raphaelmounirprivate-dot/portfolio-raphael-mounir-/actions/runs/41710488469) : tests, compilation et publication en succès.
- Vérification réelle sur l’URL publique en 1440, 768 et 390 pixels : Pixel chargé depuis le site, Nunito appliquée, 10 XP après une bonne réponse dans chaque démo, vignettes et six interactions conservées. Captures publiques des miniatures inspectées : titres sur deux lignes, seconde ligne bleue, mascotte et palette d’origine visibles sur ordinateur et mobile. Les limites d’adaptation sont conservées.

## Mini-labo Cisco — 4 novembre 2026

- Scénario complet VLAN 10 et deux ports configurables, modes et invites, aide, historique, Ctrl+Z, collage borné, sorties `show`, test de communication, sauvegarde/reload simulés et reset.
- 51 tests navigateur réussis aux trois formats : 42 précédents et neuf contrôles Cisco. Ils couvrent le refus d’une commande hors mode, les états de port, la réussite et l’échec de connectivité après coupure, la restauration de la configuration sauvegardée, le reset, une saisie HTML inerte et le refus d’un collage de plus de 20 commandes.
- Captures ordinateur et mobile du scénario exécuté inspectées : console, formulaire, topologie et retours lisibles, sans débordement horizontal observé. Le quiz PoE reste utilisable dans son volet.
- Commit applicatif `4e2b565456f09083ce4b73da40c64585aadd7073` déployé. [Workflow 41750323710](https://github.com/raphaelmounirprivate-dot/portfolio-raphael-mounir-/actions/runs/41750323710) : tests, compilation et publication en succès.
- Contrôle sur l’URL publique en 1440, 768 et 390 pixels : parcours de commandes collé dans la console, VLAN 10 configuré sur les deux ports, test PC-A vers PC-B réussi. Ressources, autres démos, galerie, carte, vignettes et thèmes également contrôlés. La miniature ne représente pas un essai sur équipement réel.

## Pandemic Horizon original — 4 novembre 2026

- Source publique fixée à `b066ed745c7c778b45f1fbe0baa3df8e372be2b0`, version 0.26.0, export Godot 4.7.2 monothread compatible avec Pages. Aucun changement de script, de règles ou de JSON du jeu.
- Suite originale : **6 830 contrôles, zéro échec**. Script reproductible d’export vérifié localement ; licences moteur distribuées.
- Contrôles navigateur : 51 régressions/cadre réussies sur ordinateur, tablette et mobile ; contrôle additionnel du véritable moteur Web réussi une fois sur ordinateur (doublons tablette/mobile intentionnellement ignorés). Son scénario `RUNTIME_SMOKE_OK` couvre parties, évolutions, transports, tutoriel, sauvegarde, incidents et stratégies ; pilote audio Dummy dans ce seul contrôle automatique pour éviter la course entre initialisation audio et arrêt immédiat.
- Parcours clavier réel de nouvelle partie traversé jusqu’à la carte mondiale, capture utilisée comme aperçu. Export de production sous le sous-répertoire Pages contrôlé aux trois largeurs, moteur chargé et déchargé à la fermeture. Aperçu et cadre inspectés visuellement. Le jeu conserve son ergonomie PC : aucune validation de confort tactile complet ni essai humain d’équilibrage annoncé.

- Publication applicative : commit `17591da0b59013d83541f2454607cba29b6a4df8`, [workflow 41753497620](https://github.com/raphaelmounirprivate-dot/portfolio-raphael-mounir-/actions/runs/41753497620) en succès pour export, 6 830 contrôles du jeu, 52 tests navigateur, compilation et déploiement.
- Contrôle du site public en 1440, 768 et 390 pixels : moteur réellement initialisé, menu rendu puis déchargé à la fermeture, autres démos et thèmes fonctionnels. Le vérificateur attend le redimensionnement du canevas et deux images avant sa capture ; le masque de chargement initialement caché ne sert pas à lui seul de preuve de démarrage. Le détachement de la fenêtre est attendu pour éviter une course avec l’événement natif `close`.
- Contrôle additionnel du moteur servi depuis Pages : `RUNTIME_SMOKE_OK`, sans erreur JavaScript ; parcours réel de nouvelle partie jusqu’à la carte mondiale capturé et inspecté. Échap ferme la fenêtre depuis le canevas et rend le focus au portfolio. Manifeste public : version 0.26.0, source `b066ed745c7c778b45f1fbe0baa3df8e372be2b0`, Godot 4.7.2. Aucun essai sur appareil physique annoncé.

## Escales sur un écran — 4 novembre 2026

- Six destinations de hauteur 100dvh ; démos et captures dans une zone défilante avec focus clavier, informations détaillées repliables. Navigation réservée au-dessus ou au-dessous selon le format, défilement général libre.
- Trois nouveaux tests parcourent les six escales : hauteur égale au viewport, commandes accessibles dans le cadre, détails ouverts sans agrandir la section, absence de chevauchement entre la carte et les titres. Captures ordinateur, tablette et mobile ; contrôles supplémentaires en 1366 × 768 et 844 × 390.
- Les images publiques de connexion Télécom ont été identifiées dans la feuille CSS publiée : original JPEG et variante WebP mobile, conservés localement comme références. Elles ne sont pas ajoutées au fond du portfolio.
- Validation locale finale : **55 tests navigateur réussis**, deux doublons du contrôle moteur ignorés intentionnellement ; compilation et contrôle de production sous le sous-répertoire Pages réussis aux trois formats.
- Geste supplémentaire validé sur Chromium au format téléphone : une séquence tactile synthétisée via CDP fait défiler la démo sans déplacer le document pendant le geste. Ce contrôle ne remplace pas un essai sur appareil physique ou Safari.
- Publication : commit applicatif `3475b66fb89e2ddafa7a066208fd56f9326668a1`, [workflow 41783408369](https://github.com/raphaelmounirprivate-dot/portfolio-raphael-mounir-/actions/runs/41783408369) en succès : 6 830 contrôles du jeu, **56 tests navigateur réussis**, quatre contrôles non applicables aux autres formats ignorés, compilation et déploiement.
- Vérification sur le site public : six escales mesurées à 1 000 px, 1 024 px et 844 px selon la hauteur du navigateur, aux largeurs 1 440, 768 et 390 px. Détails ouverts sans agrandir la section, cadre défilant contenu dans l’écran et carte hors des titres. Ressources, autres démos, galerie, thèmes et chargement du jeu également vérifiés publiquement.

## Écran d’entrée — 4 novembre 2026

- Image fournie en plein écran, moteur GlowCursor WebGL fourni adapté sans React, bouton d’entrée au clavier et au toucher. Portfolio inert pendant l’accueil ; focus rendu au départ et ressources graphiques libérées à l’entrée. Liens directs préservés, absence de mémorisation de l’entrée, réduction des mouvements respectée.
- Compilation et TypeScript strict réussis. Tests navigateur : 58 réussis au premier passage, puis les trois contrôles clavier corrigés pour passer par le nouvel accueil réussis. Cinq contrôles non applicables ignorés, dont le moteur Godot absent du clone. Six tests d’accueil inclus, ordinateur/tablette/mobile ; captures inspectées aux formats 1440 × 1000 et 390 × 844, traînée lumineuse visible.
- Accueil compilé vérifié sous `/portfolio-raphael-mounir-/` aux largeurs 1440, 768 et 390 px : image, entrée, focus, vue d’ensemble et lien direct Télécom réussis, aucune ressource en erreur. Le vérificateur global de production atteint le jeu puis échoue faute d’export dans `public/horizon-game/`, exclu de Git ; aucune réussite complète de ce contrôle annoncée.
- Lanceur Windows complété pour utiliser le Node portable déjà installé dans Desktop/monapp. Aucun envoi GitHub ni déploiement effectué.
### Version finale destinée à la publication

Nom retiré de l’écran de lancement ; l’effet suit le déplacement du pointeur, sans éclat au clic. Nouvelle compilation réussie et passage complet de la suite locale : 61 tests réussis, cinq contrôles non applicables ignorés. Le workflow GitHub reconstruit l’export du jeu avant ses propres contrôles et le déploiement Pages.
## Suppression des cadres défilants — 4 novembre 2026

- Suppression du conteneur défilant des six démos et de la contrainte de hauteur des escales. Les présentations, captures, console et guide Cisco ne défilent plus dans leur propre zone. Les liens « Essayer » rejoignent réellement leur démo dans le document.
- Redimensionnement des titres et espacements, boutons d’au moins 44 px. Math et Déclic réorganisés en deux colonnes quand leur panneau est assez large ; choix en ligne selon l’espace disponible. Aucune explication, progression ou commande retirée. Les informations dépliées agrandissent la section.
- 61 tests navigateur locaux réussis, cinq contrôles non applicables ignorés. Nouveaux contrôles sur les six démos : aucune zone de défilement interne, boutons et retours à l’intérieur des panneaux, indices et explications visibles sans coupe, extension des descriptions et du guide. Le glissement tactile dans une démo déplace maintenant le document. Captures ordinateur, tablette et téléphone inspectées.
## Chapitres Math et Français — 4 novembre 2026

- Ajout de « Comprendre les puissances » et « Accorder le participe passé » : trois étapes expliquées, exemples, méthode récapitulative et application à correction dépliable. Boutons « Lire le chapitre » / « S’entraîner » et retour vers les trois défis existants.
- Les chapitres suivent le défilement de la page. Les exercices restent dans le DOM, avec réponses, question courante et XP inchangés. Au retour depuis le cours, le focus rejoint le prochain contrôle utile. La navigation mobile réserve son espace dans la marge de défilement du document.
- TypeScript et compilation réussis ; 64 tests locaux réussis, cinq contrôles non applicables ignorés. Ajout de trois parcours navigateur couvrant lecture au clavier, correction, retour au défi 2 et conservation des 10 XP, formats ordinateur/tablette/téléphone. Captures des chapitres inspectées sur ordinateur et téléphone.
## Curseur invisible sur l’accueil — 4 novembre 2026

- Diagnostic sur la version publique avant correction : changement d’image visible avec le rendu normal, aucun changement avec les mouvements réduits ou WebGL indisponible ; canevas resté à 300 × 150 dans ces deux derniers cas. Ce diagnostic reproduit deux causes possibles sans prétendre connaître la configuration exacte du navigateur de l’utilisateur.
- Ajout d’un moteur de secours Canvas 2D, activé si WebGL ou son extension de textures flottantes est indisponible, ou si le contexte est perdu. Un canevas neuf évite de réutiliser en 2D un contexte déjà lié à WebGL. Dernier recours et mouvements réduits : halo CSS sans traînée ni inertie. Le changement de préférence système est pris en compte pendant l’accueil. Arrêt et nettoyage des ressources à l’entrée dans le site.
- 18 tests d’accueil réussis sur les trois formats : WebGL bloqué, extension absente, mouvements réduits, perte réelle du contexte, changement de préférence et entrée dans le site. Visibilité vérifiée par pixels non transparents et captures différentes après déplacement, captures inspectées. Suite locale complète : 76 tests réussis, cinq contrôles non applicables ignorés. TypeScript et compilation réussis.