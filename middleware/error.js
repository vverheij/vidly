const winston = require('winston');
module.exports = function(err, req, res, next) {
    // log errors etc: 
    //winston.log('error', err.message); 

    // of
    winston.error(err.message, err);
    // error
    // wan
    // info
    // verbose 
    // debug
    // silly

    res.status(500).send('Something failed!!!');
}