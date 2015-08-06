/**
 * Functions for calculating Network error.  The error is simply the difference
 * between the correct output and the actual output.
 * @type {object}
 */
var ERROR = {
  // These taken from: https://www.youtube.com/watch?v=U4BTzF3Wzt0

  meanSquared: function meanSquared(expected, actual) {
    return _.sum(actual, function(val, i) {
        return Math.pow(expected[i] - actual[i], 2);
      }) / actual.length;
  },

  rootMeanSquared: function rootMeanSquared(expected, actual) {
    return Math.sqrt(ERROR.meanSquared(expected, actual));
  },

  arcTan: function arcTan(expected, actual) {
    return _.sum(actual, function(val, i) {
        return Math.atan(expected[i] - actual[i]);
      }) / actual.length;
  }
};

module.exports = ERROR;
