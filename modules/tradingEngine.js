// tradingEngine.js
const ccxt = require('ccxt');
const {movingAverageCrossover}=require('../modules/indicators/movingAverageCrossover')
const {calculateMaxDrawdown}=require("../modules/indicators/maxDrawnDown")
const {calculateFibonacciLevels}=require("../modules/indicators/fibonacciLevels")
const {rsiStrategy}=require('../modules/indicators/rsiStrategy')
const {AIprediction}=require('./AI/index')
const { fiboSmaStrategy}=require('./fibonacchi')
const {fetchTicker}=require('./exchange')

class TradingEngine {
    constructor(exchange,config) {
        this.exchanger = exchange // Initialize KuCoin exchange with API keys
        this.config=config
    }
async  runTradingBot() {

const {symbol,shortPeriod, longPeriod, stopLossPercentage, trailingStopDistance, rsiPeriod,
     overBoughtThreshold,overSoldThreshold, buyThreshold, leverage, accountBalance, riskPercentage,
      maxDrawdownPercentage}=this.config

    
    try {
        const exchange=this.exchanger
        // Fetch current account balance
        const ticker=await fetchTicker(symbol, exchange)
        const currentPrice=ticker.last
        const balance = await exchange.fetchBalance();
        const currentBalance = balance.total.USDT;
        console.log(currentPrice)

        // Load market data
        const candles = await exchange.fetchOHLCV(symbol, '1h'); // Fetch 1-hour candles
        const marketData = {
            high: candles.map(candle => candle[2]),
            low :candles.map(candle => candle[3]),
            close: candles.map(candle => candle[4]), // Close prices
            timestamp: candles.map(candle => candle[0]) // Timestamps
        };
   
        const fiboSmaStrategys=await fiboSmaStrategy(marketData.close,shortPeriod,currentPrice)

         console.log(fiboSmaStrategys)

        const Ai_prediction= await AIprediction(symbol)

        console.log(Ai_prediction)

    
        // Implement trading strategy
       //console.log(`shortPeriod${this.config.shortPeriod}longPeriod ${longPeriod}` )
        const maSignal = await movingAverageCrossover(marketData, shortPeriod, longPeriod);

        const rsiSignal = await rsiStrategy(marketData, rsiPeriod, overBoughtThreshold,overSoldThreshold);

       // const fibo =await calculateFibonacciLevels(marketData.highs,marketData.lows)
        //console.log(marketData.lows)
        // Calculate maximum drawdown
       // const maxDrawdown = await calculateMaxDrawdown(marketData.close);
        //console.log(fibo)
        
        // Check if the price is below the buy threshold and buy signal is generated
        if (marketData.close[marketData.close.length - 1] < buyThreshold && maSignal === 'BUY' && rsiSignal === 'BUY') {
            // Calculate position size
            const positionSize = await calculatePositionSize(accountBalance, riskPercentage, marketData.close[marketData.close.length - 1], marketData.close[marketData.close.length - 1] * (1 - stopLossPercentage / 100));

            // Set leverage
            await exchange.setLeverage(symbol, leverage);

            // Execute buy order
            console.log('Executing BUY order');
            // Implement buy order execution using CCXT
            // Replace the following lines with your buy order execution logic
            const buyOrder = await exchange.createMarketBuyOrder(symbol, positionSize);
            console.log('Buy order placed:', buyOrder);
            // Apply stop-loss and trailing stop-loss
            applyStopLoss(symbol, stopLossPercentage);
            applyTrailingStopLoss(symbol, trailingStopDistance);
        }
        // Check if the sell signal is generated
        else if (maSignal === 'SELL' || rsiSignal === 'SELL') {
            // Execute sell order
            console.log('Executing SELL order');
            // Implement sell order execution using CCXT
            // Replace the following lines with your sell order execution logic
            const sellOrder = await exchange.createMarketSellOrder(symbol, positionSize);
            console.log('Sell order placed:', sellOrder);
            // Clear stop-loss and trailing stop-loss
            clearStopLoss(symbol);
            clearTrailingStopLoss(symbol);
        }
    
    } catch (error) {
        console.error('Error:', error);
    }
}

}

module.exports = {
    TradingEngine
};
