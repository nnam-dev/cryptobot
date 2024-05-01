// Example configuration
const ccxt = require("ccxt");

module.exports = {
  kucoin: {
    apiKey: "YOUR_API_KEY",
    secret: "YOUR_API_SECRET",
    passphrase: "YOUR_API_PASSPHRASE",
  },
  bybit: {
    apiKey: "OK54cLXAqEq4oYZUtX",
    secret: "fAOERXG6p7gXu9KUGkhxkfnKpXMsQjYdhd6P",
    enableRateLimit: true,
   timeout: 50000
  },
  binance: {
    apiKey: "pMrSk3EFNsy4MayNHuDpTJxxsksgMJ6eOe2VVWqe8NQ5K8zNvNX4225TO5lZUd4p",
    secret: "CBr35mW9z2DqtvmFYt2PwgTeYOmjUt78LZKEYRXzBozk36ynscD84kYK5NL1mDNI",
    options: {
      defaultType: 'future',
  }
  },
  cronPattern: "* * * * *",
  database: {
    db_name: "bot",
    db_user: "postgres",
    db_password: "admin",
    db_host: "localhost",
    dialect: "postgres",
    //storage: 'database.sqlite'
  },

  
};
