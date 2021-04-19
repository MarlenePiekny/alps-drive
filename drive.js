const fs = require('fs/promises');

//Créer un dossier de base
const createBaseFolder = () => {
    const promise = fs.mkdir('/tmp/base');
    promise.then( () => {
        console.log('Le fichier origine est créé :) ')
    }).catch( error => {
        console.log('Erreur de création du fichier de base : ', error)
    });
};

//Lister les fichiers à la racine du drive
const listFolderName = () => {
    const promise = fs.readdir('/tmp/base', {withFileTypes:true});
    promise.then( (result) => {
        return result;
    }).catch( error => {
        console.log('Erreur pour lister les fichiers : ', error)
    });
    return promise;
};

//Exporter chaque fonction
module.exports = {
    createFolder: createBaseFolder,
    listFolder: listFolderName,
};