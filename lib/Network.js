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
  var numInputs = _.first(layerSizes);
  var numOutputs = _.last(layerSizes);
  var hiddenLayers = _.slice(layerSizes, 1, layerSizes.length - 1);

  this.allLayers = [];
  this.hiddenLayers = [];

  // input layer
  this.inputLayer = new Layer(numInputs);
  this.allLayers.push(this.inputLayer);

  // hidden layers
  _.each(hiddenLayers, function(numNeurons) {
    var layer = new Layer(numNeurons);
    this.hiddenLayers.push(layer);
    this.allLayers.push(layer);
  }, this);

  // output layer
  this.outputLayer = new Layer(numOutputs);
  this.allLayers.push(this.outputLayer);

  // connect layers and populate allLayers
  _.each(this.allLayers, function(layer, i) {
    var next = this.allLayers[i + 1];
    if (next) {
      layer.connect(next);
    }
  }, this);
}

/**
 * Activate the network with a given set of `input` values.
 * @param {number[]} inputs - Values to activate the Network input Neurons.
 *   Values should be normalized between -1 and 1 using Util.normalize.
 * @returns {*} output values
 */
Network.prototype.activate = function(inputs) {
  this.inputLayer.activate(inputs);
  _.invoke(this.hiddenLayers, 'activate');
  return this.outputLayer.activate();
};

/**
 * Make a correction to the Network using the `error` from running activate.
 * @param {number[]} errors - The difference between the Network's actual
 *   output and the expected output.  Each value in the array corresponds to a
 *   Neuron in the output layer.
 */
Network.prototype.correct = function(errors) {
  _.each(this.allLayers, function(layer) {
    layer.correct(errors);
  });
};

/**
 * Train the Network to produce the output from the given input.
 * @param {object[]} [data] - Array of objects in the form
 *   `{input: [], output: []}`.
 */
Network.prototype.train = function(data) {
  _.each(data, function(sample, i) {
    // warn if training sample and Network have a different number of outputs
    if (sample.output.length !== this.outputLayer.neurons.length) {
      console.warn([
        'Training sample', i + 1, 'defines', sample.output.length, 'expected',
        'output(s) but the Network has', this.outputLayer.neurons.length, '.',
        '\n\nExcess expected outputs will be disregarded.',
        '\nNeurons without an expected output will have an error of 0.'
      ].join(' '));
    }

    // send data forward
    var actuals = this.activate(sample.input);

    // calculate the error
    var errors = _.map(actuals, function(output, i) {
      return (sample.output[i] || 0) - output;
    });

    // send errors backward
    this.correct(errors);

    console.log(
      'input ', sample.input,
      '\noutput', sample.output,
      '\nactuals', actuals,
      '\nerrors ', errors
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
