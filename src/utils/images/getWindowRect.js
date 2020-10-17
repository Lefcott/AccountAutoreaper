/** @param {import('robotjs').Bitmap} image @param {string} backColor
 * @param {{ left: number, top: number, right: number, bottom: number }} offsets */
module.exports = (image, backColor, { left = 0, top = 0, right = 0, bottom = 0 }) => {
  let x;

  let y = top + (image.height - top - bottom) / 2;
  for (x = left; x < image.width; x += 1) if (image.colorAt(x, y) !== backColor) break;
  const minX = x;
  for (x = image.width - 1 - right; x >= 0; x -= 1) if (image.colorAt(x, y) !== backColor) break;
  const maxX = x;

  x = left + (image.width - left - right) / 2;
  for (y = top; y < image.height; y += 1) if (image.colorAt(x, y) !== backColor) break;
  const minY = y;
  for (y = image.height - 1 - bottom; y >= 0; y -= 1) if (image.colorAt(x, y) !== backColor) break;
  const maxY = y;
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
};
