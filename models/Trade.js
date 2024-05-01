

module.exports = (sequelize, DataTypes) => {
    const Trade = sequelize.define('Trade', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
         symbol: {
            type: DataTypes.STRING,
            allowNull: false
        },
         stoploss: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        takeprofit: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    });

    return Trade;
};
