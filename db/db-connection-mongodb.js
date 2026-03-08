const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI;
        await mongoose.connect(url);
        console.log('✅ Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('❌ Error en la conexión:', error);
    }
}

module.exports = { getConnection };