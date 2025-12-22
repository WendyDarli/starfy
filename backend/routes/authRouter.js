const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/login', authController.login_get);

router.get('/callback', authController.login_callback_get);

router.get('/isAuthenticated', authController.isAuthenticated_get);

module.exports = router;