const { Sequelize } = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize('bot', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres', // Use the PostgreSQL dialect
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  sequelize,
  testConnection,
};
