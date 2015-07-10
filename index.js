var anny = {
  ACTIVATION: require('./lib/ACTIVATION'),
  ERROR: require('./lib/ERROR'),
  INITIALIZE: require('./lib/INITIALIZE'),
  Layer: require('./lib/Layer'),
  Network: require('./lib/Network'),
  Neuron: require('./lib/Neuron'),
  util: require('./lib/util')
};

module.exports = anny;

// expose global in browser
(typeof window === 'undefined' ? {} : window).anny = anny;
