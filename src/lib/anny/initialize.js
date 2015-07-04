/**
 * Initialze Neuron and Connection values.
 * @type {{initialBias: Function, initialWeight: Function}}
 */
var initialize = {
  bias: function() {
    return _.random(-0.2, 0.2);
  },
  weight: function(numConnections) {
    // 4.6 Initializing the weights (16)
    var maxWeight;

    // give weight as if this connection were also added
    numConnections = numConnections + 1 || 1;

    // TODO: weight per connection is constant.  These values can be cached.
    maxWeight = Math.pow(numConnections, -1 / 2);
    return _.random(-maxWeight, maxWeight, true);
  }
};
