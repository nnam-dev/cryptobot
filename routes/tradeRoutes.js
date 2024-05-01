// tradeRoutes.js
const express = require('express');
const router = express.Router();
const { createTrade, getTrade, updateTrade, deleteTrade, getTradeHistory, searchTrades } = require('./tradeController');

// Route to create a new trade
router.post('/', async (req, res) => {
    try {
        const trade = await createTrade(req.body);
        res.status(201).json({ message: 'Trade created successfully', trade });
    } catch (error) {
        console.error('Error creating trade:', error);
        res.status(500).json({ message: 'Failed to create trade' });
    }
});

// Route to get trade by ID
router.get('/:id', async (req, res) => {
    try {
        const tradeId = req.params.id;
        const trade = await getTrade(tradeId);
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        res.status(200).json({ trade });
    } catch (error) {
        console.error('Error fetching trade:', error);
        res.status(500).json({ message: 'Failed to fetch trade' });
    }
});

// Route to update trade by ID
router.put('/:id', async (req, res) => {
    try {
        const tradeId = req.params.id;
        const updatedTrade = await updateTrade(tradeId, req.body);
        if (!updatedTrade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        res.status(200).json({ message: 'Trade updated successfully', trade: updatedTrade });
    } catch (error) {
        console.error('Error updating trade:', error);
        res.status(500).json({ message: 'Failed to update trade' });
    }
});

// Route to delete trade by ID
router.delete('/:id', async (req, res) => {
    try {
        const tradeId = req.params.id;
        const deletedTrade = await deleteTrade(tradeId);
        if (!deletedTrade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        res.status(200).json({ message: 'Trade deleted successfully' });
    } catch (error) {
        console.error('Error deleting trade:', error);
        res.status(500).json({ message: 'Failed to delete trade' });
    }
});

// Route to get trade history with pagination support
router.get('/history', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const tradeHistory = await getTradeHistory(parseInt(page), parseInt(limit));
        res.status(200).json({ tradeHistory });
    } catch (error) {
        console.error('Error fetching trade history:', error);
        res.status(500).json({ message: 'Failed to fetch trade history' });
    }
});

// Route to search trades with filters
router.get('/search', async (req, res) => {
    try {
        const { symbol, status, startDate, endDate, page = 1, limit = 10 } = req.query;
        const searchParams = { symbol, status, startDate, endDate };
        const trades = await searchTrades(searchParams, parseInt(page), parseInt(limit));
        res.status(200).json({ trades });
    } catch (error) {
        console.error('Error searching trades:', error);
        res.status(500).json({ message: 'Failed to search trades' });
    }
});

module.exports = router;
