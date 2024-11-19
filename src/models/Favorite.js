const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

    class Favorite extends Model {}

    Favorite.init({
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, { sequelize, modelName: 'favorite' });

    module.exports = Favorite;
