const express = require('express');
const albumsController = require('../controllers/albumsController');
const router = express.Router();

router.get('/:id', albumsController.album_get);

module.exports = router;