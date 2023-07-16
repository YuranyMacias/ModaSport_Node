const { Router } = require("express");

const { getProducts, getProductById, updateProduct, editProduct, deleteProduct, } = require("../controllers/product");

const router = Router();

router.get('/',  getProducts)

router.get('/:id', [], getProductById)

router.post('/', [], updateProduct)

router.put('/:id',[], editProduct)

router.delete('/:id',[], deleteProduct)


module.exports = router;