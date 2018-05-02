const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    isGold : {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
});

const Customer = mongoose.model('customer', customerSchema);


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

router.post('/',async (req, res) => {
    
    const result = validateCustomer(req.body);

    if (result.error) return res.send(result.error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })


    //genres.push(genre);
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    })
    //const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('Customer with given id not found');
    
   
    //genre.name  = req.body.name;
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    //const genre = genres.find(g =>g.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('Customer with given id not found');

    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    
    res.send(customer);
});

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    };

    return result = Joi.validate(customer, schema);
}

module.exports = router;