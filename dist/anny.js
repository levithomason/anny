(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("math"), require("_"));
	else if(typeof define === 'function' && define.amd)
		define(["math", "_"], factory);
	else if(typeof exports === 'object')
		exports["anny"] = factory(require("math"), require("_"));
	else
		root["anny"] = factory(root["math"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
	  ERROR: __webpack_require__(3),
	  INITIALIZE: __webpack_require__(5),
	  Layer: __webpack_require__(6),
	  Network: __webpack_require__(8),
	  Neuron: __webpack_require__(7),
	  util: __webpack_require__(9)
	};

	module.exports = anny;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var math = __webpack_require__(2);

	/**
	 * Activation functions and their derivatives for a {@link Neuron}.
	 * @namespace
	 * @type {object}
	 */
	var ACTIVATION = {
	  /**
	   * Simply max(0, x). Interestingly the derivative of the rectifier turns out
	   * to be the logistic function. Range: (0,+inf)
	   * @param x
	   */
	  rectifier: {
	    // https://en.wikipedia.org/wiki/Rectifier
	    func: function(x) {
	      return math.max(0, x);
	    },
	    prime: function(x) {
	      return 1 / (1 + math.exp(-x));
	    },
	  },

	  /**
	   * A smooth approximation of the rectifier.
	   * Rage: (0,+inf)
	   * @param x
	   */
	  softplus: {
	    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
	    func: function(x) {
	      return math.log(1 + math.exp(x));
	    },
	    prime: function(x) {
	      return math.log(1 + math.exp(x));
	    },
	  },

	  /**
	   * A smoothed step function or an 'S' shape. Also called the sigmoid
	   * function, though there are many sigmoid functions.
	   * Range: (0,+1)
	   * @param {number} x
	   * @returns {number}
	   */
	  logistic: {
	    // 4.4 The Sigmoid Fig. 4.a, Not recommended.
	    func: function(x) {
	      return 1 / (1 + math.exp(-x));
	    },
	    prime: function(x) {
	      var val = 1 / (1 + math.exp(-x));
	      return val * (1 - val);
	    },
	  },

	  /**
	   * Simply passes the input to the output with no transformation.
	   * Range: (-inf,+inf)
	   * @param {number} x
	   * @returns {number}
	   */
	  identity: {
	    func: function(x) {
	      return x;
	    },
	    prime: function(x) {
	      return x;
	    },
	  },

	  /**
	   * The hyperbolic tangent function. A sigmoid curve, like the logistic
	   * function, except it has a range of (-1,+1). Often performs better than
	   * the logistic function because of its symmetry. Ideal for customization of
	   * multilayer perceptrons, particularly the hidden layers.
	   * Range: (-1, +1)
	   * @param {number} x
	   * @returns {number}
	   */
	  tanh: {
	    func: function(x) {
	      var negExp = math.exp(-x);
	      var posExp = math.exp(x);
	      return (posExp - negExp) / (posExp + negExp);
	    },
	    prime: function(x) {
	      return 1 - math.pow(math.tanh(x), 2);
	    },
	  },

	  /**
	   * Modified hyperbolic tangent function.  Optimized for faster convergence.
	   * Range: (-1, +1)
	   * @param {number} x
	   * @returns {number}
	   */
	  optimalTanh: {
	    func: function(x) {
	      return 1.7159 * math.tanh(x * 2 / 3);
	    },
	    prime: function(x) {
	      return 1.14393 * math.sech(x * 2 / 3);
	    },
	  },
	};

	module.exports = ACTIVATION;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);

	/**
	 * Functions for calculating Network error.  The error is simply the difference
	 * between the correct output and the actual output.
	 * @namespace
	 * @see Network
	 * @type {object}
	 */
	var ERROR = {
	  /**
	   * @param {number[]} expected - Array of output values the Network should
	   *   have produced.
	   * @param {number[]} actual - Array of output values the Network actually
	   *   produced.
	   * @returns {number}
	   */
	  crossEntropy: function crossEntropy(expected, actual) {
	    return -(_.sum(actual, function(actVal, i) {
	        return Math.log(actVal) * expected[i];
	      })) / actual.length;
	  },

	  // These taken from: https://www.youtube.com/watch?v=U4BTzF3Wzt0

	  /**
	   * @param {number[]} expected - Array of output values the Network should
	   *   have produced.
	   * @param {number[]} actual - Array of output values the Network actually
	   *   produced.
	   * @returns {number}
	   */
	  meanSquared: function meanSquared(expected, actual) {
	    return _.sum(actual, function(actVal, i) {
	        return Math.pow(expected[i] - actVal, 2);
	      }) / actual.length;
	  },

	  /**
	   * @param {number[]} expected - Array of output values the Network should
	   *   have produced.
	   * @param {number[]} actual - Array of output values the Network actually
	   *   produced.
	   * @returns {number}
	   */
	  rootMeanSquared: function rootMeanSquared(expected, actual) {
	    return Math.sqrt(ERROR.meanSquared(expected, actual));
	  },

	  /**
	   * @param {number[]} expected - Array of output values the Network should
	   *   have produced.
	   * @param {number[]} actual - Array of output values the Network actually
	   *   produced.
	   * @returns {number}
	   */
	  arcTan: function arcTan(expected, actual) {
	    return _.sum(actual, function(actVal, i) {
	        return Math.atan(expected[i] - actVal);
	      }) / actual.length;
	  }
	};

	module.exports = ERROR;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);

	// Initialze Neuron and Connection values.
	/**
	 * Initialize Neuron and Connection values.
	 * @namespace
	 * @type {object}
	 */
	var INITIALIZE = {
	  /**
	   * Initialize the bias for a Neuron.
	   * @param {number} [range=0.2]
	   * @returns {number}
	   */
	  bias: function bias(range) {
	    var val = !_.isUndefined(range) ? range : 0.2;
	    return _.random(-val, val);
	  },

	  /**
	   * Initialize the learning rate for a Neuron.
	   * @returns {number}
	   */
	  learningRate: function learningRate() {
	    // TODO: Implement 4.7 Choosing learning rates (pg 13)
	    return 0.3;
	  },

	  /**
	   * Initialize the weight for a Neuron.connection.
	   * @param numInputs
	   * @returns {number}
	   */
	  weight: function weight(numInputs) {
	    // 4.6 Initializing the weights (16)
	    // TODO: weight per input is constant.  These values can be cached.
	    var maxWeight = Math.pow(numInputs || 1, -1 / 2);
	    return _.random(-maxWeight, maxWeight, true);
	  }
	};

	module.exports = INITIALIZE;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);
	var INITIALIZE = __webpack_require__(5);
	var Neuron = __webpack_require__(7);

	/**
	 * Creates a single dimension Layer of Neurons.
	 * @param {string} numNeurons - The number of Neurons this Layer should have.
	 * @param {boolean} [addBias=false] - Add a bias Neuron to this Layer.
	 * @constructor
	 * @see Neuron
	 */
	function Layer(numNeurons, addBias) {
	  var self = this;
	  self.neurons = [];

	  // add neurons
	  _.times(numNeurons, function() {
	    self.neurons.push(new Neuron());
	  });

	  // add bias neuron
	  if (addBias) {
	    var biasNeuron = new Neuron();
	    biasNeuron.isBias = true;
	    self.neurons.push(biasNeuron);
	  }
	}

	/**
	 * Connects every Neuron in this Layer to each Neuron in the `target` Layer.
	 * @param {Layer} targetLayer - The Layer to connect to.
	 */
	Layer.prototype.connect = function(targetLayer) {
	  var self = this;

	  _.each(self.neurons, function(source) {
	    // every neuron in this layer is connected to each neuron in the next.
	    // we can assume the numInputs to be the num of neurons in this layer.

	    // connect to each neuron in this Layer to the targetLayer
	    _.each(targetLayer.neurons, function(target) {
	      source.connect(target, INITIALIZE.weight(self.neurons.length));
	    });
	  });
	};

	/**
	 * Activates all the Neurons in this Layer with the given array of values.
	 * @param {number[]} [values] - Map of input values for each Neuron.
	 * @returns {number[]} - Array of Neuron output values.
	 */
	Layer.prototype.activate = function(values) {
	  return _.map(this.neurons, function(neuron, i) {
	    return neuron.activate(values ? values[i] : undefined);
	  });
	};

	/**
	 * Train the Neurons in this layer.  If target `outputs` are specified, the
	 * Neurons will learn to output these values.  This is only useful for output
	 * Layers.
	 * @param {number[]} [outputs] - Map of target output values for each Neuron.
	 */
	Layer.prototype.train = function(outputs) {
	  _.each(this.neurons, function(neuron, i) {
	    neuron.train(outputs ? outputs[i] : undefined);
	  });
	};

	module.exports = Layer;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);
	var INITIALIZE = __webpack_require__(5);
	var ACTIVATION = __webpack_require__(1);

	/**
	 * A Neuron is the smallest unit of an artificial neural network.  They
	 * are not useful until connected with a Connection.
	 * @constructor
	 */
	function Neuron() {
	  /**
	   * Flag identifying this Neuron as a Bias Neuron.  Bias Neurons are like
	   * regular Neurons, except they have no incoming Connections and always
	   * output 1.
	   * @type {boolean}
	   */
	  this.isBias = false;

	  /**
	   * A unique id beginning at 0 and are incremented for every Neuron created.
	   * @type {number}
	   */
	  this.id = Neuron.count++;

	  /**
	   * An array of Connections.
	   * @type {Array}
	   * @see Neuron.Connection
	   */
	  this.incoming = [];
	  this.outgoing = [];

	  // signal values
	  this.input = 0;
	  this.output = 0;

	  // activation
	  this.activation = ACTIVATION.tanh;

	  // learning
	  this.error = 0;
	  this.delta = 0;
	  this.learningRate = INITIALIZE.learningRate();
	}

	/**
	 * A running total number of Neurons created.  It is only used to generate
	 * unique ids for each Neuron. Creating a new Neuron increments the count but
	 * it is never decremented.
	 * @type {number}
	 */
	Neuron.count = 0;

	/**
	 * The connection between two Neurons. Connections are unidirectional.
	 * @param {Neuron} source - The Neuron that will send its output to the
	 *   `target` Neuron.
	 * @param {Neuron} target - The Neuron that will get its input from the
	 *   `source` Neuron.
	 * @param {number} weight - The strength of the connection.  Meaning, what
	 *   ratio of the `source` Neuron's output is passed to the `target` Neuron's
	 *   input.
	 * @constructor
	 * @see Neuron
	 */
	Neuron.Connection = function(source, target, weight) {
	  /**
	   * A reference to the Neuron at the start of this Connection.
	   * @type {Neuron}
	   */
	  this.source = source;

	  /**
	   * A reference to the Neuron at the end of this Connection.
	   * @type {Neuron}
	   */
	  this.target = target;

	  /**
	   * The weight is used as a multiplier for two purposes.  First, for
	   * activation, when transferring the output of the `source` Neuron to
	   * the input of the `target` Neuron. Second, during training, calculating the
	   * total error delta.
	   * @type {number}
	   */
	  // We add one to initialize the weight value as if this connection were
	  // already part of the fan.
	  this.weight = weight || INITIALIZE.weight(target.incoming.length + 1);
	};

	/**
	 * Train the Neuron to output the `targetOutput`.  If a `targetOutput`
	 * is not provided, the Neuron will train itself to minimize the error
	 * of the Neurons from its outgoing connections.
	 * @param {number} [targetOutput] - Manually set the target output.error.
	 */
	Neuron.prototype.train = function(targetOutput) {
	  var inputDerivative = this.activation.prime(this.input);

	  if (!_.isUndefined(targetOutput)) {
	    this.error = targetOutput - this.output;
	  }

	  // set the delta
	  // https://www.youtube.com/watch?v=p1-FiWjThs8
	  //
	  // Input Neurons and Bias Neurons do not need to calculate their delta.
	  // This is because the delta is only used to update the weight but only the
	  //   target Neuron's delta is used: targetDelta * weight * gradient.
	  // Since input Neurons and Bias Neurons are strictly source Neurons
	  //   they will never be a target Neuron and their delta's never used
	  if (!this.isInput() && !this.isBias) {
	    if (this.isOutput()) {
	      this.delta = -this.error * inputDerivative;
	    } else {
	      this.delta = _.sum(this.outgoing, function(connection) {
	        return inputDerivative * connection.weight * connection.target.delta;
	      });
	    }
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
	 *   Input Neuron output values will always be equal to their input
	 * value. Bias Neurons always output 1. All other
	 * Neurons will squash their input value to derive their
	 * output.
	 * @param {number} [input] - If omitted the input value will be calculated
	 *   from the outputs and weights of the Neurons connected to
	 *   this Neuron.
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
	  this.output = this.isInput() ? this.input : this.activation.func(this.input);

	  return this.output;
	};

	/**
	 * Connect this Neuron to another Neuron.
	 * @param {Neuron} target - The Neuron to connect to.
	 * @param {number} weight - The strength of the connection.
	 */
	Neuron.prototype.connect = function(target, weight) {
	  // bias Neurons are not allowed to have incoming connections
	  if (target.isBias) {
	    return;
	  }

	  var connection = new Neuron.Connection(this, target, weight);
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);
	var Layer = __webpack_require__(6);
	var ERROR = __webpack_require__(3);

	/**
	 * Creates a Network of Layers consisting of Neurons. Each array element
	 * indicates a layer.  The value indicates the number of Neurons in that Layer.
	 *
	 * The first element represents the number of Neurons in the input Layer.
	 * The last element represents the number of Neurons in the output Layer.
	 * Each element in between represents a hidden Layer with n Neurons.
	 * @param {number[]} layerSizes - Number of neurons in each layer.
	 * @constructor
	 * @see Layer
	 * @see Neuron
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
	  var numInputs = _.first(layerSizes);
	  var numOutputs = _.last(layerSizes);
	  var hiddenLayers = _.slice(layerSizes, 1, layerSizes.length - 1);
	  /**
	   * The output values of the Neurons in the last layer.  This is identical to
	   * the Network's `outputLayer` output.
	   * @type {Array}
	   */
	  this.output = [];

	  /**
	   * The cost function.  The function used to calculate the error of the
	   * Network. In other words, to what degree was the Network's output wrong.
	   * @see ERROR
	   * @type {ERROR}
	   */
	  this.errorFn = ERROR.meanSquared;

	  /**
	   * The result of the `errorFn`.  Initializes as `null`.
	   * @type {null|number}
	   */
	  this.error = null;

	  /**
	   * The max training iterations.  The Network will stop training after looping
	   * through the training data this number of times.  One full loop through the
	   * training data is counted as one epoch.
	   * @type {number}
	   */
	  this.epochs = 20000;

	  /**
	   * The target `error` value.  The goal of the Network is to train until the
	   * `error` is below this value.
	   * @type {number}
	   */
	  this.errorThreshold = 0.001;

	  /**
	   * The first Layer of the Network.  This Layer receives input during
	   * activation.
	   * @type {Layer}
	   */
	  this.inputLayer = new Layer(numInputs, true);

	  /**
	   * An array of the `hiddenLayer`s only.
	   * @type {Layer[]}
	   */
	  this.hiddenLayers = _.map(hiddenLayers, function(numNeurons) {
	    return new Layer(numNeurons, true);
	  });

	  /**
	   * The first Layer of the Network.  This Layer receives input during
	   * activation.
	   * @type {Layer}
	   */
	  this.outputLayer = new Layer(numOutputs);

	  /**
	   * An array of all Layers in the Network.  It is a single dimension array
	   * containing the `inputLayer`, `hiddenLayers`, and the `outputLayer`.
	   * @type {Layer}
	   */
	  this.allLayers = _.union(
	    [this.inputLayer],
	    this.hiddenLayers,
	    [this.outputLayer]
	  );

	  // connect layers
	  _.each(this.allLayers, function(layer, i) {
	    var next = this.allLayers[i + 1];
	    if (next) {
	      layer.connect(next);
	    }
	  }, this);
	}

	/**
	 * Activate the network with a given set of `input` values.
	 * @param {number[]} inputs - Values to activate the Network input Neurons.
	 *   Values should be normalized between -1 and 1 using Util.normalize.
	 * @returns {number[]} output values
	 */
	Network.prototype.activate = function(inputs) {
	  this.inputLayer.activate(inputs);
	  _.invoke(this.hiddenLayers, 'activate');
	  this.output = this.outputLayer.activate();
	  return this.output;
	};

	/**
	 * Correct the Network to produce the specified `output`.
	 * @param {number[]} output - The target output for the Network.
	 * Values in the array specify the target output of the Neuron in the output
	 *   layer.
	 */
	Network.prototype.correct = function(output) {
	  this.outputLayer.train(output);

	  // train hidden layers in reverse (last to first)
	  for (var i = this.hiddenLayers.length - 1; i >= 0; i -= 1) {
	    this.hiddenLayers[i].train();
	  }

	  this.inputLayer.train();
	};

	/**
	 * Train the Network to produce the output from the given input.
	 * @param {object[]} data - Array of objects in the form
	 * `{input: [], output: []}`.
	 * @param {function} [callback] - Called with the current error every
	 *   `frequency`.
	 * @param {number} [frequency] - How many iterations to let pass between
	 *   logging the current error.
	 */
	Network.prototype.train = function(data, callback, frequency) {
	  // TODO: validation and help on the data.
	  //  ensure it is normalized between -1 and 1
	  //  ensure the input length matches the number of Network inputs
	  //  ensure the output length matches the number of Network outputs
	  var callbackFrequency = frequency || 100;
	  var lastEpochError = 0;
	  var lastEpochTime = Date.now();
	  var lowestEpochError = Infinity;

	  var defaultCallback = function(err, epoch) {
	    var isNewLow = err < lowestEpochError;
	    var difference = err - lastEpochError;
	    var time = Date.now() - lastEpochTime;
	    var indicator = difference >= 0 ? '↑' : '↓';
	    console.log(
	      'epoch', _.padRight(epoch, 5),
	      'err', err.toFixed(16),
	      (isNewLow ? '★' : ' '),
	      indicator, Math.abs(difference).toFixed(16),
	      ('◷ ' + (time / 1000).toFixed(2) + 's')
	    );
	    lastEpochError = err;
	    lastEpochTime = Date.now();
	    lowestEpochError = Math.min(err, lowestEpochError);
	  };

	  _.each(_.range(this.epochs), function(index) {
	    var n = index + 1;

	    // loop over the training data summing the error of all samples
	    // http://www.researchgate.net/post
	    //   /Neural_networks_and_mean-square_errors#rgw51_55cb2f1399589
	    this.error = _.sum(_.map(data, function(sample) {
	      // make a prediction
	      this.activate(sample.input);

	      // correct the error
	      this.correct(sample.output);

	      // get the error
	      return this.errorFn(sample.output, this.output) / data.length;
	    }, this));

	    // callback with results periodically
	    if (n === 1 || n % callbackFrequency === 0) {
	      (callback || defaultCallback)(this.error, n);
	    }

	    // success / fail
	    if (this.error <= this.errorThreshold) {
	      console.log(
	        'Successfully trained to an error of', this.error, 'after', n, 'epochs.'
	      );
	      return false;
	    } else if (n === this.epochs) {
	      console.log(
	        'Failed to train. Error is', this.error, 'after', n, 'epochs.'
	      );
	    }
	  }, this);
	};

	module.exports = Network;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var ACTIVATION = __webpack_require__(1);

	/**
	 * @namespace
	 * @type {{}}
	 */
	var util = {
	  /**
	   * A hack that times all activation functions, logging the results.
	   */
	  findFastestActivation: function findFastestActivation() {
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
	        fn(x);
	      });
	      ms = new Date() - start;
	      var bar = _.repeat('=', Math.round(ms / (epochs / 250000)));

	      results.push({
	        bar: ['|' + bar + '>', ms, fn.name].join(' '),
	        ms: ms
	      });
	    });

	    // log results
	    console.log('_______________ results in ms _______________');

	    _.each(_.sortBy(results, 'ms'), function(result) {
	      console.log(result.bar);
	    });
	  },

	  /**
	   * Normalizes an `array` of numbers to a range from -1 to 1. Optionally
	   * specifying the `dataMin` and/or `dataMax` is useful when normalizing
	   * multiple arrays that do not each contain the global min value or global
	   * max value.
	   * @param {number[]} array - The array to normalize.
	   * @param {number} [dataMin] - The number to use at the min value in the
	   *   `array`. Defaults to the actual min `array` value.
	   * @param {number} [dataMax] - The number to use at the max value in the
	   *   `array`. Defaults to the actual max `array` value.
	   */
	  normalize: function normalize(array, dataMin, dataMax) {
	    var scaleMax = dataMax || _.max(array);
	    var scaleMin = dataMin || _.min(array);
	    var scaleOffset = 0 - scaleMin;
	    var scaleRange = scaleMax - scaleMin;

	    return _.map(array, function(n) {
	      if (n > scaleMax || n < scaleMin) {
	        throw new Error(
	          n + ' is beyond the scale range: ' + scaleMin + ' to ' + scaleMax
	        );
	      }
	      return (n + scaleOffset) / (scaleRange / 2) - 1;
	    });
	  },

	  /**
	   * Returns a new function that is an approximate derivative of the `func`.
	   * @param func - The function to create an approximate derivative of.
	   * @returns {function}
	   */
	  getApproximateDerivative: function getApproximateDerivative(func) {
	    // https://github.com/pr1001/MathPlus/blob/master/mathplus.js#L316
	    return function(x) {
	      return (func(x + 1e-10) - func(x)) / 1e-10;
	    };
	  }
	};

	module.exports = util;


/***/ }
/******/ ])
});
;