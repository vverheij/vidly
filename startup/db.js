const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    mongoose.connect(config.get('db'))
        //.then(() => winston.info(config.get('db')));
        //.then( () => console.log('connected to mongodb'))
        .then( () => (config.get('db').indexOf('localhost') > 0 ) 
            ? winston.info('connected to mongodb on localhost') : winston.info('connected to mongodb'));

}