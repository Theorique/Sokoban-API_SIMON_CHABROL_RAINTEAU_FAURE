# Sokoban-API_SIMON_CHABROL_RAINTEAU_FAURE

## Utilisation de l'API

#### Listes des éléments
Exemple de route : http://localhost:3001/boards
Cette route permet de liste les tableaux (sans leurs lignes)
Il existe aussi la route rows

#### Récupération d'un tableau
Exemple de route : http://localhost:3001/boards/simple
Cette route permet de récuérer les infos du tableau avec le board_id = "simple"
informations récupérées : 
{ board_id, name, nbRows, nbCols, text:(description des lignes du tableau)}

#### Création d'élément

route : /boards/add (en post)

Paramètres nécessaires :
- boardId : Id du tableau (ex:'simple');
- name : Nom du tableau (ex:'A Simple Board');
- nbRows : Nombre de lignes;
- nbCols : Nombre de colonnes;
- rows : Tableau de String contenant les lignes du tableaux (ex : ["##########","#x.x#....#","#...CC.P.#","#........#","#########"]) 

## Pour utiliser l'API en local

Pré requis :
- Avoir Docker
- Avoir node d'installé (Version de node utilisé dans le projet : v18.12.1)

Après avoir cloné le dépot : 
- Lancer Docker sur votre ordinateur si vous êtes sur windows,
- Lancer la commande suivante :
```js
npm run init-db
```
Elle va créer le docker qui va contenir la base de données
/!\ si la base de donnée est déjà crééé il faut utiliser cette commande :
```js
npm run start-db
```
