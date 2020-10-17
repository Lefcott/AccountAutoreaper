require('./utils');
const log = require('debug');

globalThis.log = log('app');
globalThis.logError = (...args) => {
  rollbar.error(...args);
  log('app:error')(...args);
};
