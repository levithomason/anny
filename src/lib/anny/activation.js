/**
 * Activation functions.
 * @type {object}
 */
var activation = {
  softplus: function softplus(x) {
    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
    // http://www.quora.com/What-is-special-about-rectifier-neural-units-used-in-NN-learning
    return Math.log(1 + Math.exp(x));
  },
  tanh: function tanh(x) {
    // 4.4 The Sigmoid Fig. 4.b, Recommended.
    return 1.7159 * Math.tanh(2 / 3 * x);
  },
  sigmoid: function sigmoid(x) {
    // 4.4 The Sigmoid Fig. 4.a, Not recommended.
    return 1 / (1 + Math.exp(-x));
  }
};
