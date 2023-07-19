const { Product } = require("../models");

const getProducts = async (req, res) => {
    try {
        // promise.all = ejecuta dos consultas al tiempo, cuando son consultas independientes la una de la otra.        
        // const respuestaDb = Promise;
        // const total = respuestaDb[0]
        // const products = respuestaDb[1]

        const [totalProducts, products] = await Promise.all([
            Product.countDocuments({ status: true }),
            Product.find({ status: true }),
        ])
        res.json({
            menssage: 'Consultando productos desde el controlador.',
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

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id)
        res.json({
            menssage: 'Consultando productos por id, desde controlador ',
            idProduct: id,
            product,
        });
    } catch (error) {
        console.log('Error al consultar el producto por id', error);
        res.status(500).json({
            error: 'Error al consultar el producto por id. '
        })
    }
}

const createProduct = async (req, res) => {
    try {
        const { status, user, ...body } = req.body;
        const data = {
            // user: 
            ...body
        }
        // una instancia al modelo producto
        const product = new Product(data);
        //guarda el producto en la base de datos
        await product.save();

        res.json({
            menssage: 'Creando producto... desde controlador',
            datos: data,
            product
        });
    } catch (error) {
        console.log('Error al crear el producto', error);
        res.status(500).json({
            error: 'Error al crear el producto. '
        })
    }
}

const updateProduct = async (req, res) => {

    try {
        //params = lo que va en la URL
        const id = req.params.id;
        const { status, user, ...body } = req.body;
        const data = {
            ...body
        }
        const product = await Product.findByIdAndUpdate(id, data, { new: true })

        res.json({
            menssage: 'Editar productos por id, desde controlador ',
            id,
            product,
        });
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

        const id = req.params.id;
        const data = {
            status: false
        }
        const product = await Product.findByIdAndUpdate(id, data, { new: false })

        res.json({
            menssage: 'Eliminar productos por id, desde controlador',
            id,
            product
        });
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