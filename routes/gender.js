
const { Router } = require("express");
const { check } = require("express-validator");

const {
    validateJWT,
    isAdminRole,
    hasRole,
    validarCampos
} = require("../middlewares");

const {
    createGender,
    getGenders,
    getGenderById,
    updateGender,
    deleteGender
} = require("../controllers/gender");

const { existsGenderById } = require("../helpers/db-validators");


const router = Router();

/**
 * {{url}}/api/genders
 */

router.get('/', getGenders);

router.get('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsGenderById),
    validarCampos
], getGenderById);

router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos
], createGender);

router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsGenderById),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos
], updateGender);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsGenderById),
    validarCampos
], deleteGender);


module.exports = router;