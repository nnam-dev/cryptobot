const tulind = require('tulind');
const exchangeController = require('./exchangeController');

module.exports = {
    // Example moving average crossover strategy
    movingAverageCrossover: async (symbol, period1, period2) => {
        try {
            const marketData = await exchangeController.fetchMarketData(symbol);
            const closes = marketData.map(data => data.close);
            
            // Calculate moving averages
            const ma1 = await tulind.indicators.sma.indicator([closes], [period1]);
            const ma2 = await tulind.indicators.sma.indicator([closes], [period2]);
            
            // Check for crossover
            if (ma1[0][0] > ma2[0][0] && ma1[0][1] < ma2[0][1]) {
                // Place buy order
                const order = {
                    symbol: symbol,
                    type: 'limit', // or 'market' if you want to place a market order
                    side: 'buy',
                    amount: 1, // Example amount
                    price: marketData[marketData.length - 1].close // Place order at current close price
                };
                const result = await exchangeController.placeOrder(order);
                console.log('Buy order placed:', result);
            } else if (ma1[0][0] < ma2[0][0] && ma1[0][1] > ma2[0][1]) {
                // Place sell order
                const order = {
                    symbol: symbol,
                    type: 'limit', // or 'market' if you want to place a market order
                    side: 'sell',
                    amount: 1, // Example amount
                    price: marketData[marketData.length - 1].close // Place order at current close price
                };
                const result = await exchangeController.placeOrder(order);
                console.log('Sell order placed:', result);
            }
        } catch (error) {
            console.error(`Error executing moving average crossover strategy: ${error}`);
        }
    }
    // Other trading strategies can be implemented similarly
};
