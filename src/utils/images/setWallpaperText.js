const Jimp = require('jimp');
const wallpaper = require('wallpaper');

/** @param {string} text @param {number} x @param {number} y  */
module.exports = (text, x = 5, y = 5) =>
  new Promise(async resolve => {
    const image = await Jimp.read(`${__dirname}/wallpaper_base.png`);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    image.print(font, x, y, text).write('wallpaper.png', async () => {
      await wallpaper.set('wallpaper.png');
      resolve();
    });
  });
