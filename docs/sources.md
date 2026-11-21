# Sources et provenance

## Écran d’entrée — 4 novembre 2026

Image demandée par l’utilisateur, retrouvée à l’identique dans son fichier `Downloads/home-sunset.57ad0c3af150497b.jpg` et copiée dans `public/images/welcome-sunset.jpg`. Visuel illustratif d’accueil, sans le présenter comme un lieu de travail réel. Effet GlowCursor de React Bits : source JavaScript + CSS fournie dans le texte joint par l’utilisateur, moteur WebGL adapté sans dépendance React dans `src/glow-cursor.js`. Le moteur est complété par une traînée Canvas 2D de secours. En réduction des mouvements, un halo suit directement le pointeur sans traînée ni inertie. Les trois rendus sont libérés à l’entrée dans le portfolio. Les liens directs vers les sections passent l’écran d’entrée.

Lecture du brief fourni et du GitHub connecté le 3 novembre 2026. Les anciennes notes ont seulement orienté la recherche ; le contenu du site a été vérifié dans les sources courantes.

- Identité, formation télécom, fibre/cuivre, Namur, accroche : brief de Raphaël.
- [Mon Coach Sport, README](https://github.com/raphaelmounirprivate-dot/full-body/blob/77cdb91722109e80051a7cd99008b9cb47917e15/README.md) : application personnelle Full Body, Kotlin, Compose, Room, DataStore, fonctionnement hors ligne. Pas d’apprentissage ou de résultat inventé.
- Captures réelles, même commit : `docs/screenshots/refonte-accueil-sombre.png`, `refonte-seance-repos.png`, `refonte-progression.png`. Copiées sous `public/images/sport-*.png`, dimensions 432 × 936. Données de démonstration selon le README. La refonte est postérieure à l’APK optimisé 0.9.1 ; le lien de téléchargement désigne explicitement la version 0.9.1, sans prétendre que cet APK contient cette refonte.
- [Pandemic Horizon, README](https://github.com/raphaelmounirprivate-dot/pandemic-horizon/blob/main/README.md) : jeu original en français et hors ligne pour Windows, 24 régions et statut expérimental. Arbre source inspecté : scripts GDScript et projet Godot. Adaptation Web du code public fixé au commit b066ed745c7c778b45f1fbe0baa3df8e372be2b0, Godot 4.7.2. La capture du portfolio est réalisée dans cet export, pas empruntée à un autre jeu.
- Les descriptions et exercices adaptés sont limités aux extraits explicitement autorisés par Raphaël. Aucune donnée de compte n’est publiée.
- Coif’heure : retiré après instruction explicite de Raphaël.
- Police Outfit auto-hébergée via `@fontsource/outfit`, licence OFL-1.1 (voir le paquet).
- Fibre et orbites : géométrie SVG/CSS originale du portfolio, aucune fausse capture.

Aucune coordonnée de contact issue de l’authentification GitHub n’est publiée. La nouvelle version ne renvoie plus vers GitHub : les actions restent dans le portfolio.

## Six démos intégrées — 3 novembre 2026

Ajout du 5 novembre 2026 à la démo Sport : illustration de la presse à cuisses et repères techniques provenant du guide public de `full-body`, révision `77cdb91722109e80051a7cd99008b9cb47917e15`. Image `app/src/main/assets/guide/F1.webp`, copiée sans retouche en `public/images/sport-presse-cuisses.webp` ; objet Git vérifié `ef4452c64d6a9fec21b0c2bf403c7f3974e3b4cc`. Textes repris de l’entrée F1 de `app/src/main/assets/guide/exercises.json`, objet Git `85245ce2c96be89052f1ca96ac72a070e623eeac` : muscles, réglage, mouvement, contrôle, légende et réserve sur les différences entre machines. Les fichiers locaux utilisés ont les mêmes empreintes Git que les sources publiques. La prescription et les charges fictives de la démo restent distinctes du guide technique.

Les README des quatre projets ajoutés ont été relus sur GitHub. Les dépôts gardent leur visibilité ; seules des descriptions et de petites adaptations pédagogiques autorisées sont reprises. Aucun compte, secret, historique ou fichier financier importé.

- Télécom & Réseau : cas PoE de 100 W / trois bornes de 20 W / caméra de 15 W, puis limite du port et diagnostic IP. Trois questions adaptées, corrections conservées.
- Mon App : règles du disponible et du paiement d’une facture. Exemple créé pour la démo : 1 200 € de solde, 80 € de facture, 200 € d’épargne réservée. Tous ces montants sont fictifs. Calcul en centimes entiers, facture déduite une seule fois.
- Math : questions 4³, 5² et 2ⁿ = 32. Conversion en QCM pour l’extrait, réponses et étapes conservées.
- Déclic Ados : Phrases, réponses et explications conservées ou légèrement raccourcies.
- Sport : suivi de deux séries et repos, adaptés des fonctions documentées. 40 kg / 12 répétitions sont des réglages fictifs, modifiables dans la démo. Aucun entraînement réel prescrit ou enregistré.
- Pandemic Horizon : le graphe inventé est supprimé. Le jeu original public est exporté pour le Web, sans modifier ses règles, ses scripts, ses JSON ou ses paramètres d’équilibrage. Seul le préréglage d’export change dans une copie isolée : moteur monothread, WebGL Compatibility et ressources de données incluses. Les licences Godot LICENSE/COPYRIGHT accompagnent l’export. Aucun paquet Windows ni dépôt privé n’est rendu public.

## Direction artistique Math et Déclic

À la demande de Raphaël, l’identité enfantine des sites d’origine est reprise dans leurs miniatures : palette papier/bleu/menthe/corail, mascotte Pixel, Nunito, bulles, missions et progression. La géométrie de Pixel, les couleurs et les titres sont vérifiables dans les deux sites publics cités ci-dessous.

Vérification publique le 3 novembre : https://declic-ados.pages.dev/ répond 200 et expose la même mascotte dans son HTML rendu. https://math-six-beta.vercel.app/ répond 200 avec le titre Déclic Math ; la capture initiale reste sur son écran de préparation, aussi le rendu complet Math n’est pas annoncé comme observé. Son identité est vérifiée dans les fichiers source et la feuille CSS. La mascotte n’est pas une image générée. Nunito est auto-hébergée via `@fontsource/nunito`, licence OFL-1.1, copie distribuée avec les ressources. Les encouragements et XP de la miniature sont adaptés et ne synchronisent aucun compte.

Contrôle complémentaire de provenance publique avant publication : les trois tracés du visage, des yeux et de la bouche dans `public/images/pixel.svg` correspondent exactement, espaces ignorés, à la fonction `mascot()` de la page publique https://declic-ados.pages.dev/ (HTTP 200). Les huit couleurs principales de l’habillage y sont également présentes. Le JavaScript public https://math-six-beta.vercel.app/app.js répond 200 et contient lui aussi la même géométrie de Pixel et le titre « Un calcul. ». La ressource et la direction visuelle ne révèlent donc pas une identité restée privée. SHA-256 du SVG local vérifié : `97c37e6a44c04fa34e6d64258482fa29de18aa9472402dc8c6ce15a049cc74f2`.

## Mini-labo Cisco — 4 novembre 2026

Le laboratoire du portfolio propose modes, aide, historique, collage et configuration pédagogique. Le modèle réduit du portfolio est écrit séparément pour un scénario fictif VLAN 10 / Fa0/1 / Fa0/2, sans autre donnée du dépôt.

Syntaxe publique de référence : [Configuration des VLAN, guide Cisco Catalyst](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3650/software/release/3se/vlan/configuration_guide/b_vlan_3se_3650_cg/b_vlan_3se_3650_cg_chapter_011.pdf) : `configure terminal`, `switchport mode access`, `switchport access vlan` et vérification des VLAN. Les réponses CLI du portfolio sont des explications simplifiées en français, sans prétendre reproduire intégralement une version IOS. Le test de communication part d’un PC simulé, pas d’un switch sans adresse IP. Les adresses 192.0.2.10 et 192.0.2.20 sont des exemples fictifs ; aucun paquet n’est transmis. Le guide exige la création du VLAN avant l’affectation, choix pédagogique explicitement indiqué si cette étape manque.

Fond cartographique du jeu : Natural Earth, contours terrestres du domaine public, selon la notice publique du projet d’origine. Les régions, populations et connexions restent fictives. La capture est celle du jeu exécuté, sans carte inventée pour le portfolio.

## Chapitres d’apprentissage — 4 novembre 2026

Textes introductifs rédigés pour le portfolio, distincts des cours complets des applications d’origine. Math : puissances à exposant entier à partir de 1, base, facteurs, carré/cube et recherche d’un exposant. Français : accord avec être pour les verbes non pronominaux, COD et avoir, analyse ciblée de « se laver les mains ». Chaque chapitre comprend une application corrigée et rejoint les trois défis déjà présents sans effacer leur progression.

Références pédagogiques consultées : [Éduscol, puissances au cycle 4](https://eduscol.education.gouv.fr/sites/default/files/document/ra16c4mathdocmaitrepuissancesnd555942pdf-77619.pdf), [Portail linguistique du Canada, participe passé avec être](https://nos-langues.canada.ca/fr/cles-de-la-redaction/participe-passe-avec-etre), [participe passé avec avoir](https://nos-langues.canada.ca/fr/cles-de-la-redaction/participe-passe-avec-avoir) et [Académie française, verbes pronominaux](https://www.dictionnaire-academie.fr/article/QDL069). Aucune page source recopiée. Les chapitres introduisent les exemples du portfolio et ne prétendent pas couvrir toutes les exceptions.

## Échec et Mat — 21 novembre 2026

Présentation vérifiée dans `PROJET.md` de la copie locale du projet à la révision `a4755d4`, également déployée sur Vercel lors de la vérification. Le portfolio ouvre [l’académie publique](https://echec-et-mat.vercel.app/) dans une fenêtre intégrée chargée à la demande. L’accès au parcours de leçons a été vérifié sur ordinateur et téléphone. La progression relève du site d’origine et des réglages de stockage du navigateur.
