
const  validarCampos  = require("../middlewares/validar-campos");
const  validateJWT  = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");

module.exports = {
    ...validarCampos,
    ...validateJWT,
    ...validateRoles,
}