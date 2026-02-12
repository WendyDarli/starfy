const express = require('express');
const collectionController = require('../controllers/collectionController');
const router = express.Router();

router.get('/', collectionController.collection_get);

router.get('/tracks', collectionController.tracks_get);

router.get('/episodes', collectionController.episodes_get);

module.exports = router;