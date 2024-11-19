// src/controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the request
        console.log(`Fetching cart items for user ID: ${userId}`);

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [Product] // Include related product details
        });

        if (!cartItems.length) {
            return res.status(404).json({ message: 'No items in the cart' });
        }

        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const existingItem = await Cart.findOne({ where: { userId, productId } });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.json({ message: 'Cart item updated', item: existingItem });
        }

        const cartItem = await Cart.create({ userId, productId, quantity });
        res.status(201).json({ message: 'Item added to cart', item: cartItem });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        const [updated] = await Cart.update({ quantity }, { where: { userId, productId } });

        if (!updated) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.json({ message: 'Cart item updated' });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Error updating cart item', error: error.message });
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const deleted = await Cart.destroy({ where: { userId, productId } });

        if (!deleted) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.json({ message: 'Cart item removed' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ message: 'Error removing cart item', error: error.message });
    }
};
