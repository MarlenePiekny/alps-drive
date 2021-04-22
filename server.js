const drive = require('./drive');

//Eléments à déclarer pour le serveur de l'appli qui se fait via express sur le port 3000
const express = require('express');
const app = express();
const port = 3000;

//Route vers le dossier frontend, par défaut le premier fichier est index.html
app.use(express.static('frontend'));

//Le projet s'ecoute sur le port 3000 du localhost
app.listen(port, () => {
    console.log(`Alps Drive listening at http://localhost:${port}`);
});

//Retourne une liste contenant les dossiers et fichiers à la racine du “drive”
app.get('/api/drive', (req, res) => {
    drive.listRootFolder().then( (listFolder) => {
       res.json(listFolder);
    })
});

//Retourne le contenu de {name} adapté en fonction de sa catégorie un dossier ou un fichier
app.get('/api/drive/:name',(req, res) => {
    drive.displayContent(req.params.name)
    .then( (content) => {res.send(content)})
    .catch( () => {res.status(404).send("Ce nom de dossier n'existe pas")})
});

//Crée un dossier avec le nom {name}
app.post('/api/drive', (req, res) => {
    drive.createFolder(req.query.name)
    .then( (createdFolder) => {res.send(createdFolder)})
    .catch( () => { res.status(400).send("Le nom doit être de type alphanumérique")})
});

//Crée un dossier avec le nom {name} dans {folder}
app.post('/api/drive/:folder', (req, res) => {
    drive.createFolder(req.query.name, req.params.folder)
    .then( (createdFolder ) => {res.send(createdFolder)})
});

//Supprime un dossier ou un fichier avec le nom {name}
app.delete('/api/drive/:name', (req, res) => {
    drive.deleteContent(req.params.name)
    .then( () => {res.send()})
});

//Supprime un dossier un fichier avec le nom {name} dans {folder}
app.delete('/api/drive/:folder/:name', (req, res) => {
    drive.deleteContent(req.params.name, req.params.folder)
    .then( () => {res.status(201).send()})
});