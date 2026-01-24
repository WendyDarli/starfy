const express = require('express');
const router = express.Router();

//controllers
const authController = require('../controllers/authController');
const authGuard = require('../controllers/authGuard');

//routers
const libraryRouter = require('./libraryRouter');
const playlistsRouter = require('./playlistsRouter');
const artistsRouter = require('./artistsRouter');
const albumsRouter = require('./albumsRouter');
const showsRouter = require('./showsRouter');
const songsRouter = require('./songsRouter');
const episodesRouter = require('./episodesRouter');
const searchRouter = require('./searchRouter');

router.get('/login', authController.login_get);
router.get('/callback', authController.login_callback_get);
router.use(authGuard);
router.get('/isAuthenticated', authController.isAuthenticated_get);
router.use('/library', libraryRouter);
router.use('/collection', libraryRouter);
router.use('/playlist', playlistsRouter);
router.use('/album', albumsRouter);
router.use('/show', showsRouter );
router.use('/artist', artistsRouter);
router.use('/song', songsRouter);
router.use('/episode', episodesRouter);
router.use('/search', searchRouter);

module.exports = router;