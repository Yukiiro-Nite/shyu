const exec = require('child_process').exec;

module.exports = (packageName) => new Promise((resolve, reject) => {
  exec(`npm view --json ${packageName} versions`, (error, stdout, stderr) => {
    if (error) {
      reject('Problem running exec: ', error);
      return;
    }
    resolve(stdout);
  });
}).catch((error) => {
  console.log(`Problem getting published versions: `, error);
  return [];
});