const express = require('express');
const tracksController = require('../controllers/tracksController');
const router = express.Router();

router.get('/:id', tracksController.track_get);

router.get('/audio/:isrc', tracksController.track_audio_get);

router.put('/favorite/:id', tracksController.put_favorite_track);
router.delete('/favorite/:id', tracksController.delete_favorite_track);

module.exports = router;