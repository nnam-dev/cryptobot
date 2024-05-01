const cron = require('cron');
const {ConnectExchange}=require('../modules/exchangeConnector')

class BotController {

    constructor(trade_config,trade_engine,exchange) {
        this.trade_engine=trade_engine
        this.exchange=exchange
        this.config = trade_config;
        this.isRunning = false;
        this.job = null;

        
    }
   
    async start() {
        if (!this.isRunning) {
            this.isRunning = true;
            console.log('Bot started.');
            await this.runBot();
            // Schedule bot execution using cron job
            this.job = new cron.CronJob(this.config.cronPattern, async () => {
                await this.runBot();
            });

            this.job.start();
        } else {
            console.log('Bot is already running.');
        }
    }

    async stop() {
        if (this.isRunning) {
            this.job.stop();
            this.isRunning = false;
            console.log('Bot stopped.');
        } else {
            console.log('Bot is not running.');
        }
    }

   /* async runBot() {
        try {
            // Analyze the market
            const marketAnalysis = await analyzeMarket();

            // Execute trade based on strategy
            const tradeResult = await executeTrade(marketAnalysis);

            console.log('Bot executed successfully.');

            // Log bot activity
            await this.logActivity('Bot executed successfully.', 'success');
        } catch (error) {
            console.error('Error in bot execution:', error);

            // Log error
           // await this.logActivity(`Error in bot execution: ${error.message}`, 'error');
        }
    }
    */
    async runBot() {

        /*const {symbol,exchangeType,shortPeriod, longPeriod, stopLossPercentage, 
            trailingStopDistance, rsiThreshold, buyThreshold, leverage, 
            accountBalance, riskPercentage, maxDrawdownPercentage}=this.config
            */
        try {
           
            const exchanger=new this.exchange()
            const connect=await exchanger.exchange(this.config.exchange)

            const tradengine= new this.trade_engine(connect, this.config)
    
           await  tradengine.runTradingBot()
           // await this.logActivity('Bot executed successfully.', 'success');
        } catch (error) {
            console.error('Error in bot execution:', error);

        }
    }

}

module.exports = BotController;
