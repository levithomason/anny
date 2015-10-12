var path = require('path');
var ROOT = path.dirname(__dirname);

var paths = {
  root: ROOT,
  appSrc: ROOT + '/app/src',
  appBower: ROOT + '/app/bower',
  appDist: ROOT + '/app/dist',
  annyDist: ROOT + '/dist',
  annyLib: ROOT + '/lib',
  annyEntry: ROOT + '/index.js',
  docsRoot: ROOT + '/docs',
  docsSrc: ROOT + '/docs/src',
  docsDist: ROOT + '/docs/dist',
  node_modules: ROOT + '/node_modules'
};

module.exports = paths;
