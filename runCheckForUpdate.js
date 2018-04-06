const checkForUpdate = require('./checkForUpdate');

checkForUpdate().then(({ parentPackage, needsUpdate, latestVersion }) => {
  if(needsUpdate) {
    console.warn(`${parentPackage.name} has a newer version: ${latestVersion}`);
  } else {
    console.log(`${parentPackage.name} version ${parentPackage.version} is the latest version`);
  }
}).catch(error => {
  console.log('Problem checking for update: ', error);
});