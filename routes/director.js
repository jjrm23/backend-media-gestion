const { Router } = require('express');
const Director = require('../models/Director');
const router = Router();


router.post('/', async (req, res) => {
    try {
        let director = new Director(req.body);
        director = await director.save();
        res.send(director);
    } catch (error) {
        res.status(400).send('Error al crear director');
    }
});


router.get('/', async (req, res) => {
    try {
        const directores = await Director.find();
        res.json(directores);
    } catch (error) {
        res.status(500).send('Error al consultar');
    }
});

module.exports = router;