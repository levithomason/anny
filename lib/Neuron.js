var INITIALIZE = require('./Initialize');
var ACTIVATION = require('./Activation');

function Neuron() {
  this.isBiasNeuron = false;
  this.id = Neuron.count++;

  // connections
  this.incoming = [];
  this.outgoing = [];

  // signal values
  this.input = 0;
  this.output = 0;

  // activation
  this.activationFn = ACTIVATION.logistic;

  // learning
  this.error = 0;
  this.learningRate = INITIALIZE.learningRate();
}

// TODO: delete this crap
global.Neuron = Neuron;

Neuron.count = 0;

Neuron.connection = function(source, target, weight) {
  return {
    source: source,
    target: target,
    weight: weight || INITIALIZE.weight(target.incoming.length)
  };
};

/**
 *
 * @param {number} [error] - Manually set the error if this Neuron is an
 *   output.  Otherwise, it will be calculated.
 */
Neuron.prototype.correct = function(error) {
  var calculatedError = _.sum(this.outgoing, function(connection) {
    return connection.target.error * connection.weight;
  });

  // set the error
  this.error = !_.isUndefined(error) ? error : calculatedError;

  // adjust weights
  _.each(this.outgoing, function(connection) {
    connection.weight -= this.error * this.learningRate;
  }, this);
};

/**
 * Activate this Neuron, potentially causing it to fire its outputs.
 * @param {number} [input] - If omitted the current value will be used.
 * @returns {number|*}
 */
Neuron.prototype.activate = function(input) {
  if (this.isBiasNeuron) {
    this.output = 1;
    return this.output;
  }

  // set the input
  if (!_.isUndefined(input)) {
    this.input = input;
  } else {
    this.input = _.sum(_.map(this.incoming, function(connection) {
      return connection.source.output * connection.weight;
    }));
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
  if (target.isBiasNeuron) {
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
  return this.incoming.length === 0;
};

/**
 * Determine if this Neuron is an output Neuron.
 * @returns {boolean}
 */
Neuron.prototype.isOutput = function() {
  return this.outgoing.length === 0;
};

module.exports = Neuron;
