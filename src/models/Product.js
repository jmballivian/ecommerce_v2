// src/models/Product.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Product = db.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    imageURL: { // Include this field
        type: DataTypes.STRING, // This will store the image URL as a string
        allowNull: true // Set to true if you want to allow products without images
    }
});

// Export the Product model
module.exports = Product;
