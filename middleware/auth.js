const config = require('config');
const jwt = require('jwtwebtoken');


function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) res.send(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        res.user=decoded;
    } catch (ex) {
        res.status(400).send('Invalid token');
    }

}