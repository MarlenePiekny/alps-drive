const fs = require('fs/promises');

//Créer un dossier de base
const createBaseFolder = () => {
    const promise = fs.mkdir('/tmp/base');
    promise.then(() => {
        console.log('Le fichier origine est créé :) ')
    }).catch(error => {
        console.log('Erreur de création du fichier de base : ', error)
    });
};

//Lister les fichiers à la racine du drive
const listRootFolder = () => {
    let promise = fs.readdir('/tmp/base', { withFileTypes: true });
    const transfPromise = promise
        .then((result) => {
            const tab = [];
            result.map((element) => {
                tab.push(
                    {
                        name: element.name,
                        isFolder: element.isDirectory()
                    }
                )
            });
        return tab;    
        })
        .catch(error => {
            console.log('Erreur pour lister les fichiers et dossiers : ', error)
        });
    return transfPromise;
};

//Lister les fichiers selon leur nom
const listFolder = (folder) => {
    let promise = fs.readdir('/tmp/base/' + folder, { withFileTypes: true });
    const transfPromise = promise
        .then( (result) => {
            const tab = [];
            result.map((element) => {
                tab.push(
                    {
                        name: element.name,
                        isFolder: element.isDirectory()
                    }
                )
            });
        return tab;    
        })
        .catch(error => {
            console.log('Erreur pour lister les fichiers et dossiers : ', error)
        });
    return transfPromise;
};

//Lire le fichier selon son nom
const readFile = (file) => {
    const promise = fs.readFile('/tmp/base/' + file, {encoding: "utf-8"});
    const transfPromise = promise
    .then( (result) => {
        console.log(result);
        return result;
    })
    return transfPromise;
};

//Retourne le contenu de "name"
const displayContent = (name) => {
    const promiseDisplay = fs.stat('/tmp/base/' + name)
    .then( (result) => {
        if (result.isDirectory() ){
            //retourne le contenu du dossier
            return listFolder(name);
        } else if (result.isFile() ) {
            //lire le fichier
            return readFile(name);
        } else {
            
        };
    });
return promiseDisplay;
};

//Exporter chaque fonction
module.exports = {
    createFolder: createBaseFolder,
    listRootFolder: listRootFolder,
    displayContent: displayContent
};