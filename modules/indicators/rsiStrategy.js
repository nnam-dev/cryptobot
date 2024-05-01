// tradingEngine.js
const tulind = require('tulind');

async function rsiStrategy(marketData, rsiPeriod, overboughtThreshold, oversoldThreshold) {
    try {
        // Extract close prices from market data
        const closePrices = marketData.close;

        // Calculate RSI
        const rsiValues = await calculateRSI(closePrices, rsiPeriod);

        // Get the last RSI value
        const lastRSI = rsiValues[rsiValues.length - 1];

        // Determine signal based on RSI
        if (lastRSI > overboughtThreshold) {
            return 'SELL'; // Signal to sell (overbought)
        } else if (lastRSI < oversoldThreshold) {
            return 'BUY'; // Signal to buy (oversold)
        } else {
            return 'NEUTRAL'; // No clear signal
        }
    } catch (error) {
        console.error('Error in RSI strategy:', error);
        return 'NEUTRAL'; // Return neutral signal in case of error
    }
}

async function calculateRSI(data, period) {
    return new Promise((resolve, reject) => {
        tulind.indicators.rsi.indicator([data], [period], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

module.exports = {
    rsiStrategy
};
