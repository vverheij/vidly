const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    mongoose.connect(config.get('db'))
        .then(() => winston.info(config.get('db')));
        //.then(()=> console.log('connected to mongodb'))

}