const asyncHandler = require('../utils/asyncHandler');

const log_level_put = asyncHandler(async (req, res, next) => {
    const { level } = req.body;
    if (!["fatal", "error", "warn", "info", "debug", "trace"].includes(level)) {
        return res.status(400).json({ error: "Invalid level" });
    }
    logger.level = level;
    logger.info({ newLevel: level }, "log level changed at runtime");
    res.json({ level });    
});

module.exports = { log_level_put, }