# rever.solutionsjustes.org
## Un microsite de campagne pour la clinique Solutions justes
Porteur de projet : MCM Mission Communautaire Montréal  
Licence : GNU GENERAL PUBLIC LICENSE

## Crédits :
Programmation et développement  web : Myriam Bizier / Myriade web  
Design graphique web : Republik & Manon Lecante  
Framework front-end : Gatsby/React  
Back-end: Wix CMS headless  
Librairies : GSAP, Glide

## Installation
- Récupérer le code source dans le repo GIT
- S'assurer que node.js et NPM sont installés sur la machine locale
- Dans un terminal : `npm install`

## Développement
- Terminal : `npm run develop`
- Dans un browser, la version en développement est disponible à l'adresse localhost:8000/
- Pour trouver la valeur du tri manuel de Wix (_manualsort...), console.log les données brutes, et la tri se trouve dans une propriété de chaque élément data.  

## Build
Pour tester le build en local, avant le déploiement
- Terminal : `npm run build`
- Terminal : `npm run serve`
Le site built est disponible sur l'url du serveur affiché dans le terminal

### Variables .env
Pour la récupération des données du back-end Wix, un fichier .env doit être créé manuellement à la racine du projet.
Attention!!
Les variables d'environnement doivent être préfixées de GATSBY_ pour les protéger côté serveur et éviter de les exposer côté browser. C'est important surtout pour le build au déploiement. Elles doivent être ajoutée manuellement en local dans le fichier .env.development sou la forme :
`GATSBY_MA_VARIABLE= 'valeur-de-ma-variable'`

## Déploiement
Push master branch to GitHub repo. It triggers a deployment script on Netlify
