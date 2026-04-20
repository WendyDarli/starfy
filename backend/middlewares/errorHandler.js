const AppError = require('../errors/appError');
const errorLogger = require("../utils/errorLogger");

// Catch 404 and forward to error handler
function handleNotFound(req, res, next) {
    const err = new AppError(`Not Found: ${req.originalUrl}`, 404);
    next(err);
};

// Global error handler
function errorHandler(err, req, res, next) {
    const isDev = req.app.get('env') === 'development';
    const statusCode = err.status || err.statusCode || 500;
    errorLogger.error({
            msg: err.message,
            stack: err.stack,
            statusCode,
            url: req.originalUrl,
            method: req.method,
        });
        
    res.status(statusCode).json({
        success: false,
        error: {
            code: err.code,
            message: err.message,
            details: err.details
        },
        ...(isDev && { stack: err.stack }),
    });
};

module.exports = {
    handleNotFound, 
    errorHandler
};