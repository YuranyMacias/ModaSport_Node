const { Router } = require("express");

const { 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct, 
    createProduct, 
} = require("../controllers/product");

const router = Router();

router.get('/',  getProducts)

router.get('/:id', [], getProductById)

router.post('/', createProduct)

router.put('/:id',[], updateProduct)

router.delete('/:id',[], deleteProduct)


module.exports = router;