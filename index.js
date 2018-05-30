const error = require('./middleware/error');
const config = require('config');
const auth = require('./routes/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
//const Joi = require('joi');
const express = require('express');
//const logger = require('./logger');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');

//const authenticator = require('./authenticator');

const app = express();  

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: private key is not defined');
    process.exit(1);
}
mongoose.connect('mongodb://localhost/vidly')
 .then(()=> console.log('connected to mongodb'))
 .catch((err) => console.error('could not connect to mongodb'));

app.use(express.json());

//app.use(logger); 
//app.use(authenticator);
//app.use(express.urlencoded());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

app.get('/',(req, res) => {
    //console.log(`request received on port ${port}`);
    res.send(`Server listening!`);
});

const port = process.env.port || 3001;

app.listen(port,() => console.log(`Server listening on port ${port}.`));
