const express = require('express');
const cors = require('cors');

const { PORT } = require('../config');
const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = PORT;

        this.paths = {
            products: '/api/products',
            users: '/api/users',
            auth: '/api/auth',
        }       
        
        this.connectDB();

        this.middelewares();

        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middelewares(){
        // cors: configuracion de permisos
         this.app.use(cors())

        // lectura y analisis de los datos recibidos
        this.app.use(express.json());
    }


    routes(){
        this.app.use(this.paths.products, require('../routes/product'))
        this.app.use(this.paths.users, require('../routes/user'))
        this.app.use(this.paths.auth, require('../routes/auth'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        })
    }

}
module.exports = Server;