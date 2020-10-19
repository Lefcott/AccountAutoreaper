const getHour = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
exports.logScreenInfo = (...args) => {
  log(...args);
  images.setWallpaperText(`${getHour()}: ${args.join(' ')}`);
};
exports.logScreenError = (...args) => {
  logError(...args);
  images.setWallpaperText(`${getHour()}: Error: ${args.join(' ')}`);
};
