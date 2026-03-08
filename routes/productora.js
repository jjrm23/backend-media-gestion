const { Router } = require('express');
const Productora = require('../models/Productora');
const router = Router();


router.post('/', async (req, res) => {
    try {
        let productora = new Productora(req.body);
        productora = await productora.save();
        res.status(201).send(productora);
    } catch (error) {
        res.status(400).send('Error al crear productora');
    }
});


router.get('/', async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.json(productoras);
    } catch (error) {
        res.status(500).send('Error al consultar');
    }
});

module.exports = router;