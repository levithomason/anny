import _ from 'lodash'
import {type} from './Util'

/**
 * Thin Error wrapper that concatenates all arguments into the Error message.
 * @param {string|string[]} message - The error message, concatenated if an
 *   array is passed.
 * @returns {Error}
 * @constructor
 */
class ValidationError extends Error {
  constructor(message) {
    const msg = [].concat(message).join('')
    super(msg)
    this.name = 'ValidationError'
    this.message = msg
    Error.captureStackTrace(this, 'ValidationError')
  }
}

/**
 * @namespace
 * @type {{}}
 */
const validate = {
  /**
   * @param {array} data The training data set.
   */
  dataIsArray: (data) => {
    if (!_.isArray(data)) {
      throw new ValidationError(`Training data must be an array, not: ${type(data)}`)
    }
  },

  /**
   * @param {array} data The training data set.
   */
  dataIsNotEmpty: (data) => {
    if (_.isEmpty(data)) {
      throw new ValidationError(`Training data array must not be empty.`)
    }
  },

  /**
   * @param {{}} sample A single object from a training data set.
   * @param {number} i The index of the sample in the training set.
   */
  sampleIsObject: (sample, i) => {
    if (!_.isPlainObject(sample)) {
      throw new ValidationError([
        `Training data array elements must be objects. Element at index ${i}`,
        ` is of type: ${type(sample)}`,
      ])
    }
  },

  /**
   * @param {{}} sample A single object from a training data set.
   * @param {number} i The index of the sample in the training set.
   */
  sampleHasInput: (sample, i) => {
    if (!_.isArray(sample.input)) {
      throw new ValidationError([
        `Training object "input" property must be an array.`,
        ` data[${i}]["input"] is type: ${type(sample.input)}`,
      ])
    }
  },

  /**
   * @param {{}} sample A single object from a training data set.
   * @param {number} i The index of the sample in the training set.
   */
  sampleHasOutput: (sample, i) => {
    if (!_.isArray(sample.output)) {
      throw new ValidationError([
        `Training object "output" property must be an array.`,
        ` data[${i}]["output"] is type: ${type(sample.output)}`,
      ])
    }
  },

  /**
   * @param {{}} sample A single object from a training data set.
   * @param {number} i The index of the sample in the training set.
   */
  sampleInputIsNotEmpty: (sample, i) => {
    if (_.isEmpty(sample.input)) {
      throw new ValidationError([
        `Training object "input" array must not be empty.`,
        ` See data[${i}]["input"].`,
      ])
    }
  },

  /**
   * @param {{}} sample A single object from a training data set.
   * @param {number} i The index of the sample in the training set.
   */
  sampleOutputIsNotEmpty: (sample, i) => {
    if (_.isEmpty(sample.output)) {
      throw new ValidationError([
        `Training object "output" array must not be empty.`,
        ` See data[${i}]["output"].`,
      ])
    }
  },

  /**
   * @param {{}} sample A single object from a training data set.
   * @param {number} i The index of the sample in the training set.
   */
  sampleInputIsOnlyNumbers: (sample, i) => {
    _.each(sample.input, n => {
      if (!_.isNumber(n)) {
        throw new ValidationError([
          `Training object "input" property values must be numbers.`,
          ` data[${i}]["input"] contains: ${type(n)}`,
        ])
      }
    })
  },

  /**
   * @param {{}} sample A single object from a training data set.
   * @param {number} i The index of the sample in the training set.
   */
  sampleOutputIsOnlyNumbers: (sample, i) => {
    _.each(sample.output, n => {
      if (!_.isNumber(n)) {
        throw new ValidationError([
          `Training object "output" property values must be numbers.`,
          ` data[${i}]["output"] contains: ${type(n)}`,
        ])
      }
    })
  },

  /**
   * @param {{}} sample A single object from a training data set.
   * @param {number} i The index of the sample in the training set.
   * @param {Network} network The Network to be trained on the training data
   *   set.
   */
  sampleInputFitsNetwork: (sample, i, network) => {
    const inputLayerSize = network.inputLayer.size()
    if (inputLayerSize !== sample.input.length) {
      throw new ValidationError([
        `Training data "input" and network input layer size must be equal.`,
        ` data[${i}] input size is ${sample.input.length}.`,
        ` Network input size is ${inputLayerSize}.`,
      ])
    }
  },

  /**
   * @param {{}} sample A single object from a training data set.
   * @param {number} i The index of the sample in the training set.
   * @param {Network} network The Network to be trained on the training data
   *   set.
   */
  sampleOutputFitsNetwork: (sample, i, network) => {
    const outputLayerSize = network.outputLayer.size()
    if (outputLayerSize !== sample.output.length) {
      throw new ValidationError([
        `Training data "output" and network output layer size must be equal.`,
        ` data[${i}] output size is ${sample.output.length}.`,
        ` Network output size is ${outputLayerSize}.`,
      ])
    }
  },

  /**
   * Ensures that a training set in valid form.
   * @param {Network} network The Network to be trained.
   * @param {object[]} data The data set to train the Network on.
   */
  trainingData: (network, data) => {
    validate.dataIsArray(data)
    validate.dataIsNotEmpty(data)

    _.each(data, (sample, i) => {
      validate.sampleIsObject(sample, i)
      validate.sampleHasInput(sample, i)
      validate.sampleHasOutput(sample, i)
      validate.sampleInputIsNotEmpty(sample, i)
      validate.sampleOutputIsNotEmpty(sample, i)
      validate.sampleInputIsOnlyNumbers(sample, i)
      validate.sampleOutputIsOnlyNumbers(sample, i)
      validate.sampleInputFitsNetwork(sample, i, network)
      validate.sampleOutputFitsNetwork(sample, i, network)
    })
  },
}

export default validate
