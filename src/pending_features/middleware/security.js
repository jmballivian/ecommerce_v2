const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const security = {
    initializeSecurity: (app) => {
        app.use(helmet());

        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
            message: {
                message: 'Too many requests from this IP, please try again later.'
            }
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
