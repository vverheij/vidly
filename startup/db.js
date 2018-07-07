const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect(process.env.vidly_db)
        .then(() => winston.info("Connected to MongoDB"));
        //.then(()=> console.log('connected to mongodb'))
}