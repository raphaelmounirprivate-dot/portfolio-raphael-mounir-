# Validation locale du 3 novembre 2026

## Résultats exécutés

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

Le dossier est un dépôt Git local. Le connecteur GitHub a permis de lire le compte et les projets, mais ne fournit pas la création de dépôt. L’authentification Git enregistrée n’est pas accessible dans cette session, même après essai hors sandbox. L’ouverture UI du navigateur a expiré en attente d’autorisation. Le dépôt public portfolio-raphael-mounir- a ensuite été créé par Raphaël ; envoi en cours, déploiement non encore confirmé.

La création du dépôt public vide `portfolio-raphael-mounir-` a été demandée à Raphaël. Le workflow est prêt. La visibilité publique du nouveau portfolio est explicitement autorisée ; aucun dépôt existant n’a changé de visibilité. L’URL GitHub Pages n’est donc pas annoncée comme active.

## Limites

Pas de test sur appareil physique ni Safari/Firefox. Pas de capture du jeu fournie : visuel de remplacement identifié, aucun écran inventé. Aucun email ou LinkedIn ajouté. Le contenu reste visible si l’animation échoue. Le site applicatif exige JavaScript ; un message noscript renvoie au GitHub.
