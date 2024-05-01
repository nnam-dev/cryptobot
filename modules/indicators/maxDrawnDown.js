// riskManagement.js

async function calculateMaxDrawdown(prices) {
    try {
        let maxDrawdown = 0;
        let peak = prices[0];
        let startDrawdown = 0;
        let endDrawdown = 0;

        for (let i = 1; i < prices.length; i++) {
            const price = prices[i];

            if (price > peak) {
                peak = price; // Update peak if a higher price is encountered
            } else {
                const drawdown = (peak - price) / peak; // Calculate drawdown from peak
                if (drawdown > maxDrawdown) {
                    maxDrawdown = drawdown; // Update max drawdown if a larger drawdown is found
                    startDrawdown = peak; // Set start of drawdown
                    endDrawdown = price; // Set end of drawdown
                }
            }
        }

        return {
            maxDrawdown,
            startDrawdown,
            endDrawdown
        };
    } catch (error) {
        console.error('Error calculating max drawdown:', error);
        return {
            maxDrawdown: 0,
            startDrawdown: 0,
            endDrawdown: 0
        };
    }
}

module.exports = {
    calculateMaxDrawdown
};
