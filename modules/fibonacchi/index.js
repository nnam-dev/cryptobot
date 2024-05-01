// Function to implement trading strategy


// Function to calculate SMA
function calculateSMA(data, period) {
    if (data.length < period) {
        throw new Error('Insufficient data for calculating SMA');
    }

    const smaValues = [];
    for (let i = period - 1; i < data.length; i++) {
        const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val, 0);
        const sma = sum / period;
        smaValues.push(sma);
    }

    return smaValues;
}

// Function to identify swing highs and lows
function identifySwingHighsLows(data) {
    const swingHighs = [];
    const swingLows = [];

    for (let i = 1; i < data.length - 1; i++) {
        if (data[i] > data[i - 1] && data[i] > data[i + 1]) {
            swingHighs.push({ index: i, value: data[i] });
        } else if (data[i] < data[i - 1] && data[i] < data[i + 1]) {
            swingLows.push({ index: i, value: data[i] });
        }
    }

    return { swingHighs, swingLows };
}

// Function to calculate Fibonacci retracement levels
function calculateFibonacciRetracement(swingHigh, swingLow) {
    const retracementLevels = {
        '0.236': swingHigh - ((swingHigh - swingLow) * 0.236),
        '0.382': swingHigh - ((swingHigh - swingLow) * 0.382),
        '0.500': swingHigh - ((swingHigh - swingLow) * 0.500),
        '0.618': swingHigh - ((swingHigh - swingLow) * 0.618),
        '1.000': swingHigh
    };

    return retracementLevels;
}








function implementTradingStrategy(smaValues, currentPrice,fibonacciLevels) {
    const lastSMA = smaValues[smaValues.length - 1];
    
    // Check if current price is above SMA
    if (currentPrice > lastSMA) {
        // Look for Fibonacci retracement levels below current price
        for (const level of fibonacciLevels) {
            for (const [ratio, price] of Object.entries(level.levels)) {
                if (price < currentPrice) {

                    // Buy signal: Price is below Fibonacci retracement level
                    console.log(`Buy Signal: Price ${currentPrice} is below Fibonacci ${ratio} retracement level ${price}`);
                    return 'BUY';
                }
            }
        }
    } else {
        // Look for Fibonacci retracement levels above current price
        for (const level of fibonacciLevels) {
            for (const [ratio, price] of Object.entries(level.levels)) {
                if (price > currentPrice) {
                    // Sell signal: Price is above Fibonacci retracement level
                    console.log(`Sell Signal: Price ${currentPrice} is above Fibonacci ${ratio} retracement level ${price}`);
                    return 'SELL';
                }
            }
        }
    }
}

// Update main function to include trading strategy implementation
async function fiboSmaStrategy(closingPrices,period,currentPrice) {
    
   
    // Calculate SMA
    const smaValues = calculateSMA(closingPrices, period);

    // Identify swing highs and lows
    const { swingHighs, swingLows } = identifySwingHighsLows(closingPrices);

    // Calculate Fibonacci retracement levels for each swing high and low
    const fibonacciLevels = [];
    for (const swingHigh of swingHighs) {
        for (const swingLow of swingLows) {
            fibonacciLevels.push({
                swingHigh: swingHigh.value,
                swingLow: swingLow.value,
                levels: calculateFibonacciRetracement(swingHigh.value, swingLow.value)
            });
        }
    }

    // Print Fibonacci retracement levels
    console.log('Fibonacci Retracement Levels:');
    fibonacciLevels.forEach(level => console.log(level));

    // Simulate real-time price updates
  /*  for (let i = period; i < closingPrices.length; i++) {
        const currentPrice = closingPrices[i];
        console.log(`Current Price: ${currentPrice}`);  // Implement trading strategy
        
    }
*/
    implementTradingStrategy(smaValues, fibonacciLevels, currentPrice);
}

module.exports={
    fiboSmaStrategy

}

/*// Example usage
const symbol = 'BTCUSD'; // Symbol for Bitcoin futures contract
const timeframe = '1h'; // Timeframe for price data (e.g., 1 hour)
const period = 20; // SMA period
runTradingBot(symbol, timeframe, period)
    .then(() => console.log('Trading bot completed successfully'))
    .catch(error => console.error('Error running trading bot:', error));
*/