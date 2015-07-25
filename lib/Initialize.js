// Initialze Neuron and Connection values.
var INITIALIZE = {
  /**
   * Initialize the bias for a Neuron.
   * @returns {number}
   */
  bias: function() {
    return _.random(-0.2, 0.2);
  },

  /**
   * Initilize the weight for a Neuron.connection.
   * @param numConnections
   * @returns {number}
   */
  weight: function(numConnections) {
    // 4.6 Initializing the weights (16)
    // give weight as if this connection were also added
    // TODO: weight per connection is constant.  These values can be cached.
    var maxWeight = Math.pow(numConnections + 1 || 1, -1 / 2);
    return _.random(-maxWeight, maxWeight, true);
  }
};

module.exports = INITIALIZE;
