const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength:50
    }
});

const Genre = mongoose.model('genre', genreSchema);


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    //const genre = Genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Customer');
    
    res.send(genre);
});

router.post('/',async (req, res) => {
    
    const result = validateGenre(req.body);

    if (result.error) return res.send(result.error.details[0].message);

    let genre = new Genre({
        name: req.body.name
    })


    //genres.push(genre);
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    })
    //const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given id not found');
    
   
    //genre.name  = req.body.name;
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    //const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given id not found');

    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).required()
    };

    return result = Joi.validate(genre, schema);
}

module.exports = router;