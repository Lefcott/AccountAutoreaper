const { default: axios } = require('axios');

const fs = require('fs');

const { run } = require('./utils/scripts');
const { wait } = require('./utils/wait');
const projectDir = require('./utils/projectDir');

const url = 'https://bloomebot-accounts-api.herokuapp.com';
const secret = '5feb97b14331453fbbe2ba19bc97cc77446cef5f-ce74-4cc4-baee-033dca9c1831';

const main = async () => {
  const { data } = await axios.get(`${url}/api/lol_accounts/next_region`, {
    headers: { admin_secret_production: secret }
  });
  const { region } = data;
  axios
    .post(
      `${url}/api/lol_accounts/combo.txt`,
      {
        region,
        min_level: 30,
        count: 20
      },
      { headers: { admin_secret_production: secret } }
    )
    .then(async response => {
      console.log('Combo Status', response.status);
      console.log('Combo Data', response.data);
      const [, combos] = response.data.split('\n\n');
      run(`${projectDir}/src/reaper/reaper.exe`);
      fs.writeFileSync(`${projectDir}/src/reaper/combo.txt`, combos);
      await wait(2000);
      run(`${projectDir}/src/reaper/ahk.exe ${projectDir}/src/reaper/reap.ahk`);
      await wait(1000 * 60 * 5); // Wait 5 minutes

      const winTitle = fs.readFileSync(`${projectDir}/src/reaper/window_title.txt`).toString();
      console.log('Window Title', winTitle);
      const result = fs.readFileSync(`${projectDir}/src/reaper/hits/Capture.txt`).toString();
      console.log(`Updating with: \`${result}\``);
      axios
        .put(`${url}/api/lol_accounts/update`, result, { headers: { admin_secret_production: secret } })
        .then(rPut => {
          console.log('Update Status', rPut.status);
          console.log('Update Data', rPut.data);
        });
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
};

main();
