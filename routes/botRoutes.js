// botRoutes.js
const express = require('express');
const router = express.Router();
const botController=require('../controllers/botController')
const tradeConfig=require('../config/trade')
const {TradingEngine}=require('../modules/tradingEngine')
const {ConnectExchange}=require('../modules/exchangeConnector')

const cont=new botController(tradeConfig,TradingEngine,ConnectExchange)
// Route to start the trading bot
router.get('/start', async (req, res) => {
    try {

       // await startBot();
       await cont.start()
        res.status(200).json({ message: 'Trading bot started successfully' });
    } catch (error) {
        console.error('Error starting bot:', error);
        res.status(500).json({ message: 'Failed to start trading bot' });
    }
});

// Route to stop the trading bot
router.post('/stop', async (req, res) => {
    try {
        await stopBot();
        res.status(200).json({ message: 'Trading bot stopped successfully' });
    } catch (error) {
        console.error('Error stopping bot:', error);
        res.status(500).json({ message: 'Failed to stop trading bot' });
    }
});

// Route to check if the trading bot is running
router.get('/status', (req, res) => {
    try {
        const running = isBotRunning();
        res.status(200).json({ running });
    } catch (error) {
        console.error('Error checking bot status:', error);
        res.status(500).json({ message: 'Failed to check bot status' });
    }
});

// Route to get bot configuration
router.get('/config', async (req, res) => {
    try {
        const config = await getBotConfig();
        res.status(200).json({ config });
    } catch (error) {
        console.error('Error getting bot configuration:', error);
        res.status(500).json({ message: 'Failed to get bot configuration' });
    }
});

// Route to update bot configurations
router.put('/config', async (req, res) => {
    try {
        const updatedConfig = await updateBotConfig(req.body);
        res.status(200).json({ message: 'Bot configuration updated successfully', config: updatedConfig });
    } catch (error) {
        console.error('Error updating bot configuration:', error);
        res.status(500).json({ message: 'Failed to update bot configuration' });
    }
});

// Route to reset bot to default settings
router.post('/reset', async (req, res) => {
    try {
        await resetBotToDefault();
        res.status(200).json({ message: 'Bot reset to default settings successfully' });
    } catch (error) {
        console.error('Error resetting bot:', error);
        res.status(500).json({ message: 'Failed to reset bot to default settings' });
    }
});

// Route to get bot logs
router.get('/logs', async (req, res) => {
    try {
        const logs = await getBotLogs();
        res.status(200).json({ logs });
    } catch (error) {
        console.error('Error getting bot logs:', error);
        res.status(500).json({ message: 'Failed to get bot logs' });
    }
});

// Route to clear bot logs
router.delete('/logs', async (req, res) => {
    try {
        await clearBotLogs();
        res.status(200).json({ message: 'Bot logs cleared successfully' });
    } catch (error) {
        console.error('Error clearing bot logs:', error);
        res.status(500).json({ message: 'Failed to clear bot logs' });
    }
});

module.exports = router;
