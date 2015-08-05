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
  this.oldInput = 0;
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

  // console.log('n' + this.id + ' Neuron.correct error', this.error);

  // learn (adjust weights)
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
  if (!_.isUndefined(input)) {
    this.input = input;
  }

  // set output from input
  this.output = this.activationFn(this.input);

  // send output upstream
  _.each(this.outgoing, function(connection) {
    // TODO: once training reaches connection weight 0 it stops.
    // This is because output * weight 0 == 0.
    // Implement bias node to prevent this?
    connection.target.input += this.output * connection.weight;
  }, this);

  // keep a reference to the input
  // clear input, now that we've used it to activate this Neuron
  this.oldInput = this.input;
  this.input = 0;

  return this.output;
};

/**
 * Connect this Neuron to another Neuron.
 * @param {Neuron} target - The Neuron to connect to.
 * @param {number} weight - The strength of the connection.
 */
Neuron.prototype.connect = function(target, weight) {
  var connection = Neuron.connection(this, target, weight);
  this.outgoing.push(connection);
  target.incoming.push(connection);
};

module.exports = Neuron;
