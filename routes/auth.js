const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/',async (req, res) => {
    const result = validate(req.body);

    if (result.error) return res.send(result.error.details[0].message);

    let user = await User.findOne( {email: req.body.email} );
    if (!user) return res.status(400).send('Invalid email or password');
    
    // bcrtypr hashes the password in de request using the salt part of 
    // the hashed password in user object. So... the salt is part of the hash. 
    const validPassword = bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return result = Joi.validate(req, schema);
}

module.exports = router;