const { Router } = require("express");
const { check } = require("express-validator");

const {
    validateJWT,
    validarCampos,
    isAdminRole,
    hasRole,
} = require("../middlewares");

const {
    createSeason,
    getSeasons,
    getSeasonById,
    updateSeason,
    deleteSeason
} = require("../controllers/season");

const { existsSeasonById } = require("../helpers/db-validators");



const router = Router();

/**
 * {{url}}/api/seasons
 */


router.get('/', getSeasons);

router.get('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsSeasonById),
    validarCampos
], getSeasonById);

router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos
], createSeason);

router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsSeasonById),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos
], updateSeason);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsSeasonById),
    validarCampos
], deleteSeason);


module.exports = router;