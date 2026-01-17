const express = require('express');
const router = express.Router();

//routers
const libraryRouter = require('./libraryRouter');
const playlistsRouter = require('./playlistsRouter');
const artistsRouter = require('./artistsRouter');
const albumsRouter = require('./albumsRouter');
const showsRouter = require('./showsRouter');
const songsRouter = require('./songsRouter');
const episodesRouter = require('./episodesRouter');

router.use('/library', libraryRouter);
router.use('/collection', libraryRouter)
router.use('/playlist', playlistsRouter);
router.use('/album', albumsRouter);
router.use('/show', showsRouter );
router.use('/artist', artistsRouter);
router.use('/song', songsRouter);
router.use('/episode', episodesRouter);

module.exports = router;