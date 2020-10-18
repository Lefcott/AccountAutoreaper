const { default: axios } = require('axios');

const qs = require('qs');
const fs = require('fs');

const auths = ['Client-ID 2a49d60e8b3f4ac', 'Client-ID 4a318f507bec1f2'];
let authIndex = 0;

const getAuth = () => {
  const auth = auths[authIndex];
  authIndex += 1;
  if (authIndex >= auths.length) authIndex = 0;
  return auth;
};

/** @param {import('robotjs').Bitmap} image @param {string} id
    @param {import('./saveImage').HideRect[]} hideRects */
module.exports = async (image, id, hideRects) =>
  new Promise(async resolve => {
    const fileName = await images.saveImage(image, id, hideRects);
    const base64Image = fs.readFileSync(fileName).toString('base64');

    axios({
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      data: qs.stringify({ image: base64Image }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        authorization: getAuth()
      }
    })
      .then(response => resolve(response.data.data.link))
      .catch(error => {
        logError('There was an error uploading image');
        resolve(null);
        if (!error.response) return;
        if (typeof error.response.data.error === 'string') delete error.response.data.error;
        logError(`Upload error status: ${error.response.status}\nBody: ${error.response.data}`);
      });
  });
