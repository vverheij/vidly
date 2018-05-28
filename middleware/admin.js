module.exports = function(req, res, next) {
    // req.user
    // 401 unauthorized; when user did not suplly a VALID webtoken
    // 403 forbidden: when the token is valid but the users does not have acces to the resource 

    // assumes that the auth function is the first middleware function to be called. 
    // middleware auth function puts the jwt payload in the req.user object. 
    // isAdmin is part of this payload, payload is defined in generateAuthToken in the userSchema
    if (!req.user.isAdmin) return res.status(403).send('Access denied.')

    next();
}