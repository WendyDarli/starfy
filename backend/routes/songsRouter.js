const express = require('express');
const songsController = require('../controllers/songsController');
const router = express.Router();

router.get('/:id', songsController.song_get)

module.exports = router;