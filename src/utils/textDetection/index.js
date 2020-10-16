const vision = require('@google-cloud/vision');

const { saveImage } = require('../image');
const { wait } = require('../wait');

const client = new vision.ImageAnnotatorClient({
  keyFile: `${__dirname}/config.json`
});

exports.detectText = async (image, id) => {
  const fileName = `${__dirname}/temp_${id}.png`;
  await saveImage(image, fileName);
  await wait(1000);
  const [{ textAnnotations }] = await client.textDetection(fileName);
  console.log('textAnnotations', textAnnotations);
  const worlds = [];
  textAnnotations.forEach(textAnnotation =>
    worlds.push(...textAnnotation.description.split('\n').filter(t => t))
  );
  return [...new Set(worlds)];
};
