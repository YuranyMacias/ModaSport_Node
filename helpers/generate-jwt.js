const jwt = require('jsonwebtoken');


// uid: identificador unico del usuario.
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '5h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })


    })
}




module.exports = {
    generarJWT
}