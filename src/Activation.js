import math from 'mathjs'

/**
 * Activation functions and their derivatives for a {@link Neuron}.
 * @namespace
 * @type {object}
 */
const ACTIVATION = {
  /**
   * Simply max(0, x). Interestingly the derivative of the rectifier turns out
   * to be the logistic function.
   * @param x
   */
  rectifier: {
    // https://en.wikipedia.org/wiki/Rectifier
    func: x => math.max(0, x),
    prime: x => 1 / (1 + math.exp(-x)),
    rangeMin: 0,
    rangeMax: Infinity,
  },

  /**
   * A smooth approximation of the rectifier.
   * @param x
   */
  softplus: {
    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
    func: x => math.log(1 + math.exp(x)),
    prime: x => math.log(1 + math.exp(x)),
    rangeMin: 0,
    rangeMax: Infinity,
  },

  /**
   * A smoothed step function or an 'S' shape. Also called the sigmoid
   * function, though there are many sigmoid functions.
   * @param {number} x
   * @returns {number}
   */
  logistic: {
    // 4.4 The Sigmoid Fig. 4.a, Not recommended.
    func: x => 1 / (1 + math.exp(-x)),
    prime: x => {
      const val = 1 / (1 + math.exp(-x))
      return val * (1 - val)
    },
    rangeMin: 0,
    rangeMax: 1,
  },

  /**
   * Simply passes the input to the output with no transformation.
   * @param {number} x
   * @returns {number}
   */
  identity: {
    func: x => x,
    prime: x => 1,
    rangeMin: -Infinity,
    rangeMax: Infinity,
  },

  /**
   * The hyperbolic tangent function. A sigmoid curve, like the logistic
   * function, except it has a range of (-1,+1). Often performs better than
   * the logistic function because of its symmetry. Ideal for customization of
   * multilayer perceptrons, particularly the hidden layers.
   * @param {number} x
   * @returns {number}
   */
  tanh: {
    func: x => {
      const negExp = math.exp(-x)
      const posExp = math.exp(x)
      return (posExp - negExp) / (posExp + negExp)
    },
    prime: x => 1 - math.pow(math.tanh(x), 2),
    rangeMin: -1,
    rangeMax: 1,
  },

  /**
   * Modified hyperbolic tangent function.  Optimized for faster convergence.
   * @param {number} x
   * @returns {number}
   */
  optimalTanh: {
    func: x => 1.7159 * math.tanh(x * 2 / 3),
    prime: x => 1.14393 * math.sech(x * 2 / 3),
    rangeMin: -1,
    rangeMax: 1,
  },
}

export default ACTIVATION
