const express = require('express');
const libraryController = require('../controllers/libraryController');
const router = express.Router();

router.get('/', libraryController.library_get);

router.get('/tracks', libraryController.tracks_get);

router.get('/episodes', libraryController.episodes_get);

module.exports = router;