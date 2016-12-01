(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("_"));
	else if(typeof define === 'function' && define.amd)
		define(["_"], factory);
	else if(typeof exports === 'object')
		exports["anny"] = factory(require("_"));
	else
		root["anny"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
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

	var _Initialize = __webpack_require__(5);

	var _Initialize2 = _interopRequireDefault(_Initialize);

	var _Layer = __webpack_require__(6);

	var _Layer2 = _interopRequireDefault(_Layer);

	var _Network = __webpack_require__(8);

	var _Network2 = _interopRequireDefault(_Network);

	var _Neuron = __webpack_require__(7);

	var _Neuron2 = _interopRequireDefault(_Neuron);

	var _Util = __webpack_require__(9);

	var _Util2 = _interopRequireDefault(_Util);

	var _Validate = __webpack_require__(10);

	var _Validate2 = _interopRequireDefault(_Validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var anny = {
	  ACTIVATION: _Activation2.default,
	  DATA: _Data2.default,
	  ERROR: _Error2.default,
	  INITIALIZE: _Initialize2.default,
	  Layer: _Layer2.default,
	  Network: _Network2.default,
	  Neuron: _Neuron2.default,
	  util: _Util2.default,
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
	    prime: function prime(x) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    return -_lodash2.default.sum(actual, function (actVal, i) {
	      return Math.log(actVal) * expected[i];
	    }) / actual.length;
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
	    return _lodash2.default.sum(actual, function (actVal, i) {
	      return 0.5 * Math.pow(expected[i] - actVal, 2);
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
	    return _lodash2.default.sum(actual, function (actVal, i) {
	      return Math.atan(expected[i] - actVal);
	    }) / actual.length;
	  }
	};

	exports.default = ERROR;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

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
	    return _lodash2.default.random(-maxWeight, maxWeight, true);
	  }
	};

	exports.default = INITIALIZE;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Initialize = __webpack_require__(5);

	var _Initialize2 = _interopRequireDefault(_Initialize);

	var _Neuron = __webpack_require__(7);

	var _Neuron2 = _interopRequireDefault(_Neuron);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @class
	 *   Layers are collections of [Neurons]{@link Neuron}.  They can do all the
	 *   things Neurons can do by invoking methods on all the Neurons in the Layer.
	 *
	 *   Layers are organized into a {@link Network}
	 * @see {Neuron}
	 */

	var Layer = (function () {
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
	    _classCallCheck(this, Layer);

	    if (!_lodash2.default.isNumber(size)) {
	      throw new Error('Layer() \'size\' must be a number, not: ' + (typeof size === 'undefined' ? 'undefined' : _typeof(size)));
	    }
	    this.neurons = _lodash2.default.times(size, function () {
	      return new _Neuron2.default(activation, learningRate);
	    });
	  }

	  /**
	   * Connects every Neuron in this Layer to each Neuron in the `target` Layer.
	   * @param {Layer} targetLayer - The Layer to connect to.
	   */

	  _createClass(Layer, [{
	    key: 'connect',
	    value: function connect(targetLayer) {
	      var _this = this;

	      // if this Layer has no bias Neuron, add one
	      // only Layers with outgoing connections get bias Neurons
	      if (!_lodash2.default.some(this.neurons, 'isBias')) {
	        var biasNeuron = new _Neuron2.default();
	        biasNeuron.isBias = true;
	        this.neurons.push(biasNeuron);
	      }

	      _lodash2.default.each(this.neurons, function (source) {
	        // every neuron in this Layer is connected to each neuron in the next.
	        // we can assume the numInputs to be the num of neurons in this Layer.

	        // connect each neuron in this Layer to every Neuron in the targetLayer
	        _lodash2.default.each(targetLayer.neurons, function (target) {
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
	      var values = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	      return _lodash2.default.map(this.neurons, function (neuron, i) {
	        return neuron.activate(values[i]);
	      });
	    }

	    /**
	     * Sets all the Neuron `delta`s in this Layer to the given array of values.
	     * @param {number[]} [deltas=[]] - Delta values, one for each Neuron.
	     * @returns {number[]}
	     */

	  }, {
	    key: 'backprop',
	    value: function backprop() {
	      var deltas = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	      _lodash2.default.each(this.neurons, function (neuron, i) {
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
	      _lodash2.default.each(this.neurons, function (neuron) {
	        return neuron.accumulateGradients();
	      });
	    }

	    /**
	     * Update Neuron Connection weights and reset their accumulated gradients.
	     */

	  }, {
	    key: 'updateWeights',
	    value: function updateWeights() {
	      _lodash2.default.each(this.neurons, function (neuron) {
	        return neuron.updateWeights();
	      });
	    }

	    /**
	     * Returns the number of Neurons in this Layer, excluding Bias Neurons.
	     */

	  }, {
	    key: 'size',
	    value: function size() {
	      return _lodash2.default.filter(this.neurons, { isBias: false }).length;
	    }
	  }]);

	  return Layer;
	})();

	exports.default = Layer;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Initialize = __webpack_require__(5);

	var _Initialize2 = _interopRequireDefault(_Initialize);

	var _Activation = __webpack_require__(1);

	var _Activation2 = _interopRequireDefault(_Activation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @class
	 *   A Neuron is the base unit of the network. They are connected by a
	 *   {@link Connection} It's purpose is to sum its inputs and compute an
	 *   output. During training, a Neuron will adjust the weights of its outgoing
	 *   [Connections]{@link Neuron.Connection} to other Neurons.
	 *
	 *   Neurons are organized into [Layers]{@link Layer}
	 */

	var Neuron = (function () {
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
	    var activation = arguments.length <= 0 || arguments[0] === undefined ? _Activation2.default.tanh : arguments[0];
	    var learningRate = arguments.length <= 1 || arguments[1] === undefined ? _Initialize2.default.learningRate() : arguments[1];

	    _classCallCheck(this, Neuron);

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

	  _createClass(Neuron, [{
	    key: 'activate',
	    value: function activate(input) {
	      if (this.isBias) return this.output = 1;

	      // set the input
	      if (!_lodash2.default.isUndefined(input)) {
	        this.input = input;
	      } else {
	        this.input = _lodash2.default.sum(this.incoming, function (connection) {
	          // we don't need to add the bias neuron manually here.
	          // since the bias Neuron is connected like all other Neurons and it's
	          // output is always 1, the weight will be added by bias.output * weight.
	          return connection.source.output * connection.weight;
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
	      if (!_lodash2.default.isUndefined(delta)) {
	        this.delta = delta;
	      } else {
	        this.delta = _lodash2.default.sum(this.outgoing, function (_ref) {
	          var target = _ref.target;
	          var weight = _ref.weight;

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
	      _lodash2.default.each(this.incoming, function (connection) {
	        return connection.accumulate();
	      });
	    }

	    /**
	     * Update Connection weights and reset their accumulated gradients.
	     */

	  }, {
	    key: 'updateWeights',
	    value: function updateWeights() {
	      _lodash2.default.each(this.incoming, function (connection) {
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
	      return !this.isBias && _lodash2.default.isEmpty(this.incoming);
	    }

	    /**
	     * Determine if this Neuron is an output Neuron.
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isOutput',
	    value: function isOutput() {
	      return _lodash2.default.isEmpty(this.outgoing);
	    }
	  }]);

	  return Neuron;
	})();

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
	Neuron.Connection = (function () {
	  function Connection(source, target, weight) {
	    _classCallCheck(this, Connection);

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

	  _createClass(Connection, [{
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
	})();

	exports.default = Neuron;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Error = __webpack_require__(3);

	var _Error2 = _interopRequireDefault(_Error);

	var _Layer = __webpack_require__(6);

	var _Layer2 = _interopRequireDefault(_Layer);

	var _Util = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * A Network contains [Layers]{@link Layer} of [Neurons]{@link Neuron}.
	 *
	 * @example
	 * // 2 inputs
	 * // 1 output
	 * const net = new Network([2, 1]);
	 *
	 * @example
	 * // 16 inputs
	 * // 10 neuron hidden layer
	 * // 4 neuron hidden layer
	 * // 1 output
	 * const net = new Network([16, 10, 4, 1]);
	 */

	var Network = (function () {
	  /**
	   * Creates a Network of Layers consisting of Neurons. Each array element
	   * indicates a layer.  The value indicates the number of Neurons in that
	   * Layer.
	   *
	   * The first element represents the number of Neurons in the input Layer.
	   * The last element represents the number of Neurons in the output Layer.
	   * Each element in between represents a hidden Layer with n Neurons.
	   * @param {number[]} layerSizes - Number of neurons in each layer.
	   * @constructor
	   * @see Layer
	   * @see Neuron
	   */

	  function Network(layerSizes) {
	    var _this = this;

	    _classCallCheck(this, Network);

	    if (!_lodash2.default.isArray(layerSizes)) {
	      throw new Error('Network() `layerSizes` must be an array, not: ' + (0, _Util.type)(layerSizes));
	    }

	    if (_lodash2.default.isEmpty(layerSizes) || !_lodash2.default.every(layerSizes, _lodash2.default.isNumber)) {
	      throw new Error('Network() `layerSizes` array elements must be all numbers.');
	    }

	    /**
	     * The output values of the Neurons in the last layer.  This is identical to
	     * the Network's `outputLayer` output.
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
	    this.errorFn = _Error2.default.meanSquared;

	    /**
	     * An array of all Layers in the Network.  It is a single dimension array
	     * containing the `inputLayer`, `hiddenLayers`, and the `outputLayer`.
	     * @type {Layer}
	     */
	    this.allLayers = _lodash2.default.map(layerSizes, function (size) {
	      return new _Layer2.default(size);
	    });
	    /**
	     * The first Layer of the Network.  This Layer receives input during
	     * activation.
	     * @type {Layer}
	     */
	    this.inputLayer = _lodash2.default.first(this.allLayers);

	    /**
	     * An array of all layers between the `inputLayer` and `outputLayer`.
	     * @type {Layer[]}
	     */
	    this.hiddenLayers = _lodash2.default.slice(this.allLayers, 1, this.allLayers.length - 1);

	    /**
	     * The last Layer of the Network.  The output of this Layer is the
	     * "prediction" the Network has made for some given input.
	     * @type {Layer}
	     */
	    this.outputLayer = _lodash2.default.last(this.allLayers);

	    // connect layers
	    _lodash2.default.each(this.allLayers, function (layer, i) {
	      var next = _this.allLayers[i + 1];
	      if (next) layer.connect(next);
	    });
	  }

	  /**
	   * Activate the Network with a given set of `input` values.
	   * @param {number[]} inputs - Values to activate the Network's input Neurons
	   *   with.
	   * @returns {number[]} output - The output values of each Neuron in the output
	   *   Layer.
	   */

	  _createClass(Network, [{
	    key: 'activate',
	    value: function activate(inputs) {
	      this.inputLayer.activate(inputs);
	      _lodash2.default.invoke(this.hiddenLayers, 'activate');
	      return this.output = this.outputLayer.activate();
	    }

	    /**
	     * Set Network `error` and output Layer `delta`s and propagate them backward
	     * through the Network. The input Layer has no use for deltas, so it is
	     * skipped.
	     * @param {number[]} targetOutput - The expected Network output vector.
	     */

	  }, {
	    key: 'backprop',
	    value: function backprop(targetOutput) {
	      this.error = this.errorFn(targetOutput, this.output);

	      // TODO abstract into ERROR.meanSquared.partial once ERROR is refactored
	      var delta = _lodash2.default.map(this.output, function (actVal, j) {
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
	})();

	exports.default = Network;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.normalize = normalize;
	exports.type = type;

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

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
	  var min = arguments.length <= 1 || arguments[1] === undefined ? _lodash2.default.min(array) : arguments[1];
	  var max = arguments.length <= 2 || arguments[2] === undefined ? _lodash2.default.max(array) : arguments[2];

	  var offset = 0 - min;
	  var range = max - min;

	  return _lodash2.default.map(array, function (n) {
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

	/**
	 * @namespace
	 * @type {{}}
	 */
	var util = {
	  normalize: normalize,
	  type: type
	};

	exports.default = util;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Util = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Thin Error wrapper that concatenates all arguments into the Error message.
	 * @param {string|string[]} message - The error message, concatenated if an
	 *   array is passed.
	 * @returns {Error}
	 * @constructor
	 */

	var ValidationError = (function (_Error) {
	  _inherits(ValidationError, _Error);

	  function ValidationError(message) {
	    _classCallCheck(this, ValidationError);

	    var msg = [].concat(message).join('');

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ValidationError).call(this, msg));

	    _this.name = 'ValidationError';
	    _this.message = msg;
	    Error.captureStackTrace(_this, 'ValidationError');
	    return _this;
	  }

	  return ValidationError;
	})(Error);

	/**
	 * @namespace
	 * @type {{}}
	 */

	var validate = {
	  /**
	   * @param {array} data The training data set.
	   */
	  dataIsArray: function dataIsArray(data) {
	    if (!_lodash2.default.isArray(data)) {
	      throw new ValidationError('Training data must be an array, not: ' + (0, _Util.type)(data));
	    }
	  },

	  /**
	   * @param {array} data The training data set.
	   */
	  dataIsNotEmpty: function dataIsNotEmpty(data) {
	    if (_lodash2.default.isEmpty(data)) {
	      throw new ValidationError('Training data array must not be empty.');
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleIsObject: function sampleIsObject(sample, i) {
	    if (!_lodash2.default.isPlainObject(sample)) {
	      throw new ValidationError(['Training data array elements must be objects. Element at index ' + i, ' is of type: ' + (0, _Util.type)(sample)]);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleHasInput: function sampleHasInput(sample, i) {
	    if (!_lodash2.default.isArray(sample.input)) {
	      throw new ValidationError(['Training object "input" property must be an array.', ' data[' + i + ']["input"] is type: ' + (0, _Util.type)(sample.input)]);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleHasOutput: function sampleHasOutput(sample, i) {
	    if (!_lodash2.default.isArray(sample.output)) {
	      throw new ValidationError(['Training object "output" property must be an array.', ' data[' + i + ']["output"] is type: ' + (0, _Util.type)(sample.output)]);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleInputIsNotEmpty: function sampleInputIsNotEmpty(sample, i) {
	    if (_lodash2.default.isEmpty(sample.input)) {
	      throw new ValidationError(['Training object "input" array must not be empty.', ' See data[' + i + ']["input"].']);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleOutputIsNotEmpty: function sampleOutputIsNotEmpty(sample, i) {
	    if (_lodash2.default.isEmpty(sample.output)) {
	      throw new ValidationError(['Training object "output" array must not be empty.', ' See data[' + i + ']["output"].']);
	    }
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleInputIsOnlyNumbers: function sampleInputIsOnlyNumbers(sample, i) {
	    _lodash2.default.each(sample.input, function (n) {
	      if (!_lodash2.default.isNumber(n)) {
	        throw new ValidationError(['Training object "input" property values must be numbers.', ' data[' + i + ']["input"] contains: ' + (0, _Util.type)(n)]);
	      }
	    });
	  },

	  /**
	   * @param {{}} sample A single object from a training data set.
	   * @param {number} i The index of the sample in the training set.
	   */
	  sampleOutputIsOnlyNumbers: function sampleOutputIsOnlyNumbers(sample, i) {
	    _lodash2.default.each(sample.output, function (n) {
	      if (!_lodash2.default.isNumber(n)) {
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

	    _lodash2.default.each(data, function (sample, i) {
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
	    if (!_lodash2.default.isPlainObject(options)) {
	      throw new Error('training "options" must be a plain object.');
	    }

	    var validOptions = ['batch', 'errorThreshold', 'frequency', 'maxEpochs', 'onFail', 'onProgress', 'onSuccess'];

	    _lodash2.default.each(options, function (val, key) {
	      if (_lodash2.default.includes(validOptions, key)) return;
	      throw new Error('Unknown training option "' + key + '", try: ' + validOptions);
	    });

	    if (!_lodash2.default.isBoolean(options.batch) && !_lodash2.default.isNumber(options.batch)) {
	      throw new Error('training option "batch" must be a boolean or number.');
	    }

	    if (!_lodash2.default.isNumber(options.errorThreshold)) {
	      throw new Error('training option "errorThreshold" must be a number.');
	    }

	    if (!_lodash2.default.isNumber(options.frequency)) {
	      throw new Error('training option "frequency" must be a number.');
	    }

	    if (!_lodash2.default.isNumber(options.maxEpochs)) {
	      throw new Error('training option "maxEpochs" must be a number');
	    }

	    if (_lodash2.default.has(options, 'onFail') && !_lodash2.default.isFunction(options.onFail)) {
	      throw new Error('training option "onFail" must be a function.');
	    }

	    if (_lodash2.default.has(options, 'onProgress') && !_lodash2.default.isFunction(options.onProgress)) {
	      throw new Error('training option "onProgress" must be a function.');
	    }

	    if (_lodash2.default.has(options, 'onSuccess') && !_lodash2.default.isFunction(options.onSuccess)) {
	      throw new Error('training option "onSuccess" must be a function.');
	    }
	  }
	};

	exports.default = validate;

/***/ }
/******/ ])
});
;