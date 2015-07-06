function Neuron() {
  this.id = Neuron.count++;

  // connections
  this.incoming = [];
  this.outgoing = [];

  // signal values
  this.input = 0;
  this.output = 0;
  this.bias = initialize.bias();

  // activation
  this.activationFn = activation.tanh;
}

Neuron.count = 0;

Neuron.connection = function(source, target, weight) {
  return {
    source: source,
    target: target,
    weight: weight || initialize.weight(target.incoming.length)
  };
};

/**
 * Activate this Neuron potentially causing it to fire its outputs.
 * @param {number} [inputValue] - If omitted the current value will be used.
 * @returns {number|*}
 */
Neuron.prototype.activate = function(inputValue) {
  var self = this;
  var averageInput = self.input / (self.incoming.length || 1);

  if (inputValue) {
    self.input = inputValue;
  }

  // set output from inputs
  self.output = self.activationFn(inputValue || averageInput);

  if (self.output + self.bias >= 0) {
    // send output upstream
    _.each(self.outgoing, function(connection) {
      connection.target.input += self.output * connection.weight;
    });
  }

  return self.output;
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
