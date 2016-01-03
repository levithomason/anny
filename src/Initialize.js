import _ from 'lodash'

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
    return 0.3
  },

  /**
   * Initialize the weight for a Neuron.connection.
   * @param numInputs
   * @returns {number}
   */
  weight(numInputs) {
    // 4.6 Initializing the weights (16)
    // We find ^-1/4 performs better than the original ^1/2
    const maxWeight = Math.pow(numInputs, -1 / 4)
    return _.random(-maxWeight, maxWeight, true)
  },
}

export default INITIALIZE
