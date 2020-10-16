const { default: axios } = require('axios');

const fs = require('fs');

const auths = ['Client-ID 2a49d60e8b3f4ac'];
let authIndex = 0;

const getAuth = () => {
  const auth = auths[authIndex];
  authIndex += 1;
  if (authIndex >= auths.length) authIndex = 0;
  return auth;
};

module.exports = async path =>
  new Promise(resolve => {
    const image = fs.readFileSync(path).toString('base64');
    axios
      .post(
        'https://api.imgur.com/3/image',
        { image },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: getAuth() } }
      )
      .then(response => resolve(response.data.data.link))
      .catch(error => {
        console.error(error);
        resolve(null);
      });
  });
