const {fetchHistoricalData,preprocessData,trainModel,predict}=require('./functions')



async function AIprediction(symbol) {
    //const symbol = 'BTC/USDT';
    const timeframe = '1h';

    try {
        // Fetch historical data
        const historicalData = await fetchHistoricalData(symbol, timeframe);

        // Preprocess data
        const preprocessedData = preprocessData(historicalData);

       // console.log(preprocessedData)

        // Split data into features and labels
        const trainingData = preprocessedData.slice(0, Math.floor(0.8 * preprocessedData.length));
        
        const testingData = preprocessedData.slice(Math.floor(0.8 * preprocessedData.length));
        
     const dt=   [{
            open: 0.9421042367510116,
            high: 0.9214347435658499,
            low: 0.953159092692881,
            close: 0.9406989688543637,
            volume: 0.012053322146309312,
            sma5: 0.9320678979742739,
            sma10: 0.9147756912901099,
            sma20: 0.8610756742262342,
            label: 'buy'
          },
            {
    open: 0.9421042367510116,
    high: 0.9214347435658499,
    low: 0.953159092692881,
    close: 0.9406989688543637,
    volume: 0.012053322146309312,
    sma5: 0.9320678979742739,
    sma10: 0.9147756912901099,
    sma20: 0.8610756742262342,
    label: 'buy'
  },
  {
    open: 0.9407066127118773,
    high: 0.9276189830738216,
    low: 0.949878345498783,
    close: 0.95941235262093,
    volume: 0.018528617994522212,
    sma5: 0.9285494893025747,
    sma10: 0.9042220904060387,
    sma20: 0.8494377046649383,
    label: 'sell'
  },
  {
    open: 0.9594038970958668,
    high: 0.9311177377543594,
    low: 0.9504826936661177,
    close: 0.9354660469500344,
    volume: 0.01878410371152503,
    sma5: 0.9182445334655103,
    sma10: 0.892614592051484,
    sma20: 0.8370485182867865,
    label: 'sell'
  },
  {
    open: 0.9354573968439697,
    high: 0.9093712407448206,
    low: 0.9275881014049128,
    close: 0.9185321816571457,
    volume: 0.042668841633684035,
    sma5: 0.9114449852519357,
    sma10: 0.8825729074406622,
    sma20: 0.8263685634654291,
    label: 'sell'
  },{
            open: 0.9407066127118773,
            high: 0.9276189830738216,
            low: 0.949878345498783,
            close: 0.95941235262093,
            volume: 0.018528617994522212,
            sma5: 0.9285494893025747,
            sma10: 0.9042220904060387,
            sma20: 0.8494377046649383,
            label: 'sell'
          },
          {
            open: 0.9594038970958668,
            high: 0.9311177377543594,
            low: 0.9504826936661177,
            close: 0.9354660469500344,
            volume: 0.01878410371152503,
            sma5: 0.9182445334655103,
            sma10: 0.892614592051484,
            sma20: 0.8370485182867865,
            label: 'sell'
          },
          {
            open: 0.9354573968439697,
            high: 0.9093712407448206,
            low: 0.9275881014049128,
            close: 0.9185321816571457,
            volume: 0.042668841633684035,
            sma5: 0.9114449852519357,
            sma10: 0.8825729074406622,
            sma20: 0.8263685634654291,
            label: 'sell'
          }]
        console.log(dt)

        // Train machine learning model
        const model = trainModel(dt);

        

        // Make predictions
        const predictions = predict(model, testingData);
            
        return predictions
        // Execute trades based on predictions
       // await executeTrades(symbol, predictions);
    } catch (error) {
        console.error('Error executing trading bot:', error.message);
    }
}

module.exports={
    AIprediction
}
