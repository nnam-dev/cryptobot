// models/index.js
const { DataTypes } = require('sequelize');
const {sequelize}=require('../config/database');
const User = require('./User')(sequelize, DataTypes);
const Trade =  require('./Trade')(sequelize, DataTypes);
const Order = new require('./Order')(sequelize, DataTypes);
const Strategy = require('./Strategy')(sequelize, DataTypes);

// Define associations between models if needed

User.hasMany(Trade);
Trade.hasMany(Order);
Trade.hasMany(Strategy);
Trade.belongsTo(User);
Order.belongsTo(Trade);
Strategy.belongsTo(Trade);


module.exports = {
    sequelize: sequelize,
    User: User,
    Trade: Trade,
    Strategy:Strategy,
    Order :Order

};