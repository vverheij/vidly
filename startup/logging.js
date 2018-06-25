const winston = require('winston');
//require('winston-mongodb')
require('express-async-errors');

module.exports = function() {

    winston.add(new winston.transports.File({filename: 'logfile.log'})); 
    winston.add(new winston.transports.Console({colorize: true, prettyPrint: true})); 
    // for catching everything (error) that is not in a route.
    // note: async errors won't be caught here.
    process.on('uncaughtException', (ex)=> { 
        console.log('WE GOT AN UNCAUGHT EXCEPTION');
        winston.error(ex.message, ex);
        proces.exit(1); // anything except 0 means failure.
    });
    
    //winston.handleExceptions(new winston.transports.File({filename: 'uncaughtExceptions.log'})); // does not work
    //winston.exceptions.handle(); // does not work
    
    // async errors (unhandled promise rejections) will be caught here.
    process.on('unhandledRejection', (ex)=> { 
        console.log('WE GOT AN UNHANDLED REJECTION'); 
        winston.error(ex.message, ex);
        //throw ex;
        process.exit(1);
    });
    // winston.add(winston.transports.MongoDB, {
    //     db: 'mongodb://localhost/vidly',
    //     level: 'info'
    // });
}