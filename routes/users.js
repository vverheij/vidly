const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send('Invalid user');
    
    res.send(user);
});

router.post('/',async (req, res) => {
    const result = validate(req.body);

    if (result.error) return res.send(result.error.details[0].message);

    let user = await User.findOne( {email: req.body.email} );
    if (user) return res.status(400).send('User already registered');

    user = new User(
        _.pick(req.body, ['name', 'email', 'password'])
    );

    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, {
        new: true
    })

    if (!user) return res.status(404).send('User with given id not found');
    
    res.send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('Genre with given id not found');

    res.send(user);
});

module.exports = router;