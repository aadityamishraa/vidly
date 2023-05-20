const config = require('config');
const jwt = require('jwtwebtoken');


module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.send(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        res.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}