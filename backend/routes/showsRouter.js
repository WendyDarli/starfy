const express = require('express');
const showsController = require('../controllers/showsController');
const router = express.Router();

router.get('/:id', showsController.show_get);

module.exports = router;