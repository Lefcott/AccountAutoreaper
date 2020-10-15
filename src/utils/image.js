const Jimp = require('jimp');

exports.saveImage = (image, path) => {
  // Create a new blank image, same size as Robotjs' one
  const jimg = new Jimp(image.width, image.height);
  for (let x = 0; x < image.width; x += 1) {
    for (let y = 0; y < image.height; y += 1) {
      // hex is a string, rrggbb format
      const hex = image.colorAt(x, y);
      // Jimp expects an Int, with RGBA data,
      // so add FF as 'full opaque' to RGB color
      const num = parseInt(`${hex}ff`, 16);
      // Set pixel manually
      jimg.setPixelColor(num, x, y);
    }
  }
  jimg.write(path);
};
