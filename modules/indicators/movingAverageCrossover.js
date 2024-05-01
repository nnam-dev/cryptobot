// tradingEngine.js
const tulind = require('tulind');


    
async function movingAverageCrossover(marketData, shortPeriod, longPeriod) {
    try {
        // Extract close prices from market data
        const closePrices = marketData.close;

        // Calculate short-term moving average
        const shortMA = await calculateMovingAverage(closePrices, shortPeriod);

        // Calculate long-term moving average
        const longMA = await calculateMovingAverage(closePrices, longPeriod);

        // Determine signal based on moving average crossover
        if (shortMA[shortMA.length - 1] > longMA[longMA.length - 1]) {
            return 'BUY'; // Signal to buy
        } else {
            return 'SELL'; // Signal to sell
        }
    } catch (error) {
        console.error('Error in moving average crossover:', error);
        return 'NEUTRAL'; // Return neutral signal in case of error
    }
}

async  function calculateMovingAverage(data, period) {
    return new Promise((resolve, reject) => {
        tulind.indicators.sma.indicator([data], [period], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}


module.exports = {
    movingAverageCrossover
};
