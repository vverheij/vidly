const winston = require('winston');
const express = require('express');
const app = express();  


require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

//throw new Error('Something failed during startup');
// const p = Promise.reject(new Error("Something failed miserably in a promise!"));
// p.then(() => console.log('done')); 

// app.get('/',(req, res) => {
//     //console.log(`request received on port ${port}`);
//     res.send(`Server listening!`);
// });
//console.log(config.get('db'));
const port = process.env.PORT || 3000;

//const server = app.listen(process.env.PORT || 3000, () => winston.info(`Server listening on port ${port}.`));
const server = app.listen(port, () => winston.info(`Server listening on port ${port}.`));
//console.log(process.env.vidly_db);
// app.listen(process.env.PORT || 3000, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });
module.exports = server;