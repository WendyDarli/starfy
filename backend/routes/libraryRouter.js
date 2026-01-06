const express = require('express');
const libraryController = require('../controllers/libraryController');
const router = express.Router();

router.get('/library', libraryController.playlists_get);
 
router.get('/playlist/:id', libraryController.songs_get);

module.exports = router;