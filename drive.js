const fs = require('fs/promises');
const path = require('path');

const alpsDriveRoot = path.join('/tmp', 'base');

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
    let promise = fs.readdir(alpsDriveRoot, { withFileTypes: true });
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
    let promise = fs.readdir(path.join(alpsDriveRoot, folder), { withFileTypes: true });
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
        .catch( (error) => {
            console.log('Erreur pour lister les fichiers et dossiers : ', error)
        });
    return transfPromise;
};

//Lire le fichier selon son nom
const readFile = (file) => {
    const promise = fs.readFile(path.join(alpsDriveRoot,file), { encoding: "utf-8" });
    const transfPromise = promise
        .then((result) => {
            return result;
        })
    return transfPromise;
};

//Retourne le contenu de "name"
const displayContent = (name) => {
    const promiseDisplay = fs.stat(path.join(alpsDriveRoot, name))
        .then((result) => {
            if (result.isDirectory()) {
                //retourne le contenu du dossier
                return listFolder(name);
            } else if (result.isFile()) {
                //lire le fichier
                return readFile(name);
            } else {

            };   
        });
    return promiseDisplay;
};

//Crée un dossier avec le nom {name}
const createFolder = (name, folder="") => {
    const promiseCreatedFolder = fs.mkdir(path.join(alpsDriveRoot,folder, name))
    .then( (result) => {
        console.log(`Création dossier ${name}`);
        return result;
        })   
    .catch( (error) => {
        console.log("Erreur sur la fonction createFolder " + error);
        });   
    return promiseCreatedFolder;     
};

//Vérifier si le nom du fichier est valide avec une RegEx
const checkName = (name) => {
    return /^[a-zA-Z1-9 ]*$/.test(name);
}

//Supprime un dossier ou un fichier avec le nom {name}
const deleteContent = (name) => {
    const promiseDeleteContent = fs.rm(path.join(alpsDriveRoot, name), {force:true, recursive:true})
    .then( (result) => {
        console.log(`Le dossier ou fichier ${name} a été supprimé`);
        return result; 
    })
    .catch( (error) => {
        console.log("Erreur sur le fonction deleteContent : " + error);
    })
    return promiseDeleteContent;
};

//Exporter chaque fonction
module.exports = {
    createFolder: createBaseFolder,
    listRootFolder: listRootFolder,
    displayContent: displayContent,
    createFolder: createFolder,
    deleteContent: deleteContent
};