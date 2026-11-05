# Terre et CV — intégration

Dans ce site Vite/TypeScript, `src/render.ts` produit le HTML. Le monogramme de la section `#a-propos` a seul été remplacé par :

```html
<div id="terre-cv"></div>
```

Dans `index.html`, après le lien du favicon :

```html
<link rel="stylesheet" href="%BASE_URL%terre-cv.css" />
```

Après le script existant `/src/main.ts`, avant `</body>` :

```html
<script defer src="%BASE_URL%terre-cv.js"></script>
```

Pour un HTML simple, remplacer `%BASE_URL%` par `./`. Le script attend le conteneur si le HTML est créé après son chargement. Les fichiers autonomes se trouvent dans `public/terre-cv.css` et `public/terre-cv.js`. Toutes les classes ajoutées commencent par `tcv-` et les styles sont limités à `#terre-cv`. Aucun style de body ni lien de navigation modifié.

Three.js 0.180.0 est chargé à la demande depuis jsDelivr, uniquement à la première apparition de la section. Textures issues des exemples officiels Three.js : `earth_atmos_2048.jpg`, `earth_normal_2048.jpg`, `earth_specular_2048.jpg`, `earth_lights_2048.png`, `earth_clouds_1024.png` depuis `https://threejs.org/examples/textures/planets/`. Copies locales pour éviter les requêtes de textures tierces en consultation. Lumière directionnelle solaire, normales de relief, reflet spéculaire des océans, émission urbaine masquée côté jour, nuages indépendants, atmosphère avec effet de bord. Rotation visuelle accélérée : un tour réel de 24 heures serait imperceptible. Inclinaison de 23,4°, rotation vers l’est.

Le PDF est une copie inchangée du document fourni `CV_Raphael_Mounir_digiSolidaire_final.pdf`, une page. L’aperçu PNG est rendu par Poppler depuis ce PDF et a été inspecté. Le clic ouvre cet aperçu dans un dialogue natif avec téléchargement du PDF original. Le document contient les coordonnées que l’utilisateur a demandé de publier avec son CV ; elles ne sont pas reproduites ailleurs. La publication GitHub/site a été explicitement demandée pour cet ajout.

Le glissement tourne la sphère ; l’auto-rotation reprend après 2,2 secondes. Les mouvements réduits arrêtent la rotation et les pulsations. IntersectionObserver et visibilité de l’onglet arrêtent le rendu hors écran. Un visuel statique conserve l’accès au CV si WebGL ou le CDN sont indisponibles. Le dialogue gère le focus, Échap et le retour au bouton ; aucune modification de `body` n’est nécessaire.
