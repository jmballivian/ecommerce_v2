const { Product } = require('../models');
const { Op } = require('sequelize');

const searchController = {
    searchProducts: async (req, res) => {
        try {
            const { search } = req.query;
            
            const products = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                }
            });

            res.status(200).json({
                message: 'Search completed successfully',
                products
            });
        } catch (error) {
            console.error('Search products error:', error);
            res.status(500).json({
                message: 'Error searching products',
                error: error.message
            });
        }
    },

    searchByCategory: async (req, res) => {
        try {
            const { category } = req.query;

            const products = await Product.findAll({
                where: {
                    category: category
                }
            });

            res.status(200).json({
                message: 'Category search completed successfully',
                products
            });
        } catch (error) {
            console.error('Category search error:', error);
            res.status(500).json({
                message: 'Error searching by category',
                error: error.message
            });
        }
    },

    searchByPrice: async (req, res) => {
        try {
            const { min, max } = req.query;

            const products = await Product.findAll({
                where: {
                    price: {
                        [Op.between]: [min, max]
                    }
                }
            });

            res.status(200).json({
                message: 'Price search completed successfully',
                products
            });
        } catch (error) {
            console.error('Price search error:', error);
            res.status(500).json({
                message: 'Error searching by price range',
                error: error.message
            });
        }
    }
};

module.exports = searchController;
