const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

const favoriteRoutes = {
    router: express.Router(),

    initializeRoutes() {
        // Debug console.logs if needed
        console.log('Auth Middleware:', auth.authMiddleware);
        console.log('Favorite Controller:', favoriteController);
        console.log('Validation Rules:', validation.favoriteValidationRules);

        // Test route
        this.router.post('/test', (req, res) => {
            res.json({ message: 'Test route working' });
        });

        // Favorite routes
        this.router.post('/:productId',
            auth.authMiddleware,
            validation.favoriteValidationRules.addFavorite,
            validation.validate,
            favoriteController.addToFavorites
        );

        this.router.delete('/:productId',
            auth.authMiddleware,
            validation.favoriteValidationRules.removeFavorite,
            validation.validate,
            favoriteController.removeFavorites
        );

        this.router.get('/',
            auth.authMiddleware,
            favoriteController.getFavorites
        );

        return this.router;
    }
};

module.exports = favoriteRoutes.initializeRoutes();