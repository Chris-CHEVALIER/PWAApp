###E-commerce et mobilité - TP noté

####Contexte

Dans le cadre de l'UCE "E-commerce et mobilité" j'ai réalisé une application simple simulant le concept marketing de **profiling** sur une ébauche de site de e-commerce.

Pour cela, j'ai utilisé le framework **Angular** afin de profiter de ses fonctionnalités les plus utiles tels que *TypeScript*, les *services-workers* ainsi que le concept de *Progressive Web App (PWA)*. 

####Installation

Afin de gérer correctement la gestion des notifications, mon projet et divisé en deux dossiers. Le premier (**PWAApp**) comporte le coeur de mon application web **Angular**, tandis que le second (**webServer**) comprend un serveur **Node** basique stockant une partie de la gestion des notifications que doit envoyer mon application à l'utilisateur.

Pour que l'application fonctionne correctement, il faudra, dans un premier temps, installer les dépendances des deux projets cités précédemment.
Pour cela, placez-vous dans chacun des dossiers depuis votre terminal et lancer la commande `npm i`.

Une fois les dépendances installées, vous pourrez démarrer le serveur **Node** en lançant la commande `node server.js`, toujours à l'intérieur du dossier correspondant.

Maintenant que le serveur a démarré, nous allons créer une build de production l'application **Angular** à l'aide de la commande `ng build --prod`.

L'application est maintenant déployée en production et va pouvoir communiquer avec le serveur **Node**. Il ne nous reste plus qu'à lancer l'application via la commande `http-server dist/MyAngularTest`.

Comme l'indique le terminal, l'application tourne désormais à l'adresse http://127.0.0.1:8080.

***Note :** Pour recevoir les notifications, il vous faudra utiliser un navigateur prenant en compte ces dernières comme **Google Chrome** ou encore **Mozilla Firefox**.
Par ailleurs, il faudra également vous assurer, dans les paramètres de votre navigateur, qu'il accepte cette fonctionnalité.
Enfin, n'oubliez pas de cliquer sur le bouton "**Autoriser**" lorsque la fenêtre de permission de notification apparaît à l'ouverture de la page web.*

####Fonctionnement

#####Produits stables

Comme vous pourrez le constater en vous rendant à l'adresse de l'application **Angular** (http://127.0.0.1:8080), les 30 produits stables apparaissent sur la page de l'internaute dès son ouverture.

#####Produits flottants

Après avoir sélectionné un premier produit en cliquant sur l'icône de caddie en bas à droite de ce dernier, les 10 produits flottants apparaissent en bas de page. Ils sont reconnaissables par leur box-shadow rouge.

En sélectionnant l'un d'entre eux, ce dernier prendra les caractéristiques du profil de l'utilisateur. De cette manière, si plusieurs profils le sélectionne, il se placera au niveau du *barycentre* de ces derniers.

#####Produits recommandés

Au bout de 3 produits sélectionnés,les recommandations apparaissent en haut de page. Il s'agit des 5 articles les plus proches du profil créé à partir de ses précédents clics.

#####Caractéristiques des produits

Au passage de la souris sur un article ses caractéristiques de *profiling* apparaissent. J'ai choisi d'en utiliser 7 pour catégoriser les internautes :
* Homme
* Femme
* CSP +
* CSP -
* Jeune
* Adulte
* Vieux

En passant la souris sur un produit flottant (en bas de page), ses caractéristiques apparaissent mais, contrairement aux produits stables, peuvent être modifiées. En validant les modifications apportées au produit, une notification apparaît explicitant la prise en compte de ces dernières.

####Progressive Web App

Grâce aux fonctionnalités proposées par **Angular**, mon application peut stocker en cache les données du site afin de les restituer en cas de perte de réseau. Ainsi, lorsque je n'ai plus de connexion Internet, je peux continuer à sélectionner des articles.

Cependant, les notifications ne peuvent plus être envoyées étant donnée qu'elle repose sur un serveur **Node** tournant en parallèle avec lequel l'application ne peut évidemment pas communiquer sans connexion Internet.