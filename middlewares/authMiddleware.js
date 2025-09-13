const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Access Denied' });
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid Token' });
            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = authenticateToken;
