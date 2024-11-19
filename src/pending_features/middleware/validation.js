const { body, param, query, validationResult } = require('express-validator');

const validation = {
    cartValidationRules: {
        addToCart: [
            body('productId').isInt().withMessage('Product ID must be an integer'),
            body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
        ],
        updateCart: [
            body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
        ]
    },
    favoriteValidationRules: {
        addFavorite: [
            body('productId').isInt().withMessage('Product ID must be an integer'),
            body('userId').isInt().withMessage('User ID must be an integer')
        ],
        removeFavorite: [
            param('productId').isInt().withMessage('Product ID must be an integer')
        ]
    },
    reviewValidationRules: {
        createReview: [
            body('productId').isInt().withMessage('Product ID must be an integer'),
            body('userId').isInt().withMessage('User ID must be an integer'),
            body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
            body('comment').isString().optional().withMessage('Comment must be a string')
        ],
        updateReview: [
            param('id').isInt().withMessage('Review ID must be an integer'),
            body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
            body('comment').isString().optional().withMessage('Comment must be a string')
        ],
        deleteReview: [
            param('id').isInt().withMessage('Review ID must be an integer')
        ],
        getReviews: [
            param('productId').isInt().withMessage('Product ID must be an integer')
        ]
    },
    adminValidationRules: {
        pagination: [
            query('page').isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
            query('limit').isInt({ min: 1 }).withMessage('Limit must be an integer greater than 0')
        ],
        createProduct: [
            body('name').notEmpty().withMessage('Product name is required'),
            body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
            body('description').optional().isString().withMessage('Description must be a string')
        ],
        updateProduct: [
            param('id').isInt().withMessage('Product ID must be an integer'),
            body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
            body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
            body('description').optional().isString().withMessage('Description must be a string')
        ],
        productId: [
            param('id').isInt().withMessage('Product ID must be an integer')
        ]
    },
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
};

module.exports = validation;
