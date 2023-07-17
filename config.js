require('dotenv').config();

const PORT = process.env.PORT || 4000;

const MONGODB_CNN = process.env.MONGODB_CNN;

module.exports = {
    PORT, 
    MONGODB_CNN
}