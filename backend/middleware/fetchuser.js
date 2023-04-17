var jwt = require('jsonwebtoken')
const JWT_SECRET = 'mysecrettoken'

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add it to req.object
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send({error: 'Please authenticate using a valid token'})
    }

    // Decode JWT token to authenticate
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
}

module.exports = fetchuser;