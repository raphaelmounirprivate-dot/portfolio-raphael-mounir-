# Raphaël Mounir — D’une connexion à l’autre

Un portfolio français qui suit un signal dans la fibre, de **Mon Coach Sport** à **Pandemic Horizon**. Coif’heure est exclu à la demande de Raphaël. Les faits viennent du brief et de son GitHub ; les captures du jeu restent à fournir.

TypeScript strict, HTML, CSS, Vite. Site entièrement statique, sans compte ni backend. Thèmes clair/sombre selon le système, choix mémorisé localement, défilement libre, carte du voyage, vue d’ensemble et galerie accessible.

## Lancer le site

Node.js 22.12 ou 24 recommandé. Depuis ce dossier :

```powershell
npm install
npm run dev
```

Ouvrir **http://localhost:5173** (serveur lié à 127.0.0.1). Le port est strict : s’il est occupé, arrêter l’autre serveur ou changer explicitement la commande. Sous Windows, utiliser `npm.cmd` si PowerShell bloque npm.ps1.

Sur ce PC, Node portable est disponible dans `D:\mon app\.tools\node\node-v24.21.0-win-x64`. `Demarrer.cmd` utilise Node dans PATH, puis ce chemin de repli. Ce chemin local n’est pas nécessaire en CI.

```powershell
npm run check
npm run build
npx playwright install chromium
npm test
npm run test:production
npm run preview
```

La dernière commande sert la compilation sur http://localhost:4173. `test:production` compile et teste temporairement ce même port sous le sous-répertoire prévu pour Pages ; le port doit être libre. Pour conserver le navigateur de test dans le projet sous Windows : `$env:PLAYWRIGHT_BROWSERS_PATH="$PWD\.local\browsers"` avant son installation et les tests. Les captures de contrôle sont écrites dans `.local/`, exclu de Git.

## Ajouter une destination

Modifier uniquement `src/data/projects.ts` : ajouter un objet `Project` au tableau `projects`, avec un identifiant unique sans espace, son titre, type, univers, accroche, résumé, technologies vérifiées, captures, liens, couleur d’accent et statut. `story` est facultatif. Le trajet, les liens vers l’escale suivante, le mini-plan et la grille sont générés depuis cette source.

Ne pas ajouter une destination sans contenu. Ne pas déduire une technologie ou un résultat sans preuve. Pour un projet sans capture, utiliser `screenshots: []` : un aperçu à venir explicite apparaît. Pour un projet sans lien, utiliser `links: []`.

## Captures, textes et liens

Placer les images dans `public/images/`, idéalement WebP ou PNG compressé. Dans `screenshots`, utiliser le helper `asset('nom-image.png')`, un texte `alt` décrivant l’écran, une `caption` et les dimensions réelles `width` / `height`. Les images sont chargées en différé. La galerie accepte les boutons, les flèches du clavier et le balayage horizontal.

Modifier `summary`, `story`, `technologies` et `links` dans la même entrée. Les liens doivent être des URL HTTPS vérifiées. Le dépôt du sport contient les captures ; leur provenance exacte est conservée dans `docs/sources.md`. `node --use-system-ca scripts/fetch-assets.mjs` permet de retélécharger les trois originaux au commit fixé. Ne pas utiliser de captures d’un autre projet.

Le contact contient uniquement le GitHub demandé. Aucun email ou LinkedIn n’a été inventé ou repris des données privées du compte.

## Personnaliser les couleurs

Les variables `--bg`, `--surface`, `--text`, `--muted`, `--signal` et `--line` dans `src/style.css` définissent les deux thèmes. Modifier aussi `DESIGN.md` et `.impeccable/design.json` pour documenter le changement. Vérifier les contrastes dans les deux modes. Le mockup du sport conserve les couleurs de la capture réelle.

## Publier sur GitHub Pages

Le dépôt cible est **portfolio-raphael-mounir-**. Raphaël a autorisé sa visibilité publique le 3 novembre 2026 ; les autres dépôts ne doivent pas changer de visibilité.

1. Créer le dépôt public vide, sans README, sur le compte `raphaelmounirprivate-dot`.
2. Dans ce dossier, si aucun remote n’existe :

```powershell
git init -b main
git add .
git commit -m "Créer le portfolio au fil de la fibre"
git remote add origin https://github.com/raphaelmounirprivate-dot/portfolio-raphael-mounir-.git
git push -u origin main
```

3. Dans le dépôt, **Settings → Pages → Build and deployment → Source : GitHub Actions**. Relancer le workflow si nécessaire.
4. Le workflow `.github/workflows/pages.yml` vérifie TypeScript et les interactions dans trois formats, compile et publie `dist/`. Les pull requests exécutent les vérifications sans publier.
5. Attendre le succès de `deploy`, puis ouvrir l’URL fournie par GitHub et contrôler ressources, navigation, galerie et thème sur mobile et ordinateur.

Le [site public](https://raphaelmounirprivate-dot.github.io/portfolio-raphael-mounir-/) a été déployé et vérifié le 3 novembre 2026 : ressources, navigation, galerie, carte, vue d’ensemble et thèmes dans trois formats. Les détails et limites figurent dans `docs/validation.md`.

Le `base: './'` de Vite conserve des chemins relatifs pour le sous-répertoire GitHub Pages. Les sections utilisent des ancres, donc aucune réécriture de route n’est nécessaire. Pour mettre à jour : modifier, exécuter les tests, compiler, committer puis pousser sur `main`. Ne pas envoyer `.env`, `node_modules`, `.local` ou des données personnelles.

## Vérifications et limites

Voir `docs/validation.md` pour les contrôles réellement exécutés, `docs/sources.md` pour le contenu et `docs/skills.md` pour les outils préexistants. Une compilation locale ne prouve ni le push ni le déploiement public.
