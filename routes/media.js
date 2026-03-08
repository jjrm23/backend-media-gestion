const { Router } = require('express');
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const router = Router();

router.post('/', async (req, res) => {
    try {
        const { genero, director, productora } = req.body; 

        
        const generoDb = await Genero.findById(genero);
        if (!generoDb || generoDb.estado === 'Inactivo') return res.status(400).json({ msg: 'Género Inactivo' });

        const directorDb = await Director.findById(director);
        if (!directorDb || directorDb.estado === 'Inactivo') return res.status(400).json({ msg: 'Director Inactivo' });

        const productoraDb = await Productora.findById(productora);
        if (!productoraDb || productoraDb.estado === 'Inactivo') return res.status(400).json({ msg: 'Productora Inactiva' });

        let media = new Media(req.body);
        media = await media.save();
        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const producciones = await Media.find().populate([ 
            { path: 'genero', select: 'nombre' },
            { path: 'director', select: 'nombres' },
            { path: 'productora', select: 'nombre' },
            { path: 'tipo', select: 'nombre' }
        ]);
        res.json(producciones);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = router;