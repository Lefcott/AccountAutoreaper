/* eslint-disable no-restricted-globals */
const robotjs = require('robotjs');
const { exec } = require('child_process');

require('../globals');

const { lolPath, scale, rects, hideRects } = require('./constants');
const { places, eloMepping } = require('./constants');
const { closeNotifications, goTo, getDate } = require('./utils');

const screen = robotjs.getScreenSize();

log('Reaping!');
const execute = async () => {
  const next = () => setTimeout(execute, 3600000); // TODO set correct time
  exec('taskkill /F /im LeagueClient.exe');
  exec('taskkill /F /im LeagueClientUx.exe');
  exec('taskkill /F /im LeagueClientUxRender.exe');
  exec('taskkill /F /im RiotClientServices.exe');
  exec('taskkill /F /im RiotClientUx.exe');
  exec('taskkill /F /im RiotClientUxRender.exe');
  await wait(3000);
  await scripts.run(lolPath);
  await wait(7500);

  const accounts = await Account.get(
    {
      'LOL.RP': { $exists: false },
      $or: [{ NewPassword: { $exists: true } }, { EmailVerified: true }]
    },
    { limit: 1 }
  );
  if (!accounts) {
    logError('Failed to get accounts for reaping');
    return next();
  }
  const [account] = accounts;
  if (!account) {
    log('No more users to reap, waiting...');
    return next();
  }
  log('LOL Started');
  robotjs.typeString(account.UserName);
  robotjs.keyTap('tab');
  robotjs.typeString(account.NewPassword || account.Password);
  robotjs.keyTap('enter');
  await wait(43000);
  robotjs.moveMouse(screen.width / 2, screen.height / 2);
  robotjs.scrollMouse(0, 50); // TODO make this work
  const screenCapture = robotjs.screen.capture(0, 0, screen.width, screen.height);
  const windowRect = images.getWindowRect(screenCapture, 'ffffff', { bottom: 10 });
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
    log(`detected ${rect.id}s:`, texts);
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
    log(`detected ${rect.id}s:`, texts);
    return texts;
  };
  await closeNotifications(getX, getY);
  const level = await getNumberFromRect(rects.level);
  const rp = await getNumberFromRect(rects.rp);
  const blueEssence = await getNumberFromRect(rects.blueEssence);
  await goTo(places.PROFILE, getX, getY);
  await goTo(places.PROFILE_ELO, getX, getY);
  const [elo] = await getTextFromRect(rects.elo);
  log('level', level);
  log('rp', rp);
  log('blueEssence', blueEssence);
  log('elo', elo);
  const captureRect = [getX(0), getY(0), getWidth(scale.width), getHeight(scale.height)];
  let captures = [];
  captures.push(
    await images.uploadImage(
      robotjs.screen.capture(...captureRect),
      'profile_screen',
      [...hideRects, { x: 54, y: 141, width: 200, height: 40 }] // default hides + username in this screen
    )
  );
  await goTo(places.PROFILE_MATCH_HISTORY, getX, getY, 5000);
  const lastPlayTexts = await getTextFromRect(rects.lastPlay);
  const lastPlay = lastPlayTexts.length === 2 ? getDate(lastPlayTexts) : null;
  log('lastPlay', lastPlay);
  await goTo(places.COLLECTION, getX, getY);
  captures.push(
    await images.uploadImage(robotjs.screen.capture(...captureRect), 'collection_screen', hideRects)
  );
  await goTo(places.SHOP, getX, getY, 6000);
  await goTo(places.SHOP_ACCOUNT, getX, getY);
  await goTo(places.SHOP_ACCOUNT_HISTORY, getX, getY);
  captures.push(
    await images.uploadImage(robotjs.screen.capture(...captureRect), 'shop_history_screen', hideRects)
  );
  const refunds = await getNumberFromRect(rects.refunds);
  log('refunds', refunds);
  await goTo(places.LOOT, getX, getY, 5000);
  captures.push(await images.uploadImage(robotjs.screen.capture(...captureRect), 'loot_screen', hideRects));
  log('captures', captures);
  captures = captures.filter(c => c);

  const data = {
    'LOL.Level': level,
    'LOL.Elo': eloMepping[elo] || elo,
    'LOL.RP': rp || 0,
    'LOL.BlueEssence': blueEssence || 0,
    'LOL.Refunds': refunds || 0,
    'LOL.Images': captures,
    'LOL.LastPlay': lastPlay
  };
  const updated = await Account.update({ _id: account._id }, { $set: data });
  if (!updated)
    logError(`Account with id ${account._id} not updated with data:\n${JSON.stringify(data, null, 2)}`);
  next();
};

execute();
