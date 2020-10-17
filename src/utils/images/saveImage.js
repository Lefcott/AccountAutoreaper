const Jimp = require('jimp');

/** @typedef {{ x: number, y: number, width: number, height: number, color?: string }} HideRect */

/** @param {import('robotjs').Bitmap} image @param {string} id
    @param {HideRect[]} hideRects */
module.exports = (image, id, hideRects = []) => {
  const fileName = `${__dirname}/temp_${id}.png`;
  const jimg = new Jimp(image.width, image.height);

  jimg.bitmap.data = image.image;
  hideRects.forEach(hideRect => {
    const overlay = new Jimp(hideRect.width, hideRect.height);
    overlay.bitmap.data = [];
    jimg.composite(overlay, hideRect.x, hideRect.y);
  });

  jimg.write(fileName);
  return fileName;
};
