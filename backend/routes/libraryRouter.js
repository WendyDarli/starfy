const express = require('express');
const collectionController = require('../controllers/collectionController');
const router = express.Router();

router.get('/', collectionController.collection_get);

router.get('/tracks', collectionController.likedSongs_get);

router.get('/episodes', collectionController.likedEpisodes_get);

module.exports = router;