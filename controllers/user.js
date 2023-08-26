const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require("../models");

const getUser = async (req = request, res = response) => {
    try {
        //paginacion de usuarios.  pregintar validacion para no recibir letras
        const { offset = 0, limit = 10 } = req.query;
        const queryStatus = { status: true };
    
        const [totalUsers, users] = await Promise.all([
            User.countDocuments(queryStatus),
            User.find(queryStatus)
            .skip(Number(offset))
            .limit(Number(limit))
        ]);
        
        res.json({
            totalUsers,
            users
        });
    } catch (error) {
        console.log('Error al consultar el usuario', error);
        res.status(500).json({
            error: 'Error al consultar el usuario'
        })
    }
}
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        res.json({
            menssage: 'Consultando Usuarios por Id.',
            idUser: id,
            user,
        });
    } catch (error) {
        console.log('Error al consultar el usuario por Id', error);
        res.status(500).json({
            error: 'Error al consultar el Usuario por Id'
        })
    }
}
const createUser = async (req, res) => {
    try {

        const { status, password, email, ...body } = req.body;

        //encriptar contraseña
        //genSaltSync: numero de vueltas de encriptacion.
        const salt = bcryptjs.genSaltSync();
        let passwordEncrypted = bcryptjs.hashSync(password, salt);
        const data = {
            ...body,
            password: passwordEncrypted,
            email
        }
        const user = new User(data);
        // esto guarda en la base de datos
        await user.save();

        res.json({
            menssage: 'Creando Usuario.',
            datos: data,
            user,
        });
    } catch (error) {
        console.log('Error al crear el usuario', error);
        res.status(500).json({
            error: 'Error al crear el Usuario'
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, google, password, email, status, ...body } = req.body;
        const data = {
            ...body
        }

        if ( password ) {
             const salt = bcryptjs.genSaltSync();
        let passwordEncrypted = bcryptjs.hashSync(password, salt);
        
        }

        const user = await User.findByIdAndUpdate(id, data, { new: true })

        res.json(user);
    } catch (error) {
        console.log('Error al editar el usuario', error);
        res.status(500).json({
            error: 'Error al editar el Usuario'
        })
    }


}
const deleteUser = async (req, res) => {
    try {
        const { id }= req.params;

        const data = {
            status: false,
        }
       
        const user = await User.findByIdAndUpdate(id, data, { new: false })

        res.json({
            menssage: 'Eliminar Usuario.',
            user,
        });
    } catch (error) {
        console.log('Error al eliminar el usuario', error);
        res.status(500).json({
            error: 'Error al eliminar el Usuario'
        })

    }

}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

}