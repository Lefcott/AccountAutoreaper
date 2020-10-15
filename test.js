const robot = require('robotjs');

const { saveImage } = require('./src/utils/image');

const screen = robot.getScreenSize();
const image = robot.screen.capture(screen.width - 350, 0, 350, 200);
console.log(image);
saveImage(image, 'screen.png');
