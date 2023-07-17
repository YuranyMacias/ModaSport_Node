const mongoose = require('mongoose')
const { MONGODB_CNN } = require('../config')

const dbConnection = async() => {
    try {
        await mongoose.connect(MONGODB_CNN)
        console.log('Base de datos conectada');
    } catch (error) {
        throw new Error('Error conectando la base de datos: '+ error.message)
    }
}

module.exports = {
    dbConnection
}