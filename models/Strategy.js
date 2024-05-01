

module.exports = (sequelize, DataTypes) => {
    const Strategy = sequelize.define('Strategy', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        period: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        buythresh: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        sellthresh: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
       
    });
    
    return Strategy;
};




