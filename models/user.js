const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength:50
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength:255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength:1024
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return result = Joi.validate(user, schema);
}

//module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validate = validateUser;