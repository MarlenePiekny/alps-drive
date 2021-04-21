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
    drive.displayContent(req.params.name).then( (content) => {
        res.send(content);
    });
});