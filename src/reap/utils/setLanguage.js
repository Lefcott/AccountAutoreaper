const fs = require('fs');

const { lolConfigPath, REGION_MAPPING } = require('../constants');

const lang = 'en_US';
let region;

exports.setLanguage = () => {
  try {
    log('Change region to', region);
    let config = fs.readFileSync(lolConfigPath).toString();
    config = config.replace(/ {8}locale: .+\n?/, `        locale: "${lang}"`);
    config = config.replace(/ {8}region: .+\n?/, `        region: "${region}"`);
    fs.writeFileSync(lolConfigPath, config);
    return true;
  } catch (e) {
    logError(e);
    return false;
  }
};

exports.setRegion = account => {
  const _region = REGION_MAPPING[account.LOL.Region];
  if (!_region) {
    logError(`Could not map region for account ${account._id} with region ${account.LOL.Region}`);
    return false;
  }
  region = _region;
  return exports.setLanguage();
};
