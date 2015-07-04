/**
 * Creates a Network of Layers consisting of Neurons.  One layer per argument.
 * First argument represents the input layer.
 * Last argument represents the output layer.
 * All arguments in between are hidden layers.
 * @param {...number} arguments - Number of neurons in the layer.
 * @constructor
 *
 * @example
 * // 2 inputs
 * // 1 output
 * var net = new Network(2, 1);
 *
 * @example
 * // 16 inputs
 * // 10 neuron hidden layer
 * // 4 neuron hidden layer
 * // 1 output
 * var net = new Network(16, 10, 4, 1);
 */
function Network() {
  var self = this;
  var args = Array.prototype.slice.call(arguments);
  var numInputs = _.first(args);
  var numOutputs = _.last(args);
  var hiddenLayers = _.slice(args, 1, args.length - 1);

  self.layers = [];

  // input layer
  self.input = new Layer(numInputs);
  self.layers.push(self.input);

  // hidden layers
  _.each(hiddenLayers, function(numNeurons, i) {
    // add layer
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
