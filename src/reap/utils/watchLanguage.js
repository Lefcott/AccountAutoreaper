const chokidar = require('chokidar');

const { lolConfigPath } = require('../constants');
const { setLanguage } = require('./setLanguage');

exports.watchLanguage = () => {
  chokidar.watch(lolConfigPath).on('change', () => {
    log('Detected file change');
    setLanguage();
  });
};
