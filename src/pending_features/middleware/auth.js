const jwt = require('jsonwebtoken');

const auth = {
    authMiddleware: (req, res, next) => {
        try {
            const token = req.headers['authorization'];
            
            if (!token) {
                return res.status(403).json({
                    message: 'Access denied. No token provided.'
                });
            }

            const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;

            jwt.verify(tokenString, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Invalid token.'
                    });
                }
                
                req.user = decoded;
                next();
            });
        } catch (error) {
            console.error('Authentication error:', error);
            res.status(500).json({
                message: 'Authentication error',
                error: error.message
            });
        }
    },

    isAdmin: (req, res, next) => {
        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: 'Admin access required'
            });
        }
        next();
    }
};

module.exports = auth;
