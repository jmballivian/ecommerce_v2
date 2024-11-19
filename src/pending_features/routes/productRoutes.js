const express = require('express');
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

const productRoutes = {
    router: express.Router(),

    initializeRoutes() {
        // Debug console.logs
        console.log('Auth:', auth);
        console.log('Product Controller:', productController);
        console.log('Validation:', validation);

        // Test route
        this.router.get('/test', (req, res) => {
            res.json({ message: 'Product routes working' });
        });

        // Product routes with proper error handling for undefined middleware
        this.router.get('/category/:category',
            validation.productValidationRules?.searchProducts || [],
            validation.validate,
            productController.getProductsByCategory
        );

        this.router.get('/:id',
            validation.productValidationRules?.getProduct || [],
            validation.validate,
            productController.getProductById
        );

        this.router.get('/',
            validation.productValidationRules?.searchProducts || [],
            validation.validate,
            productController.getAllProducts
        );

        return this.router;
    }
};

module.exports = productRoutes.initializeRoutes();
