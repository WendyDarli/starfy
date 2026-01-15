const express = require('express');
const artistsController = require('../controllers/artistisController');
const router = express.Router();

router.get('/:id', artistsController.artist_get)

module.exports = router;