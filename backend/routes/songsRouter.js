const express = require('express');
const songsController = require('../controllers/songsController');
const router = express.Router();

router.get('/:id', songsController.song_get);

router.get('/audio/:isrc', songsController.song_audio_get);

router.put('/favorite/:id', songsController.put_favorite_song);
router.delete('/favorite/:id', songsController.delete_favorite_song);

module.exports = router;