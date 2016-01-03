import _ from 'lodash'
import ERROR from './Error'
import Layer from './Layer'
import {type} from './Util'

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
     * The result of the `errorFn`.
     * @type {Number}
     */
    this.error = 0

    /**
     * The cost function.  The function used to calculate Network `error`.
     * In other words, to what degree was the Network's output wrong.
     * @type {function}
     */
    this.errorFn = ERROR.meanSquared

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
   * Activate the Network with a given set of `input` values.
   * @param {number[]} inputs - Values to activate the Network's input Neurons
   *   with.
   * @returns {number[]} output - The output values of each Neuron in the output
   *   Layer.
   */
  activate(inputs) {
    this.inputLayer.activate(inputs)
    _.invoke(this.hiddenLayers, 'activate')
    return this.output = this.outputLayer.activate()
  }

  /**
   * Set Network `error` and output Layer `delta`s and propagate them backward
   * through the Network. The input Layer has no use for deltas, so it is
   * skipped.
   * @param {number[]} targetOutput - The expected Network output vector.
   */
  backprop(targetOutput) {
    this.error = this.errorFn(targetOutput, this.output)

    // TODO abstract into ERROR.meanSquared.partial once ERROR is refactored
    const delta = _.map(this.output, (actVal, j) => {
      return actVal - targetOutput[j]
    })

    this.outputLayer.backprop(delta)

    for (let i = this.hiddenLayers.length - 1; i >= 0; i -= 1) {
      this.hiddenLayers[i].backprop()
    }
  }

  /**
   * Calculate and accumulate Neuron Connection weight gradients.
   * Does not update weights. Useful during batch/mini-batch training.
   */
  accumulateGradients() {
    // NOTE can be parallel, Neuron ouputs and deltas are already set
    this.outputLayer.accumulateGradients()

    for (let i = this.hiddenLayers.length - 1; i >= 0; i -= 1) {
      this.hiddenLayers[i].accumulateGradients()
    }
  }

  /**
   * Update Neuron Connection weights and reset their accumulated gradients.
   */
  updateWeights() {
    // NOTE can be parallel, Neuron outputs and deltas are already set
    this.outputLayer.updateWeights()

    for (let i = this.hiddenLayers.length - 1; i >= 0; i -= 1) {
      this.hiddenLayers[i].updateWeights()
    }
  }
}

export default Network
