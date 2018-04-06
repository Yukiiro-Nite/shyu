const semver = require('semver');
const publishedVersions = require('./publishedVersions');

module.exports = function checkForUpdate() {
  let parentPackage = tryquire('../package.json', undefined); // work on pathing, this isn't quite right.

  return new Promise((resolve, reject) => {
    let needsUpdate;
    let latestVersion;

    if(parentPackage && parentPackage.name && parentPackage.version) {
      publishedVersions(parentPackage.name).then(versions => {
        latestVersion = versions[versions.length];
        needsUpdate = semver(latestVersion).gt(parentPackage.version);

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
    console.log('problem checking for update: ', error);
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