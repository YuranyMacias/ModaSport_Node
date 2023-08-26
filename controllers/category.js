const { response, request } = require("express");
const { Category } = require("../models");


const getCategory = async (req = request, res = response) => {
    try {
        
    const { offset = 0, limit = 10 } = req.query;
    const queryStatus = { status: true };

    const [totalCategories, categories] = await Promise.all([
        Category.countDocuments(queryStatus),
        Category.find(queryStatus)
            .populate('user', 'name')
            .skip(Number(offset))
            .limit(Number(limit))
    ]);

    res.json({
        totalCategories,
        categories
    });

    } catch (error) {
        console.log('Error al consultar la categoria', error);
        res.status(500).json({
            error: 'Error al consultar la categoria'
        })

    }
}


const getCategoryById = async (req = request, res = response) => {
    const { id } = req.params;

    const category = await Category.findById(id).populate('user', 'name');

    res.json(category);
}


const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const existsCategory = await Category.findOne({ name });

    if (existsCategory) {
        return res.status(400).json({
            message: `La categoría ${existsCategory.name} ya existe.`
        });
    }

    // Generar la data a guardar
    const data = {
        name,
        // debe ser un id de mongo.
        user: req.user._id
    }

    const category = new Category(data);
    await category.save();

    res.status(201).json(category);
}


const updateCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, user, ...body } = req.body;

    body.name = body.name.toUpperCase();
    body.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, body, { new: true })

    res.json(category);

}

const deleteCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const user = req.user._id;


    const category = await Category.findByIdAndUpdate(id, { status: false, user }, { new: true })

    res.json(category);



}

module.exports = {
    getCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}