var _ = require('lodash');

// Initialze Neuron and Connection values.
/**
 * Initialize Neuron and Connection values.
 * @namespace
 * @type {object}
 */
var INITIALIZE = {
  /**
   * Initialize the bias for a Neuron.
   * @param {number} [range=0.2]
   * @returns {number}
   */
  bias: function bias(range) {
    var val = !_.isUndefined(range) ? range : 0.2;
    return _.random(-val, val);
  },

  /**
   * Initialize the learning rate for a Neuron.
   * @returns {number}
   */
  learningRate: function learningRate() {
    // TODO: Implement 4.7 Choosing learning rates (pg 13)
    return 0.3;
  },

  /**
   * Initialize the weight for a Neuron.connection.
   * @param numInputs
   * @returns {number}
   */
  weight: function weight(numInputs) {
    // 4.6 Initializing the weights (16)
    // TODO: weight per input is constant.  These values can be cached.
    var maxWeight = Math.pow(numInputs || 1, -1 / 2);
    return _.random(-maxWeight, maxWeight, true);
  }
};

module.exports = INITIALIZE;
