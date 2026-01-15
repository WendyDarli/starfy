const express = require('express');
const libraryController = require('../controllers/libraryController');
const router = express.Router();

router.get('/library', libraryController.library_get);

//this will be moved
router.post('/playlist/', libraryController.songs_post);

router.get('/collection/tracks', libraryController.tracks_get);

router.get('/collection/episodes', libraryController.episodes_get);



module.exports = router;