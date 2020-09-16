/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
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
        count: 10
      },
      { headers: { admin_secret_production: secret } }
    )
    .then(async response => {
      console.log('Combo Status', response.status);
      let [, combos] = response.data.split('\n\n');
      combos = (combos || response.data || '').split('\n').filter(c => c);
      console.log(`Combos:\n${combos}`);
	  run(`"${projectDir}/src/vpn_client/hsscp.exe"`);
	  await wait(11000);

      for (const combo of combos) {
        fs.writeFileSync(`${projectDir}/src/reaper/combos.txt`, combo);
        run(`cd ${projectDir}/src/reaper && reaper.exe`);
        await wait(2000);
        await run(`cd ${projectDir}/src/reaper && ahk.exe reap.ahk ${programRegion}`);
        await wait(10000);
        await run(`cd ${projectDir}/src/reaper && ahk.exe save_title.ahk`);
        const winTitle = fs.readFileSync(`${projectDir}/src/reaper/window_title.txt`).toString();

        console.log('Window Title: ', winTitle);
        const { total, hits, bad, retry, usernames } = getStatiscs(winTitle, combos);
        console.log(`Total: ${total}, Hits: ${hits}, Bad: ${bad}, Retry: ${retry}, User Names: ${usernames}`);
        if (total === bad)
          axios
            .put(`${url}/api/lol_accounts/ignore/${region}`, combo, {
              headers: { admin_secret_production: secret, 'Content-Type': 'text/plain' }
            })
            .then(rPut => {
              console.log('Update Status', rPut.status);
              console.log('Update Data', JSON.stringify(rPut.data, null, 2));
            })
            .catch(console.error);

        const result = fs.readFileSync(`${projectDir}/src/reaper/hits/Capture.txt`).toString();
        console.log(`Updating if not empty with: \`${result}\``);
        if (result)
          axios
            .put(`${url}/api/lol_accounts/update`, result, { headers: { admin_secret_production: secret } })
            .then(rPut => {
              console.log('Update Status', rPut.status);
              console.log('Update Data', JSON.stringify(rPut.data, null, 2));
            });
		await run('taskkill /IM "._cache_reaper.exe" /F');
      }
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
};

main();
