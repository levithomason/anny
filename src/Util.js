import _ from 'lodash'


/**
 * @namespace
 * @type {{}}
 */
const util = {
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
  normalize: (array, dataMin = _.min(array), dataMax = _.max(array)) => {
    const offset = 0 - dataMin
    const range = dataMax - dataMin

    return _.map(array, n => {
      if (n > dataMax || n < dataMin) {
        throw new Error(
          `${n} is beyond the scale range: ${dataMin} to ${dataMax}`
        )
      }
      return (n + offset) / (range / 2) - 1
    })
  },

  /**
   * Returns a new function that is an approximate derivative of the `func`.
   * @param func - The function to create an approximate derivative of.
   * @returns {function}
   */
  getApproximateDerivative: (func) => {
    // https://github.com/pr1001/MathPlus/blob/master/mathplus.js#L316
    return x => (func(x + 1e-10) - func(x)) / 1e-10
  },

  /**
   * Thin helper for use getting object type.
   * @param {*} arg The value whose type should be returned.
   */
  type: (arg) => {
    return Object.prototype.toString.call(arg)
  },
}

export default util
