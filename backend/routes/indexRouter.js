const express = require('express');
const router = express.Router();

//routers
const libraryRouter = require('./libraryRouter');
const playlistsRouter = require('./playlistsRouter');
const artistsRouter = require('./artistsRouter');
const albumsRouter = require('./albumsRouter');
const songsRouter = require('./songsRouter');

router.use('/library', libraryRouter);
router.use('/collection', libraryRouter)
router.use('/playlist', playlistsRouter);
router.use('/album', albumsRouter);
router.use('/artist', artistsRouter);
router.use('/song', songsRouter);

module.exports = router;