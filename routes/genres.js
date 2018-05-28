const auth = require('../middleware/auth');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    //const genre = Genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Invalid Genre');
    
    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    
    const result = validate(req.body);

    if (result.error) return res.send(result.error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    })

    await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    })
    //const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given id not found');
    
   
    //genre.name  = req.body.name;
    res.send(genre);
});

router.delete('/:id', auth, async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    //const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given id not found');

    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    
    res.send(genre);
});

module.exports = router;