var INITIALIZE = require('./Initialize');
var ACTIVATION = require('./Activation');

function Neuron() {
  this.isBias = false;
  this.id = Neuron.count++;

  // connections
  this.incoming = [];
  this.outgoing = [];

  // signal values
  this.input = 0;
  this.output = 0;

  // activation
  this.activationFn = ACTIVATION.rectifier;
  this.activationDerivative = ACTIVATION.rectifierDerivative;

  // learning
  this.error = 0;
  this.delta = 0;
  this.learningRate = INITIALIZE.learningRate();
}

Neuron.count = 0;

Neuron.connection = function(source, target, weight) {
  return {
    source: source,
    target: target,
    weight: weight || INITIALIZE.weight(target.incoming.length)
  };
};

/**
 * Train the Neuron to output the `targetOutput`.
 * @param {number} [targetOutput] - Manually set the target output.error.
 *   If no `targetOutput` is provided, the Neuron will infer train itself
 *   to minimize the error of the Neurons it is connected to downstream.
 */
Neuron.prototype.train = function(targetOutput) {
  // input Neurons have no incoming connection weights to train
  if (this.isInput() || this.isBias) {
    return;
  }
  var inputDerivative = this.activationDerivative(this.input);
  if (!_.isUndefined(targetOutput)) {
    this.error = targetOutput - this.output;
  }

  // set the delta
  // https://www.youtube.com/watch?v=p1-FiWjThs8
  if (this.isOutput()) {
    this.delta = -this.error * inputDerivative;
  } else {
    this.delta = _.sum(this.outgoing, function(connection) {
      return inputDerivative * connection.weight * connection.target.delta;
    });
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
 *   Input Neuron output values will always be equal to their input value.
 *   Bias Neurons always output 1.
 *   All other Neurons will squash their input value to derive their output.
 * @param {number} [input] - If omitted the input value will be calculated
 *   from the outputs and weights of the Neurons connected to this Neuron.
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
  this.output = this.isInput() ? this.input : this.activationFn(this.input);

  return this.output;
};

/**
 * Connect this Neuron to another Neuron.
 * @param {Neuron} target - The Neuron to connect to.
 * @param {number} weight - The strength of the connection.
 */
Neuron.prototype.connect = function(target, weight) {
  // bias Neurons are not allowed to have inputs
  if (target.isBias) {
    return;
  }

  var connection = Neuron.connection(this, target, weight);
  this.outgoing.push(connection);
  target.incoming.push(connection);
};

/**
 * Determine if this Neuron is an input Neuron.
 * @returns {boolean}
 */
Neuron.prototype.isInput = function() {
  return !this.isBias && this.incoming.length === 0;
};

/**
 * Determine if this Neuron is an output Neuron.
 * @returns {boolean}
 */
Neuron.prototype.isOutput = function() {
  return this.outgoing.length === 0;
};

module.exports = Neuron;
