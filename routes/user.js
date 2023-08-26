const { Router } = require("express");
const { check } = require("express-validator");


const {
    validarCampos,
    validateJWT,
    isAdminRole,
    hasRole,
}  = require('../middlewares');

const { isValidRole, isValidEmail, existsUserById } = require("../helpers/db-validators");

const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

} = require("../controllers/user");
const router = Router();
// se espera tres parametros: 1- ruta, colita final 
//                            2- middelewares o validaciones: logeado, ni admin.. este bien.
//                             3- metodo del controlador (crear, editar..)
router.get('/', [
    validateJWT,
    isAdminRole,
],getUser)

router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsUserById),
    validarCampos
], getUserById)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('password', 'La contraseña debe ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(isValidEmail),
    // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE', 'SALES_ROLE']),

    check('role').custom(isValidRole),

    // al tener las validaciones hechas del check, ejecuta la de validar los errores, y luego si ejecuta el controlador.
    validarCampos
], createUser);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un Id valido').isMongoId(),
    validarCampos,
    check('id').custom(existsUserById),
    check('role').custom(isValidRole),
    validarCampos
], updateUser);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    //hasRole('ADMIN_ROLE','SALES_ROLE'),
    check('id', 'No es un Id valido').isMongoId(),
    validarCampos,
    check('id').custom(existsUserById),
    validarCampos
], deleteUser);

module.exports = router;