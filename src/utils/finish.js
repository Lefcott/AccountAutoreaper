const { run } = require('./scripts');

exports.finish = async code => {
  console.log('Killing hsscp.exe ...');
  await run('taskkill /IM "hsscp.exe" /F');
  console.log(`Doing process.exit(${code})`);
  process.exit(code);
};
