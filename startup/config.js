const config = require('config');

module.exports = function() {
    if (!config.get('jwtPrivateKey')){
        //console.error('FATAL ERROR: private key is not defined');
        //process.exit(1);
        throw new Error('FATAL ERROR: private key is not defined');
    }
}