const { Schema, model } = require('mongoose');

const DirectorSchema = Schema({
    nombres: { type: String, required: true }, 
}, { timestamps: true });

module.exports = model('Director', DirectorSchema);