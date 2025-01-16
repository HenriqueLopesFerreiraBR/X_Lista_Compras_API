// config/env.js
require('dotenv').config();

// database/db.js
const mongoose = require('mongoose');
const url =process.env.MONGO_URI 

const connectDB = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB', error);
        process.exit(1);
    }
};

module.exports = {connectDB};
