const express = require('express');
const lyricsController = require('../controllers/lyricsController');
const router = express.Router();

router.get('/', lyricsController.lyrics_get);

module.exports = router;