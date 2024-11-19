const { Review } = require('../models');

const reviewController = {
    submitReview: async (req, res) => {
        try {
            const { userId, productId, rating, comment } = req.body;
            const review = await Review.create({ userId, productId, rating, comment });
            res.status(201).json({ message: 'Review submitted successfully', review });
        } catch (error) {
            console.error('Submit review error:', error);
            res.status(500).json({ message: 'Error submitting review', error: error.message });
        }
    },

    getReviews: async (req, res) => {
        try {
            const reviews = await Review.findAll({ where: { productId: req.params.productId } });
            res.status(200).json({ message: 'Reviews retrieved successfully', reviews });
        } catch (error) {
            console.error('Get reviews error:', error);
            res.status(500).json({ message: 'Error retrieving reviews', error: error.message });
        }
    },

    updateReview: async (req, res) => {
        try {
            const { id } = req.params;
            const { rating, comment } = req.body;
            const review = await Review.findByPk(id);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            await review.update({ rating, comment });
            res.status(200).json({ message: 'Review updated successfully', review });
        } catch (error) {
            console.error('Update review error:', error);
            res.status(500).json({ message: 'Error updating review', error: error.message });
        }
    },

    deleteReview: async (req, res) => {
        try {
            const { id } = req.params;
            const review = await Review.findByPk(id);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            await review.destroy();
            res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
            console.error('Delete review error:', error);
            res.status(500).json({ message: 'Error deleting review', error: error.message });
        }
    }
};

module.exports = reviewController;
