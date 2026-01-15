const express = require('express');
const playlistsController = require('../controllers/playlistsController');
const router = express.Router();

router.get('/:id', playlistsController.playlist_get);

module.exports = router;