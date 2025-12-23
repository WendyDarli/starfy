const express = require('express');
const libraryController = require('../controllers/libraryController');
const router = express.Router();

router.get('/playlists', libraryController.playlists_get);


module.exports = router;