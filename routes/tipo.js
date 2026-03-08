const { Router } = require('express');
const Tipo = require('../models/Tipo');
const router = Router();


router.post('/', async (req, res) => {
    try {
        let tipo = new Tipo(req.body);
        tipo = await tipo.save();
        res.status(201).send(tipo);
    } catch (error) {
        res.status(400).send('Error al crear tipo');
    }
});


router.get('/', async (req, res) => {
    try {
        const tipos = await Tipo.find();
        res.json(tipos);
    } catch (error) {
        res.status(500).send('Error al consultar');
    }
});

module.exports = router; 