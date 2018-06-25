require('express-async-errors');
const winston = require('winston');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();  

require('./startup/routes')(app);
require('./startup/db')();
winston.add(new winston.transports.File({filename: 'logfile.log'})); // 

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

//throw new Error('Something failed during startup');
// const p = Promise.reject(new Error("Something failed miserably in a promise!"));
// p.then(() => console.log('done')); 

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: private key is not defined');
    process.exit(1);
}



app.get('/',(req, res) => {
    //console.log(`request received on port ${port}`);
    res.send(`Server listening!`);
});

const port = process.env.port || 3001;

app.listen(port,() => console.log(`Server listening on port ${port}.`));
