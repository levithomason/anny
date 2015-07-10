var anny = {
  ACTIVATION: require('./lib/Activation'),
  ERROR: require('./lib/Error'),
  INITIALIZE: require('./lib/Initialize'),
  Layer: require('./lib/Layer'),
  Network: require('./lib/Network'),
  Neuron: require('./lib/Neuron'),
  util: require('./lib/Util')
};

module.exports = anny;

// expose global in browser
(typeof window === 'undefined' ? {} : window).anny = anny;
