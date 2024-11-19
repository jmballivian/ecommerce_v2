require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./src/config/database'); // Ensure your database config is correct
const userRoutes = require('./src/routes/userRoutes'); // Import user routes
const productRoutes = require('./src/routes/productRoutes'); // Import product routes
const path = require('path');

const app = express();

// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000', // Adjust as necessary
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files (if any)
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // Adjust as necessary

// Use routes
app.use('/api/users', userRoutes); // Prefix for user-related routes
app.use('/api/products', productRoutes); // Prefix for product-related routes

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Test MySQL database connection
db.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit if there is a connection error
    });

// Example registration route (ensure this matches userRoutes)
app.post('/api/register', async (req, res) => {
    const { email, password, firstName, lastName, maternalLastName, phoneNumber, addressLine1, addressLine2, city, country, state, postalCode, gender } = req.body;

    try {
        // Add logic to save user to the database here
        // const newUser = await User.create({...});  // Use your User model

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
