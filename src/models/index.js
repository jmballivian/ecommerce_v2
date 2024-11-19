const sequelize = require('../config/database');
const Product = require('./Product');
const User = require('./User');
const Cart = require('./Cart');
const CartItem = require('./CartItem');

// Define associations
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

// Export only the models you have created and are using
module.exports = {
    sequelize,
    Product,
    User,
    Cart,
    CartItem
};