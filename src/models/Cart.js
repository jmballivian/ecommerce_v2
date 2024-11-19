// src/models/Cart.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path if necessary

class Cart extends Model {}

Cart.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Cart',
});

// Define relationships if needed
// For example, if you have a User model and a Product model
Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'userId' });
    Cart.belongsTo(models.Product, { foreignKey: 'productId' });
};

module.exports = Cart;
