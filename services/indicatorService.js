const tulind = require('tulind');

module.exports = {
    calculateSMA: async (values, period) => {
        try {
            const sma = await tulind.indicators.sma.indicator([values], [period]);
            return sma[0]; // Returns an array of SMA values
        } catch (error) {
            throw new Error(`Error calculating SMA: ${error}`);
        }
    },

    calculateEMA: async (values, period) => {
        try {
            const ema = await tulind.indicators.ema.indicator([values], [period]);
            return ema[0]; // Returns an array of EMA values
        } catch (error) {
            throw new Error(`Error calculating EMA: ${error}`);
        }
    },

    calculateRSI: async (values, period) => {
        try {
            const rsi = await tulind.indicators.rsi.indicator([values], [period]);
            return rsi[0]; // Returns an array of RSI values
        } catch (error) {
            throw new Error(`Error calculating RSI: ${error}`);
        }
    },

    calculateMACD: async (values, shortPeriod, longPeriod, signalPeriod) => {
        try {
            const macd = await tulind.indicators.macd.indicator([values], [shortPeriod, longPeriod, signalPeriod]);
            return macd; // Returns an array of MACD values [MACD Line, Signal Line, Histogram]
        } catch (error) {
            throw new Error(`Error calculating MACD: ${error}`);
        }
    },

    calculateBollingerBands: async (values, period, stddev) => {
        try {
            const bollingerBands = await tulind.indicators.bbands.indicator([values], [period, stddev]);
            return bollingerBands; // Returns an array of Bollinger Bands values [Upper Band, Middle Band, Lower Band]
        } catch (error) {
            throw new Error(`Error calculating Bollinger Bands: ${error}`);
        }
    },

    // Add more indicator calculation functions as needed
};
