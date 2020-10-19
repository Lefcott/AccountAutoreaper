/* eslint-disable no-restricted-globals */
const robotjs = require('robotjs');

const { logScreenInfo } = require('./log');
const { scale } = require('../constants');

const screen = robotjs.getScreenSize();
let windowRect;

const getX = x => windowRect.x + (windowRect.width / scale.width) * x;
const getY = y => windowRect.y + (windowRect.height / scale.height) * y;
const getWidth = w => (windowRect.width / scale.width) * w;
const getHeight = h => (windowRect.height / scale.height) * h;
const getNumberFromRect = async rect => {
  const image = robotjs.screen.capture(
    getX(rect.x),
    getY(rect.y),
    getWidth(rect.width),
    getHeight(rect.height)
  );
  const texts = await textDetection.detectText(image, rect.id);
  await logScreenInfo(`detected ${rect.id}s:`, texts);
  return +texts.filter(text => !isNaN(text))[0] || null;
};
const getTextFromRect = async rect => {
  const image = robotjs.screen.capture(
    getX(rect.x),
    getY(rect.y),
    getWidth(rect.width),
    getHeight(rect.height)
  );
  const texts = await textDetection.detectText(image, rect.id);
  await logScreenInfo(`detected ${rect.id}s:`, texts);
  return texts;
};
const setWindowRect = () => {
  const screenCapture = robotjs.screen.capture(0, 0, screen.width, screen.height);
  windowRect = images.getWindowRect(screenCapture, 'ffffff', { bottom: 10 });
};

module.exports = {
  getX,
  getY,
  getWidth,
  getHeight,
  getNumberFromRect,
  getTextFromRect,
  setWindowRect
};
