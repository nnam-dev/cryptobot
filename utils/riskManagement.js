// riskManagement.js
const ccxt = require('ccxt');

async function applyStopLoss(symbol, stopLossPercentage) {
    try {
        // Initialize Bybit exchange instance
        const exchange = new ccxt.bybit({
            apiKey: 'YOUR_API_KEY',
            secret: 'YOUR_API_SECRET'
        });

        // Fetch current open positions
        const positions = await exchange.fetchPositions(symbol);
        const position = positions.find(pos => pos.symbol === symbol);

        // Calculate stop-loss price based on current position entry price
        const entryPrice = position.entry_price;
        const stopLossPrice = entryPrice * (1 - stopLossPercentage / 100);

        // Place stop-loss order
        const order = await exchange.createMarketSellOrder(symbol, position.size, {
            stop_loss: stopLossPrice
        });
        console.log('Stop-loss order placed:', order);
    } catch (error) {
        console.error('Error applying stop-loss:', error);
    }
}

async function applyTrailingStopLoss(symbol, trailingStopDistance) {
    try {
        // Initialize Bybit exchange instance
        const exchange = new ccxt.bybit({
            apiKey: 'YOUR_API_KEY',
            secret: 'YOUR_API_SECRET'
        });

        // Fetch current open positions
        const positions = await exchange.fetchPositions(symbol);
        const position = positions.find(pos => pos.symbol === symbol);

        // Calculate trailing stop-loss price based on current position entry price
        const entryPrice = position.entry_price;
        const trailingStopPrice = entryPrice * (1 - trailingStopDistance / 100);

        // Place trailing stop-loss order
        const order = await exchange.createMarketSellOrder(symbol, position.size, {
            trailing_stop: trailingStopPrice
        });
        console.log('Trailing stop-loss order placed:', order);
    } catch (error) {
        console.error('Error applying trailing stop-loss:', error);
    }
}

async function clearStopLoss(symbol) {
    try {
        // Logic to cancel existing stop-loss order
        // This depends on the exchange's API
    } catch (error) {
        console.error('Error clearing stop-loss:', error);
    }
}

async function clearTrailingStopLoss(symbol) {
    try {
        // Logic to cancel existing trailing stop-loss order
        // This depends on the exchange's API
    } catch (error) {
        console.error('Error clearing trailing stop-loss:', error);
    }
}

module.exports = {
    applyStopLoss,
    applyTrailingStopLoss,
    clearStopLoss,
    clearTrailingStopLoss
};
