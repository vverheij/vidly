const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minLength: 5,
                maxLength:50
            },
            isGold: {
                type: Boolean, 
                default: false
            },
            phone: {
                type: String, 
                required: true,
                minLength: 5,
                maxLength:50
            }
        }),
        required: true 
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minLength: 5,
                maxLength:50
            },
            dailyRentalRate: {
                type: Number, 
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },  
    dataOut: {
        type: Date,
        required: true, 
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }   
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    };

    // if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
    //     return res.status(400).send('Invalid customer');

    return result = Joi.validate(rental, schema);
}

module.exports.rentalSchema = rentalSchema;
module.exports.Rental = Rental;
module.exports.validate = validateRental;