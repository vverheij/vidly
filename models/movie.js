const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre')

const movieSchema = new mongoose.Schema({
    title: String,
    genre: {
        type: genreSchema  
    },
    numberInStock: Number,
    dailyRentalRate: Number
});

const Movie = mongoose.model('Movie', movieSchema);
exports.Movie = Movie;
exports.validete = validateMovie;


