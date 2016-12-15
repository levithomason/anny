import _ from 'lodash'
import INITIALIZE from './Initialize'
import Neuron from './Neuron'

/**
 * @class
 *   Layers are collections of [Neurons]{@link Neuron}.  They can do all the
 *   things Neurons can do by invoking methods on all the Neurons in the Layer.
 *
 *   Layers are organized into a {@link Network}
 * @see {Neuron}
 */
class Layer {
  /**
   * Creates a single dimension Layer of [Neurons]{@link Neuron}.
   * @param {number} size - The number of Neurons this Layer should have.
   * @param {number} [learningRate] - The learning rate passed directly to the
   *   Neuron constructor.
   * @param {object} [activation] - The activation function passed directly to
   *   the
   *   Neuron constructor.
   */
  constructor(size, activation, learningRate) {
    if (!_.isNumber(size)) {
      throw new Error(`Layer() 'size' must be a number, not: ${typeof size}`)
    }
    this.neurons = _.times(size, () => new Neuron(activation, learningRate))
  }

  /**
   * Connects every Neuron in this Layer to each Neuron in the `target` Layer.
   * @param {Layer} targetLayer - The Layer to connect to.
   */
  connect(targetLayer) {
    // if this Layer has no bias Neuron, add one
    // only Layers with outgoing connections get bias Neurons
    if (!_.some(this.neurons, 'isBias')) {
      const biasNeuron = new Neuron()
      biasNeuron.isBias = true
      this.neurons.push(biasNeuron)
    }

    _.forEach(this.neurons, (source) => {
      // every neuron in this Layer is connected to each neuron in the next.
      // we can assume the numInputs to be the num of neurons in this Layer.

      // connect each neuron in this Layer to every Neuron in the targetLayer
      _.forEach(targetLayer.neurons, (target) => {
        source.connect(target, INITIALIZE.weight(this.neurons.length))
      })
    })
  }

  /**
   * Activates all the Neurons in this Layer with the given array of values.
   * @param {number[]} [values=[]] - Map of input values for each Neuron.
   * @returns {number[]} - Array of Neuron output values.
   */
  activate(values = []) {
    /* eslint-disable lodash/prefer-invoke-map */
    // https://github.com/wix/eslint-plugin-lodash/issues/128
    return _.map(this.neurons, (neuron, i) => neuron.activate(values[i]))
    /* eslint-enable lodash/prefer-invoke-map */
  }

  /**
   * Sets all the Neuron `delta`s in this Layer to the given array of values.
   * @param {number[]} [deltas=[]] - Delta values, one for each Neuron.
   * @returns {number[]}
   */
  backprop(deltas = []) {
    _.forEach(this.neurons, (neuron, i) => neuron.backprop(deltas[i]))
  }

  /**
   * Calculate and accumulate Neuron Connection weight gradients.
   * Does not update weights. Useful during batch/mini-batch training.
   */
  accumulateGradients() {
    _.forEach(this.neurons, neuron => neuron.accumulateGradients())
  }

  /**
   * Update Neuron Connection weights and reset their accumulated gradients.
   */
  updateWeights() {
    _.forEach(this.neurons, neuron => neuron.updateWeights())
  }

  /**
   * Returns the number of Neurons in this Layer, excluding Bias Neurons.
   */
  size() {
    return _.filter(this.neurons, { isBias: false }).length
  }
}

export default Layer
