const fs = require('fs');

const { lolConfigPath, REGION_MAPPING } = require('../constants');

/** @param {string} lang @param {object} account  */
exports.setLanguage = (lang, account) => {
  try {
    const region = REGION_MAPPING[account.LOL.Region];
    if (!region) {
      logError(`Could not map region for account ${account._id} with region ${account.LOL.Region}`);
      return false;
    }
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
