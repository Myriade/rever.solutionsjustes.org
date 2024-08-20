# rever.solutionsjustes.org
## Un microsite de campagne pour la clinique Solutions justes
Code author : Myriam Bizier / Myriade web
Design : Republik & Manon Lecante
Front-end : Généré par Gatsby/React

## Installation
- Récupérer le code source dans le repo GIT nommé DEV sur le serveur d'hébergement
- S'assurer que node.js et NPM sont installés sur la machine locale
- Dans un terminal : `npm install`

## Développement
- Dans un terminal : `run npm develop`
- Dans un browser, la version en développement est disponible à l'adresse localhost:8000/

### Variables .env
Attention!!
Le variables d'environnement doivent être préfixées de GATSBY_ pour les protéger côté serveur et éviter de les exposer côté browser. C'est important surtout pour le build au déploiement.

## Déploiement
Push master branch to GitHub repo. It triggers a deployment script on Netlify
