/* eslint-disable no-restricted-globals */
const robotjs = require('robotjs');

require('../globals');

const { scale, rects, hideRects } = require('./constants');
const { places, translates, getElo } = require('./constants');
const { openLOL, closeLOL, closeNotifications, goTo } = require('./utils');
const { getDate, setLanguage, logScreenInfo, logScreenError } = require('./utils');

const screen = robotjs.getScreenSize();

const execute = async () => {
  await closeLOL();
  const next = async (time = 1000) => {
    await logScreenInfo(`Waiting ${time / 1000} seconds...`);
    setTimeout(execute, time);
  };

  await logScreenInfo('Searching accounts...');
  const accounts = await Account.get(
    {
      'LOL.Region': { $exists: true, $ne: undefined },
      'LOL.SessionError': { $ne: true },
      'LOL.Banned': { $ne: false },
      $or: [{ NewPassword: { $exists: true } }, { EmailVerified: true }]
    },
    { limit: 1 }
  );
  if (!accounts) {
    await logScreenError('Failed to get accounts for reaping');
    return next(10000);
  }
  const [account] = accounts;
  if (!account) {
    await logScreenInfo('No more accounts to reap');
    return next(300000);
  }
  await logScreenInfo('Got accounts, setting language...');
  const langOk = setLanguage('en_US', account);
  if (!langOk) return next(60000);
  await logScreenInfo('Language set OK, opening LOL...');
  await openLOL();
  await logScreenInfo('LOL opened, defining utils functions...');
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

  await logScreenInfo('Typing credentials', account.UserName, account.NewPassword || account.Password);
  robotjs.typeString(account.UserName);
  robotjs.keyTap('tab');
  robotjs.typeString(account.NewPassword || account.Password);
  robotjs.keyTap('enter');
  await logScreenInfo('Hitted enter, waiting 43 seconds...');
  await wait(43000);
  await logScreenInfo('Closing warning...');
  await goTo(places.WARNING_TEXT, getX, getY);
  robotjs.typeString('I Agree');
  robotjs.keyTap('enter');
  await logScreenInfo('Accepting terms and conditions...');
  robotjs.moveMouse(getX(848), getY(116));
  robotjs.mouseToggle('down', 'left');
  await wait(500);
  robotjs.moveMouse(getX(853), getY(464));
  await wait(5000);
  robotjs.mouseToggle('up', 'left');
  await logScreenInfo('Get sessionError');
  const sessionErrorText = await getTextFromRect(rects.sessionError);
  if (/error/i.test(sessionErrorText)) {
    await logScreenError('Detected session error, updating account and trying again');
    Account.update({ _id: account._id }, { $set: { 'LOL.SessionError': true } });
    return next();
  }
  await logScreenInfo('Closed terms and conditions, accepting second terms...');
  await goTo(places.ACCEPT_TERMS, getX, getY, 8000);
  await logScreenInfo('Accepted second terms, hitting PLAY and waiting 43 seconds...');
  await goTo(places.PLAY, getX, getY, 43000);
  await logScreenInfo('CLosing dialog 1...');
  await goTo(places.CLOSE_DIALOG, getX, getY, 5000);
  await logScreenInfo('CLosing dialog 1_5...');
  await goTo(places.CLOSE_DIALOG_1_5, getX, getY);
  await logScreenInfo('Closing dialog 2...');
  await goTo(places.CLOSE_DIALOG_2, getX, getY);
  await logScreenInfo('Tap code of conduct 1');
  await goTo(places.CODE_OF_CONDUCT_1, getX, getY);
  await logScreenInfo('Tap code of conduct 2');
  await goTo(places.CODE_OF_CONDUCT_2, getX, getY, 1800);
  await logScreenInfo('Tapp code of conduct 3');
  await goTo(places.CODE_OF_CONDUCT_3, getX, getY, 2200);
  await logScreenInfo('Tap code of conduct 4');
  await goTo(places.CODE_OF_CONDUCT_4, getX, getY, 1500);
  await logScreenInfo('Accept code of conduct');
  await goTo(places.ACCEPT_CODE_OF_CONDUCT, getX, getY);
  await logScreenInfo('Select play mode and wait 8 seconds');
  await goTo(places.SELECT_PLAY_MODE, getX, getY, 8000);
  await logScreenInfo('Skip video');
  await goTo(places.SKIP_VIDEO, getX, getY);
  await logScreenInfo('Get banned text');
  const [tutorialText] = await getTextFromRect(rects.tutorial);
  if (/tutorial/i.test(tutorialText)) {
    await logScreenInfo(`Account ${account._id} has not made tutorials, deleting it...`);
    Account.delete({ _id: account._id || '1234' });
    return next();
  }
  const [bannedText] = await getTextFromRect(rects.banned);
  if (translates.isBanned(bannedText)) {
    await logScreenInfo(`Account ${account._id} is banned`);
    Account.update({ _id: account._id }, { $set: { 'LOL.Banned': true } });
    return next();
  }
  await logScreenInfo('Account is not banned, closing notifications');
  await closeNotifications(getX, getY);
  await logScreenInfo('Get level, rp and blue essence');
  const level = await getNumberFromRect(rects.level);
  const rp = await getNumberFromRect(rects.rp);
  const blueEssence = await getNumberFromRect(rects.blueEssence);
  await logScreenInfo('Go to PROFILE');
  await goTo(places.PROFILE, getX, getY);
  await logScreenInfo('Go to PROFILE_ELO');
  await goTo(places.PROFILE_ELO, getX, getY);
  await logScreenInfo('Get elo');
  const [elo] = await getTextFromRect(rects.elo);
  await logScreenInfo('level:', level, 'rp:', rp, 'blueEssence:', blueEssence, 'elo:', elo);
  const captureRect = [getX(0), getY(0), getWidth(scale.width), getHeight(scale.height)];
  let captures = [];
  await logScreenInfo('Capture profile_screen');
  captures.push(
    await images.uploadImage(
      robotjs.screen.capture(...captureRect),
      'profile_screen',
      [...hideRects, { x: 54, y: 141, width: 200, height: 40 }] // default hides + username in this screen
    )
  );
  await logScreenInfo('Go to match history');
  await goTo(places.PROFILE_MATCH_HISTORY, getX, getY, 5000);
  await logScreenInfo('Accept general dialog');
  await goTo(places.ACCEPT_GENERAL_DIALOG, getX, getY);
  await logScreenInfo('Get last play');
  const lastPlayTexts = await getTextFromRect(rects.lastPlay);
  const lastPlay = lastPlayTexts.length === 2 ? getDate(lastPlayTexts) : null;
  await logScreenInfo('lastPlay', lastPlay);
  await logScreenInfo('Go to COLLECTION');
  await goTo(places.COLLECTION, getX, getY);
  await logScreenInfo('Capture collection_screen');
  captures.push(
    await images.uploadImage(robotjs.screen.capture(...captureRect), 'collection_screen', hideRects)
  );
  await logScreenInfo('Go to SHOP');
  await goTo(places.SHOP, getX, getY, 6000);
  await logScreenInfo('Go to SHOP_ACCOUNT');
  await goTo(places.SHOP_ACCOUNT, getX, getY);
  await logScreenInfo('Go to SHOP_ACCOUNT_HISTORY');
  await goTo(places.SHOP_ACCOUNT_HISTORY, getX, getY);
  await logScreenInfo('Capture shop_account_history');
  captures.push(
    await images.uploadImage(robotjs.screen.capture(...captureRect), 'shop_history_screen', hideRects)
  );
  await logScreenInfo('Get refunds');
  const refunds = await getNumberFromRect(rects.refunds);
  await logScreenInfo('refunds', refunds);
  await logScreenInfo('Go to LOOT');
  await goTo(places.LOOT, getX, getY, 5000);
  await logScreenInfo('Capture loot_screen');
  captures.push(await images.uploadImage(robotjs.screen.capture(...captureRect), 'loot_screen', hideRects));
  captures = captures.filter(c => c);
  await logScreenInfo('captures', captures);

  const data = {
    'LOL.Banned': false,
    'LOL.Level': level || 1,
    'LOL.Elo': getElo(elo),
    'LOL.RP': rp || 0,
    'LOL.BlueEssence': blueEssence || 0,
    'LOL.Refunds': refunds || 0,
    'LOL.Images': captures,
    'LOL.LastPlay': lastPlay
  };
  await logScreenInfo(`Updating with data ${JSON.stringify(data)}`);
  const updated = await Account.update({ _id: account._id }, { $set: data });
  if (!updated)
    await logScreenError(`Account with id ${account._id} not updated with data:\n${JSON.stringify(data)}`);
  next();
};

execute();
