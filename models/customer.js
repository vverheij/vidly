const mongoose = require('mongoose');
const Joi = require('joi');

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

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    };
    return result = Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;