const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

    class CartItem extends Model {}

    CartItem.init({
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, { sequelize, modelName: 'cartItem' });

    module.exports = CartItem;
