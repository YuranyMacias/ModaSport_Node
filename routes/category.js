const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT, 
        validarCampos, 
        isAdminRole,
        hasRole,
    } = require('../middlewares');


const { createCategory,
        getCategory, 
        getCategoryById, 
        updateCategory, 
        deleteCategory
    } = require("../controllers/category");

const { existsCategoryById } = require("../helpers/db-validators");


const router = Router();

// Obtener todas las categorias - publico
router.get('/',getCategory);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsCategoryById),
    validarCampos,
], getCategoryById );

//Crear categorias - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCategory );

// Actualizar -privado- cualquiera con token valido
router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsCategoryById),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], updateCategory);

// Borrar una categoria -Admin
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsCategoryById),
    validarCampos
], deleteCategory);


module.exports = router;