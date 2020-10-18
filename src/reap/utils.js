/* eslint-disable no-await-in-loop */
const robotjs = require('robotjs');
const moment = require('moment');

const { wait } = require('../utils/wait');

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
