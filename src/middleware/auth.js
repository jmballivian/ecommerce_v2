const jwt = require('jsonwebtoken');

// Authentication middleware
const auth = {
    authMiddleware: (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ message: 'Access denied. No token provided.' });
        }

        const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;
        jwt.verify(tokenString, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token.' });
            }
            req.user = decoded; // Decode token and attach user info to request
            next();
        });
    },

    isAdmin: (req, res, next) => {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Admin access required' });
        }
        next();
    }
};

module.exports = auth;
