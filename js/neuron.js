var activation = {
  softplus: function softplus(x) {
    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
    // http://www.quora.com/What-is-special-about-rectifier-neural-units-used-in-NN-learning
    return Math.log(1 + Math.exp(x));
  },
  tanh: function tanh(x) {
    // 4.4 The Sigmoid Fig. 4.b, Recommended.
    return 1.7159 * Math.tanh(2 / 3 * x);
  },
  sigmoid: function sigmoid(x) {
    // 4.4 The Sigmoid Fig. 4.a, Not recommended.
    return 1 / (1 + Math.exp(-x));
  }
};

var util = {
  getFastestActivation: function() {
    var cycles = '10,000,000';
    var fastest;
    var results = [];
    var start;
    var ms;
    var x = Math.random() - 0.5;

    console.log('cycles:', cycles);
    console.log('value:', x);
    console.log('----------------');

    for (var fn in activation) {
      start = new Date();
      _.times(cycles.replace(/,/g, ''), function() {
        activation[fn](x);
      });
      ms = new Date() - start;
      results.push({fn: fn, ms: ms});
      console.log(fn, ms + 'ms');
    }

    fastest = _.min(results, 'ms');
    console.log('----------------');
    console.debug(fastest.fn, ' @ ', fastest.ms + 'ms');
    return fastest;
  }
};

///////////////////////////////////////////////////////////////////////////////

function Neuron(output, bias) {
  console.log(Neuron.count);
  this.id = Neuron.count++;

  // connections
  this.incoming = [];
  this.outgoing = [];

  // signal values
  this.input = 0;
  this.output = output || 0;
  this.bias = bias || _.random(-0.2, 0.2);

  // activation
  this.activationFn = activation.tanh;
}

Neuron.count = 0;

Neuron.connection = function(source, target) {
  // 4.6 initializing the weights (16)
  var numConnections = target.incoming.length;
  var maxWeight = numConnections ? Math.pow(numConnections, -1 / 2) : Math.random();

  this.weight = _.random(0, maxWeight) - maxWeight / 2;
  this.source = source;
  this.target = target;
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

Neuron.prototype.connect = function(target) {
  var connection = new Neuron.connection(this, target);
  this.outgoing.push(connection);
  target.incoming.push(connection);
};

///////////////////////////////////////////////////////////////////////////////

function Layer(numNeurons) {
  // TODO: support convolution networks which use grid layers
  // http://andrew.gibiansky.com/blog/machine-learning/convolutional-neural-networks/
  var self = this;
  self.neurons = [];

  // add neurons
  _.times(numNeurons, function() {
    self.neurons.push(new Neuron())
  });
}

/**
 * Connects every neuron in this Layer to each neuron in the `target` Layer.
 * @param {Layer} targetLayer - The Layer to connect to.
 */
Layer.prototype.connect = function(targetLayer) {
  _.each(this.neurons, function(source) {
    _.each(targetLayer.neurons, function(target) {
      source.connect(target);
    });
  });
};

///////////////////////////////////////////////////////////////////////////////

/**
 * Network of layers of neurons.  One layer per argument.
 * First argument represents the input layer.
 * Last argument represents the output layer.
 * All arguments in between are hidden layers.
 * @param {...number} arguments - Number of neurons in the layer.
 * @constructor
 *
 * @example
 * // 2 inputs
 * // 1 output
 * var net = new Network(2, 1);
 *
 * @example
 * // 16 inputs
 * // 10 neuron hidden layer
 * // 4 neuron hidden layer
 * // 1 output
 * var net = new Network(16, 10, 4, 1);
 */
function Network() {
  var self = this;
  var args = Array.prototype.slice.call(arguments);
  var numInputs = _.first(args);
  var numOutputs = _.last(args);
  var hiddenLayers = _.slice(args, 1, args.length - 1);

  self.layers = [];

  // input layer
  self.layers.push(new Layer(numInputs));

  // hidden layers
  _.each(hiddenLayers, function(numNeurons, i) {
    // add layer
    self.layers.push(new Layer(numNeurons));
  });

  // output layer
  self.layers.push(new Layer(numOutputs));

  // connect layers
  _.each(self.layers, function(layer, i) {
    var next = self.layers[i + 1];
    if (next) {
      layer.connect(next);
    }
  });

}
