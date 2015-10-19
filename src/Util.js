import ACTIVATION from './Activation';

/**
 * @namespace
 * @type {{}}
 */
const util = {
  /**
   * A hack that times all activation functions, logging the results.
   */
  findFastestActivation() {
    let epochs = 5000000;
    let results = [];
    let start;
    let ms;
    let x = Math.random() - 0.5;

    console.log('epochs:', epochs);
    console.log('value:', x);
    console.log('...this will take a while');

    _.each(ACTIVATION, fn => {
      start = new Date();
      _.times(epochs, () => fn(x));
      ms = new Date() - start;
      let bar = _.repeat('=', Math.round(ms / (epochs / 250000)));

      results.push({
        bar: `|${bar}> ${ms} ${fn.name}`,
        ms: ms
      });
    });

    // log results
    console.log('_______________ results in ms _______________');

    _.each(_.sortBy(results, 'ms'), result => console.log(result.bar));
  },

  /**
   * Normalizes an `array` of numbers to a range from -1 to 1. Optionally
   * specifying the `dataMin` and/or `dataMax` is useful when normalizing
   * multiple arrays that do not each contain the global min value or global
   * max value.
   * @param {number[]} array - The array to normalize.
   * @param {number} [dataMin] - The number to use at the min value in the
   *   `array`. Defaults to the actual min `array` value.
   * @param {number} [dataMax] - The number to use at the max value in the
   *   `array`. Defaults to the actual max `array` value.
   */
  normalize(array, dataMin, dataMax) {
    let scaleMax = dataMax || _.max(array);
    let scaleMin = dataMin || _.min(array);
    let scaleOffset = 0 - scaleMin;
    let scaleRange = scaleMax - scaleMin;

    return _.map(array, n => {
      if (n > scaleMax || n < scaleMin) {
        throw new Error(
          `${n} is beyond the scale range: ${scaleMin} to ${scaleMax}`
        );
      }
      return (n + scaleOffset) / (scaleRange / 2) - 1;
    });
  },

  /**
   * Returns a new function that is an approximate derivative of the `func`.
   * @param func - The function to create an approximate derivative of.
   * @returns {function}
   */
  getApproximateDerivative(func) {
    // https://github.com/pr1001/MathPlus/blob/master/mathplus.js#L316
    return x => (func(x + 1e-10) - func(x)) / 1e-10;
  }
};

export default util;
