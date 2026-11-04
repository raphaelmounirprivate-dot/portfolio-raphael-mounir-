# Sources et provenance

Lecture du brief fourni et du GitHub connecté le 3 novembre 2026. Les anciennes notes ont seulement orienté la recherche ; le contenu du site a été vérifié dans les sources courantes.

- Identité, formation télécom, fibre/cuivre, Namur, accroche : brief de Raphaël.
- [Mon Coach Sport, README](https://github.com/raphaelmounirprivate-dot/full-body/blob/77cdb91722109e80051a7cd99008b9cb47917e15/README.md) : application personnelle Full Body, Kotlin, Compose, Room, DataStore, fonctionnement hors ligne. Pas d’apprentissage ou de résultat inventé.
- Captures réelles, même commit : `docs/screenshots/refonte-accueil-sombre.png`, `refonte-seance-repos.png`, `refonte-progression.png`. Copiées sous `public/images/sport-*.png`, dimensions 432 × 936. Données de démonstration selon le README. La refonte est postérieure à l’APK optimisé 0.9.1 ; le lien de téléchargement désigne explicitement la version 0.9.1, sans prétendre que cet APK contient cette refonte.
- [Pandemic Horizon, README](https://github.com/raphaelmounirprivate-dot/pandemic-horizon/blob/main/README.md) : jeu original en français et hors ligne pour Windows, 24 régions et statut expérimental. Arbre source inspecté : scripts GDScript et projet Godot. Aucune capture image dans l’arbre consulté ; mini-simulation interactive adaptée, explicitement distincte du jeu complet. Aucun exécutable présenté comme publié.
- GitHub connecté : sept dépôts accessibles. Les dépôts privés ne sont pas liés dans ce portfolio. Des descriptions et exercices des projets privés ont ensuite été adaptés à la demande de Raphaël, sans donnée personnelle.
- Coif’heure : retiré après instruction explicite de Raphaël.
- Police Outfit auto-hébergée via `@fontsource/outfit`, licence OFL-1.1 (voir le paquet).
- Fibre et orbites : géométrie SVG/CSS originale du portfolio, aucune fausse capture.

Aucune coordonnée de contact issue de l’authentification GitHub n’est publiée. La nouvelle version ne renvoie plus vers GitHub : les actions restent dans le portfolio.

## Six démos intégrées — 3 novembre 2026

Les README des quatre projets ajoutés ont été relus sur GitHub. Les dépôts gardent leur visibilité ; seules des descriptions et de petites adaptations pédagogiques autorisées sont reprises. Aucun compte, secret, historique ou fichier financier importé.

- Télécom & Réseau : `Telecom-R-seau/README.md` et `api/src/practice-questions.ts`, cas PoE de 100 W / trois bornes de 20 W / caméra de 15 W, puis limite du port et diagnostic IP. Trois questions adaptées, corrections conservées.
- Mon App : `mon-App/README.md`, règles du disponible et du paiement d’une facture. Exemple créé pour la démo : 1 200 € de solde, 80 € de facture, 200 € d’épargne réservée. Tous ces montants sont fictifs. Calcul en centimes entiers, facture déduite une seule fois.
- Math : `Math/src/course.ts`, leçon 1, questions 4³, 5² et 2ⁿ = 32. Conversion en QCM pour l’extrait, réponses et étapes conservées.
- Déclic Ados : `decilc-ados/index.html`, exercices e1, a3 et p3. Phrases, réponses et explications conservées ou légèrement raccourcies.
- Sport : suivi de deux séries et repos, adaptés des fonctions documentées. 40 kg / 12 répétitions sont des réglages fictifs, modifiables dans la démo. Aucun entraînement réel prescrit ou enregistré.
- Pandemic Horizon : miniature du principe de propagation, des choix de mobilité/discrétion et de la course au remède. Le graphe à six nœuds, la progression et les pourcentages sont inventés pour cet extrait et clairement présentés comme simplifiés. Ce code ne prétend pas reproduire les 24 régions ni l’équilibrage du moteur Godot.

## Direction artistique Math et Déclic

À la demande de Raphaël, l’identité enfantine des sites d’origine est reprise dans leurs miniatures : palette papier/bleu/menthe/corail, mascotte Pixel, Nunito, bulles, missions et progression. Sources relues : `Math/public/declic.css`, fonction `pixel()` de `Math/web/app.ts`, CSS et fonction `mascot()` de `decilc-ados/index.html`. La géométrie de Pixel est la même dans ces deux fonctions ; elle est conservée dans `public/images/pixel.svg`.

Vérification publique le 3 novembre : https://declic-ados.pages.dev/ répond 200 et expose la même mascotte dans son HTML rendu. https://math-six-beta.vercel.app/ répond 200 avec le titre Déclic Math ; la capture initiale reste sur son écran de préparation, aussi le rendu complet Math n’est pas annoncé comme observé. Son identité est vérifiée dans les fichiers source et la feuille CSS. La mascotte n’est pas une image générée. Nunito est auto-hébergée via `@fontsource/nunito`, licence OFL-1.1, copie distribuée avec les ressources. Les encouragements et XP de la miniature sont adaptés et ne synchronisent aucun compte.

Contrôle complémentaire de provenance publique avant publication : les trois tracés du visage, des yeux et de la bouche dans `public/images/pixel.svg` correspondent exactement, espaces ignorés, à la fonction `mascot()` de la page publique https://declic-ados.pages.dev/ (HTTP 200). Les huit couleurs principales de l’habillage y sont également présentes. Le JavaScript public https://math-six-beta.vercel.app/app.js répond 200 et contient lui aussi la même géométrie de Pixel et le titre « Un calcul. ». La ressource et la direction visuelle ne révèlent donc pas une identité restée privée. SHA-256 du SVG local vérifié : `97c37e6a44c04fa34e6d64258482fa29de18aa9472402dc8c6ce15a049cc74f2`.

## Mini-labo Cisco — 4 novembre 2026

Le périmètre du laboratoire d’origine a été vérifié dans `Telecom-R-seau/docs/CISCO.md` : modes, aide, historique, collage et configuration pédagogique. Le moteur original privé n’est pas copié. Le modèle réduit du portfolio est écrit séparément pour un scénario fictif VLAN 10 / Fa0/1 / Fa0/2, sans autre donnée du dépôt.

Syntaxe publique de référence : [Configuration des VLAN, guide Cisco Catalyst](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3650/software/release/3se/vlan/configuration_guide/b_vlan_3se_3650_cg/b_vlan_3se_3650_cg_chapter_011.pdf) : `configure terminal`, `switchport mode access`, `switchport access vlan` et vérification des VLAN. Les réponses CLI du portfolio sont des explications simplifiées en français, sans prétendre reproduire intégralement une version IOS. Le test de communication part d’un PC simulé, pas d’un switch sans adresse IP. Les adresses 192.0.2.10 et 192.0.2.20 sont des exemples fictifs ; aucun paquet n’est transmis. Le guide exige la création du VLAN avant l’affectation, choix pédagogique explicitement indiqué si cette étape manque.
