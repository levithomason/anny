/**
 * Activation functions for Neurons and Layers.
 * @type {object}
 */
var ACTIVATION = {
  /**
   * Simply max(0, x).
   * Range: (0,+inf)
   * @param x
   * @returns {number}
   */
  rectifier: function rectifier(x) {
    // https://en.wikipedia.org/wiki/Rectifier
    return math.max(0, x);
  },

  /**
   * The derivative of the rectifier which is interestingly turns out to be the
   * logistic function.
   * Range: (0,+inf)
   * @param x
   * @returns {number}
   */
  rectifierDerivative: function rectifierDerivative(x) {
    // https://en.wikipedia.org/wiki/Rectifier
    return 1 / (1 + math.exp(-x));
  },

  /**
   * A smooth approximation of the rectifier.
   * Rage: (0,+inf)
   * @param x
   * @returns {number}
   */
  softplus: function softplus(x) {
    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
    return math.log(1 + math.exp(x));
  },

  /**
   * The derivative of the softplus.
   * @param x
   * @returns {number}
   */
  softplusDerivative: function softplusDerivative(x) {
    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
    return math.log(1 + math.exp(x));
  },

  /**
   * A smoothed step function or an 'S' shape. Also called the sigmoid
   * function, though there are many sigmoid functions.
   * Range: (0,+1)
   * @param {number} x
   */
  logistic: function logistic(x) {
    // 4.4 The Sigmoid Fig. 4.a, Not recommended.
    return 1 / (1 + math.exp(-x));
  },

  /**
   * The derivative of the logistic function.
   * @param {number} x
   */
  logisticDerivative: function logisticDerivative(x) {
    // 4.4 The Sigmoid Fig. 4.a, Not recommended.
    var val = 1 / (1 + math.exp(-x));
    return val * (1 - val);
  },

  /**
   * Simply passes the input to the output with no transformation.
   * Range: (-inf,+inf)
   * @param {number} x
   */
  identity: function identity(x) {
    return x;
  },

  /**
   * Derivative of the identity function.  The output is exactly the same as
   * the identify function. Included for consistency only.
   * @param x
   * @returns {*}
   */
  identityDerivative: function identityDerivative(x) {
    return x;
  },

  /**
   * The hyperbolic tangent function. A sigmoid curve, like the logistic
   * function, except it has a range of (-1,+1). Often performs better than
   * the logistic function because of its symmetry. Ideal for customization of
   * multilayer perceptrons, particularly the hidden layers.
   * Range: (-1, +1)
   * @param {number} x
   */
  tanh: function tanh(x) {
    var negExp = math.exp(-x);
    var posExp = math.exp(x);
    return (posExp - negExp) / (posExp + negExp);
  },

  /**
   * The derivative of the hyperbolic tangent (tanh) function.
   * @param x
   * @returns {number}
   */
  tanhDerivative: function tanhDerivative(x) {
    return 1 - math.pow(math.tanh(x), 2);
  },

  /**
   * Modified hyperbolic tangent function.  Optimized for faster convergence.
   * @returns {number}
   */
  optimalTanh: function(x) {
    return 1.7159 * math.tanh(x * 2 / 3);
  },

  /**
   * The derivative of the modified hyperbolic tangent function.
   * @returns {number}
   */
  optimalTanhDerivative: function(x) {
    return 1.14393 * math.sech(x * 2 / 3);
  }
};

module.exports = ACTIVATION;
