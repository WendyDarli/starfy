const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.put('/log-level', adminController.log_level_put);

module.exports = router;