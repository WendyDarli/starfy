const { AppError } = require('../errors/appError');
const errorLogger = require("../utils/errorLogger");
     
// Catch 404 and forward to error handler
function handleNotFound(req, res, next) {
    const err = new AppError(`Not Found: ${req.originalUrl}`, 404);
    next(err);
};

// Global error handler
function errorHandler(err, req, res, next) {
    const isDev = req.app.get('env') === 'development';

    const logContext = {
        requestId: req.id,
        userId: req.user?.id,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        input: {
            body: req.body,
            query: req.query,
            params: req.params
        }
    };


    if(err instanceof AppError){
        errorLogger.warn({
            ...logContext,
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

    errorLogger.error({
        ...logContext,
        err: err,
        path: req.path,
    }, 'Unexpected error');

    res.status(500).json({ error: "Internal server error" });
};

module.exports = {
    handleNotFound, 
    errorHandler
};