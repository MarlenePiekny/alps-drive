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
    console.log(transfPromise);
    return transfPromise;
};

/* //Retourne le contenu de "name"
const displayContent = (name) => {
    const promise = fs.readdir( path.join('/tmp/base/' , name), {withFileTypes:true});
    promise.then( (result) => {
        return result;
    }).catch( error => {
        console.log('Erreur pour afficher le dossier ou fichier: ', error)
    });
    return promise;
}; */

//Exporter chaque fonction
module.exports = {
    createFolder: createBaseFolder,
    listRootFolder: listRootFolder,

};