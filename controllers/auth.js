const { response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user');

const { generarJWT } = require('../helpers/generate-jwt');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar si el gmail existe.
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / password no son correstos -email'
                // esto es si no existe el correo.
            });
        }

        // verificar usuario activo en BD.
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario / password no son correstos -estado: false'
                // esto es si no existe el correo.
            });
        }

        //Verificar contraseña
        //bcryptjs.compareSync()-- compara la contraseña con la contraseña de BD. 

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correstos - password'
            });
        }
        //Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
           user,
           token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }

}


module.exports = {
    login
}