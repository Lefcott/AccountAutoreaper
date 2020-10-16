/* eslint-disable no-restricted-globals */
const robotjs = require('robotjs');

const { run } = require('../utils/scripts');
const { wait } = require('../utils/wait');
const { detectText } = require('../utils/textDetection');

const { lolPath, rects } = require('./constants');

const initialCoords = { x: 350, y: 180 };
const getX = x => x + initialCoords.x;
const getY = y => y + initialCoords.y;

console.log('Reaping!');
const getNumberFromRect = async rect => {
  const image = robotjs.screen.capture(getX(rect.x), getY(rect.y), rect.width, rect.height);
  const texts = await detectText(image, rect.id);
  console.log(`detected ${rect.id}s:`, texts);
  return +texts.filter(text => !isNaN(text))[0] || null;
};
const getTextFromRect = async rect => {
  const image = robotjs.screen.capture(getX(rect.x), getY(rect.y), rect.width, rect.height);
  const texts = await detectText(image, rect.id);
  console.log(`detected ${rect.id}s:`, texts);
  return texts[0];
};
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
