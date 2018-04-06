const semver = require('semver');
const publishedVersions = require('./publishedVersions');
const path = require('path');

module.exports = function checkForUpdate() {
  const parentPackagePath = path.resolve(__dirname, '../../package.json');
  let parentPackage = tryquire(parentPackagePath, undefined);

  return new Promise((resolve, reject) => {
    let needsUpdate;
    let latestVersion;

    if(parentPackage && parentPackage.name && parentPackage.version) {
      publishedVersions(parentPackage.name).then(versions => {
        latestVersion = versions[versions.length - 1];
        needsUpdate = semver.gt(latestVersion, parentPackage.version);

        resolve({
          parentPackage,
          needsUpdate,
          latestVersion
        })
      });
    } else {
      reject('Invalid parent package');
    }
  }).catch((error) => {
    console.log('Problem checking for update: ', error);
    return {
      parentPackage
    }
  });
};

function tryquire(path, defaultObject) {
  try {
    return require(path);
  } catch (e) {
    return defaultObject;
  }
}