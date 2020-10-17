const log = require('debug');
require('./utils');

globalThis.log = log('app');
globalThis.logError = (...args) => {
  rollbar.error(...args);
  log('app:error')(...args);
};
