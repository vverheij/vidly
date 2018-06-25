const auth = require('../middleware/auth') // this is about authorisation (permissions), authentication is about determining if the username/password was valid.
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// router.get('/', async (req, res) => {
//     const users = await User.find().sort('name');
//     res.send(users);
// });

// this /me is not the same as /:id, the latter is for providing an id paramater
// which is a security risk (can provide anybody's id)
// with /me we create an endpoint for currently logged in user.
router.get('/me', auth, async (req, res) => {
    
    // in the auth middleware function we 
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// bij het registeren krijgt de response een extra header met het jwt token. 
// bij aanroepen van bepaalde (c(r)ud) endpoints wordt deze header uitgelezen en verified. 
router.post('/', async (req, res) => {
    const result = validate(req.body);

    if (result.error) return res.send(result.error.details[0].message);

    let user = await User.findOne( {email: req.body.email} );
    if (user) return res.status(400).send('User already registered');

    user = new User(
        _.pick(req.body, ['name', 'email', 'password'])
    );
    
    // Here we ask bcrypt for a salt. This salt will be part of the hashed password
    // Only the hashed password is saved. The salted part of the hash
    // will be used to hash password again when the user provides the password for subsequent logins.
    // the hashed provided req.body.password will be compared with the saved user.password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

// router.put('/:id', async (req, res) => {
//     const {error} = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const user = await User.findByIdAndUpdate(req.params.id, {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     }, {
//         new: true
//     })

//     if (!user) return res.status(404).send('User with given id not found');
    
//     res.send(user);
// });

// router.delete('/:id', async (req, res) => {
//     const user = await User.findByIdAndRemove(req.params.id);
//     if (!user) return res.status(404).send('Genre with given id not found');

//     res.send(user);
// });

module.exports = router;