const { default: axios } = require('axios');

const url = 'https://bloomebot-accounts-api.herokuapp.com/api/lol_accounts/combo.txt';
const secret = '5feb97b14331453fbbe2ba19bc97cc77446cef5f-ce74-4cc4-baee-033dca9c1831';
const main = () => {
  axios
    .post(
      url,
      {
        region: 'las',
        min_level: 30,
        count: 20
      },
      { headers: { admin_secret_production: secret } }
    )
    .then(response => {
      console.log(response.status);
      console.log(response.data);
    });
};

main();
