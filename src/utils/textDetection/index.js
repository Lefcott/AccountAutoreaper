const { ImageAnnotatorClient } = require('@google-cloud/vision');

const clients = [
  new ImageAnnotatorClient({ keyFile: `${__dirname}/config1.json` }),
  new ImageAnnotatorClient({ keyFile: `${__dirname}/config2.json` })
];
let clientIndex = 0;

const getClient = () => {
  const client = clients[clientIndex];
  clientIndex += 1;
  if (clientIndex >= clients.length) clientIndex = 0;
  return client;
};

const detectText = (image, id) =>
  new Promise(async resolve => {
    const fileName = await images.saveImage(image, id);
    getClient()
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
