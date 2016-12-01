import _ from 'lodash'
import INITIALIZE from './Initialize'
import ACTIVATION from './Activation'

/**
 * @class
 *   A Neuron is the base unit of the network. They are connected by a
 *   {@link Connection} It's purpose is to sum its inputs and compute an
 *   output. During training, a Neuron will adjust the weights of its outgoing
 *   [Connections]{@link Neuron.Connection} to other Neurons.
 *
 *   Neurons are organized into [Layers]{@link Layer}
 */
class Neuron {
  /**
   * @param {object} [activation=ACTIVATION.tanh] - An object containing an
   *   activation function and its first derivative. Typically selected from
   *   {@link ACTIVATION}.
   * @param {number} [learningRate=INITIALIZE.learningRate()] - The rate at
   *   which this Neuron should update its Connection weights during training.
   *   Usually a very small number (ie 0.01 - 0.5), experiment for optimal
   *   results.
   */
  constructor(activation = ACTIVATION.tanh,
              learningRate = INITIALIZE.learningRate()) {
    /**
     * Flag identifying this Neuron as a Bias Neuron.  Bias Neurons are like
     * regular Neurons, except they have no incoming Connections and always
     * output 1.
     * @type {boolean}
     */
    this.isBias = false

    /**
     * A unique id beginning at 0 and incremented for every Neuron created.
     * @type {number}
     */
    this.id = Neuron.count++

    /**
     * An array of incoming Connections from other Neurons.
     * @type {Array}
     * @see Neuron.Connection
     */
    this.incoming = []

    /**
     * An array of outgoing Connections to other Neurons.
     * @type {Array}
     * @see Neuron.Connection
     */
    this.outgoing = []

    /**
     * The input value of the last activation.
     * @type {number}
     */
    this.input = 0

    /**
     * The output value of the last activation.
     * @type {number}
     */
    this.output = 0

    /**
     *
     * @type {ACTIVATION.tanh|{func, prime}|*}
     */
    this.activation = activation

    // learning
    this.delta = 0
    this.learningRate = learningRate
  }

  /**
   * Activate this Neuron, setting the input value and computing the output.
   *   Input Neuron output values will always be equal to their input
   * value. Bias Neurons always output 1. All other
   * Neurons will squash their input value to derive their
   * output.
   * @param {number} [input] - If omitted the input value will be calculated
   *   from the outputs and weights of the Neurons connected to this Neuron.
   * @returns {number}
   */
  activate(input) {
    if (this.isBias) return this.output = 1

    // set the input
    if (!_.isUndefined(input)) {
      this.input = input
    } else {
      this.input = _.sum(this.incoming, connection => {
        // we don't need to add the bias neuron manually here.
        // since the bias Neuron is connected like all other Neurons and it's
        // output is always 1, the weight will be added by bias.output * weight.
        return connection.source.output * connection.weight
      })
    }

    // set the output
    return this.output = this.isInput()
      ? this.input
      : this.activation.func(this.input)
  }

  /**
   * Set this Neuron's `delta` value, or compute it if omitted.
   * @param {number} [delta] - If omitted, the delta value will be calculated
   *   from the deltas and weights of the Neurons this Neuron is connected to.
   * @returns {number}
   */
  backprop(delta) {
    // input and bias neurons have no incoming connections to update
    if (this.isInput() || this.isBias) return this.delta

    // set deltas
    if (!_.isUndefined(delta)) {
      this.delta = delta
    } else {
      this.delta = _.sum(this.outgoing, ({target, weight}) => {
        return this.activation.prime(this.input) * weight * target.delta
      })
    }

    return this.delta
  }

  /**
   * Calculate and accumulate Connection weight gradients.
   * Does not update weights. Useful during batch/mini-batch training.
   */
  accumulateGradients() {
    _.each(this.incoming, connection => connection.accumulate())
  }

  /**
   * Update Connection weights and reset their accumulated gradients.
   */
  updateWeights() {
    _.each(this.incoming, connection => connection.update())
  }

  /**
   * Connect this Neuron to another Neuron.
   * @param {Neuron} target - The Neuron to connect to.
   * @param {number} weight - The strength of the connection.
   */
  connect(target, weight) {
    // bias Neurons are not allowed to have incoming connections
    if (target.isBias) return

    const connection = new Neuron.Connection(this, target, weight)
    this.outgoing.push(connection)
    target.incoming.push(connection)
  }

  /**
   * Determine if this Neuron is an input Neuron.
   * @returns {boolean}
   */
  isInput() {
    return !this.isBias && _.isEmpty(this.incoming)
  }

  /**
   * Determine if this Neuron is an output Neuron.
   * @returns {boolean}
   */
  isOutput() {
    return _.isEmpty(this.outgoing)
  }
}

/**
 * A running total number of Neurons created.  It is only used to generate
 * unique ids for each Neuron. Creating a new Neuron increments the count but
 * it is never decremented.
 * @type {number}
 */
Neuron.count = 0

/**
 * @class
 *   [Neurons]{@link Neuron} communication via Connections. Their weights
 *   determine the output of the network and are updated during training.  The
 *   knowledge or ability of a network is represented in the weight matrix (all
 *   the weight values).
 * @param {Neuron} source - The Neuron that will send its output to the
 *   `target` Neuron.
 * @param {Neuron} target - The Neuron that will get its input from the
 *   `source` Neuron.
 * @param {number} weight - The strength of the connection.  Meaning, what
 *   ratio of the `source` Neuron's output is passed to the `target` Neuron's
 *   input.
 * @see Neuron
 */
Neuron.Connection = class Connection {
  constructor(source, target, weight) {
    /**
     * A reference to the Neuron at the start of this Connection.
     * @type {Neuron}
     */
    this.source = source

    /**
     * A reference to the Neuron at the end of this Connection.
     * @type {Neuron}
     */
    this.target = target

    /**
     * The weight is used as a multiplier for two purposes.  First, for
     * activation, when transferring the output of the `source` Neuron to
     * the input of the `target` Neuron. Second, during training, calculating
     * the total error delta.
     * @type {number}
     */
      // We add one to initialize the weight value as if this connection were
      // already part of the fan.
    this.weight = weight || INITIALIZE.weight(target.incoming.length)

    this.gradient = 0
  }

  /**
   * Calculate and accumulate `gradient`. Does not update `weight`.
   */
  accumulate() {
    // delta this.output - target
    const gradient = this.source.output * this.target.delta
    this.gradient += gradient * this.target.learningRate
  }

  /**
   * Update `weight` and reset accumulated `gradient`.
   */
  update() {
    this.accumulate()
    // TODO support other weight update rules, like iRProp+
    this.weight -= this.gradient
    this.gradient = 0
  }
}

export default Neuron
