const {  User, 
        Category, 
        Product,
        Gender,
        Season
    } = require('../models');

    
const Role = require('../models/role');


const isValidRole = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(` El rol  ${role} no esta registado en la BD `)
    }
}

const isValidEmail = async (email = '') => {
    //Verificar si el correo existe
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`El correo ${email},  ya esta registrado.`);
    }
}

// Existe usuario por ese Id.
const existsUserById = async (id) => {
    
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`El id no existe ${id} `);
    }
}

// Existe categoria por ese Id.
const existsCategoryById = async (id = '') => {
    const existsCategory = await Category.findById(id);

    if (!existsCategory) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}

// Existe producto por ese Id.
const existsProductById = async (id = '') => {
    const existsProduct = await Product.findById(id);

    if (!existsProduct) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}

// Existe genero por ese Id.
const existsGenderById = async (id = '') => {
    const existsGender = await Gender.findById(id);

    if (!existsGender) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}

// Existe temporada por ese Id.
const existsSeasonById = async (id = '') => {
    const existsSeason = await Season.findById(id);

    if (!existsSeason) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}

module.exports = {
    isValidRole,
    isValidEmail,
    existsUserById,
    existsCategoryById,
    existsProductById,
    existsGenderById,
    existsSeasonById,
}