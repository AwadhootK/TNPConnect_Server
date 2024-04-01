const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]

    console.log(accessToken)

    if (!accessToken) return res.status(400).json({ message: 'Access token missing!' });

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256' }, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: 'Acess token expired!' });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken }