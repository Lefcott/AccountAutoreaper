const { exec } = require('child_process');

exports.closeLOL = async () => {
  exec('taskkill /F /im LeagueClient.exe');
  exec('taskkill /F /im LeagueClientUx.exe');
  exec('taskkill /F /im LeagueClientUxRender.exe');
  exec('taskkill /F /im RiotClientServices.exe');
  exec('taskkill /F /im RiotClientUx.exe');
  exec('taskkill /F /im RiotClientUxRender.exe');
  await wait(3000);
  log('LOL Closed');
};
