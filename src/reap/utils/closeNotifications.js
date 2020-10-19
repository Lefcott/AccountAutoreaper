/* eslint-disable no-await-in-loop */
const robotjs = require('robotjs');
const { getX, getY } = require('./rects');

exports.closeNotifications = async () => {
  for (let i = 0; i < 5; i += 1) {
    robotjs.moveMouse(getX(1000), getY(56));
    robotjs.mouseClick('left', false);
    await wait(1000);
  }
};
