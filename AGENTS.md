# Instructions du projet

## Gestion adaptative de l’effort
Utiliser le niveau minimal fiable : simple et local au minimum, plusieurs fichiers en Medium, architecture/sécurité/logique complexe en High. XHigh/Max uniquement si nécessaire. Réduire après résolution. Exécuter les tests pertinents et contrôler les régressions avant livraison.

## Règles de développement
- **KISS** : choisir la solution la plus simple qui répond au besoin.
- **Séparation des responsabilités** : distinguer données, affichage, navigation, animations et gestion du thème.
- **Clean code** : noms explicites, fonctions courtes, pas de duplication ni de code mort.
- **Commentaires en français**, seulement lorsqu’ils expliquent une intention ou un comportement non évident.
- TypeScript strict et types explicites pour les données des projets.
- Pas d’architecture MVC artificielle pour ce site statique.
- Pas de dépendances ajoutées sans utilité concrète.
- Respecter l’accessibilité, le responsive et les préférences de réduction des animations.
- Préserver le travail existant et ne jamais écraser de modifications sans les examiner.

## Commandes
`npm install`, `npm run dev` (http://localhost:5173), `npm run build`, `npm run preview`, `npm run check`, `npm test` (tests navigateur ; installer Chromium avec `npx playwright install chromium` si nécessaire), `npm run test:production` (compilation et contrôle sous-répertoire sur le port 4173 libre). Sous PowerShell si l’exécution npm.ps1 est interdite, utiliser npm.cmd.

## Contenu et publication
Les destinations, le mini-plan et la vue d’ensemble proviennent de src/data/projects.ts. Les faits viennent du brief et des README vérifiés ; voir docs/sources.md. Aucun secret, donnée financière ou historique personnel. Ne jamais publier de dépôt privé ni changer sa visibilité sans autorisation. Dépôt cible : portfolio-raphael-mounir-.

## Skills installés
Les sept skills sont préexistants dans le catalogue de cette session et détectés, sans réinstallation ni mise à jour. Les empreintes locales et sources sont consignées dans docs/skills.md. Aucun installateur distant exécuté.

| Nom | Source vérifiée | Fonction et utilisation |
| --- | --- | --- |
| UI UX Pro Max | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | Responsive et accessibilité pendant l’implémentation |
| Design Taste Frontend | https://github.com/Leonxlnx/taste-skill | Composition du portfolio au cadrage |
| GPT Taste | https://github.com/Leonxlnx/taste-skill | Consulté ; contraintes de scroll imposé et GSAP écartées en faveur du brief |
| Humanizer | https://github.com/blader/humanizer | Relecture des textes français |
| Impeccable | https://github.com/pbakaus/impeccable | Hiérarchie, états, vérification finale ; version locale 4.5.0 |
| Stop Design Slop | https://github.com/Juuzoe/stop-design-slop | Identité cohérente et suppression des contenus artificiels |
| Graphify | https://github.com/Graphify-Labs/graphify | Consulté ; graphe non généré pour ce petit projet neuf |

## Skills non installés
Aucun ajout nécessaire. Les versions locales sans numéro explicite sont identifiées par SHA-256, sans prétendre correspondre au dernier commit amont. La mise à jour des outils globaux reste hors de cette livraison.
