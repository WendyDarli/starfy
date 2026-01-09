const express = require('express');
const libraryController = require('../controllers/libraryController');
const router = express.Router();

router.get('/library', libraryController.playlists_get);
 
router.post('/playlist/', libraryController.songs_post);

module.exports = router;