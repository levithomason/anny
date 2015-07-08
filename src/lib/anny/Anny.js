var ACTIVATION = require('./lib/ACTIVATION');
var INITIALIZE = require('./lib/INITIALIZE');
var Layer = require('./lib/Layer');
var Network = require('./lib/Network');
var Neuron = require('./lib/Neuron');
var util = require('./lib/Util');

var anny = {
  ACTIVATION: ACTIVATION,
  INITIALIZE: INITIALIZE,
  Layer: Layer,
  Network: Network,
  Neuron: Neuron,
  util: util
};

if (window) {
  global.anny = anny;
}

module.exports = anny;
