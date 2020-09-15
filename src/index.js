const { default: axios } = require('axios');

const fs = require('fs');

const { run } = require('./utils/scripts');
const { wait } = require('./utils/wait');
const { getStatiscs } = require('./utils/statiscs');
const projectDir = require('./utils/projectDir');

const url = 'https://bloomebot-accounts-api.herokuapp.com';
const secret = '5feb97b14331453fbbe2ba19bc97cc77446cef5f-ce74-4cc4-baee-033dca9c1831';

const main = async () => {
  const { data } = await axios.get(`${url}/api/lol_accounts/next_region`, {
    headers: { admin_secret_production: secret }
  });
  const { region, programRegion } = data;
  axios
    .post(
      `${url}/api/lol_accounts/combo.txt`,
      {
        region,
        min_level: 30,
        count: 7
      },
      { headers: { admin_secret_production: secret } }
    )
    .then(async response => {
      console.log('Combo Status', response.status);
      console.log('Combo Data', response.data);
      let [, combos] = response.data.split('\n\n');
      combos = combos || response.data;
      console.log('combos', combos);
      run(`cd ${projectDir}/src/reaper && reaper.exe`);
      fs.writeFileSync(`${projectDir}/src/reaper/combos.txt`, combos);
      await wait(2000);
      run(`cd ${projectDir}/src/reaper && ahk.exe reap.ahk ${programRegion}`);
      await wait(10000); // Wait 10 secs

      await run(`cd ${projectDir}/src/reaper && ahk.exe save_title.ahk`);
      const winTitle = fs.readFileSync(`${projectDir}/src/reaper/window_title.txt`).toString();

      const { total, bad, retry, usernames } = getStatiscs(winTitle, combos);
      console.log(`Total: ${total}, Bad: ${bad}, Retry: ${retry}, User Names: ${usernames}`);

      if (total === bad)
        axios
          .put(`${url}/api/lol_accounts/ignore/${region}`, combos, {
            headers: { admin_secret_production: secret, 'Content-Type': 'text/plain' }
          })
          .then(rPut => {
            console.log('Update Status', rPut.status);
            console.log('Update Data', rPut.data);
          })
          .catch(console.error);

      const result = fs.readFileSync(`${projectDir}/src/reaper/hits/Capture.txt`).toString();
      console.log(`Updating if not empty with: \`${result}\``);
      if (result)
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
