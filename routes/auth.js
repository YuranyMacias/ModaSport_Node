const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos }= require('../middlewares/validar-campos');
const { login } = require('../controllers/auth');


const router = Router();


router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    //.not().isEmpty() : no se le va a dar pista a la persona como luce nuestra contraseña.
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

module.exports = router;

