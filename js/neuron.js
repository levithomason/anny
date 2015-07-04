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

var heuristics = {
  initialBias: function() {
    return _.random(-0.2, 0.2);
  },
  initialWeight: function(numConnections) {
    // 4.6 Initializing the weights (16)
    var maxWeight;

    // give weight as if this connection were also added
    numConnections = numConnections + 1 || 1;

    // TODO: weight per connection is constant.  These values can be cached.
    maxWeight = Math.pow(numConnections, -1 / 2);
    return _.random(-maxWeight, maxWeight, true);
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

function Neuron() {
  this.id = Neuron.count++;

  // connections
  this.incoming = [];
  this.outgoing = [];

  // signal values
  this.input = 0;
  this.output = 0;
  this.bias = heuristics.initialBias();

  // activation
  this.activationFn = activation.tanh;
}

Neuron.count = 0;

Neuron.connection = function(source, target, weight) {
  return {
    source: source,
    target: target,
    weight: weight || heuristics.initialWeight(target.incoming.length)
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
 * Sets the connection weights.
 * @param {Layer} targetLayer - The Layer to connect to.
 */
Layer.prototype.connect = function(targetLayer) {
  var self = this;

  _.each(self.neurons, function(source) {
    // every neuron in this layer is connected to each neuron in the next.
    // we can assume the numConnections to be the num of neurons in this layer.

    // 4.6 initializing the weights (16)
    // TODO: weight is set by num of connections.  These can be cached values.
    var numConnections = self.neurons.length;
    var maxWeight = Math.pow(numConnections, -1 / 2);

    // connect to each neuron in this layer
    _.each(targetLayer.neurons, function(target) {
      var weight = _.random(-maxWeight, maxWeight);
      source.connect(target, weight);
    });


  });
};

///////////////////////////////////////////////////////////////////////////////

/**
 * Creates a Network of Layers consisting of Neurons.  One layer per argument.
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
