/**
 * Activation functions for Neurons and Layers.
 * @type {object}
 */
var ACTIVATION = {
  softplus: function softplus(x) {
    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
    return Math.log(1 + Math.exp(Math.E, x));
  },

  tanh: function tanh(x) {
    // 4.4 The Sigmoid Fig. 4.b, Recommended.
    return 1.7159 * Math.tanh(2 / 3 * x);
  },

  rationalTanh: function rationalTanh(x) {
    // http://stackoverflow.com/questions/6118028/
    //   fast-hyperbolic-tangent-approximation-in-javascript
    if (x < -3) {
      return -1;
    }
    if (x > 3) {
      return 1;
    }
    return x * ( 27 + x * x ) / ( 27 + 9 * x * x );
  },

  sigmoid: function sigmoid(x) {
    // 4.4 The Sigmoid Fig. 4.a, Not recommended.
    return 1 / (1 + Math.exp(Math.E, -x));
  },

  /**
   * Higher `c` values bring the shape of the sigmoid closer to that of the
   * step function.  A `c` value of 1 produces a normal sigmoid curve.
   * @param {number} x
   * @param {number} [c=1] - The constant to change the slope of the sigmoid.
   * @returns {number}
   */
  sigmoidTemperature: function(x, c) {
    // http://page.mi.fu-berlin.de/rojas/neural/chapter/K7.pdf
    // Fig. 7.1. Three sigmoids (for c = 1, c = 2 and c = 3)
    return 1 / (1 + Math.exp(Math.E, -(c || 1) * x));
  },

  // The following are from:
  // http://www.fmi.uni-sofia.bg/fmi/statist/education/textbook/eng/glosa.html

  /**
   * The activation level is passed on directly as the output. Used in a
   * variety of network types, including linear networks, and the output layer
   * of radial basis function networks.
   * Range: (-inf,+inf)
   * @param {number} x
   */
  identity: function identity(x) {
    return x;
  },

  /**
   * This is an S-shaped (sigmoid) curve, with output in the range (0,1).
   * Range: (0,+1)
   * @param {number} x
   */
  logistic: function logistic(x) {
    return 1 / (1 + Math.exp(Math.E, -x));
  },

  /**
   * The hyperbolic tangent function (tanh): a sigmoid curve, like the logistic
   * function, except that output lies in the range (-1,+1). Often performs
   * better than the logistic function because of its symmetry. Ideal for
   * customization of multilayer perceptrons, particularly the hidden layers.
   * Range: (-1,+1)
   * @param {number} x
   */
  hyperbolic: function hyperbolic(x) {
    return Math.pow(Math.E, x) - Math.pow(Math.E, -x) /
      Math.pow(Math.E, x) + Math.pow(Math.E, -x);
  },

  /**
   * The negative exponential function. Ideal for use with radial units. The
   * combination of radial synaptic function and negative exponential
   * activation function produces units that model a Gaussian (bell-shaped)
   * function centered at the weight vector. The standard deviation of the
   * Gaussian is given by "sigma = Math.sqrt(1/d)", where d is the "deviation"
   * of the unit stored in the unit's threshold.
   * Range: (0, +inf)
   * @param {number} x
   */
  exponential: function exponential(x) {
    return Math.pow(Math.E, -x);
  },

  /**
   * Exponential function, with results normalized so that the sum of
   * activations across the layer is 1.0. Can be used in the output layer of
   * multilayer perceptrons for classification problems, so that the outputs
   * can be interpreted as probabilities of class membership (Bishop, 1995;
   * Bridle, 1990).
   * Range: (0,+1)
   * @param {number} x - The value.
   * @param {number[]} vector - The array of values that `x` is a member of.
   */
  softmax: function softmax(x, vector) {
    return Math.pow(Math.E, x) / _.sum(_.map(vector, function(xi) {
        return Math.pow(Math.E, xi);
      }));
  },

  /**
   * Normalizes the outputs to sum to 1.0. Used in probablist neural networks
   * (PNNs) to allow the outputs to be interpreted as probabilities.
   * Range: (0,+1)
   * @param {number} x - The value.
   * @param {number[]} vector - The array of values that `x` is a member of.
   */
  unitSum: function unitSum(x, vector) {
    return x / _.sum(_.map(vector, function(xi) {
        return xi;
      }));
  },

  /**
   * Used to transform the squared distance activation in a self oranizing
   * feature map (SOFM) network or Cluster network to the actual distance as
   * an output.
   * Range: (0, +inf)
   * @param {number} x
   */
  squareRoot: function squareRoot(x) {
    return Math.sqrt(x);
  },

  /**
   * Possibly useful if recognizing radially-distributed data; not used by
   * default.
   * Range: [0,+1]
   * @param {number} x
   */
  sine: function sine(x) {
    return Math.sin(x);
  },

  /**
   * A piece-wise linear version of the sigmoid function. Relatively poor
   * training performance, but fast execution.
   * Range: [-1,+1]
   * @param {number} x
   */
  ramp: function ramp(x) {
    if (x >= 1) {
      return 1;
    }

    if (x <= -1) {
      return -1;
    }

    return x;
  },

  /**
   * Outputs either 1.0 or 0.0, depending on whether the Synaptic value is
   * positive or negative. Can be used to model simple networks such as
   * perceptrons.
   * Range: [0,+1]
   * @param {number} x
   */
  step: function step(x) {
    return x < 0 ? 0 : 1;
  }
};

module.exports = ACTIVATION;
