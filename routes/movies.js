const {Movie, validate} = require('../models/movie');
//const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

// router.post('/',async (req, res) => {
    
//     //const result = validate(req.body);
//     //if (result.error) return res.send(result.error.details[0].message);

//     let movie = new Movie({
//         title: req.body.title,
//         genre: {
//             _id: genre._id,
//             name: genre.name
//         },
//         numberInStock: req.body.numberInStock,
//         dailyRentalRate: req.body.dailyRentalRate
//     })
//     //genres.push(genre);
//     movie = await movie.save();
//     res.send(movie);
// });

module.exports = router;