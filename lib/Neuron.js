var INITIALIZE = require('./Initialize');
var ACTIVATION = require('./Activation');

function Neuron() {
  this.id = Neuron.count++;

  // connections
  this.incoming = [];
  this.outgoing = [];

  // signal values
  this.input = 0;
  this.output = 0;
  this.bias = INITIALIZE.bias();

  // activation
  this.activationFn = ACTIVATION.tanh;
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
 * Activate this Neuron potentially causing it to fire its outputs.
 * @param {number} [inputValue] - If omitted the current value will be used.
 * @returns {number|*}
 */
Neuron.prototype.activate = function(inputValue) {
  var averageInput = this.input / (this.incoming.length || 1);

  if (inputValue) {
    this.input = inputValue;
  }

  // set output from inputs
  this.output = this.activationFn(inputValue || averageInput);

  if (this.output + this.bias >= 0) {
    // send output upstream
    _.each(this.outgoing, function(connection) {
      connection.target.input += this.output * connection.weight;
    }, this);
  }
  // console.log(
  //   'n' + this.id,
  //   'in', this.input,
  //   'val', inputValue || averageInput,
  //   'out', this.output
  // );

  return this.output;
};

Neuron.prototype.connect = function(target, weight) {
  var connection = Neuron.connection(this, target, weight);
  this.outgoing.push(connection);
  target.incoming.push(connection);
};

Neuron.prototype.receiveInput = function(target, weight) {
  var connection = Neuron.connection(this, target, weight);
  this.outgoing.push(connection);
  target.incoming.push(connection);
};

module.exports = Neuron;
