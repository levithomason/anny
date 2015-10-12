var _ = require('lodash');
var INITIALIZE = require('./Initialize');
var ACTIVATION = require('./Activation');

/**
 * A {@link Neuron} is the smallest unit of an artificial neural network.  They
 * are not useful until connected.
 * @constructor
 */
function Neuron() {
  /**
   * Flag identifying this {@link Neuron} as a Bias Neuron.  Bias Neurons are
   * like all all ot
   * @type {boolean}
   */
  this.isBias = false;

  /**
   * A unique id beginning at 0 and are incremented for every {@link Neuron}
   * created.
   * @type {number}
   */
  this.id = Neuron.count++;

  /**
   * An array of Neuron.Connection
   * @type {Array}
   */
  this.incoming = [];
  this.outgoing = [];

  // signal values
  this.input = 0;
  this.output = 0;

  // activation
  this.activation = ACTIVATION.tanh;

  // learning
  this.error = 0;
  this.delta = 0;
  this.learningRate = INITIALIZE.learningRate();
}

/**
 * A running total number of Neurons created.  It is only used to generate
 * unique ids for each Neuron. Creating a new {@link Neuron} increments the
 * count but it is never decremented.
 * @type {number}
 */
Neuron.count = 0;

/**
 * The connection between two [Neurons]{@link Neuron}.  Connections are
 * unidirectional.
 * @param {object} source - {@link Neuron} that will send its output to the
 *   `target` Neuron.
 * @param {object} target - {@link Neuron} that will get its input from the
 *   `source` Neuron.
 * @param {number} weight - The strength of the connection.  Meaning, how much
 *   of the `source` output is passed to the `target` {@link Neuron} input.
 * @constructor
 */
Neuron.Connection = function(source, target, weight) {
  /**
   * A reference to the actual {@link Neuron} that is at the beginning of this
   * Connection.
   * @type {Neuron}
   */
  this.source = source;

  /**
   * A reference to the actual {@link Neuron} that is at the end of this
   * Connection.
   * @type {Neuron}
   */
  this.target = target;

  // We add one to initialize the weight value as if this connection were
  // already part of the fan.
  /**
   * The weight is used as a multiplier for two purposes.  First, for
   * activation, when transferring the output of the `source` {@link Neuron} to
   * the input of the `target` Neuron. Second, during training, calculating the
   * total error delta.
   * @type {number}
   */
  this.weight = weight || INITIALIZE.weight(target.incoming.length + 1);
};

/**
 * Train the {@link Neuron} to output the `targetOutput`.  If a `targetOutput`
 * is not provided, the {@link Neuron} will train itself to minimize the error
 * of the [Neurons]{@link Neuron} from its outgoing connections.
 * @param {number} [targetOutput] - Manually set the target output.error.
 */
Neuron.prototype.train = function(targetOutput) {
  var inputDerivative = this.activation.prime(this.input);

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
      this.delta = _.sum(this.outgoing, function(connection) {
        return inputDerivative * connection.weight * connection.target.delta;
      });
    }
  }

  // adjust weights
  _.each(this.outgoing, function(connection) {
    // get gradient
    // https://youtu.be/p1-FiWjThs8?t=12m21s
    var gradient = this.output * connection.target.delta;

    connection.weight -= gradient * this.learningRate;
  }, this);
};

/**
 * Activate this Neuron, setting the input value and computing the output.
 *   Input {@link Neuron} output values will always be equal to their input
 * value. Bias [Neurons]{@link Neuron} always output 1. All other
 * [Neurons]{@link Neuron} will squash their input value to derive their
 * output.
 * @param {number} [input] - If omitted the input value will be calculated
 *   from the outputs and weights of the [Neurons]{@link Neuron} connected to
 *   this Neuron.
 * @returns {number}
 */
Neuron.prototype.activate = function(input) {
  if (this.isBias) {
    this.output = 1;
    return this.output;
  }

  // set the input
  if (!_.isUndefined(input)) {
    this.input = input;
  } else {
    this.input = _.sum(this.incoming, function(connection) {
      // we don't need to add the bias neuron manually here.
      // since the bias Neuron is connected like all other Neurons and it's
      // output is always 1, the weight will be added by bias.output * weight.
      return connection.source.output * connection.weight;
    });
  }

  // set the output
  // do not squash input Neurons values, pass them straight through
  this.output = this.isInput() ? this.input : this.activation.func(this.input);

  return this.output;
};

/**
 * Connect this {@link Neuron} to another Neuron.
 * @param {Neuron} target - The {@link Neuron} to connect to.
 * @param {number} weight - The strength of the connection.
 */
Neuron.prototype.connect = function(target, weight) {
  // bias Neurons are not allowed to have incoming connections
  if (target.isBias) {
    return;
  }

  var connection = new Neuron.Connection(this, target, weight);
  this.outgoing.push(connection);
  target.incoming.push(connection);
};

/**
 * Determine if this {@link Neuron} is an input Neuron.
 * @returns {boolean}
 */
Neuron.prototype.isInput = function() {
  return !this.isBias && this.incoming.length === 0;
};

/**
 * Determine if this {@link Neuron} is an output Neuron.
 * @returns {boolean}
 */
Neuron.prototype.isOutput = function() {
  return this.outgoing.length === 0;
};

module.exports = Neuron;
