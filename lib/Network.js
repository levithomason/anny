var Layer = require('./Layer');
var ERROR = require('./Error');

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
  this.error = 0;
  this.errorFn = ERROR.meanSquared;

  this.allLayers = [];
  this.hiddenLayers = [];

  // input layer
  this.inputLayer = new Layer(numInputs, true);
  this.allLayers.push(this.inputLayer);

  // hidden layers
  _.each(hiddenLayers, function(numNeurons) {
    var layer = new Layer(numNeurons, true);
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
  this.output = this.outputLayer.activate();
  return this.output;
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
 * @param {number} [logFrequency=10] - How many iterations to let pass between
 *   logging the current error.
 */
Network.prototype.train = function(data, logFrequency) {
  // TODO: validation and help on the data.
  //  ensure it is normalized between -1 and 1
  //  ensure the input length matches the number of Network inputs
  //  ensure the output length matches the number of Network outputs
  var self = this;
  var maxEpochs = 500;
  var counter = 0;
  var errorThreshold = 0.01;

  function fail() {
    console.warn(
      'Failed to train.',
      'Error is', self.error, 'after', maxEpochs, 'epochs.'
    );
  }

  function success() {
    console.debug(
      'Successfully trained to an error of',
      self.error, 'after', counter, 'epochs.'
    );
  }

  var train = _.bind(function() {
    counter += 1;
    this.error = 0;

    _.each(data, function(sample) {
      // make a prediction
      this.activate(sample.input);

      // increase the total network error for this training sample
      this.error += this.errorFn(sample.output, this.output) / data.length;

      // set the individual error for each output
      var outputErrors = _.map(this.outputLayer.neurons, function(neuron, j) {
        return sample.output[j] - this.output[j];
      }, this);

      // correct the error
      this.correct(outputErrors);
    }, this);

    // callback with results periodically
    if (counter % (logFrequency || 10) === 0) {
      console.log(this.error);
    }

    // recurse
    if (this.error <= errorThreshold) {
      success();
      return;
    }

    if (counter >= maxEpochs) {
      fail();
      return;
    }

    train();
  }, this);

  train();
};

module.exports = Network;
