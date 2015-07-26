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
 * Activate the network with a given set of `input` values.
 * @param {number[]} input - Values to activate the Network input Neurons.
 * Values should be normalized between -1 and 1 using Util.normalize.
 * @returns {*} output values
 */
Network.prototype.activate = function(input) {
  _.each(this.layers, function(layer, i) {
    layer.activate(i === 0 ? input : undefined);
  });

  return _.map(this.output.neurons, function(neuron) {
    return neuron.output;
  });
};

/**
 * Train the Network to produce the output from the given input.
 * @param {object[]} [data] - Array of objects in the form
 * `{input: [], output: []}`.
 */
Network.prototype.train = function(data) {
  _.each(data, function(sample, i) {
    // warn if training sample and Network have a different number of outputs
    if (sample.output.length !== this.output.neurons.length) {
      console.warn([
        'Training sample', i + 1, 'defines', sample.output.length, 'expects',
        'output(s) but the Network has', this.output.neurons.length, '.',
        '\n\nExcess expected outputs will be disregarded.',
        '\nNeurons without an expected output will have an error of 0.'
      ].join(' '));
    }
    var actual = this.activate(sample.input);
    var error = _.map(actual, function(output, i) {
      return output - sample.output[i] || 0;
    });

    console.log(
      'input ', sample.input,
      '\noutput', sample.output,
      '\nactual', actual,
      '\nerror ', error
    );

    // TODO: now, backpropagate the error, updating the weights.
    // https://en.wikibooks.org
    //   /wiki/Artificial_Neural_Networks/Error-Correction_Learning
    //
    // this.correct(error);
  }, this);
};

module.exports = Network;

console.log('See Network line 110 for this output:');

var network = new Network([1, 3, 1]);

var trainingSet = _.times(3, function() {
  // train to predict sin fn output
  var n = _.random(-1000, 1000, true);
  return {input: [n], output: [Math.sin(n)]};
});

network.train(trainingSet);
