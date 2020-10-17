/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
const { exec } = require('child_process');
require('colors');

const execOne = (command, wait) =>
  new Promise(resolve => {
    if (wait) {
      console.log(`--> ${command}`);
    }
    exec(command, (error, stdout, stderr) => {
      if (!wait) {
        console.log(`--> ${command}`);
      }
      let output = '';
      if (error) {
        output = `--- error: ${error.message}`.red;
        console.log(output);
        return resolve(false);
      }
      if (stderr) {
        console.log(`--- stderr: ${stderr}`.yellow);
      }
      console.log(`--- ${stdout}`.green);
      resolve(true);
    });
  });

exports.run = async commands => {
  // Parallel commands
  if (!Array.isArray(commands)) commands = [commands];
  const promises = [];
  for (let k = 0; k < commands.length; k += 1) promises.push(execOne(commands[k], false));

  return Promise.all(promises);
};

exports.runWait = async commands => {
  // Sequential commands
  if (!Array.isArray(commands)) commands = [commands];
  const results = [];
  for (let k = 0; k < commands.length; k += 1) results.push(await execOne(commands[k], true));
  return results;
};

exports.runInterval = async (commands, interval) =>
  new Promise(resolve => {
    // Sequential commands
    if (!Array.isArray(commands)) commands = [commands];

    let count = 0;
    for (let k = 0; k < commands.length; k += 1) {
      setTimeout(async () => {
        execOne(commands[k], true);
        count += 1;
        if (count === commands.length) {
          resolve(true);
        }
      }, k * interval);
    }
  });

globalThis.scripts = {
  run: exports.run,
  runWait: exports.runWait,
  runInterval: exports.runInterval
};
