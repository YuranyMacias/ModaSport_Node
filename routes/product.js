const { Router } = require("express");
const { check } = require("express-validator");

const { 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct, 
    createProduct, 
} = require("../controllers/product");


const { existsProductById, 
        existsCategoryById, 
        existsGenderById,
        existsSeasonById
    } = require("../helpers/db-validators");


const { validateJWT, 
        validarCampos,
        isAdminRole,
        hasRole,
    } = require("../middlewares");

const router = Router();

router.get('/',  getProducts)

router.get('/:id', [ 
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsProductById),
    validarCampos,
], getProductById)

router.post('/',[
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('description', 'La descripción es obligatorio.').not().isEmpty(),
    check('reference', 'La descripción es obligatorio.').not().isEmpty(),
    check('category', 'La categoría es obligatoria.').not().isEmpty(),
    check('category', 'Categoría no es un ID válido.').isMongoId(),
    check('gender', 'El genero es obligatorio.').not().isEmpty(),
    check('gender', 'Genero no es un ID válido.').isMongoId(),
    check('season', 'La temporada es obligatoria.').not().isEmpty(),
    check('season', 'Temporada no es un ID válido.').isMongoId(),
    validarCampos,
    check('size', 'Las tallas son obligatorias.').not().isEmpty(),
    check('size').isArray().withMessage('Las tallas debe ser un arreglo'),
    validarCampos,
    check('color', 'Los colores son obligatorias.').not().isEmpty(),
    check('color').isArray().withMessage('Los colores debe ser un arreglo'),
    validarCampos,
    check('brand', 'La marca es obligatoria.').not().isEmpty(),
    check('category').custom(existsCategoryById),
    check('gender').custom(existsGenderById),
    check('season').custom(existsSeasonById),
    check('reference', 'La referencia es obligatoria.').not().isEmpty(),
    validarCampos,
], createProduct)

router.put('/:id',[
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsProductById),
    check('category', 'Categoría no es un ID válido.').optional().isMongoId(),
    validarCampos,
    check('category').optional().custom(existsCategoryById),
    validarCampos
], updateProduct)

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos,
    check('id').custom(existsProductById) ,
    validarCampos
], deleteProduct)


module.exports = router;