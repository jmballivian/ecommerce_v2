const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security middleware
const security = {
    initializeSecurity: (app) => {
        app.use(helmet()); // Set secure HTTP headers
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Limit each IP to 100 requests per windowMs
            message: { message: 'Too many requests from this IP, please try again later.' }
        });
        app.use(limiter);
        app.use((req, res, next) => {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-XSS-Protection', '1; mode=block');
            res.setHeader('X-Frame-Options', 'DENY');
            next();
        });
    }
};

module.exports = security;
