// databaseService.js

// Function to create a new trade in the database
async function createTrade(tradeData) {
    try {
        const trade = new Trade(tradeData);
        await trade.save();
        return trade;
    } catch (error) {
        throw new Error(`Error creating trade: ${error.message}`);
    }
}

// Function to get a trade by ID from the database
async function getTrade(tradeId) {
    try {
        const trade = await Trade.findById(tradeId);
        if (!trade) {
            throw new Error('Trade not found');
        }
        return trade;
    } catch (error) {
        throw new Error(`Error getting trade: ${error.message}`);
    }
}

// Function to update a trade by ID in the database
async function updateTrade(tradeId, updateData) {
    try {
        const trade = await Trade.findByIdAndUpdate(tradeId, updateData, { new: true });
        if (!trade) {
            throw new Error('Trade not found');
        }
        return trade;
    } catch (error) {
        throw new Error(`Error updating trade: ${error.message}`);
    }
}

// Function to delete a trade by ID from the database
async function deleteTrade(tradeId) {
    try {
        const trade = await Trade.findByIdAndDelete(tradeId);
        if (!trade) {
            throw new Error('Trade not found');
        }
        return trade;
    } catch (error) {
        throw new Error(`Error deleting trade: ${error.message}`);
    }
}

// Function to get trade history with pagination support
async function getTradeHistory(page = 1, limit = 10) {
    try {
        const trades = await Trade.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await Trade.countDocuments();
        return { trades, total };
    } catch (error) {
        throw new Error(`Error getting trade history: ${error.message}`);
    }
}

// Function to search trades based on criteria with pagination support
async function searchTrades(criteria, page = 1, limit = 10) {
    try {
        const { symbol, status, startDate, endDate } = criteria;
        const query = {};
        if (symbol) query.symbol = symbol;
        if (status) query.status = status;
        if (startDate && endDate) {
            query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        const trades = await Trade.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await Trade.countDocuments(query);
        return { trades, total };
    } catch (error) {
        throw new Error(`Error searching trades: ${error.message}`);
    }
}

module.exports = {
    createTrade,
    getTrade,
    updateTrade,
    deleteTrade,
    getTradeHistory,
    searchTrades
};
