// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController'); // Adjust path as necessary
const router = express.Router();

// Defining user-related routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Exporting the router
module.exports = router;
