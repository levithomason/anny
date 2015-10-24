import _ from 'lodash';

/**
 * Initialize Neuron and Connection values.
 * @namespace
 * @type {object}
 */
const INITIALIZE = {
  /**
   * Initialize the learning rate for a Neuron.
   * @returns {number}
   */
  learningRate() {
    // TODO: Implement 4.7 Choosing learning rates (pg 13)
    return 0.3;
  },

  /**
   * Initialize the weight for a Neuron.connection.
   * @param numInputs
   * @returns {number}
   */
  weight(numInputs) {
    // 4.6 Initializing the weights (16)
    // TODO: weight per input is constant.  These values can be cached.
    let maxWeight = Math.pow(numInputs || 1, -1 / 2);
    return _.random(-maxWeight, maxWeight, true);
  }
};

export default INITIALIZE;
