require('babel-register');

global.Promise = require('bluebird');

require('./src/server.js');
