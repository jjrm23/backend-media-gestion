const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        // CAMBIO CLAVE: Usamos process.env.MONGO_URI para la nube
        // Si no existe (en tu PC), usará la de localhost por defecto
        const url = process.env.MONGO_URI || 'mongodb://localhost:27017/media-iud'; 
        
        await mongoose.connect(url);
        console.log('✅ Conexión exitosa a la base de datos');
    } catch (error) {
        console.log('❌ Error de conexión:', error);
    }
}

module.exports = { getConnection };