var _ = require('lodash');
var INITIALIZE = require('./Initialize');
var Neuron = require('./Neuron');

/**
 * Creates a single dimension {@link Layer} of [Neurons]{@link Neuron}.
 * @param {string} numNeurons - The number of [Neurons]{@link Neuron} this
 *   Layer should have.
 * @param {boolean} [addBias=false] - Add a bias {@link Neuron} to this Layer.
 * @constructor
 */
function Layer(numNeurons, addBias) {
  var self = this;
  self.neurons = [];

  // add neurons
  _.times(numNeurons, function() {
    self.neurons.push(new Neuron());
  });

  // add bias neuron
  if (addBias) {
    var biasNeuron = new Neuron();
    biasNeuron.isBias = true;
    self.neurons.push(biasNeuron);
  }
}

/**
 * Connects every {@link Neuron} in this Layer to each {@link Neuron} in the
 * `target` Layer.
 * @param {Layer} targetLayer - The Layer to connect to.
 */
Layer.prototype.connect = function(targetLayer) {
  var self = this;

  _.each(self.neurons, function(source) {
    // every neuron in this layer is connected to each neuron in the next.
    // we can assume the numInputs to be the num of neurons in this layer.

    // connect to each neuron in this Layer to the targetLayer
    _.each(targetLayer.neurons, function(target) {
      source.connect(target, INITIALIZE.weight(self.neurons.length));
    });
  });
};

/**
 * Activates all the [Neurons]{@link Neuron} in this Layer with the given array
 * of values.
 * @param {number[]} [values] - Map of input values for each {@link Neuron}.
 * @returns {number[]} - Array of {@link Neuron} output values.
 */
Layer.prototype.activate = function(values) {
  return _.map(this.neurons, function(neuron, i) {
    return neuron.activate(values ? values[i] : undefined);
  });
};

/**
 * Train the [Neurons]{@link Neuron} in this layer.  If target `outputs` are
 * specified, the
 * [Neurons]{@link Neuron} will learn to output these values.  This is only
 * useful for output Layers.
 * @param {number[]} [outputs] - Map of target output values for each {@link
 *   Neuron}.
 */
Layer.prototype.train = function(outputs) {
  _.each(this.neurons, function(neuron, i) {
    neuron.train(outputs ? outputs[i] : undefined);
  });
};

module.exports = Layer;
