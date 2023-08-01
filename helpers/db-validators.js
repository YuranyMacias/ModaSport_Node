const Role = require('../models/role');
const User = require('../models/user')

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

const existsUserById = async (id) => {
    
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`El id no existe ${id} `);
    }
}

module.exports = {
    isValidRole,
    isValidEmail,
    existsUserById,
}