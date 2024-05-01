const config =require('../config')
const exchangeService=require('./exchangeService')

const tulind = require('tulind');

async function calculateMACD(data) {
    return new Promise((resolve, reject) => {
        tulind.indicators.macd.indicator([data.close], [], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const [macdLine, signalLine, histogram] = results;
                resolve({ macdLine, signalLine, histogram });
            }
        });
    });
}

async function calculateRSI(data, period = 14) {
    return new Promise((resolve, reject) => {
        tulind.indicators.rsi.indicator([data.close], [period], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const [rsi] = results;
                resolve(rsi);
            }
        });
    });
}

async function calculateSMA(data, period = 20) {
    return new Promise((resolve, reject) => {
        tulind.indicators.sma.indicator([data.close], [period], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const [sma] = results;
                resolve(sma);
            }
        });
    });
}

async function calculateEMA(data, period = 20) {
    return new Promise((resolve, reject) => {
        tulind.indicators.ema.indicator([data.close], [period], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const [ema] = results;
                resolve(ema);
            }
        });
    });
}

async function calculateStochastic(data, kPeriod = 14, dPeriod = 3) {
    return new Promise((resolve, reject) => {
        tulind.indicators.stoch.indicator([data.high, data.low, data.close], [kPeriod, dPeriod], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const [k, d] = results;
                resolve({ k, d });
            }
        });
    });
}

async function calculateATR(data, period = 14) {
    return new Promise((resolve, reject) => {
        tulind.indicators.atr.indicator([data.high, data.low, data.close], [period], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const [atr] = results;
                resolve(atr);
            }
        });
    });
}

async function analyzeMarket() {
    const exchange=new exchangeService()
    data=await exchange.fetchOHLCV()
    // Fetch historical market data from KuCoin or other sources


    
    // Calculate technical indicators
    const macdData = await calculateMACD(data);
    const rsiData = await calculateRSI(data);
    const smaData = await calculateSMA(data);
    const emaData = await calculateEMA(data);
    const stochasticData = await calculateStochastic(data);
    const atrData = await calculateATR(data);

    // Perform additional analysis or combine indicators as needed

    return { macdData, rsiData, smaData, emaData, stochasticData, atrData };
}

module.exports = { analyzeMarket };
