const fs = require('fs/promises');
const path = require('path');

//Déclaration de la route de base en dur
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

//Lister les dossiers selon leur nom {name}
const listFolder = (folder = '') => {
    let promise = fs.readdir(path.join(alpsDriveRoot, folder), { withFileTypes: true });
    const transfPromise = promise
        .then((result) => {
            const tab = [];
            result.map((element) => {
                const promiseStat = fs.stat(path.join(alpsDriveRoot, folder, element.name));
                const promiseFileStat = promiseStat.then((statFile) => {
                    return statFile;
                });
                tab.push(
                    {
                        name: element.name,
                        size: promiseFileStat.size,
                        isFolder: element.isDirectory()
                    }
                )
            });
            return tab;
        })
        .catch((error) => {
            console.log('Erreur pour lister les fichiers et dossiers : ', error)
        });
    return transfPromise;
};

//Lire le fichier selon son nom {name}
const readFile = (file) => {
    const promise = fs.readFile(path.join(alpsDriveRoot, file), { encoding: "utf-8" });
    const transfPromise = promise
        .then((result) => {
            return result;
        })
    return transfPromise;
};

//Retourne le contenu de {name}
const displayContent = (name = '') => {
    const promiseDisplay = fs.stat(path.join(alpsDriveRoot, name))
        .then((result) => {
            if (result.isDirectory()) {
                //retourne le contenu du dossier
                console.log(`Le dossier ${name} est lu`);
                return listFolder(name);
            } else if (result.isFile()) {
                //lit le fichier
                console.log(`Le fichier ${name} est lu`);
                return readFile(name);
            } else {

            };
        });
    return promiseDisplay;
};

//Crée un dossier avec le nom {name}
const createFolder = (name, folder = "") => {
        const promiseCreatedFolder = fs.mkdir(path.join(alpsDriveRoot, folder, name))
            .then((result) => {
                console.log(`Création dossier ${name}`);
                return result;
            })
            .catch((error) => {
                console.log(`Le fichier ${name} n'a pas pu être créé : ${error}`);
            });
        return promiseCreatedFolder;
    };

    //Vérifier si le nom du fichier est valide avec une RegEx
    const isValid = (name) => {
        return /^[a-zA-Z1-9 ]*$/.test(name);
    }

    //Supprime un dossier ou un fichier avec le nom {name}
    const deleteContent = (name, folder = "") => {
        const promiseDeleteContent = fs.rm(path.join(alpsDriveRoot, folder, name), { recursive: true })
        console.log(promiseDeleteContent);
        return promiseDeleteContent;
    };


    //Ajoute un fichier à la racine du drive
    const addFile = (fileToUpload, folder = '') => {

        //copie le fichier qui est créé temporairement
        const promiseAddFile = fs.copyFile(fileToUpload.file, path.join(alpsDriveRoot, folder, fileToUpload.filename))

        //supprime le fichier qui est créé temporairement
        deleteContent(fileToUpload.uuid);
        return promiseAddFile;

    };

    //Exporter chaque fonction
    module.exports = {
        createFolder: createBaseFolder,
        displayContent: displayContent,
        isValid: isValid,
        createFolder: createFolder,
        deleteContent: deleteContent,
        addFile: addFile,
        alpsDriveRoot: alpsDriveRoot,
    };