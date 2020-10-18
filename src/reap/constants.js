exports.lolPath = '"C:\\Riot Games\\League of Legends\\LeagueClient.exe"';
exports.eloMepping = {
  UNRANKED: 'unranked',
  'SIN CLASIFICAR': 'unranked'
};
exports.scale = { width: 1280, height: 720 };
exports.rects = {
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
  PROFILE: { x: 684, y: 45 },
  PROFILE_ELO: { x: 375, y: 600 },
  PROFILE_MATCH_HISTORY: { x: 190, y: 100 },
  COLLECTION: { x: 740, y: 45 },
  SHOP: { x: 900, y: 45 },
  SHOP_ACCOUNT: { x: 1011, y: 105 },
  SHOP_ACCOUNT_HISTORY: { x: 85, y: 188 },
  LOOT: { x: 794, y: 45 }
};
