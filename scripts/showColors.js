import robotjs from 'robotjs';

const execute = () => {
  const mousePos = robotjs.getMousePos();
  const color = robotjs.getPixelColor(mousePos.x, mousePos.y);
  const colorInfo = {
    A: 255,
    R: parseInt(color.substr(0, 2), 16),
    G: parseInt(color.substr(2, 2), 16),
    B: parseInt(color.substr(4, 2), 16)
  };
  console.log(mousePos, colorInfo);
  setTimeout(execute, 500);
};

execute();
