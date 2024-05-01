// tradingEngine.js

function calculateFibonacciLevels(highPrices, lowPrices) {
    // Find the highest high and lowest low within the provided data
    const highestHigh = Math.max(...highPrices);
    const lowestLow = Math.min(...lowPrices);

    // Calculate the range (difference) between the highest high and lowest low
    const range = highestHigh - lowestLow;

    // Initialize an object to store the Fibonacci retracement levels
    const fibonacciLevels = {};

    // Define the Fibonacci ratios
    const fibonacciRatios = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];

    // Calculate each Fibonacci retracement level and store it in the object
    fibonacciRatios.forEach(ratio => {
        const level = highestHigh - ratio * range;
        fibonacciLevels[ratio] = level;
    });

    // Return the calculated Fibonacci retracement levels
    return fibonacciLevels;
}

module.exports = {
    calculateFibonacciLevels
};
