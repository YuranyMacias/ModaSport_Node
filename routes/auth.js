const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require('../middlewares/validar-campos');


const { login, googleSignIn } = require('../controllers/auth');


const router = Router();


router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    //.not().isEmpty() : no se le va a dar pista a la persona como luce nuestra contraseña.
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'id_token  es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);


module.exports = router;

