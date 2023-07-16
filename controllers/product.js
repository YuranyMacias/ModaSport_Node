const getProducts = (req, res)=>{

    res.json({
        menssage:'Consultando productos desde el controlador.'
    } );
}

const getProductById = (req, res) => {
    const id = req.params.id;
    res.json({
        menssage:'Consultando productos por id, desde controlador ',
        idProduct: id
    } );
}

const updateProduct = (req, res) => {
    const data = req.body;
    res.json({
        menssage:'Creando producto... desde controlador',
        datos: data,
        data: data
    } );
}

const editProduct = (req, res)=>{
    const id = req.params.id;
    res.json({
        menssage:'Editar productos por id, desde controlador ',
        id
    } );
}

const deleteProduct = (req, res)=>{
    const id = req.params.id;
    res.json({
        menssage:'Eliminar productos por id, desde controlador',
        id
    });
}

module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    editProduct,
    deleteProduct

}