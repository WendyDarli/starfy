const express = require('express');
const songsController = require('../controllers/songsController');
const router = express.Router();

router.get('/:id', songsController.song_get);

router.get('/audio/:isrc', songsController.song_audio_get);

module.exports = router;