const ccxt = require('ccxt');
const { authenticate } = require('../utils/authentication');
const { kucoin } = require('../config');



module.exports = {
    fetchMarketData: async (symbol) => {
        try {
            const ticker = await exchange.fetchTicker(symbol);
            return ticker;
        } catch (error) {
            throw new Error(`Error fetching market data: ${error}`);
        }
    },

    fetchAccountBalances: async () => {
        try {
            authenticate(exchange);
            const balances = await exchange.fetchBalance();
            return balances;
        } catch (error) {
            throw new Error(`Error fetching account balances: ${error}`);
        }
    },

    placeOrder: async (order) => {
        try {
            authenticate(exchange);
            const result = await exchange.createOrder(order.symbol, order.type, order.side, order.amount, order.price);
            return result;
        } catch (error) {
            throw new Error(`Error placing order: ${error}`);
        }
    },

    fetchOrderStatus: async (orderId) => {
        try {
            authenticate(exchange);
            const order = await exchange.fetchOrder(orderId);
            return order;
        } catch (error) {
            throw new Error(`Error fetching order status: ${error}`);
        }
    },

    cancelOrder: async (orderId) => {
        try {
            authenticate(exchange);
            const result = await exchange.cancelOrder(orderId);
            return result;
        } catch (error) {
            throw new Error(`Error canceling order: ${error}`);
        }
    },

    fetchOpenOrders: async () => {
        try {
            authenticate(exchange);
            const orders = await exchange.fetchOpenOrders();
            return orders;
        } catch (error) {
            throw new Error(`Error fetching open orders: ${error}`);
        }
    },

    fetchClosedOrders: async () => {
        try {
            authenticate(exchange);
            const orders = await exchange.fetchClosedOrders();
            return orders;
        } catch (error) {
            throw new Error(`Error fetching closed orders: ${error}`);
        }
    }
};
