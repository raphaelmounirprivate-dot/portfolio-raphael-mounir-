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

Le dépôt public [portfolio-raphael-mounir-](https://github.com/raphaelmounirprivate-dot/portfolio-raphael-mounir-) a été créé par Raphaël puis alimenté par le connecteur GitHub. Le tiret final fait partie du nom réel et des chemins de publication. Commit du code : `bfdc1cc350d46999e2723598ddbda336d9fc73dd`. Les arbres local et distant correspondent exactement : `8391a3159311d33864f6d908620f18cdac35f202`, images incluses. La branche locale main a été synchronisée et suit origin/main ; l’ancien commit local reste sur local-before-publication.

Le [workflow 41704142105](https://github.com/raphaelmounirprivate-dot/portfolio-raphael-mounir-/actions/runs/41704142105) a réussi les tests Chromium, la compilation et l’envoi de l’artefact Pages. Le job deploy a échoué avec HTTP 404 : son journal demande d’activer GitHub Pages. Action attendue : Settings → Pages → Build and deployment → Source : GitHub Actions. Le connecteur ne propose pas ce réglage. Après activation, relancer le job échoué et contrôler le site public. L’URL publique n’est pas encore annoncée comme active. Aucun dépôt existant n’a changé de visibilité.

## Limites

Pas de test sur appareil physique ni Safari/Firefox. Pas de capture du jeu fournie : visuel de remplacement identifié, aucun écran inventé. Aucun email ou LinkedIn ajouté. Le contenu reste visible si l’animation échoue. Le site applicatif exige JavaScript ; un message noscript renvoie au GitHub.
