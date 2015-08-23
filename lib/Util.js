var ACTIVATION = require('./Activation');

var util = {
  /**
   * A hack that times all activation functions, logging the results.
   */
  findFastestActivation: function findFastestActivation() {
    var epochs = 5000000;
    var results = [];
    var start;
    var ms;
    var x = Math.random() - 0.5;

    console.log('epochs:', epochs);
    console.log('value:', x);
    console.log('...this will take a while');

    _.each(ACTIVATION, function(fn) {
      start = new Date();
      _.times(epochs, function() {
        fn(x);
      });
      ms = new Date() - start;
      var bar = _.repeat('=', Math.round(ms / (epochs / 250000)));

      results.push({
        bar: ['|' + bar + '>', ms, fn.name].join(' '),
        ms: ms
      });
    });

    // log results
    console.log('_______________ results in ms _______________');

    _.each(_.sortBy(results, 'ms'), function(result) {
      console.log(result.bar);
    });
  },

  /**
   * Normalizes an `array` of numbers to a range from -1 to 1.
   * @param {number[]} array - The array to normalize.
   * @param {number} [min] - The min scale factor.  Defaults to the min value
   *   in the `array`.
   * @param {number} [max] - The max scale factor.  Defaults to the max value
   *   in the `array`.
   */
  normalize: function normalize(array, min, max) {
    var minVal = (min || _.min(array));
    var maxVal = (max || _.max(array));
    var range = maxVal - minVal;
    var offset = 0 - minVal;
    return _.map(array, function(n) {
      return (n + offset) / (range / 2) - 1;
    });
  },

  /**
   * Returns a new function that is an approximate derivative of the `func`.
   * @param func - The function to create an approximate derivative of.
   * @returns {function}
   */
  getApproximateDerivative: function getApproximateDerivative(func) {
    // https://github.com/pr1001/MathPlus/blob/master/mathplus.js#L316
    return function(x) {
      return (func(x + 1e-10) - func(x)) / 1e-10;
    };
  }
};

module.exports = util;
