const { run } = require('./scripts');

exports.finish = async code => {
  await run('taskkill /IM "hsscp.exe" /F');
  process.exit(code);
};
