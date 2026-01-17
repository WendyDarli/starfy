const express = require('express');
const episodesController = require('../controllers/episodesController');
const router = express.Router();

router.get('/:id', episodesController.episode_get );

module.exports = router;