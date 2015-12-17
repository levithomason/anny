import _ from 'lodash'

// small helper for use in error messages
function type(arg) {
  return Object.prototype.toString.call(arg)
}

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
  normalize(array, dataMin = _.min(array), dataMax = _.max(array)) {
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
  getApproximateDerivative(func) {
    // https://github.com/pr1001/MathPlus/blob/master/mathplus.js#L316
    return x => (func(x + 1e-10) - func(x)) / 1e-10
  },

  /**
   * Thin Error wrapper that concatenates all arguments into the Error message.
   * @param {string|string[]} message - The error message, concatenated if an
   *   array is passed.
   * @returns {Error}
   * @constructor
   */
  Error(message) {
    return new Error([].concat(message).join(''))
  },

  /**
   * Ensures that a training set in valid form.
   * @param network
   * @param data
   */
  validateTrainingData(network, data) {
    // array
    if (!_.isArray(data)) {
      throw this.Error([`Training data must be an array, not: ${type(data)}`])
    }

    // not empty
    if (_.isEmpty(data)) {
      throw this.Error([`Training data array must not be empty.`])
    }

    // each sample
    _.each(data, (sample, i) => {
      // is object
      if (!_.isPlainObject(sample)) {
        throw this.Error([
          `Training data array elements must be objects. Element at index ${i}`,
          ` is of type: ${type(sample)}`,
        ])
      }

      // has input/output arrays
      if (!_.isArray(sample.input)) {
        throw this.Error([
          `Training object "input" property must be an array.`,
          ` data[${i}]["input"] is type: ${type(sample.input)}`,
        ])
      }

      if (!_.isArray(sample.output)) {
        throw this.Error([
          `Training object "output" property must be an array.`,
          ` data[${i}]["output"] is type: ${type(sample.output)}`,
        ])
      }

      // input/output arrays are not empty
      if (_.isEmpty(sample.input)) {
        throw this.Error([
          `Training object "input" array must not be empty.`,
          ` See data[${i}]["input"].`,
        ])
      }

      if (_.isEmpty(sample.output)) {
        throw this.Error([
          `Training object "output" array must not be empty.`,
          ` See data[${i}]["output"].`,
        ])
      }

      // input/output arrays contain only numbers
      _.each(sample.input, n => {
        if (!_.isNumber(n)) {
          throw this.Error([
            `Training object "input" property values must be numbers.`,
            ` data[${i}]["input"] contains: ${type(n)}`,
          ])
        }
      })

      _.each(sample.output, n => {
        if (!_.isNumber(n)) {
          throw this.Error([
            `Training object "output" property values must be numbers.`,
            ` data[${i}]["output"] contains: ${type(n)}`,
          ])
        }
      })

      // input/output size matches network input/output layer size
      const inputLayerSize = network.inputLayer.size()
      const outputLayerSize = network.outputLayer.size()

      if (inputLayerSize !== sample.input.length) {
        throw this.Error([
          `Training data "input" and network input layer size must be equal.`,
          ` data[${i}] input size is ${sample.input.length}.`,
          ` Network input size is ${inputLayerSize}.`,
        ])
      }

      if (outputLayerSize !== sample.output.length) {
        throw this.Error([
          `Training data "output" and network output layer size must be equal.`,
          ` data[${i}] output size is ${sample.output.length}.`,
          ` Network output size is ${outputLayerSize}.`,
        ])
      }
    })
  },
}

export default util
