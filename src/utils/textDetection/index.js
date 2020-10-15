const vision = require('@google-cloud/vision');

const { saveImage } = require('../image');

const client = new vision.ImageAnnotatorClient({
  keyFile: `${__dirname}/config.json`
});

exports.detectText = async image => {
  const fileName = `${__dirname}/temp.png`;
  await saveImage(image, fileName);
  const [{ textAnnotations }] = await client.textDetection(fileName);
  console.log('textAnnotations', textAnnotations);
  const worlds = [];
  textAnnotations.forEach(textAnnotation =>
    worlds.push(...textAnnotation.description.split('\n').filter(t => t))
  );
  return [...new Set(worlds)];
};
