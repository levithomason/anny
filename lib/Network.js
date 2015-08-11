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
  this.output = [];
  this.errorFn = ERROR.arcTan;

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
 * Correct the Network to produce the specified `output`.
 * @param {number[]} output - The target output for the Network.
 * Values in the array specify the target output of the Neuron in the output layer.
 */
Network.prototype.correct = function(output) {
  this.outputLayer.train(output);

  // train hidden layers in reverse (last to first)
  for (var i = this.hiddenLayers.length - 1; i >= 0; i -= 1) {
    this.hiddenLayers[i].train();
  }

  this.inputLayer.train();
};

/**
 * Train the Network to produce the output from the given input.
 * @param {object[]} data - Array of objects in the form `{input: [], output: []}`.
 * @param {function} [callback] - Called with the current error every callbackFrequency.
 * @param {number} [frequency] - How many iterations to let pass between logging the current error.
 */
Network.prototype.train = function(data, callback, frequency) {
  // TODO: validation and help on the data.
  //  ensure it is normalized between -1 and 1
  //  ensure the input length matches the number of Network inputs
  //  ensure the output length matches the number of Network outputs
  var maxEpochs = 50000;
  var errorThreshold = 0.1;
  var callbackFrequency = frequency || _.max([1, _.floor(maxEpochs / 20)]);

  _.each(_.range(maxEpochs), function(index) {
    var n = index + 1;

    // loop over the training data
    // find largest error of all samples
    var maxError = _.max(_.map(data, function(sample) {
      // make a prediction
      this.activate(sample.input);

      // correct the error
      this.correct(sample.output);

      // get the error
      return this.errorFn(sample.output, this.output);
    }, this));

    // callback with results periodically
    if (_.isFunction(callback) && (n === 1 || n % callbackFrequency === 0)) {
      callback(maxError, n);
    }

    // success / fail
    if (maxError <= errorThreshold) {
      console.debug('Successfully trained to a max error of', maxError, 'after', n, 'epochs.');
      return false;
    } else if (n === maxEpochs) {
      console.warn('Failed to train. Max error is', maxError, 'after', n, 'epochs.');
    }
  }, this);
};

module.exports = Network;
