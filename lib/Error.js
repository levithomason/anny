/**
 * Functions for calculating Network error.  The error is simply the difference
 * between the correct output and the actual output.
 * @type {object}
 */
var ERROR = {
  crossEntropy: function crossEntropy(expected, actual) {
    return -(_.sum(actual, function(actVal, i) {
        // 1e-15 to avoid log(0) which is Infinity
        // if expected output (classification) is 0, ignore this node entirely
        // https://jamesmccaffrey.wordpress.com/2013/11/05/
        //   why-you-should-use-cross-entropy-error-instead-of-classification
        //   -error-or-mean-squared-error-for-neural-network-classifier-training
        return expected[i] === 0 ? 0 : Math.log(actVal || 1e-15) * expected[i];
      }));
  },

  // These taken from: https://www.youtube.com/watch?v=U4BTzF3Wzt0

  meanSquared: function meanSquared(expected, actual) {
    return _.sum(actual, function(actVal, i) {
        return Math.pow(expected[i] - actVal, 2);
      }) / actual.length;
  },

  rootMeanSquared: function rootMeanSquared(expected, actual) {
    return Math.sqrt(ERROR.meanSquared(expected, actual));
  },

  arcTan: function arcTan(expected, actual) {
    return _.sum(actual, function(actVal, i) {
        return Math.atan(expected[i] - actVal);
      }) / actual.length;
  }
};

module.exports = ERROR;
