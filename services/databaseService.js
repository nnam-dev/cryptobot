const { Sequelize, Op } = require('sequelize');
const { database } = require('../config');
const Order = require('../models/Order');
const Trade = require('../models/Trade');

 const sequelize = new Sequelize(database.db_name, database.db_user, database.db_password, {
    host: database.db_host,
    dialect: database.dialect, 
  });

// Define associations if needed
Order.hasMany(Trade); // Assuming each order has multiple trades

module.exports = {
    initializeDatabase: async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection to the database has been established successfully.');
            await sequelize.sync(); // Create tables based on defined models
            console.log('Database synchronized.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },

    saveOrder: async (orderData) => {
        try {
            const order = await Order.create(orderData);
            return order;
        } catch (error) {
            throw new Error(`Error saving order: ${error}`);
        }
    },

    saveTrade: async (tradeData) => {
        try {
            const trade = await Trade.create(tradeData);
            return trade;
        } catch (error) {
            throw new Error(`Error saving trade: ${error}`);
        }
    },

    updateOrder: async (orderId, updates) => {
        try {
            const [updatedRows] = await Order.update(updates, { where: { id: orderId } });
            return updatedRows > 0;
        } catch (error) {
            throw new Error(`Error updating order: ${error}`);
        }
    },

    deleteOrder: async (orderId) => {
        try {
            const deletedRows = await Order.destroy({ where: { id: orderId } });
            return deletedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting order: ${error}`);
        }
    },

    getTradesByOrderId: async (orderId) => {
        try {
            const trades = await Trade.findAll({ where: { orderId } });
            return trades;
        } catch (error) {
            throw new Error(`Error fetching trades by order ID: ${error}`);
        }
    },

    getTradesByType: async (type) => {
        try {
            const trades = await Trade.findAll({ where: { type } });
            return trades;
        } catch (error) {
            throw new Error(`Error fetching trades by type: ${error}`);
        }
    },

    getTotalTradeVolume: async (symbol) => {
        try {
            const totalVolume = await Trade.sum('amount', { where: { symbol } });
            return totalVolume || 0;
        } catch (error) {
            throw new Error(`Error calculating total trade volume: ${error}`);
        }
    },


    getTotalOrderAmount: async (symbol) => {
        try {
            const totalAmount = await Order.sum('amount', { where: { symbol } });
            return totalAmount || 0;
        } catch (error) {
            throw new Error(`Error calculating total order amount: ${error}`);
        }
    },

    getTotalTradeProfit: async (symbol) => {
        try {
            const trades = await Trade.findAll({ where: { symbol } });
            const totalProfit = trades.reduce((acc, trade) => {
                if (trade.side === 'buy') {
                    return acc - (trade.amount * trade.price);
                } else {
                    return acc + (trade.amount * trade.price);
                }
            }, 0);
            return totalProfit || 0;
        } catch (error) {
            throw new Error(`Error calculating total trade profit: ${error}`);
        }
    },

    getTradesByDateRange: async (startDate, endDate) => {
        try {
            const trades = await Trade.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            return trades;
        } catch (error) {
            throw new Error(`Error fetching trades by date range: ${error}`);
        }
    },
    // Add more database interaction functions as needed
};
