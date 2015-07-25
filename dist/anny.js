(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["anny"] = factory();
	else
		root["anny"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var anny = {
	  ACTIVATION: __webpack_require__(1),
	  ERROR: __webpack_require__(2),
	  INITIALIZE: __webpack_require__(3),
	  Layer: __webpack_require__(4),
	  Network: __webpack_require__(6),
	  Neuron: __webpack_require__(5),
	  util: __webpack_require__(7)
	};

	module.exports = anny;


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Activation functions for Neurons and Layers.
	 * @type {object}
	 */
	var ACTIVATION = {
	  softplus: function softplus(x) {
	    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
	    return Math.log(1 + Math.exp(Math.E, x));
	  },

	  tanh: function tanh(x) {
	    // 4.4 The Sigmoid Fig. 4.b, Recommended.
	    return 1.7159 * Math.tanh(2 / 3 * x);
	  },

	  rationalTanh: function rationalTanh(x) {
	    // http://stackoverflow.com/questions/6118028/
	    //   fast-hyperbolic-tangent-approximation-in-javascript
	    if (x < -3) {
	      return -1;
	    }
	    if (x > 3) {
	      return 1;
	    }
	    return x * ( 27 + x * x ) / ( 27 + 9 * x * x );
	  },

	  sigmoid: function sigmoid(x) {
	    // 4.4 The Sigmoid Fig. 4.a, Not recommended.
	    return 1 / (1 + Math.exp(Math.E, -x));
	  },


	  // The following are from:
	  // http://www.fmi.uni-sofia.bg/fmi/statist/education/textbook/eng/glosa.html

	  /**
	   * The activation level is passed on directly as the output. Used in a
	   * variety of network types, including linear networks, and the output layer
	   * of radial basis function networks.
	   * Range: (-inf,+inf)
	   * @param {number} x
	   */
	  identity: function identity(x) {
	    return x;
	  },

	  /**
	   * This is an S-shaped (sigmoid) curve, with output in the range (0,1).
	   * Range: (0,+1)
	   * @param {number} x
	   */
	  logistic: function logistic(x) {
	    return 1 / (1 + Math.exp(Math.E, -x));
	  },

	  /**
	   * The hyperbolic tangent function (tanh): a sigmoid curve, like the logistic
	   * function, except that output lies in the range (-1,+1). Often performs
	   * better than the logistic function because of its symmetry. Ideal for
	   * customization of multilayer perceptrons, particularly the hidden layers.
	   * Range: (-1,+1)
	   * @param {number} x
	   */
	  hyperbolic: function hyperbolic(x) {
	    return Math.pow(Math.E, x) - Math.pow(Math.E, -x) /
	      Math.pow(Math.E, x) + Math.pow(Math.E, -x);
	  },

	  /**
	   * The negative exponential function. Ideal for use with radial units. The
	   * combination of radial synaptic function and negative exponential
	   * activation function produces units that model a Gaussian (bell-shaped)
	   * function centered at the weight vector. The standard deviation of the
	   * Gaussian is given by "sigma = Math.sqrt(1/d)", where d is the "deviation"
	   * of the unit stored in the unit's threshold.
	   * Range: (0, +inf)
	   * @param {number} x
	   */
	  exponential: function exponential(x) {
	    return Math.pow(Math.E, -x);
	  },

	  /**
	   * Exponential function, with results normalized so that the sum of
	   * activations across the layer is 1.0. Can be used in the output layer of
	   * multilayer perceptrons for classification problems, so that the outputs
	   * can be interpreted as probabilities of class membership (Bishop, 1995;
	   * Bridle, 1990).
	   * Range: (0,+1)
	   * @param {number} x - The value.
	   * @param {number[]} vector - The array of values that `x` is a member of.
	   */
	  softmax: function softmax(x, vector) {
	    return Math.pow(Math.E, x) / _.sum(_.map(vector, function(xi) {
	        return Math.pow(Math.E, xi);
	      }));
	  },

	  /**
	   * Normalizes the outputs to sum to 1.0. Used in probablist neural networks
	   * (PNNs) to allow the outputs to be interpreted as probabilities.
	   * Range: (0,+1)
	   * @param {number} x - The value.
	   * @param {number[]} vector - The array of values that `x` is a member of.
	   */
	  unitSum: function unitSum(x, vector) {
	    return x / _.sum(_.map(vector, function(xi) {
	        return xi;
	      }));
	  },

	  /**
	   * Used to transform the squared distance activation in a self oranizing
	   * feature map (SOFM) network or Cluster network to the actual distance as
	   * an output.
	   * Range: (0, +inf)
	   * @param {number} x
	   */
	  squareRoot: function squareRoot(x) {
	    return Math.sqrt(x);
	  },

	  /**
	   * Possibly useful if recognizing radially-distributed data; not used by
	   * default.
	   * Range: [0,+1]
	   * @param {number} x
	   */
	  sine: function sine(x) {
	    return Math.sin(x);
	  },

	  /**
	   * A piece-wise linear version of the sigmoid function. Relatively poor
	   * training performance, but fast execution.
	   * Range: [-1,+1]
	   * @param {number} x
	   */
	  ramp: function ramp(x) {
	    if (x >= 1) {
	      return 1;
	    }

	    if (x <= -1) {
	      return -1;
	    }

	    return x;
	  },

	  /**
	   * Outputs either 1.0 or 0.0, depending on whether the Synaptic value is
	   * positive or negative. Can be used to model simple networks such as
	   * perceptrons.
	   * Range: [0,+1]
	   * @param {number} x
	   */
	  step: function step(x) {
	    return x < 0 ? 0 : 1;
	  }
	};

	module.exports = ACTIVATION;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Functions for calculating Network error.  The error is simply the difference
	 * between the correct output and the actual output.
	 * @type {object}
	 */
	var ERROR = {
	  // These taken from: https://www.youtube.com/watch?v=U4BTzF3Wzt0

	  meanSquared: function meanSquared() {
	    // TODO: fill it in
	  },

	  rootMeanSquared: function rootMeanSquared() {
	    // TODO: fill it in
	  },

	  arcTan: function arcTan() {
	    // TODO: fill it in
	  }
	};

	module.exports = ERROR;


/***/ },
/* 3 */
/***/ function(module, exports) {

	// Initialze Neuron and Connection values.
	var INITIALIZE = {
	  /**
	   * Initialize the bias for a Neuron.
	   * @returns {number}
	   */
	  bias: function() {
	    return _.random(-0.2, 0.2);
	  },

	  /**
	   * Initilize the weight for a Neuron.connection.
	   * @param numConnections
	   * @returns {number}
	   */
	  weight: function(numConnections) {
	    // 4.6 Initializing the weights (16)
	    // give weight as if this connection were also added
	    // TODO: weight per connection is constant.  These values can be cached.
	    var maxWeight = Math.pow(numConnections + 1 || 1, -1 / 2);
	    return _.random(-maxWeight, maxWeight, true);
	  }
	};

	module.exports = INITIALIZE;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var INITIALIZE = __webpack_require__(3);
	var Neuron = __webpack_require__(5);

	/**
	 * Creates a single dimension Layer of Neurons.
	 * @param {string} numNeurons -
	 * @constructor
	 */
	function Layer(numNeurons) {
	  // TODO: support convolution networks which use grid layers

	  var self = this;
	  self.neurons = [];

	  // add neurons
	  _.times(numNeurons, function() {
	    self.neurons.push(new Neuron());
	  });
	}

	/**
	 * Connects every Neuron in this Layer to each Neuron in the `target` Layer.
	 * @param {Layer} targetLayer - The Layer to connect to.
	 */
	Layer.prototype.connect = function(targetLayer) {
	  var self = this;

	  _.each(self.neurons, function(source) {
	    // every neuron in this layer is connected to each neuron in the next.
	    // we can assume the numConnections to be the num of neurons in this layer.

	    var numConnections = self.neurons.length;

	    // connect to each neuron in this layer
	    _.each(targetLayer.neurons, function(target) {
	      var weight = INITIALIZE.weight(numConnections);
	      source.connect(target, weight);
	    });
	  });
	};

	/**
	 * Activates all the Neurons in this Layer with the given array of values.
	 * @param {number[]} values - Map of input values for each Neuron.
	 */
	Layer.prototype.activate = function(values) {
	  _.each(this.neurons, function(neuron, i) {
	    neuron.activate(values ? values[i] : undefined);
	  });
	};

	module.exports = Layer;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var INITIALIZE = __webpack_require__(3);
	var ACTIVATION = __webpack_require__(1);

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

	module.exports = Neuron;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Layer = __webpack_require__(4);

	/**
	 * Creates a Network of Layers consisting of Neurons. Each array element
	 * indicates a layer.  The value indicates the number of Neurons in that Layer.
	 *
	 * The first element represents the number of Neurons in the input Layer.
	 * The last element represents the number of Neurons in the output Layer.
	 * Each element in between represents a hidden Layer with n Neurons.
	 * @param {number[]} layerSizes - Number of neurons in each layer.
	 * @constructor
	 *
	 * @example
	 * // 2 inputs
	 * // 1 output
	 * var net = new Network([2, 1]);
	 *
	 * @example
	 * // 16 inputs
	 * // 10 neuron hidden layer
	 * // 4 neuron hidden layer
	 * // 1 output
	 * var net = new Network([16, 10, 4, 1]);
	 */
	function Network(layerSizes) {
	  var self = this;
	  var numInputs = _.first(layerSizes);
	  var numOutputs = _.last(layerSizes);
	  var hiddenLayers = _.slice(layerSizes, 1, layerSizes.length - 1);

	  self.layers = [];

	  // input layer
	  self.input = new Layer(numInputs);
	  self.layers.push(self.input);

	  // hidden layers
	  _.each(hiddenLayers, function(numNeurons) {
	    self.layers.push(new Layer(numNeurons));
	  });

	  // output layer
	  self.output = new Layer(numOutputs);
	  self.layers.push(self.output);

	  // connect layers
	  _.each(self.layers, function(layer, i) {
	    var next = self.layers[i + 1];
	    if (next) {
	      layer.connect(next);
	    }
	  });
	}

	/**
	 * Train the Network to produce the output from the given input.
	 * @param {object[]} [data] - Array of objects in the form
	 * `{inputs: [], expected: []}`.
	 */
	Network.prototype.train = function(data) {
	  // TODO: left off here
	  console.log(data);
	};

	module.exports = Network;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var ACTIVATION = __webpack_require__(1);

	var util = {
	  /**
	   * A hack that times all activation functions, logging the results.
	   */
	  findFastestActivation: function() {
	    var epochs = 5000000;
	    var results = [];
	    var start;
	    var ms;
	    var x = Math.random() - 0.5;

	    console.log('epochs:', epochs);
	    console.log('value:', x);
	    console.log('...this will take a while');

	    _.each(ACTIVATION, function(fn) {
	      start = new Date();
	      _.times(epochs, function() {
	        ACTIVATION[fn](x);
	      });
	      ms = new Date() - start;
	      var bar = _.repeat('=', Math.round(ms / (epochs / 250000)));

	      results.push({
	        bar: ['|' + bar + '>', ms, fn].join(' '),
	        ms: ms
	      });
	    });

	    // log results
	    console.log('_______________ results in ms _______________');

	    _.each(_.sortBy(results, 'ms'), function(result) {
	      console.log(result.bar);
	    });
	  }
	};

	module.exports = util;


/***/ }
/******/ ])
});
;