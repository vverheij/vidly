const mongoose = require('mongoose');
//const Joi = require('joi');
const express = require('express');
//const logger = require('./logger');
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
//const authenticator = require('./authenticator');

const app = express();  

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

app.get('/',(req, res) => {
    //console.log(`request received on port ${port}`);
    res.send(`Server listening!`);
});

const port = process.env.port || 3001;

app.listen(port,() => console.log(`Server listening on port ${port}.`));
