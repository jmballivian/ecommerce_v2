const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

    class Review extends Model {}

    Review.init({
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, { sequelize, modelName: 'review' });

    module.exports = Review;
