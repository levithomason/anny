var math = require('mathjs');

/**
 * Activation functions and their derivatives for Neurons.
 * @type {object}
 */
var ACTIVATION = {
  /**
   * Simply max(0, x). Interestingly the derivative of the rectifier turns out
   * to be the logistic function. Range: (0,+inf)
   * @param x
   */
  rectifier: {
    // https://en.wikipedia.org/wiki/Rectifier
    func: function(x) {
      return math.max(0, x);
    },
    prime: function(x) {
      return 1 / (1 + math.exp(-x));
    },
  },

  /**
   * A smooth approximation of the rectifier.
   * Rage: (0,+inf)
   * @param x
   */
  softplus: {
    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
    func: function(x) {
      return math.log(1 + math.exp(x));
    },
    prime: function(x) {
      return math.log(1 + math.exp(x));
    },
  },

  /**
   * A smoothed step function or an 'S' shape. Also called the sigmoid
   * function, though there are many sigmoid functions.
   * Range: (0,+1)
   * @param {number} x
   * @returns {number}
   */
  logistic: {
    // 4.4 The Sigmoid Fig. 4.a, Not recommended.
    func: function(x) {
      return 1 / (1 + math.exp(-x));
    },
    prime: function(x) {
      var val = 1 / (1 + math.exp(-x));
      return val * (1 - val);
    },
  },

  /**
   * Simply passes the input to the output with no transformation.
   * Range: (-inf,+inf)
   * @param {number} x
   * @returns {number}
   */
  identity: {
    func: function(x) {
      return x;
    },
    prime: function(x) {
      return x;
    },
  },

  /**
   * The hyperbolic tangent function. A sigmoid curve, like the logistic
   * function, except it has a range of (-1,+1). Often performs better than
   * the logistic function because of its symmetry. Ideal for customization of
   * multilayer perceptrons, particularly the hidden layers.
   * Range: (-1, +1)
   * @param {number} x
   * @returns {number}
   */
  tanh: {
    func: function(x) {
      var negExp = math.exp(-x);
      var posExp = math.exp(x);
      return (posExp - negExp) / (posExp + negExp);
    },
    prime: function(x) {
      return 1 - math.pow(math.tanh(x), 2);
    },
  },

  /**
   * Modified hyperbolic tangent function.  Optimized for faster convergence.
   * Range: (-1, +1)
   * @param {number} x
   * @returns {number}
   */
  optimalTanh: {
    func: function(x) {
      return 1.7159 * math.tanh(x * 2 / 3);
    },
    prime: function(x) {
      return 1.14393 * math.sech(x * 2 / 3);
    },
  },
};

module.exports = ACTIVATION;
