const robotjs = require('robotjs');
const { getX, getY } = require('./rects');

exports.goTo = async (place, afterWait = 2000) => {
  robotjs.moveMouse(getX(place.x), getY(place.y));
  robotjs.mouseClick('left', false);
  await wait(afterWait);
};
