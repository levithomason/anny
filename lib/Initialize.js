// Initialze Neuron and Connection values.
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
    return 0.5;
  },

  /**
   * Initialize the weight for a Neuron.connection.
   * @param numConnections
   * @returns {number}
   */
  weight: function weight(numConnections) {
    // 4.6 Initializing the weights (16)
    // give weight as if this connection were also added
    // TODO: weight per connection is constant.  These values can be cached.
    var maxWeight = Math.pow(numConnections + 1 || 1, -1 / 4);
    return _.random(-maxWeight, maxWeight, true);
  }
};

module.exports = INITIALIZE;
