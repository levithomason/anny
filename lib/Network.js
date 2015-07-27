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

  this.output = null;
  this.error = null;

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
 * Correct the `errors` in the Network, from the output back to the input.
 * @param {number[]} errors - The difference between the Network's actual
 *   output and the expected output.  Each value in the array corresponds to a
 *   Neuron in the output layer.
 */
Network.prototype.correct = function(errors) {
  this.outputLayer.correct(errors);

  // correct hidden layers in reverse (last to first)
  for (var i = this.hiddenLayers.length - 1; i >= 0; i -= 1) {
    this.hiddenLayers[i].correct();
  }

  this.inputLayer.correct();
};

/**
 * Train the Network to produce the output from the given input.
 * @param {object[]} [data] - Array of objects in the form
 *   `{input: [], output: []}`.
 * @param {number} [callbackFrequency=100] - How many iterations to let pass
 *  between calling the callback with the error.
 * @param {function} [callback] - Called with the iteration and current error
 *   every callbackFrequency iteration.
 */
Network.prototype.train = function(data, callbackFrequency, callback) {
  // TODO: validation and help on the data.
  //  ensure it is normalized between -1 and 1
  //  ensure the input length matches the number of Network inputs
  //  ensure the output length matches the number of Network outputs
  _.each(data, function(sample, i) {
    // make a prediction
    this.output = this.activate(sample.input);

    // get the error
    this.error = _.map(this.output, function(output, j) {
      return (sample.output[j] || 0) - output;
    });

    // correct the error
    this.correct(this.error);

    // log results periodically
    if (i % (callbackFrequency || 100) === 0) {
      callback(i, _.sum(this.error) / this.error.length);
    }
    // console.log(
    // 'input ', sample.input,
    // '\noutput', sample.output,
    // '\nthis.output', this.output,
    // '\nerrors ', this.error
    // );
  }, this);
};

module.exports = Network;
