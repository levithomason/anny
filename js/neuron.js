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
  this.neurons = [];

  // add neurons
  for (var i = 0; i < numNeurons; i += 1) {
    this.neurons.push(new Neuron())
  }
}

///////////////////////////////////////////////////////////////////////////////

function Network() {
  var args = Array.prototype.slice.call(arguments);
  var numInputs = args.unshift();
  var numOutputs = args.pop();
  var hiddenLayers = args;

  this.layers = {
    input: new Layer(numInputs),
    output: new Layer(numOutputs)
  };

  // add hidden layers as layers.hidden1, layers.hidden2, etc.
  _.each(hiddenLayers, function(numNeurons, index) {
    var name = 'hidden' + index + 1;
    self.layers[name](new Layer(numNeurons))
  });
}

///////////////////////////////////////////////////////////////////////////////
var a = new Neuron();
var b = new Neuron();
a.connect(b);

var neurons = [a,b];

// add neurons to the dom
var neuronEle = $('.neurons');

_.each(neurons, function(n) {
  delete n.incoming; // circular refs
  delete n.outgoing; // circular refs
  neuronEle.append('<pre>' + JSON.stringify(n, null, 2) + '</pre>');
});
