const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

// Define custom log message format
const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

// Initialize logger
const logger = winston.createLogger({
    level: 'info', // Set default log level
    format: combine(
        timestamp(), // Add timestamp to log messages
        logFormat // Apply custom log message format
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to file
        new winston.transports.File({ filename: 'combined.log' }) // Log all levels to file
    ]
});

// Middleware function for logging HTTP requests
const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};

// Error handling middleware function for logging errors
const errorLogger = (err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(err);
};

// Middleware function for logging unhandled rejections
const unhandledRejectionLogger = (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
};

// Middleware function for logging uncaught exceptions
const uncaughtExceptionLogger = (error) => {
    logger.error(`Uncaught Exception: ${error.message}`);
    process.exit(1); // Exit the process after logging the uncaught exception
};

module.exports = {
    logger,
    requestLogger,
    errorLogger,
    unhandledRejectionLogger,
    uncaughtExceptionLogger
};
