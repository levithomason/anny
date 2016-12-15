(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Activation = __webpack_require__(1);

	var _Activation2 = _interopRequireDefault(_Activation);

	var _Data = __webpack_require__(2);

	var _Data2 = _interopRequireDefault(_Data);

	var _Error = __webpack_require__(3);

	var _Error2 = _interopRequireDefault(_Error);

	var _Initialize = __webpack_require__(4);

	var _Initialize2 = _interopRequireDefault(_Initialize);

	var _Layer = __webpack_require__(24);

	var _Layer2 = _interopRequireDefault(_Layer);

	var _Network = __webpack_require__(216);

	var _Network2 = _interopRequireDefault(_Network);

	var _Neuron = __webpack_require__(211);

	var _Neuron2 = _interopRequireDefault(_Neuron);

	var _Trainer = __webpack_require__(251);

	var _Trainer2 = _interopRequireDefault(_Trainer);

	var _Util = __webpack_require__(245);

	var util = _interopRequireWildcard(_Util);

	var _Validate = __webpack_require__(273);

	var _Validate2 = _interopRequireDefault(_Validate);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var anny = {
	  ACTIVATION: _Activation2.default,
	  DATA: _Data2.default,
	  ERROR: _Error2.default,
	  INITIALIZE: _Initialize2.default,
	  Layer: _Layer2.default,
	  Network: _Network2.default,
	  Neuron: _Neuron2.default,
	  Trainer: _Trainer2.default,
	  util: util,
	  validate: _Validate2.default
	};

	module.exports = anny;
	exports.default = anny;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Activation functions and their derivatives for a {@link Neuron}.
	 * @namespace
	 * @type {object}
	 */
	var ACTIVATION = {
	  /**
	   * Simply max(0, x). Interestingly the derivative of the rectifier turns out
	   * to be the logistic function.
	   * @param x
	   */
	  rectifier: {
	    // https://en.wikipedia.org/wiki/Rectifier
	    func: function func(x) {
	      return Math.max(0, x);
	    },
	    prime: function prime(x) {
	      return 1 / (1 + Math.exp(-x));
	    },
	    rangeMin: 0,
	    rangeMax: Infinity
	  },

	  /**
	   * A smooth approximation of the rectifier.
	   * @param x
	   */
	  softplus: {
	    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
	    func: function func(x) {
	      return Math.log(1 + Math.exp(x));
	    },
	    prime: function prime(x) {
	      return Math.log(1 + Math.exp(x));
	    },
	    rangeMin: 0,
	    rangeMax: Infinity
	  },

	  /**
	   * A smoothed step function or an 'S' shape. Also called the sigmoid
	   * function, though there are many sigmoid functions.
	   * @param {number} x
	   * @returns {number}
	   */
	  logistic: {
	    // 4.4 The Sigmoid Fig. 4.a, Not recommended.
	    func: function func(x) {
	      return 1 / (1 + Math.exp(-x));
	    },
	    prime: function prime(x) {
	      var val = 1 / (1 + Math.exp(-x));
	      return val * (1 - val);
	    },
	    rangeMin: 0,
	    rangeMax: 1
	  },

	  /**
	   * Simply passes the input to the output with no transformation.
	   * @param {number} x
	   * @returns {number}
	   */
	  identity: {
	    func: function func(x) {
	      return x;
	    },
	    prime: function prime() {
	      return 1;
	    },
	    rangeMin: -Infinity,
	    rangeMax: Infinity
	  },

	  /**
	   * The hyperbolic tangent function. A sigmoid curve, like the logistic
	   * function, except it has a range of (-1,+1). Often performs better than
	   * the logistic function because of its symmetry. Ideal for customization of
	   * multilayer perceptrons, particularly the hidden layers.
	   * @param {number} x
	   * @returns {number}
	   */
	  tanh: {
	    func: function func(x) {
	      var negExp = Math.exp(-x);
	      var posExp = Math.exp(x);
	      return (posExp - negExp) / (posExp + negExp);
	    },
	    prime: function prime(x) {
	      return 1 - Math.pow(Math.tanh(x), 2);
	    },
	    rangeMin: -1,
	    rangeMax: 1
	  },

	  /**
	   * Modified hyperbolic tangent function.  Optimized for faster convergence.
	   * @param {number} x
	   * @returns {number}
	   */
	  optimalTanh: {
	    func: function func(x) {
	      return 1.7159 * Math.tanh(x * 2 / 3);
	    },
	    prime: function prime(x) {
	      return 1.14393 * (1 / Math.cosh(x * 2 / 3));
	    },
	    rangeMin: -1,
	    rangeMax: 1
	  }
	};

	exports.default = ACTIVATION;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Example data for testing and benchmarking purposes.
	 * @type {{}}
	 * @namespace
	 */
	var DATA = {
	  /**
	   * The 4 possible input patterns to a OR gate.
	   * 2 inputs, 1 output, 4 samples
	   */
	  ORGate: [{ input: [0, 0], output: [0] }, { input: [0, 1], output: [1] }, { input: [1, 0], output: [1] }, { input: [1, 1], output: [1] }],

	  /**
	   * The 4 possible input patterns to a XOR gate.
	   * 2 inputs, 1 output, 4 samples
	   */
	  XORGate: [{ input: [0, 0], output: [0] }, { input: [0, 1], output: [1] }, { input: [1, 0], output: [1] }, { input: [1, 1], output: [0] }],

	  /**
	   * The 4 possible input patterns to a AND gate.
	   * 2 inputs, 1 output, 4 samples
	   */
	  ANDGate: [{ input: [0, 0], output: [0] }, { input: [0, 1], output: [0] }, { input: [1, 0], output: [0] }, { input: [1, 1], output: [1] }],

	  /**
	   * The 4 possible input patterns to a NAND gate.
	   * 2 inputs, 1 output, 4 samples
	   */
	  NANDGate: [{ input: [0, 0], output: [1] }, { input: [0, 1], output: [1] }, { input: [1, 0], output: [1] }, { input: [1, 1], output: [0] }],

	  /**
	   * Iris flower data set.  The output labels are: Iris setosa, Iris versicolor,
	   * Iris virginica. https://www.wikiwand.com/en/Iris_flower_data_set
	   * 4 inputs, 3 output, 150 samples
	   */
	  irisFlower: [{ input: [5.1, 3.5, 1.4, 0.2], output: [1, 0, 0] }, { input: [4.9, 3.0, 1.4, 0.2], output: [1, 0, 0] }, { input: [4.7, 3.2, 1.3, 0.2], output: [1, 0, 0] }, { input: [4.6, 3.1, 1.5, 0.2], output: [1, 0, 0] }, { input: [5.0, 3.6, 1.4, 0.2], output: [1, 0, 0] }, { input: [5.4, 3.9, 1.7, 0.4], output: [1, 0, 0] }, { input: [4.6, 3.4, 1.4, 0.3], output: [1, 0, 0] }, { input: [5.0, 3.4, 1.5, 0.2], output: [1, 0, 0] }, { input: [4.4, 2.9, 1.4, 0.2], output: [1, 0, 0] }, { input: [4.9, 3.1, 1.5, 0.1], output: [1, 0, 0] }, { input: [5.4, 3.7, 1.5, 0.2], output: [1, 0, 0] }, { input: [4.8, 3.4, 1.6, 0.2], output: [1, 0, 0] }, { input: [4.8, 3.0, 1.4, 0.1], output: [1, 0, 0] }, { input: [4.3, 3.0, 1.1, 0.1], output: [1, 0, 0] }, { input: [5.8, 4.0, 1.2, 0.2], output: [1, 0, 0] }, { input: [5.7, 4.4, 1.5, 0.4], output: [1, 0, 0] }, { input: [5.4, 3.9, 1.3, 0.4], output: [1, 0, 0] }, { input: [5.1, 3.5, 1.4, 0.3], output: [1, 0, 0] }, { input: [5.7, 3.8, 1.7, 0.3], output: [1, 0, 0] }, { input: [5.1, 3.8, 1.5, 0.3], output: [1, 0, 0] }, { input: [5.4, 3.4, 1.7, 0.2], output: [1, 0, 0] }, { input: [5.1, 3.7, 1.5, 0.4], output: [1, 0, 0] }, { input: [4.6, 3.6, 1.0, 0.2], output: [1, 0, 0] }, { input: [5.1, 3.3, 1.7, 0.5], output: [1, 0, 0] }, { input: [4.8, 3.4, 1.9, 0.2], output: [1, 0, 0] }, { input: [5.0, 3.0, 1.6, 0.2], output: [1, 0, 0] }, { input: [5.0, 3.4, 1.6, 0.4], output: [1, 0, 0] }, { input: [5.2, 3.5, 1.5, 0.2], output: [1, 0, 0] }, { input: [5.2, 3.4, 1.4, 0.2], output: [1, 0, 0] }, { input: [4.7, 3.2, 1.6, 0.2], output: [1, 0, 0] }, { input: [4.8, 3.1, 1.6, 0.2], output: [1, 0, 0] }, { input: [5.4, 3.4, 1.5, 0.4], output: [1, 0, 0] }, { input: [5.2, 4.1, 1.5, 0.1], output: [1, 0, 0] }, { input: [5.5, 4.2, 1.4, 0.2], output: [1, 0, 0] }, { input: [4.9, 3.1, 1.5, 0.1], output: [1, 0, 0] }, { input: [5.0, 3.2, 1.2, 0.2], output: [1, 0, 0] }, { input: [5.5, 3.5, 1.3, 0.2], output: [1, 0, 0] }, { input: [4.9, 3.1, 1.5, 0.1], output: [1, 0, 0] }, { input: [4.4, 3.0, 1.3, 0.2], output: [1, 0, 0] }, { input: [5.1, 3.4, 1.5, 0.2], output: [1, 0, 0] }, { input: [5.0, 3.5, 1.3, 0.3], output: [1, 0, 0] }, { input: [4.5, 2.3, 1.3, 0.3], output: [1, 0, 0] }, { input: [4.4, 3.2, 1.3, 0.2], output: [1, 0, 0] }, { input: [5.0, 3.5, 1.6, 0.6], output: [1, 0, 0] }, { input: [5.1, 3.8, 1.9, 0.4], output: [1, 0, 0] }, { input: [4.8, 3.0, 1.4, 0.3], output: [1, 0, 0] }, { input: [5.1, 3.8, 1.6, 0.2], output: [1, 0, 0] }, { input: [4.6, 3.2, 1.4, 0.2], output: [1, 0, 0] }, { input: [5.3, 3.7, 1.5, 0.2], output: [1, 0, 0] }, { input: [5.0, 3.3, 1.4, 0.2], output: [1, 0, 0] }, { input: [7.0, 3.2, 4.7, 1.4], output: [0, 1, 0] }, { input: [6.4, 3.2, 4.5, 1.5], output: [0, 1, 0] }, { input: [6.9, 3.1, 4.9, 1.5], output: [0, 1, 0] }, { input: [5.5, 2.3, 4.0, 1.3], output: [0, 1, 0] }, { input: [6.5, 2.8, 4.6, 1.5], output: [0, 1, 0] }, { input: [5.7, 2.8, 4.5, 1.3], output: [0, 1, 0] }, { input: [6.3, 3.3, 4.7, 1.6], output: [0, 1, 0] }, { input: [4.9, 2.4, 3.3, 1.0], output: [0, 1, 0] }, { input: [6.6, 2.9, 4.6, 1.3], output: [0, 1, 0] }, { input: [5.2, 2.7, 3.9, 1.4], output: [0, 1, 0] }, { input: [5.0, 2.0, 3.5, 1.0], output: [0, 1, 0] }, { input: [5.9, 3.0, 4.2, 1.5], output: [0, 1, 0] }, { input: [6.0, 2.2, 4.0, 1.0], output: [0, 1, 0] }, { input: [6.1, 2.9, 4.7, 1.4], output: [0, 1, 0] }, { input: [5.6, 2.9, 3.6, 1.3], output: [0, 1, 0] }, { input: [6.7, 3.1, 4.4, 1.4], output: [0, 1, 0] }, { input: [5.6, 3.0, 4.5, 1.5], output: [0, 1, 0] }, { input: [5.8, 2.7, 4.1, 1.0], output: [0, 1, 0] }, { input: [6.2, 2.2, 4.5, 1.5], output: [0, 1, 0] }, { input: [5.6, 2.5, 3.9, 1.1], output: [0, 1, 0] }, { input: [5.9, 3.2, 4.8, 1.8], output: [0, 1, 0] }, { input: [6.1, 2.8, 4.0, 1.3], output: [0, 1, 0] }, { input: [6.3, 2.5, 4.9, 1.5], output: [0, 1, 0] }, { input: [6.1, 2.8, 4.7, 1.2], output: [0, 1, 0] }, { input: [6.4, 2.9, 4.3, 1.3], output: [0, 1, 0] }, { input: [6.6, 3.0, 4.4, 1.4], output: [0, 1, 0] }, { input: [6.8, 2.8, 4.8, 1.4], output: [0, 1, 0] }, { input: [6.7, 3.0, 5.0, 1.7], output: [0, 1, 0] }, { input: [6.0, 2.9, 4.5, 1.5], output: [0, 1, 0] }, { input: [5.7, 2.6, 3.5, 1.0], output: [0, 1, 0] }, { input: [5.5, 2.4, 3.8, 1.1], output: [0, 1, 0] }, { input: [5.5, 2.4, 3.7, 1.0], output: [0, 1, 0] }, { input: [5.8, 2.7, 3.9, 1.2], output: [0, 1, 0] }, { input: [6.0, 2.7, 5.1, 1.6], output: [0, 1, 0] }, { input: [5.4, 3.0, 4.5, 1.5], output: [0, 1, 0] }, { input: [6.0, 3.4, 4.5, 1.6], output: [0, 1, 0] }, { input: [6.7, 3.1, 4.7, 1.5], output: [0, 1, 0] }, { input: [6.3, 2.3, 4.4, 1.3], output: [0, 1, 0] }, { input: [5.6, 3.0, 4.1, 1.3], output: [0, 1, 0] }, { input: [5.5, 2.5, 4.0, 1.3], output: [0, 1, 0] }, { input: [5.5, 2.6, 4.4, 1.2], output: [0, 1, 0] }, { input: [6.1, 3.0, 4.6, 1.4], output: [0, 1, 0] }, { input: [5.8, 2.6, 4.0, 1.2], output: [0, 1, 0] }, { input: [5.0, 2.3, 3.3, 1.0], output: [0, 1, 0] }, { input: [5.6, 2.7, 4.2, 1.3], output: [0, 1, 0] }, { input: [5.7, 3.0, 4.2, 1.2], output: [0, 1, 0] }, { input: [5.7, 2.9, 4.2, 1.3], output: [0, 1, 0] }, { input: [6.2, 2.9, 4.3, 1.3], output: [0, 1, 0] }, { input: [5.1, 2.5, 3.0, 1.1], output: [0, 1, 0] }, { input: [5.7, 2.8, 4.1, 1.3], output: [0, 1, 0] }, { input: [6.3, 3.3, 6.0, 2.5], output: [0, 0, 1] }, { input: [5.8, 2.7, 5.1, 1.9], output: [0, 0, 1] }, { input: [7.1, 3.0, 5.9, 2.1], output: [0, 0, 1] }, { input: [6.3, 2.9, 5.6, 1.8], output: [0, 0, 1] }, { input: [6.5, 3.0, 5.8, 2.2], output: [0, 0, 1] }, { input: [7.6, 3.0, 6.6, 2.1], output: [0, 0, 1] }, { input: [4.9, 2.5, 4.5, 1.7], output: [0, 0, 1] }, { input: [7.3, 2.9, 6.3, 1.8], output: [0, 0, 1] }, { input: [6.7, 2.5, 5.8, 1.8], output: [0, 0, 1] }, { input: [7.2, 3.6, 6.1, 2.5], output: [0, 0, 1] }, { input: [6.5, 3.2, 5.1, 2.0], output: [0, 0, 1] }, { input: [6.4, 2.7, 5.3, 1.9], output: [0, 0, 1] }, { input: [6.8, 3.0, 5.5, 2.1], output: [0, 0, 1] }, { input: [5.7, 2.5, 5.0, 2.0], output: [0, 0, 1] }, { input: [5.8, 2.8, 5.1, 2.4], output: [0, 0, 1] }, { input: [6.4, 3.2, 5.3, 2.3], output: [0, 0, 1] }, { input: [6.5, 3.0, 5.5, 1.8], output: [0, 0, 1] }, { input: [7.7, 3.8, 6.7, 2.2], output: [0, 0, 1] }, { input: [7.7, 2.6, 6.9, 2.3], output: [0, 0, 1] }, { input: [6.0, 2.2, 5.0, 1.5], output: [0, 0, 1] }, { input: [6.9, 3.2, 5.7, 2.3], output: [0, 0, 1] }, { input: [5.6, 2.8, 4.9, 2.0], output: [0, 0, 1] }, { input: [7.7, 2.8, 6.7, 2.0], output: [0, 0, 1] }, { input: [6.3, 2.7, 4.9, 1.8], output: [0, 0, 1] }, { input: [6.7, 3.3, 5.7, 2.1], output: [0, 0, 1] }, { input: [7.2, 3.2, 6.0, 1.8], output: [0, 0, 1] }, { input: [6.2, 2.8, 4.8, 1.8], output: [0, 0, 1] }, { input: [6.1, 3.0, 4.9, 1.8], output: [0, 0, 1] }, { input: [6.4, 2.8, 5.6, 2.1], output: [0, 0, 1] }, { input: [7.2, 3.0, 5.8, 1.6], output: [0, 0, 1] }, { input: [7.4, 2.8, 6.1, 1.9], output: [0, 0, 1] }, { input: [7.9, 3.8, 6.4, 2.0], output: [0, 0, 1] }, { input: [6.4, 2.8, 5.6, 2.2], output: [0, 0, 1] }, { input: [6.3, 2.8, 5.1, 1.5], output: [0, 0, 1] }, { input: [6.1, 2.6, 5.6, 1.4], output: [0, 0, 1] }, { input: [7.7, 3.0, 6.1, 2.3], output: [0, 0, 1] }, { input: [6.3, 3.4, 5.6, 2.4], output: [0, 0, 1] }, { input: [6.4, 3.1, 5.5, 1.8], output: [0, 0, 1] }, { input: [6.0, 3.0, 4.8, 1.8], output: [0, 0, 1] }, { input: [6.9, 3.1, 5.4, 2.1], output: [0, 0, 1] }, { input: [6.7, 3.1, 5.6, 2.4], output: [0, 0, 1] }, { input: [6.9, 3.1, 5.1, 2.3], output: [0, 0, 1] }, { input: [5.8, 2.7, 5.1, 1.9], output: [0, 0, 1] }, { input: [6.8, 3.2, 5.9, 2.3], output: [0, 0, 1] }, { input: [6.7, 3.3, 5.7, 2.5], output: [0, 0, 1] }, { input: [6.7, 3.0, 5.2, 2.3], output: [0, 0, 1] }, { input: [6.3, 2.5, 5.0, 1.9], output: [0, 0, 1] }, { input: [6.5, 3.0, 5.2, 2.0], output: [0, 0, 1] }, { input: [6.2, 3.4, 5.4, 2.3], output: [0, 0, 1] }, { input: [5.9, 3.0, 5.1, 1.8], output: [0, 0, 1] }]
	};

	exports.default = DATA;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var sumBy = function sumBy(cb, arr) {
	  return arr.reduce(function (acc, next, i) {
	    return acc + cb(next, i);
	  }, 0);
	};

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
	    var sum = sumBy(function (a, i) {
	      return Math.log(a) * expected[i];
	    }, actual);
	    return -sum / actual.length;
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
	    var sum = sumBy(function (a, i) {
	      return 0.5 * Math.pow(expected[i] - a, 2);
	    }, actual);
	    return sum / actual.length;
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
	    var sum = sumBy(function (a, i) {
	      return Math.atan(expected[i] - a);
	    }, actual);
	    return sum / actual.length;
	  }
	};

	exports.default = ERROR;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _random2 = __webpack_require__(5);

	var _random3 = _interopRequireDefault(_random2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Initialize Neuron and Connection values.
	 * @namespace
	 * @type {object}
	 */
	var INITIALIZE = {
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
	    // We find ^-1/4 performs better than the original ^1/2
	    var maxWeight = Math.pow(numInputs, -1 / 4);
	    return (0, _random3.default)(-maxWeight, maxWeight, true);
	  }
	};

	exports.default = INITIALIZE;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var baseRandom = __webpack_require__(6),
	    isIterateeCall = __webpack_require__(7),
	    toFinite = __webpack_require__(20);

	/** Built-in method references without a dependency on `root`. */
	var freeParseFloat = parseFloat;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min,
	    nativeRandom = Math.random;

	/**
	 * Produces a random number between the inclusive `lower` and `upper` bounds.
	 * If only one argument is provided a number between `0` and the given number
	 * is returned. If `floating` is `true`, or either `lower` or `upper` are
	 * floats, a floating-point number is returned instead of an integer.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.7.0
	 * @category Number
	 * @param {number} [lower=0] The lower bound.
	 * @param {number} [upper=1] The upper bound.
	 * @param {boolean} [floating] Specify returning a floating-point number.
	 * @returns {number} Returns the random number.
	 * @example
	 *
	 * _.random(0, 5);
	 * // => an integer between 0 and 5
	 *
	 * _.random(5);
	 * // => also an integer between 0 and 5
	 *
	 * _.random(5, true);
	 * // => a floating-point number between 0 and 5
	 *
	 * _.random(1.2, 5.2);
	 * // => a floating-point number between 1.2 and 5.2
	 */
	function random(lower, upper, floating) {
	  if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
	    upper = floating = undefined;
	  }
	  if (floating === undefined) {
	    if (typeof upper == 'boolean') {
	      floating = upper;
	      upper = undefined;
	    }
	    else if (typeof lower == 'boolean') {
	      floating = lower;
	      lower = undefined;
	    }
	  }
	  if (lower === undefined && upper === undefined) {
	    lower = 0;
	    upper = 1;
	  }
	  else {
	    lower = toFinite(lower);
	    if (upper === undefined) {
	      upper = lower;
	      lower = 0;
	    } else {
	      upper = toFinite(upper);
	    }
	  }
	  if (lower > upper) {
	    var temp = lower;
	    lower = upper;
	    upper = temp;
	  }
	  if (floating || lower % 1 || upper % 1) {
	    var rand = nativeRandom();
	    return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
	  }
	  return baseRandom(lower, upper);
	}

	module.exports = random;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeRandom = Math.random;

	/**
	 * The base implementation of `_.random` without support for returning
	 * floating-point numbers.
	 *
	 * @private
	 * @param {number} lower The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the random number.
	 */
	function baseRandom(lower, upper) {
	  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
	}

	module.exports = baseRandom;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(8),
	    isArrayLike = __webpack_require__(9),
	    isIndex = __webpack_require__(19),
	    isObject = __webpack_require__(17);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(10),
	    isLength = __webpack_require__(18);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(11),
	    isObject = __webpack_require__(17);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(12),
	    getRawTag = __webpack_require__(15),
	    objectToString = __webpack_require__(16);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(13);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(14);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(12);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(21);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17),
	    isSymbol = __webpack_require__(22);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(11),
	    isObjectLike = __webpack_require__(23);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(25);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(93);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(94);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _filter2 = __webpack_require__(98);

	var _filter3 = _interopRequireDefault(_filter2);

	var _map2 = __webpack_require__(201);

	var _map3 = _interopRequireDefault(_map2);

	var _forEach2 = __webpack_require__(203);

	var _forEach3 = _interopRequireDefault(_forEach2);

	var _some2 = __webpack_require__(206);

	var _some3 = _interopRequireDefault(_some2);

	var _times2 = __webpack_require__(208);

	var _times3 = _interopRequireDefault(_times2);

	var _isNumber2 = __webpack_require__(210);

	var _isNumber3 = _interopRequireDefault(_isNumber2);

	var _Initialize = __webpack_require__(4);

	var _Initialize2 = _interopRequireDefault(_Initialize);

	var _Neuron = __webpack_require__(211);

	var _Neuron2 = _interopRequireDefault(_Neuron);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class
	 *   Layers are collections of [Neurons]{@link Neuron}.  They can do all the
	 *   things Neurons can do by invoking methods on all the Neurons in the Layer.
	 *
	 *   Layers are organized into a {@link Network}
	 * @see {Neuron}
	 */
	var Layer = function () {
	  /**
	   * Creates a single dimension Layer of [Neurons]{@link Neuron}.
	   * @param {number} size - The number of Neurons this Layer should have.
	   * @param {number} [learningRate] - The learning rate passed directly to the
	   *   Neuron constructor.
	   * @param {object} [activation] - The activation function passed directly to
	   *   the
	   *   Neuron constructor.
	   */
	  function Layer(size, activation, learningRate) {
	    (0, _classCallCheck3.default)(this, Layer);

	    if (!(0, _isNumber3.default)(size)) {
	      throw new Error('Layer() \'size\' must be a number, not: ' + (typeof size === 'undefined' ? 'undefined' : (0, _typeof3.default)(size)));
	    }
	    this.neurons = (0, _times3.default)(size, function () {
	      return new _Neuron2.default(activation, learningRate);
	    });
	  }

	  /**
	   * Connects every Neuron in this Layer to each Neuron in the `target` Layer.
	   * @param {Layer} targetLayer - The Layer to connect to.
	   */


	  (0, _createClass3.default)(Layer, [{
	    key: 'connect',
	    value: function connect(targetLayer) {
	      var _this = this;

	      // if this Layer has no bias Neuron, add one
	      // only Layers with outgoing connections get bias Neurons
	      if (!(0, _some3.default)(this.neurons, 'isBias')) {
	        var biasNeuron = new _Neuron2.default();
	        biasNeuron.isBias = true;
	        this.neurons.push(biasNeuron);
	      }

	      (0, _forEach3.default)(this.neurons, function (source) {
	        // every neuron in this Layer is connected to each neuron in the next.
	        // we can assume the numInputs to be the num of neurons in this Layer.

	        // connect each neuron in this Layer to every Neuron in the targetLayer
	        (0, _forEach3.default)(targetLayer.neurons, function (target) {
	          source.connect(target, _Initialize2.default.weight(_this.neurons.length));
	        });
	      });
	    }

	    /**
	     * Activates all the Neurons in this Layer with the given array of values.
	     * @param {number[]} [values=[]] - Map of input values for each Neuron.
	     * @returns {number[]} - Array of Neuron output values.
	     */

	  }, {
	    key: 'activate',
	    value: function activate() {
	      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      /* eslint-disable lodash/prefer-invoke-map */
	      // https://github.com/wix/eslint-plugin-lodash/issues/128
	      return (0, _map3.default)(this.neurons, function (neuron, i) {
	        return neuron.activate(values[i]);
	      });
	      /* eslint-enable lodash/prefer-invoke-map */
	    }

	    /**
	     * Sets all the Neuron `delta`s in this Layer to the given array of values.
	     * @param {number[]} [deltas=[]] - Delta values, one for each Neuron.
	     * @returns {number[]}
	     */

	  }, {
	    key: 'backprop',
	    value: function backprop() {
	      var deltas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      (0, _forEach3.default)(this.neurons, function (neuron, i) {
	        return neuron.backprop(deltas[i]);
	      });
	    }

	    /**
	     * Calculate and accumulate Neuron Connection weight gradients.
	     * Does not update weights. Useful during batch/mini-batch training.
	     */

	  }, {
	    key: 'accumulateGradients',
	    value: function accumulateGradients() {
	      (0, _forEach3.default)(this.neurons, function (neuron) {
	        return neuron.accumulateGradients();
	      });
	    }

	    /**
	     * Update Neuron Connection weights and reset their accumulated gradients.
	     */

	  }, {
	    key: 'updateWeights',
	    value: function updateWeights() {
	      (0, _forEach3.default)(this.neurons, function (neuron) {
	        return neuron.updateWeights();
	      });
	    }

	    /**
	     * Returns the number of Neurons in this Layer, excluding Bias Neurons.
	     */

	  }, {
	    key: 'size',
	    value: function size() {
	      return (0, _filter3.default)(this.neurons, { isBias: false }).length;
	    }
	  }]);
	  return Layer;
	}();

	exports.default = Layer;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(26);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(77);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(27), __esModule: true };

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(28);
	__webpack_require__(72);
	module.exports = __webpack_require__(76).f('iterator');

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(29)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(32)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(30)
	  , defined   = __webpack_require__(31);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(33)
	  , $export        = __webpack_require__(34)
	  , redefine       = __webpack_require__(49)
	  , hide           = __webpack_require__(39)
	  , has            = __webpack_require__(50)
	  , Iterators      = __webpack_require__(51)
	  , $iterCreate    = __webpack_require__(52)
	  , setToStringTag = __webpack_require__(68)
	  , getPrototypeOf = __webpack_require__(70)
	  , ITERATOR       = __webpack_require__(69)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(35)
	  , core      = __webpack_require__(36)
	  , ctx       = __webpack_require__(37)
	  , hide      = __webpack_require__(39)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 35 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 36 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(38);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(40)
	  , createDesc = __webpack_require__(48);
	module.exports = __webpack_require__(44) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(41)
	  , IE8_DOM_DEFINE = __webpack_require__(43)
	  , toPrimitive    = __webpack_require__(47)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(44) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(42);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(44) && !__webpack_require__(45)(function(){
	  return Object.defineProperty(__webpack_require__(46)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(45)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(42)
	  , document = __webpack_require__(35).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(42);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39);

/***/ },
/* 50 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(53)
	  , descriptor     = __webpack_require__(48)
	  , setToStringTag = __webpack_require__(68)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(39)(IteratorPrototype, __webpack_require__(69)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(41)
	  , dPs         = __webpack_require__(54)
	  , enumBugKeys = __webpack_require__(66)
	  , IE_PROTO    = __webpack_require__(63)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(46)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(67).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(40)
	  , anObject = __webpack_require__(41)
	  , getKeys  = __webpack_require__(55);

	module.exports = __webpack_require__(44) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(56)
	  , enumBugKeys = __webpack_require__(66);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(50)
	  , toIObject    = __webpack_require__(57)
	  , arrayIndexOf = __webpack_require__(60)(false)
	  , IE_PROTO     = __webpack_require__(63)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(58)
	  , defined = __webpack_require__(31);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(59);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(57)
	  , toLength  = __webpack_require__(61)
	  , toIndex   = __webpack_require__(62);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(30)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(30)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(64)('keys')
	  , uid    = __webpack_require__(65);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(35)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(35).document && document.documentElement;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(40).f
	  , has = __webpack_require__(50)
	  , TAG = __webpack_require__(69)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(64)('wks')
	  , uid        = __webpack_require__(65)
	  , Symbol     = __webpack_require__(35).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(50)
	  , toObject    = __webpack_require__(71)
	  , IE_PROTO    = __webpack_require__(63)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(31);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(73);
	var global        = __webpack_require__(35)
	  , hide          = __webpack_require__(39)
	  , Iterators     = __webpack_require__(51)
	  , TO_STRING_TAG = __webpack_require__(69)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(74)
	  , step             = __webpack_require__(75)
	  , Iterators        = __webpack_require__(51)
	  , toIObject        = __webpack_require__(57);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(32)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(69);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(79);
	__webpack_require__(90);
	__webpack_require__(91);
	__webpack_require__(92);
	module.exports = __webpack_require__(36).Symbol;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(35)
	  , has            = __webpack_require__(50)
	  , DESCRIPTORS    = __webpack_require__(44)
	  , $export        = __webpack_require__(34)
	  , redefine       = __webpack_require__(49)
	  , META           = __webpack_require__(80).KEY
	  , $fails         = __webpack_require__(45)
	  , shared         = __webpack_require__(64)
	  , setToStringTag = __webpack_require__(68)
	  , uid            = __webpack_require__(65)
	  , wks            = __webpack_require__(69)
	  , wksExt         = __webpack_require__(76)
	  , wksDefine      = __webpack_require__(81)
	  , keyOf          = __webpack_require__(82)
	  , enumKeys       = __webpack_require__(83)
	  , isArray        = __webpack_require__(86)
	  , anObject       = __webpack_require__(41)
	  , toIObject      = __webpack_require__(57)
	  , toPrimitive    = __webpack_require__(47)
	  , createDesc     = __webpack_require__(48)
	  , _create        = __webpack_require__(53)
	  , gOPNExt        = __webpack_require__(87)
	  , $GOPD          = __webpack_require__(89)
	  , $DP            = __webpack_require__(40)
	  , $keys          = __webpack_require__(55)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(88).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(85).f  = $propertyIsEnumerable;
	  __webpack_require__(84).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(33)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(39)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(65)('meta')
	  , isObject = __webpack_require__(42)
	  , has      = __webpack_require__(50)
	  , setDesc  = __webpack_require__(40).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(45)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(35)
	  , core           = __webpack_require__(36)
	  , LIBRARY        = __webpack_require__(33)
	  , wksExt         = __webpack_require__(76)
	  , defineProperty = __webpack_require__(40).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(55)
	  , toIObject = __webpack_require__(57);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(55)
	  , gOPS    = __webpack_require__(84)
	  , pIE     = __webpack_require__(85);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 84 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 85 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(59);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(57)
	  , gOPN      = __webpack_require__(88).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(56)
	  , hiddenKeys = __webpack_require__(66).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(85)
	  , createDesc     = __webpack_require__(48)
	  , toIObject      = __webpack_require__(57)
	  , toPrimitive    = __webpack_require__(47)
	  , has            = __webpack_require__(50)
	  , IE8_DOM_DEFINE = __webpack_require__(43)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(44) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(81)('asyncIterator');

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(81)('observable');

/***/ },
/* 93 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(95);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(97);
	var $Object = __webpack_require__(36).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(34);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(44), 'Object', {defineProperty: __webpack_require__(40).f});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(99),
	    baseFilter = __webpack_require__(100),
	    baseIteratee = __webpack_require__(123),
	    isArray = __webpack_require__(110);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * **Note:** Unlike `_.remove`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @see _.reject
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * _.filter(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, { 'age': 36, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.filter(users, 'active');
	 * // => objects for ['barney']
	 */
	function filter(collection, predicate) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = filter;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(101);

	/**
	 * The base implementation of `_.filter` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(102),
	    createBaseEach = __webpack_require__(122);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(103),
	    keys = __webpack_require__(105);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(104);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 104 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(106),
	    baseKeys = __webpack_require__(118),
	    isArrayLike = __webpack_require__(9);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(107),
	    isArguments = __webpack_require__(108),
	    isArray = __webpack_require__(110),
	    isBuffer = __webpack_require__(111),
	    isIndex = __webpack_require__(19),
	    isTypedArray = __webpack_require__(114);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(109),
	    isObjectLike = __webpack_require__(23);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(11),
	    isObjectLike = __webpack_require__(23);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 110 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(13),
	    stubFalse = __webpack_require__(113);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(112)(module)))

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 113 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(115),
	    baseUnary = __webpack_require__(116),
	    nodeUtil = __webpack_require__(117);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(11),
	    isLength = __webpack_require__(18),
	    isObjectLike = __webpack_require__(23);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(14);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(112)(module)))

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(119),
	    nativeKeys = __webpack_require__(120);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 119 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(121);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 121 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(9);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(124),
	    baseMatchesProperty = __webpack_require__(182),
	    identity = __webpack_require__(197),
	    isArray = __webpack_require__(110),
	    property = __webpack_require__(198);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(125),
	    getMatchData = __webpack_require__(179),
	    matchesStrictComparable = __webpack_require__(181);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(126),
	    baseIsEqual = __webpack_require__(161);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(127),
	    stackClear = __webpack_require__(134),
	    stackDelete = __webpack_require__(135),
	    stackGet = __webpack_require__(136),
	    stackHas = __webpack_require__(137),
	    stackSet = __webpack_require__(138);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(128),
	    listCacheDelete = __webpack_require__(129),
	    listCacheGet = __webpack_require__(131),
	    listCacheHas = __webpack_require__(132),
	    listCacheSet = __webpack_require__(133);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(130);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(8);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(130);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(130);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(130);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(127);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 135 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 137 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(127),
	    Map = __webpack_require__(139),
	    MapCache = __webpack_require__(146);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(140),
	    root = __webpack_require__(13);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(141),
	    getValue = __webpack_require__(145);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(10),
	    isMasked = __webpack_require__(142),
	    isObject = __webpack_require__(17),
	    toSource = __webpack_require__(144);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(143);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(13);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 144 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 145 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(147),
	    mapCacheDelete = __webpack_require__(155),
	    mapCacheGet = __webpack_require__(158),
	    mapCacheHas = __webpack_require__(159),
	    mapCacheSet = __webpack_require__(160);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(148),
	    ListCache = __webpack_require__(127),
	    Map = __webpack_require__(139);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(149),
	    hashDelete = __webpack_require__(151),
	    hashGet = __webpack_require__(152),
	    hashHas = __webpack_require__(153),
	    hashSet = __webpack_require__(154);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(150);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(140);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 151 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(150);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(150);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(150);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(156);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(157);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 157 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(156);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(156);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(156);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(162),
	    isObject = __webpack_require__(17),
	    isObjectLike = __webpack_require__(23);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(126),
	    equalArrays = __webpack_require__(163),
	    equalByTag = __webpack_require__(169),
	    equalObjects = __webpack_require__(173),
	    getTag = __webpack_require__(174),
	    isArray = __webpack_require__(110),
	    isBuffer = __webpack_require__(111),
	    isTypedArray = __webpack_require__(114);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(164),
	    arraySome = __webpack_require__(167),
	    cacheHas = __webpack_require__(168);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(146),
	    setCacheAdd = __webpack_require__(165),
	    setCacheHas = __webpack_require__(166);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 165 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 166 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 167 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 168 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(12),
	    Uint8Array = __webpack_require__(170),
	    eq = __webpack_require__(8),
	    equalArrays = __webpack_require__(163),
	    mapToArray = __webpack_require__(171),
	    setToArray = __webpack_require__(172);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(13);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 171 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 172 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(105);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(175),
	    Map = __webpack_require__(139),
	    Promise = __webpack_require__(176),
	    Set = __webpack_require__(177),
	    WeakMap = __webpack_require__(178),
	    baseGetTag = __webpack_require__(11),
	    toSource = __webpack_require__(144);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(140),
	    root = __webpack_require__(13);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(140),
	    root = __webpack_require__(13);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(140),
	    root = __webpack_require__(13);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(140),
	    root = __webpack_require__(13);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(180),
	    keys = __webpack_require__(105);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 181 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(161),
	    get = __webpack_require__(183),
	    hasIn = __webpack_require__(194),
	    isKey = __webpack_require__(186),
	    isStrictComparable = __webpack_require__(180),
	    matchesStrictComparable = __webpack_require__(181),
	    toKey = __webpack_require__(193);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(184);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(185),
	    toKey = __webpack_require__(193);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(110),
	    isKey = __webpack_require__(186),
	    stringToPath = __webpack_require__(187),
	    toString = __webpack_require__(190);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(110),
	    isSymbol = __webpack_require__(22);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(188);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(189);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(146);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(191);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(12),
	    arrayMap = __webpack_require__(192),
	    isArray = __webpack_require__(110),
	    isSymbol = __webpack_require__(22);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 192 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(22);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(195),
	    hasPath = __webpack_require__(196);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 195 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(185),
	    isArguments = __webpack_require__(108),
	    isArray = __webpack_require__(110),
	    isIndex = __webpack_require__(19),
	    isLength = __webpack_require__(18),
	    toKey = __webpack_require__(193);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 197 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(199),
	    basePropertyDeep = __webpack_require__(200),
	    isKey = __webpack_require__(186),
	    toKey = __webpack_require__(193);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 199 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(184);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(192),
	    baseIteratee = __webpack_require__(123),
	    baseMap = __webpack_require__(202),
	    isArray = __webpack_require__(110);

	/**
	 * Creates an array of values by running each element in `collection` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = map;


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(101),
	    isArrayLike = __webpack_require__(9);

	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(204),
	    baseEach = __webpack_require__(101),
	    castFunction = __webpack_require__(205),
	    isArray = __webpack_require__(110);

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, castFunction(iteratee));
	}

	module.exports = forEach;


/***/ },
/* 204 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(197);

	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Function} Returns cast function.
	 */
	function castFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.exports = castFunction;


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(167),
	    baseIteratee = __webpack_require__(123),
	    baseSome = __webpack_require__(207),
	    isArray = __webpack_require__(110),
	    isIterateeCall = __webpack_require__(7);

	/**
	 * Checks if `predicate` returns truthy for **any** element of `collection`.
	 * Iteration is stopped once `predicate` returns truthy. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.some([null, 0, 'yes', false], Boolean);
	 * // => true
	 *
	 * var users = [
	 *   { 'user': 'barney', 'active': true },
	 *   { 'user': 'fred',   'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.some(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.some(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.some(users, 'active');
	 * // => true
	 */
	function some(collection, predicate, guard) {
	  var func = isArray(collection) ? arraySome : baseSome;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = some;


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(101);

	/**
	 * The base implementation of `_.some` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function baseSome(collection, predicate) {
	  var result;

	  baseEach(collection, function(value, index, collection) {
	    result = predicate(value, index, collection);
	    return !result;
	  });
	  return !!result;
	}

	module.exports = baseSome;


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(107),
	    castFunction = __webpack_require__(205),
	    toInteger = __webpack_require__(209);

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Invokes the iteratee `n` times, returning an array of the results of
	 * each invocation. The iteratee is invoked with one argument; (index).
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 * @example
	 *
	 * _.times(3, String);
	 * // => ['0', '1', '2']
	 *
	 *  _.times(4, _.constant(0));
	 * // => [0, 0, 0, 0]
	 */
	function times(n, iteratee) {
	  n = toInteger(n);
	  if (n < 1 || n > MAX_SAFE_INTEGER) {
	    return [];
	  }
	  var index = MAX_ARRAY_LENGTH,
	      length = nativeMin(n, MAX_ARRAY_LENGTH);

	  iteratee = castFunction(iteratee);
	  n -= MAX_ARRAY_LENGTH;

	  var result = baseTimes(length, iteratee);
	  while (++index < n) {
	    iteratee(index);
	  }
	  return result;
	}

	module.exports = times;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(20);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(11),
	    isObjectLike = __webpack_require__(23);

	/** `Object#toString` result references. */
	var numberTag = '[object Number]';

	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	 * classified as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && baseGetTag(value) == numberTag);
	}

	module.exports = isNumber;


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(93);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(94);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _isEmpty2 = __webpack_require__(212);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _forEach2 = __webpack_require__(203);

	var _forEach3 = _interopRequireDefault(_forEach2);

	var _sumBy2 = __webpack_require__(213);

	var _sumBy3 = _interopRequireDefault(_sumBy2);

	var _isUndefined2 = __webpack_require__(215);

	var _isUndefined3 = _interopRequireDefault(_isUndefined2);

	var _Initialize = __webpack_require__(4);

	var _Initialize2 = _interopRequireDefault(_Initialize);

	var _Activation = __webpack_require__(1);

	var _Activation2 = _interopRequireDefault(_Activation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class
	 *   A Neuron is the base unit of the network. They are connected by a
	 *   {@link Connection} It's purpose is to sum its inputs and compute an
	 *   output. During training, a Neuron will adjust the weights of its outgoing
	 *   [Connections]{@link Neuron.Connection} to other Neurons.
	 *
	 *   Neurons are organized into [Layers]{@link Layer}
	 */
	var Neuron = function () {
	  /**
	   * @param {object} [activation=ACTIVATION.tanh] - An object containing an
	   *   activation function and its first derivative. Typically selected from
	   *   {@link ACTIVATION}.
	   * @param {number} [learningRate=INITIALIZE.learningRate()] - The rate at
	   *   which this Neuron should update its Connection weights during training.
	   *   Usually a very small number (ie 0.01 - 0.5), experiment for optimal
	   *   results.
	   */
	  function Neuron() {
	    var activation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Activation2.default.tanh;
	    var learningRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Initialize2.default.learningRate();
	    (0, _classCallCheck3.default)(this, Neuron);

	    /**
	     * Flag identifying this Neuron as a Bias Neuron.  Bias Neurons are like
	     * regular Neurons, except they have no incoming Connections and always
	     * output 1.
	     * @type {boolean}
	     */
	    this.isBias = false;

	    /**
	     * A unique id beginning at 0 and incremented for every Neuron created.
	     * @type {number}
	     */
	    this.id = Neuron.count++;

	    /**
	     * An array of incoming Connections from other Neurons.
	     * @type {Array}
	     * @see Neuron.Connection
	     */
	    this.incoming = [];

	    /**
	     * An array of outgoing Connections to other Neurons.
	     * @type {Array}
	     * @see Neuron.Connection
	     */
	    this.outgoing = [];

	    /**
	     * The input value of the last activation.
	     * @type {number}
	     */
	    this.input = 0;

	    /**
	     * The output value of the last activation.
	     * @type {number}
	     */
	    this.output = 0;

	    /**
	     *
	     * @type {ACTIVATION.tanh|{func, prime}|*}
	     */
	    this.activation = activation;

	    // learning
	    this.delta = 0;
	    this.learningRate = learningRate;
	  }

	  /**
	   * Activate this Neuron, setting the input value and computing the output.
	   *   Input Neuron output values will always be equal to their input
	   * value. Bias Neurons always output 1. All other
	   * Neurons will squash their input value to derive their
	   * output.
	   * @param {number} [input] - If omitted the input value will be calculated
	   *   from the outputs and weights of the Neurons connected to this Neuron.
	   * @returns {number}
	   */


	  (0, _createClass3.default)(Neuron, [{
	    key: 'activate',
	    value: function activate(input) {
	      if (this.isBias) return this.output = 1;

	      // set the input
	      if (!(0, _isUndefined3.default)(input)) {
	        this.input = input;
	      } else {
	        this.input = (0, _sumBy3.default)(this.incoming, function (connection) {
	          return (
	            // we don't need to add the bias neuron manually here.
	            // since the bias Neuron is connected like all other Neurons and it's
	            // output is always 1, the weight will be added by bias.output * weight.
	            connection.source.output * connection.weight
	          );
	        });
	      }

	      // set the output
	      return this.output = this.isInput() ? this.input : this.activation.func(this.input);
	    }

	    /**
	     * Set this Neuron's `delta` value, or compute it if omitted.
	     * @param {number} [delta] - If omitted, the delta value will be calculated
	     *   from the deltas and weights of the Neurons this Neuron is connected to.
	     * @returns {number}
	     */

	  }, {
	    key: 'backprop',
	    value: function backprop(delta) {
	      var _this = this;

	      // input and bias neurons have no incoming connections to update
	      if (this.isInput() || this.isBias) return this.delta;

	      // set deltas
	      if (!(0, _isUndefined3.default)(delta)) {
	        this.delta = delta;
	      } else {
	        this.delta = (0, _sumBy3.default)(this.outgoing, function (_ref) {
	          var target = _ref.target,
	              weight = _ref.weight;

	          return _this.activation.prime(_this.input) * weight * target.delta;
	        });
	      }

	      return this.delta;
	    }

	    /**
	     * Calculate and accumulate Connection weight gradients.
	     * Does not update weights. Useful during batch/mini-batch training.
	     */

	  }, {
	    key: 'accumulateGradients',
	    value: function accumulateGradients() {
	      (0, _forEach3.default)(this.incoming, function (connection) {
	        return connection.accumulate();
	      });
	    }

	    /**
	     * Update Connection weights and reset their accumulated gradients.
	     */

	  }, {
	    key: 'updateWeights',
	    value: function updateWeights() {
	      (0, _forEach3.default)(this.incoming, function (connection) {
	        return connection.update();
	      });
	    }

	    /**
	     * Connect this Neuron to another Neuron.
	     * @param {Neuron} target - The Neuron to connect to.
	     * @param {number} weight - The strength of the connection.
	     */

	  }, {
	    key: 'connect',
	    value: function connect(target, weight) {
	      // bias Neurons are not allowed to have incoming connections
	      if (target.isBias) return;

	      var connection = new Neuron.Connection(this, target, weight);
	      this.outgoing.push(connection);
	      target.incoming.push(connection);
	    }

	    /**
	     * Determine if this Neuron is an input Neuron.
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isInput',
	    value: function isInput() {
	      return !this.isBias && (0, _isEmpty3.default)(this.incoming);
	    }

	    /**
	     * Determine if this Neuron is an output Neuron.
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isOutput',
	    value: function isOutput() {
	      return (0, _isEmpty3.default)(this.outgoing);
	    }
	  }]);
	  return Neuron;
	}();

	/**
	 * A running total number of Neurons created.  It is only used to generate
	 * unique ids for each Neuron. Creating a new Neuron increments the count but
	 * it is never decremented.
	 * @type {number}
	 */


	Neuron.count = 0;

	/**
	 * @class
	 *   [Neurons]{@link Neuron} communication via Connections. Their weights
	 *   determine the output of the network and are updated during training.  The
	 *   knowledge or ability of a network is represented in the weight matrix (all
	 *   the weight values).
	 * @param {Neuron} source - The Neuron that will send its output to the
	 *   `target` Neuron.
	 * @param {Neuron} target - The Neuron that will get its input from the
	 *   `source` Neuron.
	 * @param {number} weight - The strength of the connection.  Meaning, what
	 *   ratio of the `source` Neuron's output is passed to the `target` Neuron's
	 *   input.
	 * @see Neuron
	 */
	Neuron.Connection = function () {
	  function Connection(source, target, weight) {
	    (0, _classCallCheck3.default)(this, Connection);

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
	     * the input of the `target` Neuron. Second, during training, calculating
	     * the total error delta.
	     * @type {number}
	     */
	    // We add one to initialize the weight value as if this connection were
	    // already part of the fan.
	    this.weight = weight || _Initialize2.default.weight(target.incoming.length);

	    this.gradient = 0;
	  }

	  /**
	   * Calculate and accumulate `gradient`. Does not update `weight`.
	   */


	  (0, _createClass3.default)(Connection, [{
	    key: 'accumulate',
	    value: function accumulate() {
	      // delta this.output - target
	      var gradient = this.source.output * this.target.delta;
	      this.gradient += gradient * this.target.learningRate;
	    }

	    /**
	     * Update `weight` and reset accumulated `gradient`.
	     */

	  }, {
	    key: 'update',
	    value: function update() {
	      this.accumulate();
	      // TODO support other weight update rules, like iRProp+
	      this.weight -= this.gradient;
	      this.gradient = 0;
	    }
	  }]);
	  return Connection;
	}();

	exports.default = Neuron;

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeys = __webpack_require__(118),
	    getTag = __webpack_require__(174),
	    isArguments = __webpack_require__(108),
	    isArray = __webpack_require__(110),
	    isArrayLike = __webpack_require__(9),
	    isBuffer = __webpack_require__(111),
	    isPrototype = __webpack_require__(119),
	    isTypedArray = __webpack_require__(114);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (value == null) {
	    return true;
	  }
	  if (isArrayLike(value) &&
	      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
	        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
	    return !value.length;
	  }
	  var tag = getTag(value);
	  if (tag == mapTag || tag == setTag) {
	    return !value.size;
	  }
	  if (isPrototype(value)) {
	    return !baseKeys(value).length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = isEmpty;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(123),
	    baseSum = __webpack_require__(214);

	/**
	 * This method is like `_.sum` except that it accepts `iteratee` which is
	 * invoked for each element in `array` to generate the value to be summed.
	 * The iteratee is invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Math
	 * @param {Array} array The array to iterate over.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {number} Returns the sum.
	 * @example
	 *
	 * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
	 *
	 * _.sumBy(objects, function(o) { return o.n; });
	 * // => 20
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.sumBy(objects, 'n');
	 * // => 20
	 */
	function sumBy(array, iteratee) {
	  return (array && array.length)
	    ? baseSum(array, baseIteratee(iteratee, 2))
	    : 0;
	}

	module.exports = sumBy;


/***/ },
/* 214 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.sum` and `_.sumBy` without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {number} Returns the sum.
	 */
	function baseSum(array, iteratee) {
	  var result,
	      index = -1,
	      length = array.length;

	  while (++index < length) {
	    var current = iteratee(array[index]);
	    if (current !== undefined) {
	      result = result === undefined ? current : (result + current);
	    }
	  }
	  return result;
	}

	module.exports = baseSum;


/***/ },
/* 215 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}

	module.exports = isUndefined;


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toConsumableArray2 = __webpack_require__(217);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _classCallCheck2 = __webpack_require__(93);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(94);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _map2 = __webpack_require__(201);

	var _map3 = _interopRequireDefault(_map2);

	var _invokeMap2 = __webpack_require__(227);

	var _invokeMap3 = _interopRequireDefault(_invokeMap2);

	var _forEach2 = __webpack_require__(203);

	var _forEach3 = _interopRequireDefault(_forEach2);

	var _last2 = __webpack_require__(230);

	var _last3 = _interopRequireDefault(_last2);

	var _slice2 = __webpack_require__(240);

	var _slice3 = _interopRequireDefault(_slice2);

	var _head2 = __webpack_require__(241);

	var _head3 = _interopRequireDefault(_head2);

	var _every2 = __webpack_require__(242);

	var _every3 = _interopRequireDefault(_every2);

	var _isEmpty2 = __webpack_require__(212);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _isArray2 = __webpack_require__(110);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _Error = __webpack_require__(3);

	var _Error2 = _interopRequireDefault(_Error);

	var _Layer = __webpack_require__(24);

	var _Layer2 = _interopRequireDefault(_Layer);

	var _Util = __webpack_require__(245);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A Network contains [Layers]{@link Layer} of [Neurons]{@link Neuron}.
	 *
	 * @example
	 * // 2 inputs
	 * // 1 output
	 * const net = new Network([
	 *   new Layer(2, ACTIVATION.tanh),
	 *   new Layer(1, ACTIVATION.softmax)
	 * ])
	 */
	var Network = function () {
	  /**
	   * Creates a Network of Layers consisting of Neurons. Each array element indicates a layer.
	   *
	   * The first element represents the input Layer.
	   * The last element represents the output Layer.
	   * Each element in between represents a hidden Layer with n Neurons.
	   * @param {Layer[]} layers - An array of Layers.
	   * @param {function} [errorFn=ERROR.meanSquared] - The cost function to be minimized.
	   * @constructor
	   * @see Layer
	   * @see Neuron
	   */
	  function Network(layers) {
	    var _this = this;

	    var errorFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Error2.default.meanSquared;
	    (0, _classCallCheck3.default)(this, Network);

	    if (!(0, _isArray3.default)(layers)) {
	      throw new Error('Network() `layerSizes` must be an array, not: ' + (0, _Util.type)(layers));
	    }

	    if ((0, _isEmpty3.default)(layers) || !(0, _every3.default)(layers, function (layer) {
	      return layer instanceof _Layer2.default;
	    })) {
	      throw new Error('Network() every `layers` array element must be a Layer instance.');
	    }

	    /**
	     * The output values of the Neurons in the last layer.
	     * This is identical to the Network's `outputLayer` output.
	     * @type {Array}
	     */
	    this.output = [];

	    /**
	     * The result of the `errorFn`.
	     * @type {Number}
	     */
	    this.error = 0;

	    /**
	     * The cost function.  The function used to calculate Network `error`.
	     * In other words, to what degree was the Network's output wrong.
	     * @type {function}
	     */
	    this.errorFn = errorFn;

	    /**
	     * An array of all Layers in the Network.  It is a single dimension array
	     * containing the `inputLayer`, `hiddenLayers`, and the `outputLayer`.
	     * @type {Layer}
	     */
	    this.allLayers = [].concat((0, _toConsumableArray3.default)(layers)); // clone to prevent mutation
	    /**
	     * The first Layer of the Network.  This Layer receives input during
	     * activation.
	     * @type {Layer}
	     */
	    this.inputLayer = (0, _head3.default)(this.allLayers);

	    /**
	     * An array of all layers between the `inputLayer` and `outputLayer`.
	     * @type {Layer[]}
	     */
	    this.hiddenLayers = (0, _slice3.default)(this.allLayers, 1, this.allLayers.length - 1);

	    /**
	     * The last Layer of the Network.  The output of this Layer is the
	     * "prediction" the Network has made for some given input.
	     * @type {Layer}
	     */
	    this.outputLayer = (0, _last3.default)(this.allLayers);

	    // connect layers
	    (0, _forEach3.default)(this.allLayers, function (layer, i) {
	      var next = _this.allLayers[i + 1];
	      if (next) layer.connect(next);
	    });
	  }

	  /**
	   * Activate the Network with a given set of `input` values.
	   * @param {number[]} [inputs] - Values to activate the Network's input Neurons with.
	   * @returns {number[]} output - The output values of each Neuron in the output Layer.
	   */


	  (0, _createClass3.default)(Network, [{
	    key: 'activate',
	    value: function activate(inputs) {
	      this.inputLayer.activate(inputs);
	      (0, _invokeMap3.default)(this.hiddenLayers, 'activate');
	      return this.output = this.outputLayer.activate();
	    }

	    /**
	     * Set Network `error` and output Layer `delta`s and propagate them backward
	     * through the Network. The input Layer has no use for deltas, so it is skipped.
	     * @param {number[]} [targetOutput] - The expected Network output vector.
	     */

	  }, {
	    key: 'backprop',
	    value: function backprop(targetOutput) {
	      this.error = this.errorFn(targetOutput, this.output);

	      // TODO abstract into ERROR.meanSquared.partial once ERROR is refactored
	      var delta = (0, _map3.default)(this.output, function (actVal, j) {
	        return actVal - targetOutput[j];
	      });

	      this.outputLayer.backprop(delta);

	      for (var i = this.hiddenLayers.length - 1; i >= 0; i -= 1) {
	        this.hiddenLayers[i].backprop();
	      }
	    }

	    /**
	     * Calculate and accumulate Neuron Connection weight gradients.
	     * Does not update weights. Useful during batch/mini-batch training.
	     */

	  }, {
	    key: 'accumulateGradients',
	    value: function accumulateGradients() {
	      // NOTE can be parallel, Neuron ouputs and deltas are already set
	      this.outputLayer.accumulateGradients();

	      for (var i = this.hiddenLayers.length - 1; i >= 0; i -= 1) {
	        this.hiddenLayers[i].accumulateGradients();
	      }
	    }

	    /**
	     * Update Neuron Connection weights and reset their accumulated gradients.
	     */

	  }, {
	    key: 'updateWeights',
	    value: function updateWeights() {
	      // NOTE can be parallel, Neuron outputs and deltas are already set
	      this.outputLayer.updateWeights();

	      for (var i = this.hiddenLayers.length - 1; i >= 0; i -= 1) {
	        this.hiddenLayers[i].updateWeights();
	      }
	    }
	  }]);
	  return Network;
	}();

	exports.default = Network;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(218);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(219), __esModule: true };

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(28);
	__webpack_require__(220);
	module.exports = __webpack_require__(36).Array.from;

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(37)
	  , $export        = __webpack_require__(34)
	  , toObject       = __webpack_require__(71)
	  , call           = __webpack_require__(221)
	  , isArrayIter    = __webpack_require__(222)
	  , toLength       = __webpack_require__(61)
	  , createProperty = __webpack_require__(223)
	  , getIterFn      = __webpack_require__(224);

	$export($export.S + $export.F * !__webpack_require__(226)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(41);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(51)
	  , ITERATOR   = __webpack_require__(69)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(40)
	  , createDesc      = __webpack_require__(48);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(225)
	  , ITERATOR  = __webpack_require__(69)('iterator')
	  , Iterators = __webpack_require__(51);
	module.exports = __webpack_require__(36).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(59)
	  , TAG = __webpack_require__(69)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(69)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(228),
	    baseEach = __webpack_require__(101),
	    baseInvoke = __webpack_require__(229),
	    baseRest = __webpack_require__(233),
	    isArrayLike = __webpack_require__(9);

	/**
	 * Invokes the method at `path` of each element in `collection`, returning
	 * an array of the results of each invoked method. Any additional arguments
	 * are provided to each invoked method. If `path` is a function, it's invoked
	 * for, and `this` bound to, each element in `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Array|Function|string} path The path of the method to invoke or
	 *  the function invoked per iteration.
	 * @param {...*} [args] The arguments to invoke each method with.
	 * @returns {Array} Returns the array of results.
	 * @example
	 *
	 * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
	 * // => [[1, 5, 7], [1, 2, 3]]
	 *
	 * _.invokeMap([123, 456], String.prototype.split, '');
	 * // => [['1', '2', '3'], ['4', '5', '6']]
	 */
	var invokeMap = baseRest(function(collection, path, args) {
	  var index = -1,
	      isFunc = typeof path == 'function',
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value) {
	    result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
	  });
	  return result;
	});

	module.exports = invokeMap;


/***/ },
/* 228 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(228),
	    castPath = __webpack_require__(185),
	    last = __webpack_require__(230),
	    parent = __webpack_require__(231),
	    toKey = __webpack_require__(193);

	/**
	 * The base implementation of `_.invoke` without support for individual
	 * method arguments.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the method to invoke.
	 * @param {Array} args The arguments to invoke the method with.
	 * @returns {*} Returns the result of the invoked method.
	 */
	function baseInvoke(object, path, args) {
	  path = castPath(path, object);
	  object = parent(object, path);
	  var func = object == null ? object : object[toKey(last(path))];
	  return func == null ? undefined : apply(func, object, args);
	}

	module.exports = baseInvoke;


/***/ },
/* 230 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(184),
	    baseSlice = __webpack_require__(232);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
	}

	module.exports = parent;


/***/ },
/* 232 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(197),
	    overRest = __webpack_require__(234),
	    setToString = __webpack_require__(235);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(228);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(236),
	    shortOut = __webpack_require__(239);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(237),
	    defineProperty = __webpack_require__(238),
	    identity = __webpack_require__(197);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 237 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(140);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 239 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(232),
	    isIterateeCall = __webpack_require__(7),
	    toInteger = __webpack_require__(209);

	/**
	 * Creates a slice of `array` from `start` up to, but not including, `end`.
	 *
	 * **Note:** This method is used instead of
	 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
	 * returned.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function slice(array, start, end) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return [];
	  }
	  if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
	    start = 0;
	    end = length;
	  }
	  else {
	    start = start == null ? 0 : toInteger(start);
	    end = end === undefined ? length : toInteger(end);
	  }
	  return baseSlice(array, start, end);
	}

	module.exports = slice;


/***/ },
/* 241 */
/***/ function(module, exports) {

	/**
	 * Gets the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias first
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the first element of `array`.
	 * @example
	 *
	 * _.head([1, 2, 3]);
	 * // => 1
	 *
	 * _.head([]);
	 * // => undefined
	 */
	function head(array) {
	  return (array && array.length) ? array[0] : undefined;
	}

	module.exports = head;


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEvery = __webpack_require__(243),
	    baseEvery = __webpack_require__(244),
	    baseIteratee = __webpack_require__(123),
	    isArray = __webpack_require__(110),
	    isIterateeCall = __webpack_require__(7);

	/**
	 * Checks if `predicate` returns truthy for **all** elements of `collection`.
	 * Iteration is stopped once `predicate` returns falsey. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * **Note:** This method returns `true` for
	 * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
	 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
	 * elements of empty collections.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.every([true, 1, null, 'yes'], Boolean);
	 * // => false
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': false },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.every(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.every(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.every(users, 'active');
	 * // => false
	 */
	function every(collection, predicate, guard) {
	  var func = isArray(collection) ? arrayEvery : baseEvery;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = every;


/***/ },
/* 243 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.every` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 */
	function arrayEvery(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (!predicate(array[index], index, array)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = arrayEvery;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(101);

	/**
	 * The base implementation of `_.every` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`
	 */
	function baseEvery(collection, predicate) {
	  var result = true;
	  baseEach(collection, function(value, index, collection) {
	    result = !!predicate(value, index, collection);
	    return result;
	  });
	  return result;
	}

	module.exports = baseEvery;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _map2 = __webpack_require__(201);

	var _map3 = _interopRequireDefault(_map2);

	var _max2 = __webpack_require__(246);

	var _max3 = _interopRequireDefault(_max2);

	var _min2 = __webpack_require__(249);

	var _min3 = _interopRequireDefault(_min2);

	exports.normalize = normalize;
	exports.type = type;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Normalizes an `array` of numbers to a range from -1 to 1. Optionally
	 * specifying the `dataMin` and/or `dataMax` is useful when normalizing
	 * multiple arrays that do not each contain the global min value or global
	 * max value.
	 * @param {number[]} array - The array to normalize.
	 * @param {number} [min] - The number to use at the min value in the
	 *   `array`. Defaults to the actual min `array` value.
	 * @param {number} [max] - The number to use at the max value in the
	 *   `array`. Defaults to the actual max `array` value.
	 */
	function normalize(array) {
	  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _min3.default)(array);
	  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _max3.default)(array);

	  var offset = 0 - min;
	  var range = max - min;

	  return (0, _map3.default)(array, function (n) {
	    if (n > max || n < min) {
	      throw new Error(n + ' is beyond the scale range: ' + min + ' to ' + max);
	    }
	    return (n + offset) / (range / 2) - 1;
	  });
	}

	/**
	 * Thin helper for use getting object type.
	 * @param {*} arg The value whose type should be returned.
	 */
	function type(arg) {
	  return Object.prototype.toString.call(arg);
	}

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var baseExtremum = __webpack_require__(247),
	    baseGt = __webpack_require__(248),
	    identity = __webpack_require__(197);

	/**
	 * Computes the maximum value of `array`. If `array` is empty or falsey,
	 * `undefined` is returned.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Math
	 * @param {Array} array The array to iterate over.
	 * @returns {*} Returns the maximum value.
	 * @example
	 *
	 * _.max([4, 2, 8, 6]);
	 * // => 8
	 *
	 * _.max([]);
	 * // => undefined
	 */
	function max(array) {
	  return (array && array.length)
	    ? baseExtremum(array, identity, baseGt)
	    : undefined;
	}

	module.exports = max;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(22);

	/**
	 * The base implementation of methods like `_.max` and `_.min` which accepts a
	 * `comparator` to determine the extremum value.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The iteratee invoked per iteration.
	 * @param {Function} comparator The comparator used to compare values.
	 * @returns {*} Returns the extremum value.
	 */
	function baseExtremum(array, iteratee, comparator) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index],
	        current = iteratee(value);

	    if (current != null && (computed === undefined
	          ? (current === current && !isSymbol(current))
	          : comparator(current, computed)
	        )) {
	      var computed = current,
	          result = value;
	    }
	  }
	  return result;
	}

	module.exports = baseExtremum;


/***/ },
/* 248 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.gt` which doesn't coerce arguments.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if `value` is greater than `other`,
	 *  else `false`.
	 */
	function baseGt(value, other) {
	  return value > other;
	}

	module.exports = baseGt;


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var baseExtremum = __webpack_require__(247),
	    baseLt = __webpack_require__(250),
	    identity = __webpack_require__(197);

	/**
	 * Computes the minimum value of `array`. If `array` is empty or falsey,
	 * `undefined` is returned.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Math
	 * @param {Array} array The array to iterate over.
	 * @returns {*} Returns the minimum value.
	 * @example
	 *
	 * _.min([4, 2, 8, 6]);
	 * // => 2
	 *
	 * _.min([]);
	 * // => undefined
	 */
	function min(array) {
	  return (array && array.length)
	    ? baseExtremum(array, identity, baseLt)
	    : undefined;
	}

	module.exports = min;


/***/ },
/* 250 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.lt` which doesn't coerce arguments.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if `value` is less than `other`,
	 *  else `false`.
	 */
	function baseLt(value, other) {
	  return value < other;
	}

	module.exports = baseLt;


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(93);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(94);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _sumBy2 = __webpack_require__(213);

	var _sumBy3 = _interopRequireDefault(_sumBy2);

	var _isNumber2 = __webpack_require__(210);

	var _isNumber3 = _interopRequireDefault(_isNumber2);

	var _merge2 = __webpack_require__(252);

	var _merge3 = _interopRequireDefault(_merge2);

	var _Validate = __webpack_require__(273);

	var _Validate2 = _interopRequireDefault(_Validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A Trainer teaches a {@link Network} how to correctly classify some `data`.
	 *
	 * @example
	 * const network = new anny.Network([2, 1])
	 * const trainer = new Trainer()
	 *
	 * trainer.train(network, anny.DATA.ORGate)
	 *
	 * network.activate([0, 0]) // => 0.000836743108
	 * network.activate([0, 1]) // => 0.998253857294
	 */
	var Trainer = function () {
	  /**
	   * @param {object} [options]
	   * @param {boolean|number} [options.batch]
	   *   Use batch, online (stochastic), or mini-batch learning modes.
	   *
	   *   Batch `true`: Connection weights are updated once after iterating
	   *   through all the training samples in the training data (an epoch).
	   *
	   *   Online `false`: Connection weights are updated after every training
	   *   sample in the training data.
	   *
	   *   Mini-batch `<number>`: Connection weights are updated every `<number>`
	   *   training samples.
	   * @param {number} [options.errorThreshold=0.001]
	   *   The target `error` value. The goal of the Trainer is to train the
	   *   Network until the `error` is below this value.
	   * @param {number} [options.frequency=100]
	   *   How many iterations through the training data between calling
	   *   `options.onProgress`.
	   * @param {number} [options.maxEpochs=20000]
	   *   The max training iterations. The Trainer will stop training after
	   *   iterating through the training data this number of times.  One full loop
	   *   through the training data is counted as one epoch.
	   * @param {Trainer~onFail} [options.onFail]
	   *   Called if the Network `error` does not fall below the `errorThreshold`
	   *   after `maxEpochs`.
	   * @param {Trainer~onProgress} [options.onProgress]
	   *   Called every `frequency` epochs.
	   * @param {Trainer~onSuccess} [options.onSuccess]
	   *   Called if the Network `error` falls below the `errorThreshold` during
	   *   training.
	   * @constructor
	   */
	  function Trainer() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, Trainer);

	    var defaultOptions = {
	      batch: false,
	      errorThreshold: 0.001,
	      frequency: 100,
	      maxEpochs: 20000
	    };

	    var mergedOptions = (0, _merge3.default)(defaultOptions, options);
	    _Validate2.default.trainingOptions(mergedOptions);
	    this.options = mergedOptions;
	  }

	  /**
	   * Train the `network` to classify the `data`.
	   * @param {Network} network - The Network to be trained.
	   * @param {object[]} data - Array of objects in the form
	   * `{input: [], output: []}`.
	   * @param {Object} [overrides] Overrides are merged into this trainer
	   * @param {Trainer~onSuccess} [overrides.onSuccess] Overrides are merged into this trainer
	   *   instance's options.
	   * @see Network
	   * @see Data
	   */


	  (0, _createClass3.default)(Trainer, [{
	    key: 'train',
	    value: function train(network, data) {
	      var overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      _Validate2.default.trainingData(network, data);
	      var mergedOptions = (0, _merge3.default)(this.options, overrides);
	      _Validate2.default.trainingOptions(mergedOptions);
	      // TODO: normalize data to the range of the activation functions
	      var batch = mergedOptions.batch,
	          errorThreshold = mergedOptions.errorThreshold,
	          frequency = mergedOptions.frequency,
	          maxEpochs = mergedOptions.maxEpochs,
	          onFail = mergedOptions.onFail,
	          onProgress = mergedOptions.onProgress,
	          onSuccess = mergedOptions.onSuccess;


	      var isBatch = batch === true;
	      var isOnline = batch === false;
	      var isMiniBatch = (0, _isNumber3.default)(batch);

	      // track samples iterated, allows for mini-batches that span epochs
	      var sampleCounter = 1;
	      var epochCount = 1;

	      var getAverageSampleError = function getAverageSampleError(sample, sampleIndex) {
	        var shouldUpdate = isOnline || isMiniBatch && sampleCounter % batch === 0 || isBatch && sampleIndex === data.length - 1;

	        // propagation: set inputs & outputs, then error & deltas
	        network.activate(sample.input);
	        network.backprop(sample.output);

	        // weight updates: update weights || accumulate weight gradients
	        if (shouldUpdate) network.updateWeights();else network.accumulateGradients();

	        sampleCounter++;
	        return network.error / data.length;
	      };

	      for (var i = maxEpochs; i > 0; i -= 1) {
	        // sum the average error of all training samples
	        var error = (0, _sumBy3.default)(data, getAverageSampleError);

	        // call onProgress after the first epoch and every `frequency` thereafter
	        if (onProgress && epochCount % frequency === 0) {
	          var stop = onProgress(error, epochCount) === false;
	          if (stop) break;
	        }

	        // success
	        if (onSuccess && error <= errorThreshold) {
	          onSuccess(error, epochCount);
	          break;
	        }

	        // fail
	        if (onFail && epochCount === maxEpochs) onFail(error, epochCount);

	        epochCount++;
	      }
	    }

	    /**
	     * Called if the `network` error falls below the `errorThreshold`.
	     * @callback Trainer~onSuccess
	     * @param {number} error
	     *   The `network` error value at the time of success.
	     * @param {number} epoch
	     *   Indicates on which iteration through the training data the `network`
	     *   became successful.
	     */

	    /**
	     * Called if the `network` error is not below the `errorThreshold` after
	     * `maxEpochs` iterations through the training data set.
	     * @callback Trainer~onFail
	     * @param {number} error
	     *   The `network` error value at the time of success.
	     * @param {number} epoch
	     *   Indicates on which iteration through the training data the `network`
	     *   became successful.
	     */

	    /**
	     * Called if the `network` error falls below the `errorThreshold`.
	     * @callback Trainer~onProgress
	     * @param {number} error
	     *   The `network` error value at the time of success.
	     * @param {number} epoch
	     *   Indicates on which iteration through the training data the `network`
	     *   became successful.
	     */

	  }]);
	  return Trainer;
	}();

	exports.default = Trainer;

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(253),
	    createAssigner = __webpack_require__(272);

	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = {
	 *   'a': [{ 'b': 2 }, { 'd': 4 }]
	 * };
	 *
	 * var other = {
	 *   'a': [{ 'c': 3 }, { 'e': 5 }]
	 * };
	 *
	 * _.merge(object, other);
	 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});

	module.exports = merge;


/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(126),
	    assignMergeValue = __webpack_require__(254),
	    baseFor = __webpack_require__(103),
	    baseMergeDeep = __webpack_require__(256),
	    isObject = __webpack_require__(17),
	    keysIn = __webpack_require__(269);

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}

	module.exports = baseMerge;


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(255),
	    eq = __webpack_require__(8);

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignMergeValue;


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(238);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(254),
	    cloneBuffer = __webpack_require__(257),
	    cloneTypedArray = __webpack_require__(258),
	    copyArray = __webpack_require__(260),
	    initCloneObject = __webpack_require__(261),
	    isArguments = __webpack_require__(108),
	    isArray = __webpack_require__(110),
	    isArrayLikeObject = __webpack_require__(264),
	    isBuffer = __webpack_require__(111),
	    isFunction = __webpack_require__(10),
	    isObject = __webpack_require__(17),
	    isPlainObject = __webpack_require__(265),
	    isTypedArray = __webpack_require__(114),
	    toPlainObject = __webpack_require__(266);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(13);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(112)(module)))

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(259);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(170);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ },
/* 260 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(262),
	    getPrototype = __webpack_require__(263),
	    isPrototype = __webpack_require__(119);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(121);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(9),
	    isObjectLike = __webpack_require__(23);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(11),
	    getPrototype = __webpack_require__(263),
	    isObjectLike = __webpack_require__(23);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(267),
	    keysIn = __webpack_require__(269);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(268),
	    baseAssignValue = __webpack_require__(255);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(255),
	    eq = __webpack_require__(8);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(106),
	    baseKeysIn = __webpack_require__(270),
	    isArrayLike = __webpack_require__(9);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17),
	    isPrototype = __webpack_require__(119),
	    nativeKeysIn = __webpack_require__(271);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ },
/* 271 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(233),
	    isIterateeCall = __webpack_require__(7);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(93);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(274);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(275);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _isFunction2 = __webpack_require__(10);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _has2 = __webpack_require__(283);

	var _has3 = _interopRequireDefault(_has2);

	var _isBoolean2 = __webpack_require__(285);

	var _isBoolean3 = _interopRequireDefault(_isBoolean2);

	var _includes2 = __webpack_require__(286);

	var _includes3 = _interopRequireDefault(_includes2);

	var _isNumber2 = __webpack_require__(210);

	var _isNumber3 = _interopRequireDefault(_isNumber2);

	var _forEach2 = __webpack_require__(203);

	var _forEach3 = _interopRequireDefault(_forEach2);

	var _isPlainObject2 = __webpack_require__(265);

	var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

	var _isEmpty2 = __webpack_require__(212);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _isArray2 = __webpack_require__(110);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _Util = __webpack_require__(245);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Thin Error wrapper that concatenates all arguments into the Error message.
	 * @param {string|string[]} message - The error message, concatenated if an
	 *   array is passed.
	 * @returns {Error}
	 * @constructor
	 */
	var ValidationError = function (_Error) {
	  (0, _inherits3.default)(ValidationError, _Error);

	  function ValidationError(message) {
	    (0, _classCallCheck3.default)(this, ValidationError);

	    var msg = [].concat(message).join('');

	    var _this = (0, _possibleConstructorReturn3.default)(this, (ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).call(this, msg));

	    _this.name = 'ValidationError';
	    _this.message = msg;
	    Error.captureStackTrace(_this, 'ValidationError');
	    return _this;
	  }

	  return ValidationError;
	}(Error);

	/**
	 * @namespace
	 * @type {{}}
	 */


	var validate = {
	  /**
	   * @param {array} data The training data set.
	   */
	  dataIsArray: function dataIsArray(data) {
	    if (!(0, _isArray3.default)(data)) {
	      throw new ValidationError('Training data must be an array, not: ' + (0, _Util.type)(data));
	    }
	  },

	  /**
	   * @param {array} data The training data set.
	   */
	  dataIsNotEmpty: function dataIsNotEmpty(data) {
	    if ((0, _isEmpty3.default)(data)) {
	      throw new ValidationError('Training data array must not be empty.');
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleIsObject: function sampleIsObject(sample, i) {
	    if (!(0, _isPlainObject3.default)(sample)) {
	      throw new ValidationError(['Training data array elements must be objects. Element at index ' + i, ' is of type: ' + (0, _Util.type)(sample)]);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleHasInput: function sampleHasInput(sample, i) {
	    if (!(0, _isArray3.default)(sample.input)) {
	      throw new ValidationError(['Training object "input" property must be an array.', ' data[' + i + ']["input"] is type: ' + (0, _Util.type)(sample.input)]);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleHasOutput: function sampleHasOutput(sample, i) {
	    if (!(0, _isArray3.default)(sample.output)) {
	      throw new ValidationError(['Training object "output" property must be an array.', ' data[' + i + ']["output"] is type: ' + (0, _Util.type)(sample.output)]);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleInputIsNotEmpty: function sampleInputIsNotEmpty(sample, i) {
	    if ((0, _isEmpty3.default)(sample.input)) {
	      throw new ValidationError(['Training object "input" array must not be empty.', ' See data[' + i + ']["input"].']);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleOutputIsNotEmpty: function sampleOutputIsNotEmpty(sample, i) {
	    if ((0, _isEmpty3.default)(sample.output)) {
	      throw new ValidationError(['Training object "output" array must not be empty.', ' See data[' + i + ']["output"].']);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleInputIsOnlyNumbers: function sampleInputIsOnlyNumbers(sample, i) {
	    (0, _forEach3.default)(sample.input, function (n) {
	      if (!(0, _isNumber3.default)(n)) {
	        throw new ValidationError(['Training object "input" property values must be numbers.', ' data[' + i + ']["input"] contains: ' + (0, _Util.type)(n)]);
	      }
	    });
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleOutputIsOnlyNumbers: function sampleOutputIsOnlyNumbers(sample, i) {
	    (0, _forEach3.default)(sample.output, function (n) {
	      if (!(0, _isNumber3.default)(n)) {
	        throw new ValidationError(['Training object "output" property values must be numbers.', ' data[' + i + ']["output"] contains: ' + (0, _Util.type)(n)]);
	      }
	    });
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   * @param {Network} network The Network to be trained on the training data
	   *   set.
	   */
	  sampleInputFitsNetwork: function sampleInputFitsNetwork(sample, i, network) {
	    var inputLayerSize = network.inputLayer.size();
	    if (inputLayerSize !== sample.input.length) {
	      throw new ValidationError(['Training data "input" and network input layer size must be equal.', ' data[' + i + '] input size is ' + sample.input.length + '.', ' Network input size is ' + inputLayerSize + '.']);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   * @param {Network} network The Network to be trained on the training data
	   *   set.
	   */
	  sampleOutputFitsNetwork: function sampleOutputFitsNetwork(sample, i, network) {
	    var outputLayerSize = network.outputLayer.size();
	    if (outputLayerSize !== sample.output.length) {
	      throw new ValidationError(['Training data "output" and network output layer size must be equal.', ' data[' + i + '] output size is ' + sample.output.length + '.', ' Network output size is ' + outputLayerSize + '.']);
	    }
	  },

	  /**
	   * Ensures that a training set in valid form.
	   * @param {Network} network The Network to be trained.
	   * @param {object[]} data The data set to train the Network on.
	   */
	  trainingData: function trainingData(network, data) {
	    validate.dataIsArray(data);
	    validate.dataIsNotEmpty(data);

	    (0, _forEach3.default)(data, function (sample, i) {
	      validate.sampleIsObject(sample, i);
	      validate.sampleHasInput(sample, i);
	      validate.sampleHasOutput(sample, i);
	      validate.sampleInputIsNotEmpty(sample, i);
	      validate.sampleOutputIsNotEmpty(sample, i);
	      validate.sampleInputIsOnlyNumbers(sample, i);
	      validate.sampleOutputIsOnlyNumbers(sample, i);
	      validate.sampleInputFitsNetwork(sample, i, network);
	      validate.sampleOutputFitsNetwork(sample, i, network);
	    });
	  },

	  trainingOptions: function trainingOptions(options) {
	    if (!(0, _isPlainObject3.default)(options)) {
	      throw new Error('training "options" must be a plain object.');
	    }

	    var validOptions = ['batch', 'errorThreshold', 'frequency', 'maxEpochs', 'onFail', 'onProgress', 'onSuccess'];

	    (0, _forEach3.default)(options, function (val, key) {
	      if ((0, _includes3.default)(validOptions, key)) return;
	      throw new Error('Unknown training option "' + key + '", try: ' + validOptions);
	    });

	    if (!(0, _isBoolean3.default)(options.batch) && !(0, _isNumber3.default)(options.batch)) {
	      throw new Error('training option "batch" must be a boolean or number.');
	    }

	    if (!(0, _isNumber3.default)(options.errorThreshold)) {
	      throw new Error('training option "errorThreshold" must be a number.');
	    }

	    if (!(0, _isNumber3.default)(options.frequency)) {
	      throw new Error('training option "frequency" must be a number.');
	    }

	    if (!(0, _isNumber3.default)(options.maxEpochs)) {
	      throw new Error('training option "maxEpochs" must be a number');
	    }

	    if ((0, _has3.default)(options, 'onFail') && !(0, _isFunction3.default)(options.onFail)) {
	      throw new Error('training option "onFail" must be a function.');
	    }

	    if ((0, _has3.default)(options, 'onProgress') && !(0, _isFunction3.default)(options.onProgress)) {
	      throw new Error('training option "onProgress" must be a function.');
	    }

	    if ((0, _has3.default)(options, 'onSuccess') && !(0, _isFunction3.default)(options.onSuccess)) {
	      throw new Error('training option "onSuccess" must be a function.');
	    }
	  }
	};

	exports.default = validate;

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(25);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(276);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(280);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(25);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(277), __esModule: true };

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(278);
	module.exports = __webpack_require__(36).Object.setPrototypeOf;

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(34);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(279).set});

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(42)
	  , anObject = __webpack_require__(41);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(37)(Function.call, __webpack_require__(89).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(281), __esModule: true };

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(282);
	var $Object = __webpack_require__(36).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(34)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(53)});

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(284),
	    hasPath = __webpack_require__(196);

	/**
	 * Checks if `path` is a direct property of `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = { 'a': { 'b': 2 } };
	 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b');
	 * // => true
	 *
	 * _.has(object, ['a', 'b']);
	 * // => true
	 *
	 * _.has(other, 'a');
	 * // => false
	 */
	function has(object, path) {
	  return object != null && hasPath(object, path, baseHas);
	}

	module.exports = has;


/***/ },
/* 284 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  return object != null && hasOwnProperty.call(object, key);
	}

	module.exports = baseHas;


/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(11),
	    isObjectLike = __webpack_require__(23);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';

	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false ||
	    (isObjectLike(value) && baseGetTag(value) == boolTag);
	}

	module.exports = isBoolean;


/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(287),
	    isArrayLike = __webpack_require__(9),
	    isString = __webpack_require__(291),
	    toInteger = __webpack_require__(209),
	    values = __webpack_require__(292);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Checks if `value` is in `collection`. If `collection` is a string, it's
	 * checked for a substring of `value`, otherwise
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'a': 1, 'b': 2 }, 1);
	 * // => true
	 *
	 * _.includes('abcd', 'bc');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString(collection)
	    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
	}

	module.exports = includes;


/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(288),
	    baseIsNaN = __webpack_require__(289),
	    strictIndexOf = __webpack_require__(290);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ },
/* 288 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 289 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ },
/* 290 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(11),
	    isArray = __webpack_require__(110),
	    isObjectLike = __webpack_require__(23);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(293),
	    keys = __webpack_require__(105);

	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object == null ? [] : baseValues(object, keys(object));
	}

	module.exports = values;


/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(192);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ }
/******/ ])
});
;