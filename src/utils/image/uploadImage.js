const { default: axios } = require('axios');

const fs = require('fs');

module.exports = async path =>
  new Promise(resolve => {
    const image = fs.readFileSync(path).toString('base64');
    axios
      .post(
        'https://api.imgur.com/3/image',
        { image },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      .then(response => resolve(response.data.data.link))
      .catch(error => {
        console.error(error);
        resolve(null);
      });
  });
