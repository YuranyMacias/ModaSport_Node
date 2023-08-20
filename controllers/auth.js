const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generarJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


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


const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {

        const { name, picture, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            // se tiene que crear el usuario.
            const data = {
                name,
                email,
                // hay un procedimiento para validar la contraseña anteriormente.
                password: ':)',
                img: picture,
                role: 'USER_ROLE',
                google: true
            };

            user = new User(data);
            await user.save();
        }

        //Si el usuario en BD tiene status:"false", se niega la autenticacion
        if (!user.status) {
            return res.status(401).json({
                message: 'Usuario bloqueado, comunicarse con el administrador.'
            });
        }

        // Generate the JWT
        const token = await generarJWT(user.id);

        res.json({
            message: 'Google token ',
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            message: 'El Token no se pudo verificar.'
        });
    }

}
module.exports = {
    login,
    googleSignIn
}