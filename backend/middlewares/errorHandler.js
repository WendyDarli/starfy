const { AppError } = require('../errors/appError');
const getLoggerContext = require("../utils/getLoggerContext");
const als = require('../utils/alsContext');
     
// Catch 404 and forward to error handler
function handleNotFound(req, res, next) {
    const err = new AppError(`Not Found: ${req.originalUrl}`, 404);
    next(err);
};

// Global error handler
function errorHandler(err, req, res, next) {
    const isDev = req.app.get('env') === 'development';

    const logger  = getLoggerContext();
    if(err instanceof AppError){
        logger.warn({
            error: err.name,
            msg: err.message,
            stack: err.stack,
            statusCode: err.statusCode,
            context: err.context,
            path: err.path,
        });
     
        return res.status(err.statusCode).json({
            success: false,
            error: {
                error: err.name,
                message: err.message,
            },
            ...(isDev && { stack: err.stack }),
        });
    }

    logger.error({
        err: err,
        path: req.path,
    }, 'Unexpected error');

    res.status(500).json({ error: "Internal server error" });
};

module.exports = {
    handleNotFound, 
    errorHandler
};