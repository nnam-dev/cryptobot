const ccxt = require("ccxt");
const fs = require("fs");
const { promisify } = require("util");
const { pipeline } = require("stream");
const { parse } = require("json2csv");
const { DecisionTreeClassifier } = require("ml-cart");
const { binance } = require("../../config");

// Initialize exchange
const exchange = new ccxt.binance(binance);

// Function to fetch historical market data
async function fetchHistoricalData(symbol, timeframe) {
  try {
    const ohlcv = await exchange.fetchOHLCV(symbol, timeframe);
    return ohlcv.map((data) => ({
      open: data[1],
      high: data[2],
      low: data[3],
      close: data[4],
      volume: data[5],
    }));
  } catch (error) {
    console.error("Error fetching historical data:", error.message);
    throw error;
  }
}

// Function to preprocess data and extract features
function preprocessData(data) {
  // Perform data preprocessing and feature extraction

  // Example: Normalize the data
  const normalizedData = normalizeData(data);

  // Example: Add moving averages as additional features
  const withMovingAverages = addMovingAverages(normalizedData);

  // Example: Add labels based on some condition (e.g., price increase/decrease)
  const labeledData = addLabels(withMovingAverages);

  return labeledData;
}

// Example: Normalize the data
// Function to normalize data
function normalizeData(data) {
    // Calculate min and max values for each feature
    const minMaxValues = {};
    const features = ['open', 'high', 'low', 'close', 'volume'];
    features.forEach(feature => {
        minMaxValues[feature] = {
            min: Math.min(...data.map(item => item[feature])),
            max: Math.max(...data.map(item => item[feature]))
        };
    });

    // Normalize each feature using min-max scaling
    const normalizedData = data.map(item => {
        const normalizedItem = {};
        features.forEach(feature => {
            const { min, max } = minMaxValues[feature];
            normalizedItem[feature] = (item[feature] - min) / (max - min);
        });
        return normalizedItem;
    });
    

    return normalizedData;
}

// Example: Add moving averages as additional features
function addMovingAverages(data) {
  // Calculate moving averages for different periods
  const sma5 = calculateSMA(data, 5);
  const sma10 = calculateSMA(data, 10);
  const sma20 = calculateSMA(data, 20);

  // Add moving averages as additional features
  const withMovingAverages = data.map((item, index) => ({
    ...item,
    sma5: sma5[index],
    sma10: sma10[index],
    sma20: sma20[index],
  }));
  return withMovingAverages;
}

// Example: Calculate Simple Moving Average (SMA)
function calculateSMA(data, period) {
  const sma = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data
      .slice(i - period + 1, i + 1)
      .reduce((acc, item) => acc + item.close, 0);
    const average = sum / period;
    sma.push(average);
  }
  return sma;
}

// Example: Add labels based on some condition (e.g., price increase/decrease)
function addLabels(data) {
  const labeledData = data.map((item, index) => {
    if (index < data.length - 1) {
      const nextClose = data[index + 1].close;
      const priceChange = nextClose - item.close;
      return {
        ...item,
        label: priceChange > 0 ? "buy" : "sell",
      };
    } else {
      // Last data point, no label
      return item;
    }
  });
  return labeledData;
}

// Function to train machine learning model
// Function to train machine learning model
// Function to train machine learning model
function trainModel(data) {
    // Ensure data is a 2D array with at least one element
    console.log(Array.isArray(data[0]))
    if (!Array.isArray(data) || data.length === 0 || !Array.isArray(data[0])) {
        throw new Error('Data must be a 2D array with at least one element');
    }

    // Extract features and labels
    const features = data.map(item => ({
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume,
        sma5: item.sma5,
        sma10: item.sma10,
        sma20: item.sma20
    }));
    const labels = data.map(item => item.label);

    // Perform feature scaling if necessary (e.g., standardization)

    // Split the data into training and validation sets
    const splitIndex = Math.floor(0.8 * data.length);
    const X_train = features.slice(0, splitIndex);
    const y_train = labels.slice(0, splitIndex);
    const X_val = features.slice(splitIndex);
    const y_val = labels.slice(splitIndex);

    // Train decision tree classifier with hyperparameter tuning and cross-validation
    const classifier = new DecisionTreeClassifier({
        maxDepth: 5,
        minNumSamples: 2
        // Add more hyperparameters as needed
    });
    classifier.train(X_train, y_train);

    // Evaluate model on validation set
    const accuracy = evaluateModel(classifier, X_val, y_val);
    console.log('Validation accuracy:', accuracy);

    return classifier;
}

// Function to evaluate model on validation set
function evaluateModel(model, X_val, y_val) {
    const predictions = model.predict(X_val);
    const correctPredictions = predictions.filter((pred, index) => pred === y_val[index]);
    const accuracy = correctPredictions.length / y_val.length;
    return accuracy;
}

// Function to make predictions using the trained model
function predict(model, data) {
  const features = data.map((item) => [
    item.open,
    item.high,
    item.low,
    item.close,
    item.volume,
  ]);
  const predictions = model.predict(features);

  return predictions;
}

// Function to execute trades based on predictions
/* async function executeTrades(symbol, predictions) {
    for (let i = 0; i < predictions.length; i++) {
        const prediction = predictions[i];
        if (prediction === 'buy') {
            // Execute buy order
            // Implement your buy logic here
            console.log(`Place buy order for ${symbol} at index ${i}`);
        } else if (prediction === 'sell') {
            // Execute sell order
            // Implement your sell logic here
            console.log(`Place sell order for ${symbol} at index ${i}`);
        }
    }
}
*/
module.exports = {
  fetchHistoricalData,
  preprocessData,
  normalizeData,
  trainModel,
  addLabels,
  predict,
};
