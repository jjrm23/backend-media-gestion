const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: { type: String, required: true, unique: true }, 
    titulo: { type: String, required: true }, 
    sinopsis: { type: String },
    url: { type: String, required: true, unique: true },
    imagen: { type: String },
    estreno: { type: Number }, 
    genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true }, 
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true }, 
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true } 
}, { timestamps: true });

module.exports = model('Media', MediaSchema);