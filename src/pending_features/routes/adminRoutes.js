const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

const adminRoutes = {
    router: express.Router(),

    initializeRoutes() {
        // Dashboard route
        this.router.get('/dashboard',
            auth.authMiddleware,
            auth.isAdmin,
            adminController.getDashboardData
        );

        // Products routes
        this.router.get('/products',
            auth.authMiddleware,
            auth.isAdmin,
            validation.adminValidationRules.pagination,
            validation.validate,
            adminController.getProducts
        );

        this.router.post('/products',
            auth.authMiddleware,
            auth.isAdmin,
            validation.adminValidationRules.createProduct,
            validation.validate,
            adminController.createProduct
        );

        this.router.put('/products/:id',
            auth.authMiddleware,
            auth.isAdmin,
            validation.adminValidationRules.updateProduct,
            validation.validate,
            adminController.updateProduct
        );

        this.router.delete('/products/:id',
            auth.authMiddleware,
            auth.isAdmin,
            validation.adminValidationRules.productId,
            validation.validate,
            adminController.deleteProduct
        );

        // Orders route
        this.router.get('/orders',
            auth.authMiddleware,
            auth.isAdmin,
            validation.adminValidationRules.pagination,
            validation.validate,
            adminController.getOrders
        );

        // Users route
        this.router.get('/users',
            auth.authMiddleware,
            auth.isAdmin,
            validation.adminValidationRules.pagination,
            validation.validate,
            adminController.getUsers
        );

        // Reviews route
        this.router.get('/reviews',
            auth.authMiddleware,
            auth.isAdmin,
            validation.adminValidationRules.pagination,
            validation.validate,
            adminController.getReviews
        );

        return this.router;
    }
};

module.exports = adminRoutes.initializeRoutes();