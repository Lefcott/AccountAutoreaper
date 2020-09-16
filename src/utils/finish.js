const { run } = require('./scripts');

exports.finish = async code => {
  console.log('Finishing Task');
  await run('taskkill /IM "hsscp.exe" /F');
  process.exit(code);
};
