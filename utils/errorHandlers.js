const { logger } = require('./logger');

// Error handling middleware function for handling 404 Not Found errors
const notFoundErrorHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Error handling middleware function for handling validation errors
const validationErrorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((error) => error.message);
        res.status(400).json({ message: 'Validation Error', errors });
    } else {
        next(err);
    }
};

// Error handling middleware function for formatting error responses
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
    logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
};

module.exports = {
    notFoundErrorHandler,
    validationErrorHandler,
    errorHandler
};
