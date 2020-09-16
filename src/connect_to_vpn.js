const { run } = require('./utils/scripts');
const { wait } = require('./utils/wait');
const projectDir = require('./utils/projectDir');

run(`"${projectDir}/src/vpn_client/hsscp.exe"`);
wait(11000).then(() => {
  console.log('Connected to VPN!');
  process.exit(0);
});