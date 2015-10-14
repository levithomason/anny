var _ = require('lodash');
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
 * @see Layer
 * @see Neuron
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
  /**
   * The output values of the Neurons in the last layer.  This is identical to
   * the Network's `outputLayer` output.
   * @type {Array}
   */
  this.output = [];

  /**
   * The cost function.  The function used to calculate the error of the
   * Network. In other words, to what degree was the Network's output wrong.
   * @see ERROR
   * @type {ERROR}
   */
  this.errorFn = ERROR.meanSquared;

  /**
   * The result of the `errorFn`.  Initializes as `null`.
   * @type {null|number}
   */
  this.error = null;

  /**
   * The max training iterations.  The Network will stop training after looping
   * through the training data this number of times.  One full loop through the
   * training data is counted as one epoch.
   * @type {number}
   */
  this.epochs = 20000;

  /**
   * The target `error` value.  The goal of the Network is to train until the
   * `error` is below this value.
   * @type {number}
   */
  this.errorThreshold = 0.001;

  /**
   * The first Layer of the Network.  This Layer receives input during
   * activation.
   * @type {Layer}
   */
  this.inputLayer = new Layer(numInputs, true);

  /**
   * An array of the `hiddenLayer`s only.
   * @type {Layer[]}
   */
  this.hiddenLayers = _.map(hiddenLayers, function(numNeurons) {
    return new Layer(numNeurons, true);
  });

  /**
   * The first Layer of the Network.  This Layer receives input during
   * activation.
   * @type {Layer}
   */
  this.outputLayer = new Layer(numOutputs);

  /**
   * An array of all Layers in the Network.  It is a single dimension array
   * containing the `inputLayer`, `hiddenLayers`, and the `outputLayer`.
   * @type {Layer}
   */
  this.allLayers = _.union(
    [this.inputLayer],
    this.hiddenLayers,
    [this.outputLayer]
  );

  // connect layers
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
 * @returns {number[]} output values
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
 * Values in the array specify the target output of the Neuron in the output
 *   layer.
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
 * @param {object[]} data - Array of objects in the form
 * `{input: [], output: []}`.
 * @param {function} [callback] - Called with the current error every
 *   `frequency`.
 * @param {number} [frequency] - How many iterations to let pass between
 *   logging the current error.
 */
Network.prototype.train = function(data, callback, frequency) {
  // TODO: validation and help on the data.
  //  ensure it is normalized between -1 and 1
  //  ensure the input length matches the number of Network inputs
  //  ensure the output length matches the number of Network outputs
  var callbackFrequency = frequency || 100;
  var lastEpochError = 0;
  var lastEpochTime = Date.now();
  var lowestEpochError = Infinity;

  var defaultCallback = function(err, epoch) {
    var isNewLow = err < lowestEpochError;
    var difference = err - lastEpochError;
    var time = Date.now() - lastEpochTime;
    var indicator = difference >= 0 ? '↑' : '↓';
    console.log(
      'epoch', _.padRight(epoch, 5),
      'err', err.toFixed(16),
      (isNewLow ? '★' : ' '),
      indicator, Math.abs(difference).toFixed(16),
      ('◷ ' + (time / 1000).toFixed(2) + 's')
    );
    lastEpochError = err;
    lastEpochTime = Date.now();
    lowestEpochError = Math.min(err, lowestEpochError);
  };

  _.each(_.range(this.epochs), function(index) {
    var n = index + 1;

    // loop over the training data summing the error of all samples
    // http://www.researchgate.net/post
    //   /Neural_networks_and_mean-square_errors#rgw51_55cb2f1399589
    this.error = _.sum(_.map(data, function(sample) {
      // make a prediction
      this.activate(sample.input);

      // correct the error
      this.correct(sample.output);

      // get the error
      return this.errorFn(sample.output, this.output) / data.length;
    }, this));

    // callback with results periodically
    if (n === 1 || n % callbackFrequency === 0) {
      (callback || defaultCallback)(this.error, n);
    }

    // success / fail
    if (this.error <= this.errorThreshold) {
      console.log(
        'Successfully trained to an error of', this.error, 'after', n, 'epochs.'
      );
      return false;
    } else if (n === this.epochs) {
      console.log(
        'Failed to train. Error is', this.error, 'after', n, 'epochs.'
      );
    }
  }, this);
};

module.exports = Network;
