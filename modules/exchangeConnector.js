const {kucoin,bybit,binance}=require('../config')
const ccxt = require('ccxt');
class ConnectExchange {

    async exchange(type) {
        let exchange 
        try {
          if (type == "kucoin") {
            
            exchange =await new ccxt.kucoin(kucoin,{
                timeout:500

            });
          }
    
          if (type == "bybit") {
            exchange = await new ccxt.bybit(bybit);
          }

          if (type == "binance") {
            exchange = await new ccxt.binance(binance);
          }

          console.log(`connected to ${type}successfully `)
    
          return exchange;
        } catch (error) {
          throw new Error(`Error connecting exchange${error}`);
        }
      
}
}

module.exports = {
    ConnectExchange
};
