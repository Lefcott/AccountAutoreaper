const Jimp = require('jimp');

/** @typedef {{ x: number, y: number, width: number, height: number, color?: string }} HideRect */

/** @param {number} x @param {number} y @param {HideRect[]} hideRects  */
const getHiddenColor = (x, y, hideRects) => {
  for (let i = 0; i < hideRects.length; i += 1) {
    const hideRect = hideRects[i];
    if (
      x >= hideRect.x &&
      x <= hideRect.x + hideRect.width &&
      y >= hideRect.y &&
      y <= hideRect.y + hideRect.height
    )
      return hideRect.color || '777777';
  }
  return null;
};

/** @param {import('robotjs').Bitmap} image @param {string} id
    @param {HideRect[]} hideRects */
module.exports = (image, id, hideRects = []) => {
  const fileName = `${__dirname}/temp_${id}.png`;
  // Create a new blank image, same size as Robotjs' one
  const jimg = new Jimp(image.width, image.height);
  for (let x = 0; x < image.width; x += 1)
    for (let y = 0; y < image.height; y += 1) {
      const hex = getHiddenColor(x, y, hideRects) || image.colorAt(x, y);
      // Jimp expects an Int, with RGBA data,
      // so add FF as 'full opaque' to RGB color
      const num = parseInt(`${hex}ff`, 16);
      jimg.setPixelColor(num, x, y);
    }
  jimg.write(fileName);
  return fileName;
};
