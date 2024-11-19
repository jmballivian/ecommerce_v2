const { body, param, query, validationResult } = require('express-validator');

// Validation middleware
const validation = {
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },

    cartValidationRules: {
        addToCart: [
            body('productId').isInt().withMessage('Product ID must be an integer'),
            body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
        ],
        updateCart: [
            body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
        ]
    },

    // Additional validation rules can be added here...
};

module.exports = validation;
