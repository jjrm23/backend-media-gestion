const { Router } = require('express'); 
const Genero = require('../models/Genero'); 
const router = Router(); 

router.post('/', async (req, res) => {
    try {
        let genero = new Genero(req.body); 
        genero = await genero.save(); 
        res.send(genero); 
    } catch (error) {
        res.status(400).send('Error al crear');
    }
});

router.get('/', async (req, res) => { 
    try {
        const generos = await Genero.find(); 
        res.json(generos); 
    } catch (error) {
        res.status(500).send('Error al consultar');
    }
});

module.exports = router;