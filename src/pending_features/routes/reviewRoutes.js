const express = require('express');
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

const reviewRoutes = {
    router: express.Router(),

    initializeRoutes() {
        // Debug console.logs if needed
        console.log('Auth Middleware:', auth.authMiddleware);
        console.log('Review Controller:', reviewController);
        console.log('Validation Rules:', validation.reviewValidationRules);

        // Test route
        this.router.post('/test', (req, res) => {
            res.json({ message: 'Test route working' });
        });

        // Review routes
        this.router.post('/:productId', auth.authMiddleware, validation.reviewValidationRules.createReview, validation.validate, reviewController.submitReview);
        this.router.get('/product/:productId', validation.reviewValidationRules.getReviews, validation.validate, reviewController.getReviews);
        this.router.put('/:id', auth.authMiddleware, validation.reviewValidationRules.updateReview, validation.validate, reviewController.updateReview);
        this.router.delete('/:id', auth.authMiddleware, validation.reviewValidationRules.deleteReview, validation.validate, reviewController.deleteReview);
        
        return this.router;
    }
};

module.exports = reviewRoutes.initializeRoutes();
