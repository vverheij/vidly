const winston = require('winston');
const express = require('express');
const app = express();  

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

//throw new Error('Something failed during startup');
// const p = Promise.reject(new Error("Something failed miserably in a promise!"));
// p.then(() => console.log('done')); 

// app.get('/',(req, res) => {
//     //console.log(`request received on port ${port}`);
//     res.send(`Server listening!`);
// });

const port = process.env.port || 3001;
app.listen(port,() => winston.info(`Server listening on port ${port}.`));
