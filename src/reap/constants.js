exports.lolPath = '"C:\\Riot Games\\League of Legends\\LeagueClient.exe"';
exports.lolConfigPath = 'C:\\Riot Games\\League of Legends\\Config\\LeagueClientSettings.yaml';
exports.scale = { width: 1280, height: 720 };
exports.rects = {
  // Texts with conditions
  terms: { x: 430, y: 110, width: 414, height: 166, id: 'terms', regex: /terms/i },
  afkWarn: { x: 470, y: 275, width: 355, height: 124, id: 'afkWarn', regex: /leaverbuster|abandoning/i },
  sessionError: { x: 415, y: 319, width: 447, height: 51, id: 'session_error', regex: /error/i },
  tutorial: { x: 90, y: 24, width: 120, height: 35, id: 'tutorial', regex: /tutorial/i },
  banned: { x: 390, y: 94, width: 515, height: 52, id: 'banned', regex: /permanently|banned/i },
  nameChange: { x: 453, y: 17, width: 383, height: 66, id: 'name_change', regex: /name change/i },
  // Values to store
  level: { x: 1070, y: 50, width: 50, height: 25, id: 'level' },
  rp: { x: 975, y: 12, width: 85, height: 35, id: 'rp' },
  blueEssence: { x: 975, y: 40, width: 85, height: 26, id: 'blue_essence' },
  elo: { x: 320, y: 405, width: 120, height: 20, id: 'elo' },
  refunds: { x: 110, y: 150, width: 34, height: 34, id: 'refunds' },
  lastPlay: { x: 530, y: 245, width: 153, height: 32, id: 'last_play' }
};
/** @type {import("../utils/images/saveImage").HideRect[]} */
exports.hideRects = [
  { x: 1126, y: 26, width: 126, height: 26 }, // Hides user name
  { x: 1055, y: 82, width: 224, height: 607 } // Hides chat panel
];
exports.places = {
  WARNING_TEXT: { x: 640, y: 405 },
  ACCEPT_TERMS: { x: 553, y: 605 },
  PLAY: { x: 600, y: 345 },
  CLOSE_DIALOG: { x: 1078, y: 57 },
  CLOSE_DIALOG_1_5: { x: 1028, y: 130 },
  CLOSE_DIALOG_2: { x: 640, y: 418 },
  CODE_OF_CONDUCT_1: { x: 965, y: 207 },
  CODE_OF_CONDUCT_2: { x: 965, y: 320 },
  CODE_OF_CONDUCT_3: { x: 965, y: 430 },
  CODE_OF_CONDUCT_4: { x: 965, y: 540 },
  ACCEPT_CODE_OF_CONDUCT: { x: 643, y: 666 },
  NAME_CHANGE_INPUT: { x: 646, y: 422 },
  NAME_CHANGE_BUTTON: { x: 640, y: 665 },
  SELECT_PLAY_MODE: { x: 670, y: 370 },
  SKIP_VIDEO: { x: 643, y: 665 },
  PROFILE: { x: 710, y: 45 },
  PROFILE_ELO: { x: 375, y: 600 },
  PROFILE_MATCH_HISTORY: { x: 190, y: 100 },
  ACCEPT_GENERAL_DIALOG: { x: 640, y: 400 },
  COLLECTION: { x: 765, y: 45 },
  SHOP: { x: 925, y: 45 },
  SHOP_ACCOUNT: { x: 1011, y: 105 },
  SHOP_ACCOUNT_HISTORY: { x: 85, y: 188 },
  LOOT: { x: 794, y: 45 }
};
const translates = {
  elo: {
    getUnranked: text => /unranked/i.test(text) && 'unranked',
    getIron: text => /iron/i.test(text) && 'iron',
    getBronze: text => /bronze|bronce/i.test(text) && 'bronze',
    getSliver: text => /sliver/i.test(text) && 'sliver',
    getGold: text => /gold/i.test(text) && 'gold',
    getPlatinum: text => /platinum/i.test(text) && 'platinum',
    getDiamond: text => /diamond/i.test(text) && 'diamond',
    getMaster: text => /master/i.test(text) && 'master',
    getGrandMaster: text => /grand|grandmaster|grand master/i.test(text) && 'grandMaster',
    getChallenger: text => /challenger/i.test(text) && 'challenger'
  }
};
exports.translates = translates;

exports.getElo = text => {
  const elo =
    translates.elo.getUnranked(text) ||
    translates.elo.getIron(text) ||
    translates.elo.getBronze(text) ||
    translates.elo.getSliver(text) ||
    translates.elo.getGold(text) ||
    translates.elo.getPlatinum(text) ||
    translates.elo.getDiamond(text) ||
    translates.elo.getMaster(text) ||
    translates.elo.getGrandMaster(text) ||
    translates.elo.getChallenger(text);
  if (!elo) rollbar.warn(`Elo could not find a map for value ${text}`);
  return elo || text;
};

exports.REGION_MAPPING = {
  br: 'BR',
  eune: 'EUNE',
  euw: 'EUW',
  lan: 'LA1',
  las: 'LA2',
  na: 'NA',
  oce: 'OC1',
  ru: 'RU',
  tr: 'TR',
  jp: 'JP',
  kr: 'KR',
  pbe: 'PBE'
};
