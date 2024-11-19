// src/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth'); // Authentication middleware

// Define routes
router.get('/', auth.authMiddleware, cartController.getCartItems); // Get all cart items for the user
router.post('/', auth.authMiddleware, cartController.addToCart); // Add item to cart
router.put('/:productId', auth.authMiddleware, cartController.updateCartItem); // Update item in cart
router.delete('/:productId', auth.authMiddleware, cartController.removeCartItem); // Remove item from cart

module.exports = router; // Export the router
