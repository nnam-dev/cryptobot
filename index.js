const express = require('express');
const { logger, requestLogger, errorLogger } = require('./utils/logger');
const { notFoundErrorHandler, validationErrorHandler, errorHandler } = require('./utils/errorHandlers');
const { protectRoute } = require('./utils/authentication');
const db = require('./models');
const routes = require('./routes/routes');
const botRoutes=require('./routes/botRoutes')

// Create Express application
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(requestLogger); // Log HTTP requests

// Routes
app.use('/', routes); // Use routes defined in routes.js
app.use('/bot', botRoutes); // Use routes defined in routes.js

// Protected route example
app.get('/protected', protectRoute, (req, res) => {
    res.send('This is a protected route.');
});

// Error handling middleware
app.use(notFoundErrorHandler); // Handle 404 Not Found errors
app.use(validationErrorHandler); // Handle validation errors
app.use(errorLogger); // Log errors
app.use(errorHandler); // Format error responses

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});



// Sync all models with the database
db.sequelize.sync({ force: false }).then(() => {
    console.log('All models synced');
}).catch((err) => {
    console.error('Error syncing models:', err);
});
