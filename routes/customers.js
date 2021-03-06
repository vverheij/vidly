const auth = require('../middleware/auth');
const {Customer, validate} = require('../models/customer')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    //const genre = Genres.find(g => g.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('Customer with the given id not found');
    
    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    
    const result = validate(req.body);

    if (result.error) return res.send(result.error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })


    //genres.push(genre);
    await customer.save();
    res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
        }, {
        new: true
    })

    //const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('Customer with given id not found');    
   
    //genre.name  = req.body.name;
    res.send(customer);
});

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    //const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('Customer with given id not found');

    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    
    res.send(customer);
});

module.exports = router;