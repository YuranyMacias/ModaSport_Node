const { validationResult } = require('express-validator');

// next: es lo que tengo que llamar si el middleware pasa... es decir 
// si no cae en el errror, siga con el middleware o con el controlador. 
const validarCampos = (req, res, next) => {

    const errors = validationResult(req)
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();
}

module.exports = {
    validarCampos, 

}