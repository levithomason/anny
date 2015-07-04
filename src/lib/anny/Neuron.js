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

Neuron.prototype.activate = function() {
  var self = this;
  var averageInput = self.input / (self.incoming.length || 1);
  var shouldFire;

  // set output from inputs
  self.output = self.activationFn(averageInput);
  shouldFire = self.output + self.bias > 0;

  if (shouldFire) {
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
