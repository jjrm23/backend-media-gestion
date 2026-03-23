const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = 'mongodb://localhost:27017/tu-base-de-datos'; // La URL que configuramos
        await mongoose.connect(url);
        console.log('✅ Conexión exitosa a MongoDB');
    } catch (error) {
        console.log('❌ Error de conexión:', error);
    }
}

// ESTA LÍNEA ES LA QUE CORRIGE EL ERROR "is not a function"
module.exports = { getConnection };