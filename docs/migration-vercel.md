# Migration vers Vercel

Adresse demandée : `https://un-besoin-des-solutions.vercel.app`.
Titre : **Un besoin, Des solutions**.
Dépôt : `raphaelmounirprivate-dot/portfolio-raphael-mounir-`, branche `main`.

## Configuration préparée

- Framework Vite, installation `npm ci`, sortie `dist`.
- Construction : `python3 scripts/export-horizon.py --test && npm run build`.
- Le jeu est reconstruit depuis sa révision publique fixe, avec vérification des téléchargements et tests du moteur. Une compilation Vite seule laisserait le jeu absent.
- Site statique sans serveur, base relative conservée pour fonctionner à la racine Vercel et dans le sous-répertoire GitHub Pages.
- Aucun secret nécessaire à l’application ; `.vercel/`, fichiers d’environnement et caches exclus de Git et des envois locaux.

## Bascule

1. Autoriser le connecteur Vercel à accéder à l’espace `raphael-4462`.
2. Créer le projet `un-besoin-des-solutions` relié au dépôt GitHub. Confirmer l’attribution du sous-domaine : une réponse HTTP 404 seule ne garantit pas sa disponibilité.
3. Construire et vérifier le déploiement : accueil, titre, curseur, vague, six escales, chapitres et lancement réel de Pandemic Horizon.
4. Confirmer que l’adresse de production est publique et que les prochains envois GitHub alimentent ce projet.
5. Conserver GitHub Pages comme adresse de secours pendant cette validation.

## État au 4 novembre 2026

L’adresse demandée répond HTTP 404 `DEPLOYMENT_NOT_FOUND`. Le connecteur identifie l’espace `raphael-4462` depuis les projets existants, mais l’accès détaillé retourne HTTP 403 et requiert un consentement Vercel. Aucun projet ni sous-domaine n’a encore été attribué par cette migration.

Le titre a été remplacé dans l’onglet et l’écran d’entrée. Les 24 tests locaux d’accueil et de vague passent, ainsi que TypeScript et la compilation Vite. La construction complète du jeu sur Vercel reste à vérifier après création du projet.
