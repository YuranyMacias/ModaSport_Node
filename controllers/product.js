const { request, response } = require("express");
const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
    try {
        // promise.all = ejecuta dos consultas al tiempo, cuando son consultas independientes la una de la otra.        
        // const respuestaDb = Promise;
        // const total = respuestaDb[0]
        // const products = respuestaDb[1]
        const { offset = 0, limit = 100 } = req.query;
        const queryStatus = { status: true };
    
        const [totalProducts, products] = await Promise.all([
            Product.countDocuments(queryStatus),
            Product.find(queryStatus)
                .populate('user', 'name')
                .populate('category', 'name')
                .populate('season', 'name')
                .populate('gender', 'name')
                .skip(Number(offset))
                .limit(Number(limit))
        ]);
        res.json({
            totalProducts,
            products
        });
    } catch (error) {
        console.log('Error al consultar el producto', error);
        res.status(500).json({
            error: 'Error al consultar el producto. '
        })
    }
}

const getProductById = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name')

        res.json( product );

    } catch (error) {
        console.log('Error al consultar el producto por id', error);
        res.status(500).json({
            error: 'Error al consultar el producto por id. '
        })
    }
}

const createProduct = async (req = request, res = response) => {
    try {
        const { status, user, name , ...body } = req.body;
        const nameUpperCase = name.toUpperCase();
    
        const existsProduct = await Product.findOne({ name: nameUpperCase });
    
        if (existsProduct) {
            return res.status(400).json({
                message: `El producto ${existsProduct.name} ya existe.`
            });
        }
    
        const data = {
            name: nameUpperCase,
            user: req.user._id,
            ...body
        }

        // una instancia al modelo producto
        const product = new Product(data);
        //guarda el producto en la base de datos
        await product.save();

        res.status(201).json(product);

    } catch (error) {
        console.log('Error al crear el producto', error);
        res.status(500).json({
            error: 'Error al crear el producto. '
        })
    }
}

const updateProduct = async (req= request, res = response) => {

    try {
        //params = lo que va en la URL
        const { id } = req.params;
        const {  status, user, ...body } = req.body;
        
        const data = {
            user: req.user._id,
            ...body
        }
        //toUpperCase : coloca el nombre en mayuscula.
        if ( body.name ) {
            body.name = data.name.toUpperCase();
        }
    
    
        const product = await Product.findByIdAndUpdate(id, data, { new: true });
        res.json(product);
    
    } catch (error) {
        console.log('Error al editar un producto', error);
        res.status(500).json({
            error: 'Error al editar un  producto. '
        })

    }
}

const deleteProduct = async (req, res) => {
    try {
        // no se elimina el registro, para mantener la integridad de la base de datos.
        // el registro se actualiza el estado a falso para que no se muestre mas.
        // pero sigue existiendo para mostrar facturas antigias.

        const { id } = req.params;
        const user = req.user._id;

        const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

        res.json(product);
        
    } catch (error) {
        console.log('Error al eliminar un producto', error);
        res.status(500).json({
            error: 'Error al eliminar un  producto. '
        })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct

}