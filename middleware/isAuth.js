const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        const error = new Error('No token, authorization denied');
        error.statusCode = 401;
        throw error;
        // return res.status(401).json({
        //     message: 'No token, authorization denied'
        // });
    };
    let decoded;
    try {
        decoded = jwt.verify(token, config.get('jwtToken'));
    } catch (err) {
        err = new Error('Not authenticated');
        err.statusCode = 500;
        throw err;
    }
    if (!decoded) {
        const error = new Error('Token is not valid');
        error.statusCode = 401;
        throw error;
    } 
    req.user = decoded.user;
    next();
};