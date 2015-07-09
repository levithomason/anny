var path = require('path');
var ROOT = path.dirname(__dirname);

var paths = {
  root: ROOT,
  src: ROOT + '/src',
  dist: ROOT + '/dist',
  anny: ROOT + '/src/lib/anny',
  node_modules: ROOT + '/node_modules'
};

module.exports = paths;
