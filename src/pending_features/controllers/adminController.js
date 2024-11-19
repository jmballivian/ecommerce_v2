const { Op } = require('sequelize');
const { Product, Order, User, Review } = require('../models');

const adminController = {
    getDashboardData: async (req, res) => {
        try {
            const totalSales = await Order.sum('totalAmount');
            const pendingOrders = await Order.count({ where: { status: 'pending' } });
            const lowStockProducts = await Product.count({ where: { stock: { [Op.lt]: 5 } } });
            const userRegistrations = await User.count();
            res.json({ totalSales, pendingOrders, lowStockProducts, userRegistrations });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
        }
    },

    getProducts: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        }
    },

    createProduct: async (req, res) => {
        try {
            const { name, price, description, category, stock, imageURL } = req.body;
            const product = await Product.create({ 
                name, 
                price, 
                description, 
                category, 
                stock, 
                imageURL 
            });
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await product.update(req.body);
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await product.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error: error.message });
        }
    },

    getOrders: async (req, res) => {
        try {
            const orders = await Order.findAll({
                include: [{ model: User, attributes: ['id', 'name', 'email'] }]
            });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error: error.message });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] }
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    },

    getReviews: async (req, res) => {
        try {
            const reviews = await Review.findAll({
                include: [
                    { model: User, attributes: ['id', 'name'] },
                    { model: Product, attributes: ['id', 'name'] }
                ]
            });
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching reviews', error: error.message });
        }
    }
};

module.exports = adminController;