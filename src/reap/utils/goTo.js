const robotjs = require('robotjs');

exports.goTo = async (place, getX, getY, afterWait = 2000) => {
  robotjs.moveMouse(getX(place.x), getY(place.y));
  robotjs.mouseClick('left', false);
  await wait(afterWait);
};
