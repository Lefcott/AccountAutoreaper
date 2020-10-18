const vision = require('@google-cloud/vision');

const { wait } = require('../wait');

const client = new vision.ImageAnnotatorClient({
  keyFile: `${__dirname}/config.json`
});

const detectText = (image, id) =>
  new Promise(async resolve => {
    const fileName = await images.saveImage(image, id);
    client
      .textDetection(fileName)
      .then(([{ textAnnotations }]) => {
        const worlds = [];
        textAnnotations.forEach(textAnnotation =>
          worlds.push(...textAnnotation.description.split('\n').filter(t => t))
        );
        resolve([...new Set(worlds)]);
      })
      .catch(error => {
        rollbar.error(error);
        resolve(null);
      });
  });

globalThis.textDetection = { detectText };
