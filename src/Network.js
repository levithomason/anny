import _ from 'lodash'
import Layer from './Layer'
import ERROR from './Error'
import {type} from './Util'
import validate from './Validate'

/**
 * A Network contains [Layers]{@link Layer} of [Neurons]{@link Neuron}.
 *
 * @example
 * // 2 inputs
 * // 1 output
 * const net = new Network([2, 1]);
 *
 * @example
 * // 16 inputs
 * // 10 neuron hidden layer
 * // 4 neuron hidden layer
 * // 1 output
 * const net = new Network([16, 10, 4, 1]);
 */
class Network {
  /**
   * Creates a Network of Layers consisting of Neurons. Each array element
   * indicates a layer.  The value indicates the number of Neurons in that
   * Layer.
   *
   * The first element represents the number of Neurons in the input Layer.
   * The last element represents the number of Neurons in the output Layer.
   * Each element in between represents a hidden Layer with n Neurons.
   * @param {number[]} layerSizes - Number of neurons in each layer.
   * @constructor
   * @see Layer
   * @see Neuron
   */
  constructor(layerSizes) {
    if (!_.isArray(layerSizes)) {
      throw new Error(
        `Network() \`layerSizes\` must be an array, not: ${type(layerSizes)}`
      )
    }

    if (_.isEmpty(layerSizes) || !_.every(layerSizes, _.isNumber)) {
      throw new Error(
        `Network() \`layerSizes\` array elements must be all numbers.`
      )
    }

    /**
     * The output values of the Neurons in the last layer.  This is identical to
     * the Network's `outputLayer` output.
     * @type {Array}
     */
    this.output = []

    /**
     * The cost function.  The function used to calculate the error of the
     * Network. In other words, to what degree was the Network's output wrong.
     * @see ERROR
     * @type {ERROR}
     */
    this.errorFn = ERROR.meanSquared

    /**
     * The result of the `errorFn`.  Initializes as `null`.
     * @type {null|number}
     */
    this.error = null

    /**
     * An array of all Layers in the Network.  It is a single dimension array
     * containing the `inputLayer`, `hiddenLayers`, and the `outputLayer`.
     * @type {Layer}
     */
    this.allLayers = _.map(layerSizes, size => new Layer(size))
    /**
     * The first Layer of the Network.  This Layer receives input during
     * activation.
     * @type {Layer}
     */
    this.inputLayer = _.first(this.allLayers)

    /**
     * An array of all layers between the `inputLayer` and `outputLayer`.
     * @type {Layer[]}
     */
    this.hiddenLayers = _.slice(this.allLayers, 1, this.allLayers.length - 1)

    /**
     * The last Layer of the Network.  The output of this Layer is the
     * "prediction" the Network has made for some given input.
     * @type {Layer}
     */
    this.outputLayer = _.last(this.allLayers)

    // connect layers
    _.each(this.allLayers, (layer, i) => {
      const next = this.allLayers[i + 1]
      if (next) layer.connect(next)
    })
  }

  /**
   * Activate the network with a given set of `input` values.
   * @param {number[]} inputs - Values to activate the Network input Neurons.
   *   Values should be normalized between -1 and 1 using Util.normalize.
   * @returns {number[]} output values
   */
  activate(inputs) {
    this.inputLayer.activate(inputs)
    _.invoke(this.hiddenLayers, 'activate')
    this.output = this.outputLayer.activate()
    return this.output
  }

  /**
   * Correct the Network to produce the specified `output`.
   * @param {number[]} output - The target output for the Network.
   * Values in the array specify the target output of the Neuron in the output
   *   layer.
   */
  correct(output) {
    this.outputLayer.train(output)

    // train hidden layers in reverse (last to first)
    for (let i = this.hiddenLayers.length - 1; i >= 0; i -= 1) {
      this.hiddenLayers[i].train()
    }

    this.inputLayer.train()
  }

  /**
   * Train the Network to produce the output from the given input.
   * @param {object[]} data - Array of objects in the form
   * `{input: [], output: []}`.
   * @param {{}} [options] Training options.
   * @param {number} [options.errorThreshold=0.001] The target `error` value.
   *   The goal of the Network is to train until the `error` is below this
   *   value.
   * @param {number} [options.frequency] - How many iterations through the
   *   training data between calling `options.onProgress`.
   * @param {number} [options.maxEpochs=20000] The max training iterations.
   *   The Network will stop training after iterating through the training data
   *   this number of times.  One full loop through the training data is
   *   counted as one epoch.
   * @param {Network~onFail} [options.onFail] - Called if the Network `error`
   *   does not fall below the `errorThreshold` after `maxEpochs`.
   * @param {Network~onProgress} [options.onProgress] - Called every
   *   `frequency` epochs.
   * @param {Network~onSuccess} [options.onSuccess] - Called if the Network
   *   `error` falls below the `errorThreshold` during training.
   */
  train(data, options) {
    validate.trainingData(this, data)
    // TODO: ensure data is normalized to the range of the activation functions
    const {
      errorThreshold = 0.001,
      frequency = 100,
      maxEpochs = 20000,
      onFail = _.noop,
      onProgress = _.noop,
      onSuccess = _.noop,
      } = options

    if (!_.isNumber(errorThreshold)) {
      throw new Error(`train(...) "errorThreshold" must be a number.`)
    }

    if (!_.isNumber(frequency)) {
      throw new Error(`train(...) "frequency" must be a number.`)
    }

    if (!_.isNumber(maxEpochs)) {
      throw new Error(`train(...) "maxEpochs" must be a number`)
    }

    if (!_.isFunction(onFail)) {
      throw new Error(`train(...) "onFail" must be a function.`)
    }

    if (!_.isFunction(onProgress)) {
      throw new Error(`train(...) "onProgress" must be a function.`)
    }

    if (!_.isFunction(onSuccess)) {
      throw new Error(`train(...) "onSuccess" must be a function.`)
    }

    // use an 'each' loop so we can break out of it on success/fail
    // a 'times' loop cannot be broken
    _.each(_.range(maxEpochs), index => {
      const n = index + 1

      // loop over the training data summing the error of all samples
      // http://www.researchgate.net/post
      //   /Neural_networks_and_mean-square_errors#rgw51_55cb2f1399589
      this.error = _.sum(_.map(data, sample => {
        // make a prediction
        this.activate(sample.input)

        // correct the error
        this.correct(sample.output)

        // get the error
        return this.errorFn(sample.output, this.output) / data.length
      }))

      // success
      if (this.error <= errorThreshold) {
        onSuccess(this.error, n)
        return false
      }

      // fail
      if (n === maxEpochs) onFail(this.error, n)

      // call onProgress after the first epoch and every `frequency` thereafter
      if (n === 1 || n % frequency === 0) return onProgress(this.error, n)
    })
  }

  /**
   * Called if the Network error falls below the `errorThreshold`.
   * @callback Network~onSuccess
   * @param {number} error The Network error value at the time of success.
   * @param {number} epoch Indicates on which iteration through the training
   *   data the Network became successful.
   */

  /**
   * Called if the Network error is not below the `errorThreshold` after
   * `maxEpochs` iterations through the training data set.
   * @callback Network~onFail
   * @param {number} error The Network error value at the time of success.
   * @param {number} epoch Indicates on which iteration through the training
   *   data the Network became successful.
   */

  /**
   * Called if the Network error falls below the `errorThreshold`.
   * @callback Network~onProgress
   * @param {number} error The Network error value at the time of success.
   * @param {number} epoch Indicates on which iteration through the training
   *   data the Network became successful.
   */
}

export default Network
