const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");

const {
    Category,
    Product,
    User,
} = require("../models");
const product = require("../models/product");

const collectionsAuthorized = [
    'categories',
    'products',
    'productsByCategory',
    'roles',
    'users',
];


const searchCategories = async (query = '', res = response) => {
    const isMongoId = isValidObjectId(query);

    if (isMongoId) {
        const category = await Category.findById(query);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(query, 'i');

    const category = await Category.find({ name: regex, status: true });

    res.json({
        results: category
    });
}

const searchProducts = async (query = '', res = response) => {
    const isMongoId = isValidObjectId(query);

    if (isMongoId) {
        const product = await Category.findById(query)
            .populate('category', 'name');
        return res.json({
            results: ( product ) ? [product] : []
        });
    }

    const regex = new RegExp(query, 'i');

    const product = await Product.find({ name: regex, status: true })
                        .populate('category', 'name');
   
    res.json({
        results: product
    });
}






const searchUser = async (query = '', res = response) => {
    const isMongoId = isValidObjectId(query);

    if (isMongoId) {
        const user = await User.findById(query);
        res.json({

            //SI el usuario existe, se va a retornar un arreglo con el usuario. 
            // SI NO retorna arrglo vacio.
            results: (user) ? [user] : []
        })
    }

    //regex: expresion regular. patron de busqueda
    // i : insensible a mayusculas y minisculas.
    const regex = new RegExp(query, 'i');

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    res.json({
        results: users
    });

}



const search =( req = request, res = response) =>{

    const { collection, query } = req.params;

    if ( !collectionsAuthorized.includes( collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas: ${collectionsAuthorized}`
        })
    }

    switch (collection) {
        case 'categories':
            searchCategories(query, res);
            break;
        case 'products':
            searchProducts(query, res);
            break;
        case 'productsByCategory':
            searchProductsByCategory(query, res);
            break;
        case 'users':
            searchUser(query, res);
            break;
        default:
            res.status(500).json({
                message: `Olvidé hacer esta búsqueda ${collection}`
            });
            break;
    }

}


module.exports = {
    search
}