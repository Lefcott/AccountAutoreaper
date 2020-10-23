/* eslint-disable no-restricted-globals */
const robotjs = require('robotjs');
const { v4: uuid } = require('uuid');

require('../globals');

const { scale, rects, hideRects } = require('./constants');
const { places, getElo } = require('./constants');
const { openLOL, closeLOL, closeNotifications, goTo } = require('./utils');
const { getDate, setRegion, logScreenInfo, logScreenError } = require('./utils');
const { getX, getY, getWidth, getHeight, getTextFromRect, getNumberFromRect } = require('./utils');
const { passesRectRegex, setWindowRect, watchLanguage } = require('./utils');

watchLanguage();
const execute = async () => {
  await closeLOL();
  const next = async (time = 1000) => {
    await logScreenInfo(`Waiting ${time / 1000} seconds...`);
    setTimeout(execute, time);
  };

  await logScreenInfo('Searching accounts...');
  const accounts = await Account.get(
    {
      'LOL.Region': { $exists: true, $ne: undefined, $nin: ['pbe'] },
      'LOL.SessionError': { $ne: true },
      'LOL.Banned': { $exists: false },
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
  await logScreenInfo('Got account, setting language...');
  const langOk1 = setRegion(account);
  if (!langOk1) return next(60000);
  await logScreenInfo('Language set OK, opening LOL...');
  await openLOL();
  await logScreenInfo(
    `Opened LOL, setting language second time to en_US and region to ${account.LOL.Region}...`
  );
  // const langOk2 = setRegion(account);
  // if (!langOk2) return next(60000);
  await logScreenInfo('Language set OK');
  setWindowRect();

  await logScreenInfo('Typing credentials', account.UserName, account.NewPassword || account.Password);
  robotjs.typeString(account.UserName);
  robotjs.keyTap('tab');
  robotjs.typeString(account.NewPassword || account.Password);
  robotjs.keyTap('enter');
  await logScreenInfo('Hitted enter, waiting 15 seconds...');
  await wait(15000);
  if (await passesRectRegex(rects.terms)) {
    await logScreenInfo('Found terms and conditions, accepting...');
    robotjs.moveMouse(getX(848), getY(116));
    robotjs.mouseToggle('down', 'left');
    await wait(500);
    robotjs.moveMouse(getX(853), getY(464));
    await wait(5000);
    robotjs.mouseToggle('up', 'left');
  } else {
    await logScreenInfo('Terms not found');
    await wait(35000);
  }
  if (await passesRectRegex(rects.afkWarn)) {
    await logScreenInfo('Found AFK warning, closing...');
    await goTo(places.WARNING_TEXT);
    robotjs.typeString('I Agree');
    robotjs.keyTap('enter');
  }
  if (await passesRectRegex(rects.sessionError)) {
    await logScreenError('Detected session error, updating account and trying again');
    Account.update({ _id: account._id }, { $set: { 'LOL.SessionError': true } });
    return next();
  }
  await logScreenInfo('Closed terms and conditions, accepting second terms...');
  await goTo(places.ACCEPT_TERMS, 8000);
  await logScreenInfo('Accepted second terms, hitting PLAY and waiting 43 seconds...');
  await goTo(places.PLAY, 43000);
  if (await passesRectRegex(rects.banned)) {
    await logScreenInfo(`Account ${account._id} is banned`);
    Account.update({ _id: account._id }, { $set: { 'LOL.Banned': true } });
    return next();
  }
  await logScreenInfo('CLosing dialog 1...');
  await goTo(places.CLOSE_DIALOG, 5000);
  await logScreenInfo('CLosing dialog 1_5...');
  await goTo(places.CLOSE_DIALOG_1_5);
  await logScreenInfo('Closing dialog 2...');
  await goTo(places.CLOSE_DIALOG_2);
  await logScreenInfo('Tap code of conduct 1');
  await goTo(places.CODE_OF_CONDUCT_1);
  await logScreenInfo('Tap code of conduct 2');
  await goTo(places.CODE_OF_CONDUCT_2, 1800);
  await logScreenInfo('Tapp code of conduct 3');
  await goTo(places.CODE_OF_CONDUCT_3, 2200);
  await logScreenInfo('Tap code of conduct 4');
  await goTo(places.CODE_OF_CONDUCT_4, 1500);
  await logScreenInfo('Accept code of conduct');
  await goTo(places.ACCEPT_CODE_OF_CONDUCT);
  if (await passesRectRegex(rects.nameChange)) {
    const newName = uuid().replace(/-/g, '').substring(0, 14);
    await logScreenInfo(`Detected required name change, changing to ${newName}`);
    await goTo(places.NAME_CHANGE_INPUT_1);
    robotjs.typeString(newName);
    await goTo(places.NAME_CHANGE_INPUT_2);
    robotjs.typeString(newName);
    await logScreenInfo(`Writed name ${newName}, waiting 10 seconds before clicking button`);
    await wait(10000);
    await goTo(places.NAME_CHANGE_BUTTON, 10000);
  }
  await logScreenInfo('Select play mode and wait 8 seconds');
  await goTo(places.SELECT_PLAY_MODE, 8000);
  await logScreenInfo('Skip video');
  await goTo(places.SKIP_VIDEO);
  if (await passesRectRegex(rects.installing)) {
    await logScreenInfo(`Account ${account._id} is downloading tutorials, deleting it...`);
    Account.delete({ _id: account._id || '1234' });
    return next();
  }
  if (await passesRectRegex(rects.tutorial)) {
    await logScreenInfo(`Account ${account._id} has not made tutorials, deleting it...`);
    Account.delete({ _id: account._id || '1234' });
    return next();
  }
  await logScreenInfo('Close email verification');
  await goTo(places.CLOSE_EMAIL_VERIFICATION);
  await logScreenInfo('Account is not banned, closing notifications');
  await closeNotifications();
  await logScreenInfo('Get level, rp and blue essence');
  const level = await getNumberFromRect(rects.level);
  const rp = await getNumberFromRect(rects.rp);
  const blueEssence = await getNumberFromRect(rects.blueEssence);
  await logScreenInfo('Go to PROFILE');
  await goTo(places.PROFILE, 10000);
  await logScreenInfo('Go to PROFILE_ELO');
  await goTo(places.PROFILE_ELO);
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
  await goTo(places.PROFILE_MATCH_HISTORY, 5000);
  await logScreenInfo('Accept general dialog');
  await goTo(places.ACCEPT_GENERAL_DIALOG);
  await logScreenInfo('Get last play');
  const lastPlayTexts = await getTextFromRect(rects.lastPlay);
  const lastPlay = lastPlayTexts.length === 2 ? getDate(lastPlayTexts) : null;
  await logScreenInfo('lastPlay', lastPlay);
  await logScreenInfo('Go to COLLECTION');
  await goTo(places.COLLECTION, 8000);
  await logScreenInfo('Capture collection_screen');
  captures.push(
    await images.uploadImage(robotjs.screen.capture(...captureRect), 'collection_screen', hideRects)
  );
  await logScreenInfo('Go to SHOP');
  await goTo(places.SHOP, 15000);
  await logScreenInfo('Go to SHOP_ACCOUNT');
  await goTo(places.SHOP_ACCOUNT);
  await logScreenInfo('Go to SHOP_ACCOUNT_HISTORY');
  await goTo(places.SHOP_ACCOUNT_HISTORY);
  await logScreenInfo('Capture shop_account_history');
  captures.push(
    await images.uploadImage(robotjs.screen.capture(...captureRect), 'shop_history_screen', hideRects)
  );
  await logScreenInfo('Get refunds');
  const refunds = await getNumberFromRect(rects.refunds);
  await logScreenInfo('refunds', refunds);
  await logScreenInfo('Go to LOOT');
  await goTo(places.LOOT, 7000);
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
