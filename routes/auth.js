const jwt = require('jsonwebtoken');
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
    
    const validPassword = bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({_id: user._id}, 'jwtPrivateKey');
    res.send(token);
    
});

module.exports = router;