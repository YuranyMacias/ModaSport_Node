const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require('../middlewares/validar-campos');
const { uploadFile,
        updateImage, 
        getImage, 
        updateImageCloudinary } = require("../controllers/upload");
        
const { iscollectionsAuthorized } = require("../helpers");
const { validateUploadFiles } = require("../middlewares");

const collectionsAuthorized = ['users', 'products'];

const router = Router();

router.post( '/',validateUploadFiles, uploadFile);

router.put('/:collection/:id', [
    validateUploadFiles,
    check('id', 'No es un ID válido.').isMongoId(),
    check('collection').custom(c => iscollectionsAuthorized(c, collectionsAuthorized)),
    validarCampos
],updateImageCloudinary)
//],updateImage)

router.get('/:collection/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('collection').custom(c => iscollectionsAuthorized(c, collectionsAuthorized)),
    validarCampos
], getImage);

module.exports = router;
