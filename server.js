const drive = require('./drive');

//Eléments à déclarer pour le serveur de l'appli qui se fait via express sur le port 3000
const express = require('express');
const app = express();
const port = 3000;
const bb = require('express-busboy');

//Permettre l'upload de fichiers
bb.extend(app, {
    upload: true,
    path: drive.alpsDriveRoot,
    allowedPath: /./
});

//Route vers le dossier frontend, par défaut le premier fichier est index.html
app.use(express.static('frontend'));

//Le projet s'ecoute sur le port 3000 du localhost
app.listen(port, () => {
    console.log(`Alps Drive listening at http://localhost:${port}`);
});

/* ROUTES */

//Retourne une liste contenant les dossiers et fichiers à la racine du “drive”
app.get('/api/drive', (req, res) => {
    drive.displayContent()
    .then( (listRootFolder) => {res.status(200).json(listRootFolder)})
});

//Retourne le contenu de {name} adapté en fonction de sa catégorie un dossier ou un fichier
app.get('/api/drive/:name',(req, res) => {
    drive.displayContent(req.params.name)
    .then( (listFolder) => {res.status(200).send(listFolder)})
    .catch( () => {res.status(404).send("Ce nom de dossier n'existe pas")})
});

//Crée un dossier avec le nom {name}
app.post('/api/drive', (req, res) => {
    if (drive.isValid(req.query.name)) {
        drive.createFolder(req.query.name)
        .then( () => {res.status(201).send()})
    } else {
        drive.createFolder(req.query.name)
        .then( () => {res.status(400).send("Le nom doit être de type alphanumérique")})
    }
    drive.createFolder(req.query.name)
    .catch( (err) => {res.status(500).send(err)});
});

//Crée un dossier avec le nom {name} dans {folder}
app.post('/api/drive/:folder', (req, res) => {
    if (drive.isValid(req.query.name)) {
        drive.createFolder(req.query.name, req.params.folder)
        .then( () => {res.status(201).send()})
    } else {
        drive.createFolder(req.query.name, req.params.folder)
        .then( () => {res.status(400).send("Le nom doit être de type alphanumérique")})
    }
    drive.createFolder(req.query.name, req.params.folder)
    .catch( (err) => {res.status(500).send(err)});
});

//Supprime un dossier ou un fichier avec le nom {name}
app.delete('/api/drive/:name', (req, res) => {
    drive.deleteContent(req.params.name)
    .then( () => {res.send()})
});

//Supprime un dossier un fichier avec le nom {name} dans {folder}
app.delete('/api/drive/:folder/:name', (req, res) => {
    drive.deleteContent(req.params.name, req.params.folder)
    .then( (result) => { console.log('then', result); res.status(201).send()})
    .catch( (result) => { console.log('catch', result); res.status(404).send('Le fichier n\'existe pas')})
});

//Crée un fichier à la racine du drive
app.put('/api/drive', (req, res) => {
    drive.addFile(req.files.file)
    .then( (addedFile) => {res.status(201).send(addedFile) })
});

//Crée un fichier à la racine du drive
app.put('/api/drive/:folder', (req, res) => {
    drive.addFile(req.files.file, req.params.folder)
    .then( (addedFile) => {res.status(201).send(addedFile) })
});