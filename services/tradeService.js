
class TradeService {
    constructor(exchange) {
        this.exchange = exchange // Initialize KuCoin exchange with API keys
    }

    async executeTrade(config) {

        const {category,symbol,amount,price,side,orderType,takeProfit,stopLoss}=config
        try {
            const order = await this.exchange.createOrder(category,symbol, amount, price,side,orderType,takeProfit,stopLoss);
            return order;
        } catch (error) {
            throw new Error(`Error executing buy order: ${error.message}`);
        }
    }
async executeBuyOrder(symbol, amount, price ) {


    try {
        const order = await this.exchange.createLimitBuyOrder(symbol, amount, price);
        return order;
    } catch (error) {
        throw new Error(`Error executing buy order: ${error.message}`);
    }
}
async  executeSellOrder(symbol, amount, price) {
    try {
        const order = await this.exchange.createLimitSellOrder(symbol, amount, price);
        return order;
    } catch (error) {
        throw new Error(`Error executing sell order: ${error.message}`);
    }
}

async cancelOrder(orderId) {
    try {
        const result = await this.exchange.cancelOrder(orderId);
        return result;
    } catch (error) {
        throw new Error(`Error canceling order: ${error.message}`);
    }
}

async  getOrderStatus(orderId) {
    try {
        const order = await this.exchange.fetchOrder(orderId);
        return order;
    } catch (error) {
        throw new Error(`Error fetching order status: ${error.message}`);
    }
}

async  fetchTradeHistory(symbol) {
    try {
        const trades = await this.exchange.fetchMyTrades(symbol);
        return trades;
    } catch (error) {
        throw new Error(`Error fetching trade history: ${error.message}`);
    }
}

async  fetchOpenOrders(symbol) {
    try {
        const orders = await this.exchange.fetchOpenOrders(symbol);
        return orders;
    } catch (error) {
        throw new Error(`Error fetching open orders: ${error.message}`);
    }
}

async fetchOrderBook(symbol, limit = 10) {
    try {
        const orderBook = await this.exchange.fetchOrderBook(symbol, limit);
        return orderBook;
    } catch (error) {
        throw new Error(`Error fetching order book: ${error.message}`);
    }
}

async fetchTradeFees() {
    try {
        const fees = await this.exchange.fetchTradingFees();
        return fees;
    } catch (error) {
        throw new Error(`Error fetching trade fees: ${error.message}`);
    }
}

}
/*
module.exports = {
    executeBuyOrder,
    executeSellOrder,
    cancelOrder,
    getOrderStatus,
    fetchTradeHistory,
    fetchOpenOrders,
    fetchOrderBook,
    fetchTradeFees,
};
*/