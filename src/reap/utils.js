/* eslint-disable no-await-in-loop */
const robotjs = require('robotjs');
const fs = require('fs');
const { exec } = require('child_process');

const { wait } = require('../utils/wait');
const { lolPath, lolConfigPath, REGION_MAPPING } = require('./constants');

exports.openLOL = async () => {
  exec('taskkill /F /im LeagueClient.exe');
  exec('taskkill /F /im LeagueClientUx.exe');
  exec('taskkill /F /im LeagueClientUxRender.exe');
  exec('taskkill /F /im RiotClientServices.exe');
  exec('taskkill /F /im RiotClientUx.exe');
  exec('taskkill /F /im RiotClientUxRender.exe');
  await wait(3000);
  await scripts.run(lolPath);
  await wait(7500);
  log('LOL Started');
};

exports.closeNotifications = async (getX, getY) => {
  for (let i = 0; i < 5; i += 1) {
    robotjs.moveMouse(getX(1000), getY(56));
    robotjs.mouseClick('left', false);
    await wait(1000);
  }
};

exports.goTo = async (place, getX, getY, afterWait = 2000) => {
  robotjs.moveMouse(getX(place.x), getY(place.y));
  robotjs.mouseClick('left', false);
  await wait(afterWait);
};

/** @param {[string, string]} texts  */
exports.getDate = ([strTime, strDate]) => {
  const [hours, minutes] = strTime.split(':');
  const [day, month, year] = strDate.split('/');
  const date = new Date(year, month - 1, day, hours, minutes);
  return date.toString() === 'Invalid Date' ? null : date;
};

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
