const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn')
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    let rental = new Rental({     
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    });

    // rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();
    
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id:movie._id}, {
                $inc: {numberInStock: -1}
        })
        .run();
    
         res.send(rental);
    }
    catch(ex) {
        res.status(500).send('Something failed.');
    }
    
});
/*
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');


    const movie = await Rental.findByIdAndUpdate(req.params.id, 
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, 
        {new: true}
    );
    //const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given id not found');
   
    //genre.name  = req.body.name;
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const movie = await Rental.findByIdAndRemove(req.params.id);
    //const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Movie with given id not found');

    res.send(genre);
});
*/

module.exports = router;