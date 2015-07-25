var Layer = require('./Layer');

/**
 * Creates a Network of Layers consisting of Neurons. Each array element
 * indicates a layer.  The value indicates the number of Neurons in that Layer.
 *
 * The first element represents the number of Neurons in the input Layer.
 * The last element represents the number of Neurons in the output Layer.
 * Each element in between represents a hidden Layer with n Neurons.
 * @param {number[]} layerSizes - Number of neurons in each layer.
 * @constructor
 *
 * @example
 * // 2 inputs
 * // 1 output
 * var net = new Network([2, 1]);
 *
 * @example
 * // 16 inputs
 * // 10 neuron hidden layer
 * // 4 neuron hidden layer
 * // 1 output
 * var net = new Network([16, 10, 4, 1]);
 */
function Network(layerSizes) {
  var self = this;
  var numInputs = _.first(layerSizes);
  var numOutputs = _.last(layerSizes);
  var hiddenLayers = _.slice(layerSizes, 1, layerSizes.length - 1);

  self.layers = [];

  // input layer
  self.input = new Layer(numInputs);
  self.layers.push(self.input);

  // hidden layers
  _.each(hiddenLayers, function(numNeurons) {
    self.layers.push(new Layer(numNeurons));
  });

  // output layer
  self.output = new Layer(numOutputs);
  self.layers.push(self.output);

  // connect layers
  _.each(self.layers, function(layer, i) {
    var next = self.layers[i + 1];
    if (next) {
      layer.connect(next);
    }
  });
}

/**
 * Train the Network to produce the output from the given input.
 * @param {object[]} [data] - Array of objects in the form
 * `{inputs: [], expected: []}`.
 */
Network.prototype.train = function(data) {
  // TODO: left off here
  console.log(data);
};

module.exports = Network;
