/* eslint-disable no-restricted-globals */
const robotjs = require('robotjs');

const { run } = require('../utils/scripts');
const { wait } = require('../utils/wait');
const { detectText } = require('../utils/textDetection');
const { getWindowRect } = require('../utils/image');

const { lolPath, scale, rects } = require('./constants');

const screen = robotjs.getScreenSize();

console.log('Reaping!');
(async () => {
  await run(lolPath);
  await wait(5000);

  const user = 'lefcott20';
  const pass = 'widergy2020';
  console.log('LOL Started');
  robotjs.typeString(user);
  robotjs.keyTap('tab');
  robotjs.typeString(pass);
  robotjs.keyTap('enter');
  await wait(25000);
  const screenCapture = robotjs.screen.capture(0, 0, screen.width, screen.height);
  const windowRect = getWindowRect(screenCapture, 'ffffff', { bottom: 10 });
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
    const texts = await detectText(image, rect.id);
    console.log(`detected ${rect.id}s:`, texts);
    return +texts.filter(text => !isNaN(text))[0] || null;
  };
  const getTextFromRect = async rect => {
    const image = robotjs.screen.capture(
      getX(rect.x),
      getY(rect.y),
      getWidth(rect.width),
      getHeight(rect.height)
    );
    const texts = await detectText(image, rect.id);
    console.log(`detected ${rect.id}s:`, texts);
    return texts[0];
  };
  const level = await getNumberFromRect(rects.level);
  const rp = await getNumberFromRect(rects.rp);
  const blueEssence = await getNumberFromRect(rects.blueEssence);
  robotjs.moveMouse(getX(684), getY(45));
  robotjs.mouseClick('left', false);
  await wait(2000);
  robotjs.moveMouse(getX(375), getY(600));
  await wait(1000);
  const elo = await getTextFromRect(rects.elo);
  console.log('level', level);
  console.log('rp', rp);
  console.log('blueEssence', blueEssence);
  console.log('elo', elo);
})();
