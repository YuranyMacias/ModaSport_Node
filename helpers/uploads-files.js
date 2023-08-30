const path = require('path');
const { v4: uuidv4 } = require('uuid');
const extensionsValidForImages = ['png', 'jpg', 'jpeg', 'webp'];

//subir archivo.
const uploadsFiles = ( files, extensionsValid = extensionsValidForImages,  folderName = '' ) => {

    return new Promise((resolve, reject) => {

        const { file } = files; // file: archivo que se subió
        const nameCut = file.name.split('.')
        const extension = nameCut[nameCut.length - 1];

        //Validar la extension
        if (!extensionsValid.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, ${extensionsValids}`);
        }


        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/',  folderName, nameTemp);

        file.mv(uploadPath, (err) => {
            if (err) {
               return reject(err);
            }

            resolve( nameTemp );
        });
    });



}


module.exports = {
    uploadsFiles,
}