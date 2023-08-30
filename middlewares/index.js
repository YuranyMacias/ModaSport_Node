
const  validarCampos  = require("../middlewares/validar-campos");
const  validateJWT  = require("../middlewares/validate-jwt");
const  validateRoles = require("../middlewares/validate-roles");
const  validateUploadFiles = require('../middlewares/validate-upload-files');

module.exports = {
    ...validarCampos,
    ...validateJWT,
    ...validateRoles,
    ...validateUploadFiles
}