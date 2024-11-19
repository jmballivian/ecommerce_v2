const { Favorite } = require('../models');

const favoriteController = {
    addToFavorites: async (req, res) => {
        try {
            const userId = req.user.id;
            const { productId } = req.params;

            const favorite = await Favorite.create({
                userId,
                productId
            });

            res.status(201).json({
                message: 'Added to favorites successfully',
                favorite
            });
        } catch (error) {
            console.error('Add to favorites error:', error);
            res.status(500).json({
                message: 'Error adding to favorites',
                error: error.message
            });
        }
    },

    getFavorites: async (req, res) => {
        try {
            const userId = req.user.id;

            const favorites = await Favorite.findAll({
                where: { userId }
            });

            res.status(200).json({
                message: 'Favorites retrieved successfully',
                favorites
            });
        } catch (error) {
            console.error('Get favorites error:', error);
            res.status(500).json({
                message: 'Error retrieving favorites',
                error: error.message
            });
        }
    },

    removeFavorites: async (req, res) => {
        try {
            const userId = req.user.id;
            const { productId } = req.params;

            const deleted = await Favorite.destroy({
                where: { userId, productId }
            });

            if (!deleted) {
                return res.status(404).json({
                    message: 'Favorite not found'
                });
            }

            res.status(200).json({
                message: 'Removed from favorites successfully'
            });
        } catch (error) {
            console.error('Remove from favorites error:', error);
            res.status(500).json({
                message: 'Error removing from favorites',
                error: error.message
            });
        }
    }
};

module.exports = favoriteController;
