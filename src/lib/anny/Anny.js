var anny = {
  ACTIVATION: require('./lib/ACTIVATION'),
  INITIALIZE: require('./lib/INITIALIZE'),
  Layer: require('./lib/Layer'),
  Network: require('./lib/Network'),
  Neuron: require('./lib/Neuron'),
  util: require('./lib/util')
};

if (window) {
  global.anny = anny;
}

module.exports = anny;
