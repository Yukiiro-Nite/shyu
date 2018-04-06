const publishedVersions = require('./publishedVersions');

publishedVersions('kroger-product-grids').then(versions => {
  console.log(versions);
});