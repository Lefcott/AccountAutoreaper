/* eslint-disable no-restricted-globals */
const robotjs = require('robotjs');

const { run } = require('./src/utils/scripts');
const { wait } = require('./src/utils/wait');
const { detectText } = require('./src/utils/textDetection');

const lolPath = '"C:\\Riot Games\\League of Legends\\LeagueClient.exe"';
const levelRect = { x: 1106, y: 0, width: 65, height: 74 };
const rpRect = { x: 990, y: 10, width: 85, height: 35 };
const blueEssenceRect = { x: 990, y: 46, width: 85, height: 26 };

console.log('Reaping!');
const getNumberFromImage = async rect => {
  const image = robotjs.screen.capture(rect.x, rect.y, rect.width, rect.height);
  const texts = await detectText(image);
  console.log('detected texts:', texts);
  return +texts.filter(text => !isNaN(text))[0] || null;
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
  const level = await getNumberFromImage(levelRect);
  const rp = await getNumberFromImage(rpRect);
  const blueEssence = await getNumberFromImage(blueEssenceRect);
  console.log('level', level);
  console.log('rp', rp);
  console.log('blueEssence', blueEssence);
})();
