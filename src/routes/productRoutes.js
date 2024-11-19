// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes
router.get('/', productController.getAllProducts); // Fetch all products
router.get('/:id', productController.getProductById); // Fetch single product by id
router.post('/', productController.createProduct); // Create a new product
router.put('/:id', productController.updateProduct); // Update product by id
router.delete('/:id', productController.deleteProduct); // Delete product by id

module.exports = router; // Export router
