const express = require('express');
const searchController = require('../controllers/searchController');
const validation = require('../middleware/validation');

const searchRoutes = {
    router: express.Router(),

    initializeRoutes() {
        // Debug console.logs if needed
        console.log('Search Controller:', searchController);
        console.log('Validation Rules:', validation.searchValidationRules);

        // Test route
        this.router.post('/test', (req, res) => {
            res.json({ message: 'Test route working' });
        });

        // Search routes
        this.router.get('/',
            validation.searchValidationRules.search,
            validation.validate,
            searchController.searchProducts
        );

        this.router.get('/category',
            validation.searchValidationRules.categorySearch,
            validation.validate,
            searchController.searchByCategory
        );

        this.router.get('/price',
            validation.searchValidationRules.priceSearch,
            validation.validate,
            searchController.searchByPrice
        );

        return this.router;
    }
};

module.exports = searchRoutes.initializeRoutes();
