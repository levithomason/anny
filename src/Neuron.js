import _ from 'lodash';
import INITIALIZE from './Initialize';
import ACTIVATION from './Activation';

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
    this.isBias = false;

    /**
     * A unique id beginning at 0 and incremented for every Neuron created.
     * @type {number}
     */
    this.id = Neuron.count++;

    /**
     * An array of incoming Connections from other Neurons.
     * @type {Array}
     * @see Neuron.Connection
     */
    this.incoming = [];
    /**
     * An array of outgoing Connections to other Neurons.
     * @type {Array}
     * @see Neuron.Connection
     */
    this.outgoing = [];

    // signal values
    this.input = 0;
    this.output = 0;

    // activation
    /**
     *
     * @type {ACTIVATION.tanh|{func, prime}|*}
     */
    this.activation = activation;

    // learning
    this.error = 0;
    this.delta = 0;
    this.learningRate = learningRate;
  }

  /**
   * Train the Neuron to output the `targetOutput`.  If a `targetOutput`
   * is not provided, the Neuron will train itself to minimize the error
   * of the Neurons from its outgoing connections.
   * @param {number} [targetOutput] - Manually set the target output.error.
   */
  train(targetOutput) {
    const inputDerivative = this.activation.prime(this.input);

    if (!_.isUndefined(targetOutput)) {
      this.error = targetOutput - this.output;
    }

    // set the delta
    // https://www.youtube.com/watch?v=p1-FiWjThs8
    //
    // Input Neurons and Bias Neurons do not need to calculate their delta.
    // This is because the delta is only used to update the weight but only the
    //   target Neuron's delta is used: targetDelta * weight * gradient.
    // Since input Neurons and Bias Neurons are strictly source Neurons
    //   they will never be a target Neuron and their delta's never used
    if (!this.isInput() && !this.isBias) {
      if (this.isOutput()) {
        this.delta = -this.error * inputDerivative;
      } else {
        this.delta = _.sum(this.outgoing, connection => {
          return inputDerivative * connection.weight * connection.target.delta;
        });
      }
    }

    // adjust weights
    _.each(this.outgoing, connection => {
      // get gradient
      // https://youtu.be/p1-FiWjThs8?t=12m21s
      const gradient = this.output * connection.target.delta;

      connection.weight -= gradient * this.learningRate;
    });
  }

  /**
   * Activate this Neuron, setting the input value and computing the output.
   *   Input Neuron output values will always be equal to their input
   * value. Bias Neurons always output 1. All other
   * Neurons will squash their input value to derive their
   * output.
   * @param {number} [input] - If omitted the input value will be calculated
   *   from the outputs and weights of the Neurons connected to
   *   this Neuron.
   * @returns {number}
   */
  activate(input) {
    if (this.isBias) {
      this.output = 1;
      return this.output;
    }

    // set the input
    if (!_.isUndefined(input)) {
      this.input = input;
    } else {
      this.input = _.sum(this.incoming, connection => {
        // we don't need to add the bias neuron manually here.
        // since the bias Neuron is connected like all other Neurons and it's
        // output is always 1, the weight will be added by bias.output * weight.
        return connection.source.output * connection.weight;
      });
    }

    // set the output
    this.output = this.activation.func(this.input);

    return this.output;
  }

  /**
   * Connect this Neuron to another Neuron.
   * @param {Neuron} target - The Neuron to connect to.
   * @param {number} weight - The strength of the connection.
   */
  connect(target, weight) {
    // bias Neurons are not allowed to have incoming connections
    if (target.isBias) {
      return;
    }

    const connection = new Neuron.Connection(this, target, weight);
    this.outgoing.push(connection);
    target.incoming.push(connection);
  }

  /**
   * Determine if this Neuron is an input Neuron.
   * @returns {boolean}
   */
  isInput() {
    return !this.isBias && this.incoming.length === 0;
  }

  /**
   * Determine if this Neuron is an output Neuron.
   * @returns {boolean}
   */
  isOutput() {
    return this.outgoing.length === 0;
  }
}

/**
 * A running total number of Neurons created.  It is only used to generate
 * unique ids for each Neuron. Creating a new Neuron increments the count but
 * it is never decremented.
 * @type {number}
 */
Neuron.count = 0;

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
Neuron.Connection = function Connection(source, target, weight) {
  /**
   * A reference to the Neuron at the start of this Connection.
   * @type {Neuron}
   */
  this.source = source;

  /**
   * A reference to the Neuron at the end of this Connection.
   * @type {Neuron}
   */
  this.target = target;

  /**
   * The weight is used as a multiplier for two purposes.  First, for
   * activation, when transferring the output of the `source` Neuron to
   * the input of the `target` Neuron. Second, during training, calculating the
   * total error delta.
   * @type {number}
   */
    // We add one to initialize the weight value as if this connection were
    // already part of the fan.
  this.weight = weight || INITIALIZE.weight(target.incoming.length);
};

export default Neuron;
