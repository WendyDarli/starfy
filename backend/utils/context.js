const { AsyncLocalStorage } = require('node:async_hooks');
const spotifyStore = new AsyncLocalStorage();
module.exports = spotifyStore;
