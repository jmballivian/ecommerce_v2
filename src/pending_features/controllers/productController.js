const { Product } = require('../models');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.status(200).json({
                success: true,
                message: 'Products retrieved successfully',
                data: products
            });
        } catch (error) {
            console.error('getAllProducts error:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving products',
                error: error.message
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Product retrieved successfully',
                data: product
            });
        } catch (error) {
            console.error('getProductById error:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving product',
                error: error.message
            });
        }
    },

    getProductsByCategory: async (req, res) => {
        try {
            const { category } = req.params;
            const products = await Product.findAll({
                where: { category }
            });

            res.status(200).json({
                success: true,
                message: 'Products retrieved successfully',
                data: products
            });
        } catch (error) {
            console.error('getProductsByCategory error:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving products',
                error: error.message
            });
        }
    }
};

module.exports = productController;
