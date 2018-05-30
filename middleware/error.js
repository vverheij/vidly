
module.exports = function(err, req, res, next) {
    // log errors here
    res.status(500).send('Something failed!');
}