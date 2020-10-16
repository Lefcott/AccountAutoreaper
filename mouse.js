const robotjs = require('robotjs');

const screen = robotjs.getScreenSize();

const execute = () => {
  const { x, y } = robotjs.getMousePos();
  const newX = x > screen.width - 10 ? screen.width - 10 : x;
  const newY = y < 10 ? 10 : y;
  if (x !== newX || y !== newY) robotjs.moveMouse(newX, newY);
  setTimeout(execute, 1);
};
execute();
