require('./utils/env');
const rollbar = require('./utils/rollbar');
const log = require('debug');

globalThis.log = log('app');
globalThis.logError = (...args) => {
  rollbar.error(...args);
  log('app:error')(...args);
};
require('./database');
require('./utils');
