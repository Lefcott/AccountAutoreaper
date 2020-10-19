const { lolPath } = require('../constants');

exports.openLOL = async () => {
  await scripts.run(lolPath);
  await wait(7500);
  log('LOL Started');
};
