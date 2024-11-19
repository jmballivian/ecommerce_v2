// src/controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Adjust path as necessary

const userController = {
    async register(req, res) {
        const { email, password, fullName, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country } = req.body;
        try {
            console.log('Incoming registration data:', req.body); // Log incoming data
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                console.log('Email already in use.'); // Log message for existing user
                return res.status(400).json({ message: 'Email already in use.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                email,
                password: hashedPassword,
                fullName,
                phoneNumber,
                addressLine1,
                addressLine2,
                city,
                state,
                postalCode,
                country,
            });
            console.log('New user registered:', newUser); // Log the new user data
            res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
        } catch (error) {
            console.error('Registration error:', error.message);
            res.status(500).json({ message: 'Registration failed', error: error.message });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials.' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(400).json({ message: 'Invalid credentials.' });
            }

            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.json({ token });
        } catch (error) {
            console.error('Login error:', error.message);
            res.status(500).json({ message: 'Login failed', error: error.message });
        }
    },
};

// Exporting the userController
module.exports = userController;
