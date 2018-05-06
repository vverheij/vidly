const {Movie, validate} = require('../models/genre');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Movie.find().sort('title');
    res.send(genres);
});

router.post('/',async (req, res) => {
    
    //const result = validate(req.body);

    //if (result.error) return res.send(result.error.details[0].message);

    let movie = new Movie({
        title: req.body.title
    })


    //genres.push(genre);
    movie = await movie.save();
    res.send(movie);
});