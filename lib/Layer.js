var INITIALIZE = require('./Initialize');
var Neuron = require('./Neuron');

/**
 * Creates a single dimension Layer of Neurons.
 * @param {string} numNeurons - The number of Neurons this Layer should have.
 * @param {boolean} [addBias=false] - Add a bias Neuron to this Layer.
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
    biasNeuron.isBiasNeuron = true;
    self.neurons.push(biasNeuron);
  }
}

/**
 * Connects every Neuron in this Layer to each Neuron in the `target` Layer.
 * @param {Layer} targetLayer - The Layer to connect to.
 */
Layer.prototype.connect = function(targetLayer) {
  var self = this;

  _.each(self.neurons, function(source) {
    // every neuron in this layer is connected to each neuron in the next.
    // we can assume the numConnections to be the num of neurons in this layer.

    // connect to each neuron in this layer
    _.each(targetLayer.neurons, function(target) {
      source.connect(target, INITIALIZE.weight(self.neurons.length));
    });
  });
};

/**
 * Activates all the Neurons in this Layer with the given array of values.
 * @param {number[]} [values] - Map of input values for each Neuron.
 * @returns {number[]} - Array of Neuron output values.
 */
Layer.prototype.activate = function(values) {
  return _.map(this.neurons, function(neuron, i) {
    return neuron.activate(values ? values[i] : undefined);
  });
};

/**
 * Correct the `errors` the Neurons.
 * @param {number[]} [errors] - Map of errors values for each Neuron.
 */
Layer.prototype.correct = function(errors) {
  _.each(this.neurons, function(neuron, i) {
    neuron.correct(errors ? errors[i] : undefined);
  });
};

module.exports = Layer;
