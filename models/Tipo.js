const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    nombre: { type: String, required: true }, 
    descripcion: { type: String }
}, { timestamps: true });

module.exports = model('Tipo', TipoSchema);