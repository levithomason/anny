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

	var _Initialize = __webpack_require__(57);

	var _Initialize2 = _interopRequireDefault(_Initialize);

	var _Layer = __webpack_require__(60);

	var _Layer2 = _interopRequireDefault(_Layer);

	var _Network = __webpack_require__(152);

	var _Network2 = _interopRequireDefault(_Network);

	var _Neuron = __webpack_require__(148);

	var _Neuron2 = _interopRequireDefault(_Neuron);

	var _Trainer = __webpack_require__(171);

	var _Trainer2 = _interopRequireDefault(_Trainer);

	var _Util = __webpack_require__(161);

	var _Util2 = _interopRequireDefault(_Util);

	var _Validate = __webpack_require__(181);

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
	  Trainer: _Trainer2.default,
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

	var _sum2 = __webpack_require__(4);

	var _sum3 = _interopRequireDefault(_sum2);

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
	    return -(0, _sum3.default)(actual, function (actVal, i) {
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
	    return (0, _sum3.default)(actual, function (actVal, i) {
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
	    return (0, _sum3.default)(actual, function (actVal, i) {
	      return Math.atan(expected[i] - actVal);
	    }) / actual.length;
	  }
	};

	exports.default = ERROR;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var arraySum = __webpack_require__(6),
	    baseCallback = __webpack_require__(7),
	    baseSum = __webpack_require__(47),
	    isArray = __webpack_require__(28),
	    isIterateeCall = __webpack_require__(53),
	    toIterable = __webpack_require__(54);

	/**
	 * Gets the sum of the values in `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @category Math
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {number} Returns the sum.
	 * @example
	 *
	 * _.sum([4, 6]);
	 * // => 10
	 *
	 * _.sum({ 'a': 4, 'b': 6 });
	 * // => 10
	 *
	 * var objects = [
	 *   { 'n': 4 },
	 *   { 'n': 6 }
	 * ];
	 *
	 * _.sum(objects, function(object) {
	 *   return object.n;
	 * });
	 * // => 10
	 *
	 * // using the `_.property` callback shorthand
	 * _.sum(objects, 'n');
	 * // => 10
	 */
	function sum(collection, iteratee, thisArg) {
	  if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	    iteratee = undefined;
	  }
	  iteratee = baseCallback(iteratee, thisArg, 3);
	  return iteratee.length == 1
	    ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee)
	    : baseSum(collection, iteratee);
	}

	module.exports = sum;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.sum` for arrays without support for callback
	 * shorthands and `this` binding..
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {number} Returns the sum.
	 */
	function arraySum(array, iteratee) {
	  var length = array.length,
	      result = 0;

	  while (length--) {
	    result += +iteratee(array[length]) || 0;
	  }
	  return result;
	}

	module.exports = arraySum;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(8),
	    baseMatchesProperty = __webpack_require__(36),
	    bindCallback = __webpack_require__(43),
	    identity = __webpack_require__(44),
	    property = __webpack_require__(45);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}

	module.exports = baseCallback;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(9),
	    getMatchData = __webpack_require__(33),
	    toObject = __webpack_require__(32);

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(10),
	    toObject = __webpack_require__(32);

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
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
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(11),
	    isObject = __webpack_require__(20),
	    isObjectLike = __webpack_require__(21);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(12),
	    equalByTag = __webpack_require__(14),
	    equalObjects = __webpack_require__(15),
	    isArray = __webpack_require__(28),
	    isTypedArray = __webpack_require__(31);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(13);

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalArrays;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

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
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(16);

	/** Used for native method references. */
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
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(17),
	    isArrayLike = __webpack_require__(22),
	    isObject = __webpack_require__(20),
	    shimKeys = __webpack_require__(26);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
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
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(18);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(19),
	    isObjectLike = __webpack_require__(21);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(23),
	    isLength = __webpack_require__(25);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(24);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(27),
	    isArray = __webpack_require__(28),
	    isIndex = __webpack_require__(29),
	    isLength = __webpack_require__(25),
	    keysIn = __webpack_require__(30);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(22),
	    isObjectLike = __webpack_require__(21);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(17),
	    isLength = __webpack_require__(25),
	    isObjectLike = __webpack_require__(21);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(27),
	    isArray = __webpack_require__(28),
	    isIndex = __webpack_require__(29),
	    isLength = __webpack_require__(25),
	    isObject = __webpack_require__(20);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(25),
	    isObjectLike = __webpack_require__(21);

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
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(34),
	    pairs = __webpack_require__(35);

	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);

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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(16),
	    toObject = __webpack_require__(32);

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(37),
	    baseIsEqual = __webpack_require__(10),
	    baseSlice = __webpack_require__(38),
	    isArray = __webpack_require__(28),
	    isKey = __webpack_require__(39),
	    isStrictComparable = __webpack_require__(34),
	    last = __webpack_require__(40),
	    toObject = __webpack_require__(32),
	    toPath = __webpack_require__(41);

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');

	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(32);

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 38 */
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

	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(28),
	    toObject = __webpack_require__(32);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
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
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}

	module.exports = isKey;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(42),
	    isArray = __webpack_require__(28);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = toPath;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(44);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(24),
	    basePropertyDeep = __webpack_require__(46),
	    isKey = __webpack_require__(39);

	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(37),
	    toPath = __webpack_require__(41);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(48);

	/**
	 * The base implementation of `_.sum` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {number} Returns the sum.
	 */
	function baseSum(collection, iteratee) {
	  var result = 0;
	  baseEach(collection, function(value, index, collection) {
	    result += +iteratee(value, index, collection) || 0;
	  });
	  return result;
	}

	module.exports = baseSum;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(49),
	    createBaseEach = __webpack_require__(52);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(50),
	    keys = __webpack_require__(16);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(51);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(32);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(23),
	    isLength = __webpack_require__(25),
	    toObject = __webpack_require__(32);

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
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(22),
	    isIndex = __webpack_require__(29),
	    isObject = __webpack_require__(20);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(22),
	    isObject = __webpack_require__(20),
	    values = __webpack_require__(55);

	/**
	 * Converts `value` to an array-like object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array|Object} Returns the array-like object.
	 */
	function toIterable(value) {
	  if (value == null) {
	    return [];
	  }
	  if (!isArrayLike(value)) {
	    return values(value);
	  }
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toIterable;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(56),
	    keys = __webpack_require__(16);

	/**
	 * Creates an array of the own enumerable property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
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
	  return baseValues(object, keys(object));
	}

	module.exports = values;


/***/ },
/* 56 */
/***/ function(module, exports) {

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
	  var index = -1,
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = object[props[index]];
	  }
	  return result;
	}

	module.exports = baseValues;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _random2 = __webpack_require__(58);

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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var baseRandom = __webpack_require__(59),
	    isIterateeCall = __webpack_require__(53);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min,
	    nativeRandom = Math.random;

	/**
	 * Produces a random number between `min` and `max` (inclusive). If only one
	 * argument is provided a number between `0` and the given number is returned.
	 * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
	 * number is returned instead of an integer.
	 *
	 * @static
	 * @memberOf _
	 * @category Number
	 * @param {number} [min=0] The minimum possible value.
	 * @param {number} [max=1] The maximum possible value.
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
	function random(min, max, floating) {
	  if (floating && isIterateeCall(min, max, floating)) {
	    max = floating = undefined;
	  }
	  var noMin = min == null,
	      noMax = max == null;

	  if (floating == null) {
	    if (noMax && typeof min == 'boolean') {
	      floating = min;
	      min = 1;
	    }
	    else if (typeof max == 'boolean') {
	      floating = max;
	      noMax = true;
	    }
	  }
	  if (noMin && noMax) {
	    max = 1;
	    noMax = false;
	  }
	  min = +min || 0;
	  if (noMax) {
	    max = min;
	    min = 0;
	  } else {
	    max = +max || 0;
	  }
	  if (floating || min % 1 || max % 1) {
	    var rand = nativeRandom();
	    return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
	  }
	  return baseRandom(min, max);
	}

	module.exports = random;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeRandom = Math.random;

	/**
	 * The base implementation of `_.random` without support for argument juggling
	 * and returning floating-point numbers.
	 *
	 * @private
	 * @param {number} min The minimum possible value.
	 * @param {number} max The maximum possible value.
	 * @returns {number} Returns the random number.
	 */
	function baseRandom(min, max) {
	  return min + nativeFloor(nativeRandom() * (max - min + 1));
	}

	module.exports = baseRandom;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(61);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(129);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(130);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _filter2 = __webpack_require__(134);

	var _filter3 = _interopRequireDefault(_filter2);

	var _map2 = __webpack_require__(137);

	var _map3 = _interopRequireDefault(_map2);

	var _each2 = __webpack_require__(140);

	var _each3 = _interopRequireDefault(_each2);

	var _some2 = __webpack_require__(144);

	var _some3 = _interopRequireDefault(_some2);

	var _times2 = __webpack_require__(146);

	var _times3 = _interopRequireDefault(_times2);

	var _isNumber2 = __webpack_require__(147);

	var _isNumber3 = _interopRequireDefault(_isNumber2);

	var _Initialize = __webpack_require__(57);

	var _Initialize2 = _interopRequireDefault(_Initialize);

	var _Neuron = __webpack_require__(148);

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

	      (0, _each3.default)(this.neurons, function (source) {
	        // every neuron in this Layer is connected to each neuron in the next.
	        // we can assume the numInputs to be the num of neurons in this Layer.

	        // connect each neuron in this Layer to every Neuron in the targetLayer
	        (0, _each3.default)(targetLayer.neurons, function (target) {
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

	      return (0, _map3.default)(this.neurons, function (neuron, i) {
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
	      var deltas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      (0, _each3.default)(this.neurons, function (neuron, i) {
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
	      (0, _each3.default)(this.neurons, function (neuron) {
	        return neuron.accumulateGradients();
	      });
	    }

	    /**
	     * Update Neuron Connection weights and reset their accumulated gradients.
	     */

	  }, {
	    key: 'updateWeights',
	    value: function updateWeights() {
	      (0, _each3.default)(this.neurons, function (neuron) {
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(62);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(113);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	__webpack_require__(108);
	module.exports = __webpack_require__(112).f('iterator');

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(65)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(68)(String, 'String', function(iterated){
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(66)
	  , defined   = __webpack_require__(67);
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
/* 66 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(69)
	  , $export        = __webpack_require__(70)
	  , redefine       = __webpack_require__(85)
	  , hide           = __webpack_require__(75)
	  , has            = __webpack_require__(86)
	  , Iterators      = __webpack_require__(87)
	  , $iterCreate    = __webpack_require__(88)
	  , setToStringTag = __webpack_require__(104)
	  , getPrototypeOf = __webpack_require__(106)
	  , ITERATOR       = __webpack_require__(105)('iterator')
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
/* 69 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(71)
	  , core      = __webpack_require__(72)
	  , ctx       = __webpack_require__(73)
	  , hide      = __webpack_require__(75)
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
/* 71 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 72 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(74);
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
/* 74 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(76)
	  , createDesc = __webpack_require__(84);
	module.exports = __webpack_require__(80) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(77)
	  , IE8_DOM_DEFINE = __webpack_require__(79)
	  , toPrimitive    = __webpack_require__(83)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(80) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(78);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(80) && !__webpack_require__(81)(function(){
	  return Object.defineProperty(__webpack_require__(82)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(81)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(78)
	  , document = __webpack_require__(71).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(78);
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
/* 84 */
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(75);

/***/ },
/* 86 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(89)
	  , descriptor     = __webpack_require__(84)
	  , setToStringTag = __webpack_require__(104)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(75)(IteratorPrototype, __webpack_require__(105)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(77)
	  , dPs         = __webpack_require__(90)
	  , enumBugKeys = __webpack_require__(102)
	  , IE_PROTO    = __webpack_require__(99)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(82)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(103).appendChild(iframe);
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(76)
	  , anObject = __webpack_require__(77)
	  , getKeys  = __webpack_require__(91);

	module.exports = __webpack_require__(80) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(92)
	  , enumBugKeys = __webpack_require__(102);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(86)
	  , toIObject    = __webpack_require__(93)
	  , arrayIndexOf = __webpack_require__(96)(false)
	  , IE_PROTO     = __webpack_require__(99)('IE_PROTO');

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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(94)
	  , defined = __webpack_require__(67);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(95);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 95 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(93)
	  , toLength  = __webpack_require__(97)
	  , toIndex   = __webpack_require__(98);
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(66)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(66)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(100)('keys')
	  , uid    = __webpack_require__(101);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(71)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 102 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(71).document && document.documentElement;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(76).f
	  , has = __webpack_require__(86)
	  , TAG = __webpack_require__(105)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(100)('wks')
	  , uid        = __webpack_require__(101)
	  , Symbol     = __webpack_require__(71).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(86)
	  , toObject    = __webpack_require__(107)
	  , IE_PROTO    = __webpack_require__(99)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(67);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(109);
	var global        = __webpack_require__(71)
	  , hide          = __webpack_require__(75)
	  , Iterators     = __webpack_require__(87)
	  , TO_STRING_TAG = __webpack_require__(105)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(110)
	  , step             = __webpack_require__(111)
	  , Iterators        = __webpack_require__(87)
	  , toIObject        = __webpack_require__(93);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(68)(Array, 'Array', function(iterated, kind){
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
/* 110 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(105);

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(115);
	__webpack_require__(126);
	__webpack_require__(127);
	__webpack_require__(128);
	module.exports = __webpack_require__(72).Symbol;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(71)
	  , has            = __webpack_require__(86)
	  , DESCRIPTORS    = __webpack_require__(80)
	  , $export        = __webpack_require__(70)
	  , redefine       = __webpack_require__(85)
	  , META           = __webpack_require__(116).KEY
	  , $fails         = __webpack_require__(81)
	  , shared         = __webpack_require__(100)
	  , setToStringTag = __webpack_require__(104)
	  , uid            = __webpack_require__(101)
	  , wks            = __webpack_require__(105)
	  , wksExt         = __webpack_require__(112)
	  , wksDefine      = __webpack_require__(117)
	  , keyOf          = __webpack_require__(118)
	  , enumKeys       = __webpack_require__(119)
	  , isArray        = __webpack_require__(122)
	  , anObject       = __webpack_require__(77)
	  , toIObject      = __webpack_require__(93)
	  , toPrimitive    = __webpack_require__(83)
	  , createDesc     = __webpack_require__(84)
	  , _create        = __webpack_require__(89)
	  , gOPNExt        = __webpack_require__(123)
	  , $GOPD          = __webpack_require__(125)
	  , $DP            = __webpack_require__(76)
	  , $keys          = __webpack_require__(91)
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
	  __webpack_require__(124).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(121).f  = $propertyIsEnumerable;
	  __webpack_require__(120).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(69)){
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(75)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(101)('meta')
	  , isObject = __webpack_require__(78)
	  , has      = __webpack_require__(86)
	  , setDesc  = __webpack_require__(76).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(81)(function(){
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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(71)
	  , core           = __webpack_require__(72)
	  , LIBRARY        = __webpack_require__(69)
	  , wksExt         = __webpack_require__(112)
	  , defineProperty = __webpack_require__(76).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(91)
	  , toIObject = __webpack_require__(93);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(91)
	  , gOPS    = __webpack_require__(120)
	  , pIE     = __webpack_require__(121);
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
/* 120 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 121 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(95);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(93)
	  , gOPN      = __webpack_require__(124).f
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
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(92)
	  , hiddenKeys = __webpack_require__(102).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(121)
	  , createDesc     = __webpack_require__(84)
	  , toIObject      = __webpack_require__(93)
	  , toPrimitive    = __webpack_require__(83)
	  , has            = __webpack_require__(86)
	  , IE8_DOM_DEFINE = __webpack_require__(79)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(80) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 126 */
/***/ function(module, exports) {

	

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(117)('asyncIterator');

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(117)('observable');

/***/ },
/* 129 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(131);

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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(133);
	var $Object = __webpack_require__(72).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(70);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(80), 'Object', {defineProperty: __webpack_require__(76).f});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(135),
	    baseCallback = __webpack_require__(7),
	    baseFilter = __webpack_require__(136),
	    isArray = __webpack_require__(28);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias select
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Array} Returns the new filtered array.
	 * @example
	 *
	 * _.filter([4, 5, 6], function(n) {
	 *   return n % 2 == 0;
	 * });
	 * // => [4, 6]
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * // using the `_.matches` callback shorthand
	 * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
	 * // => ['barney']
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.pluck(_.filter(users, 'active', false), 'user');
	 * // => ['fred']
	 *
	 * // using the `_.property` callback shorthand
	 * _.pluck(_.filter(users, 'active'), 'user');
	 * // => ['barney']
	 */
	function filter(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  predicate = baseCallback(predicate, thisArg, 3);
	  return func(collection, predicate);
	}

	module.exports = filter;


/***/ },
/* 135 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[++resIndex] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(48);

	/**
	 * The base implementation of `_.filter` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
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
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(138),
	    baseCallback = __webpack_require__(7),
	    baseMap = __webpack_require__(139),
	    isArray = __webpack_require__(28);

	/**
	 * Creates an array of values by running each element in `collection` through
	 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
	 * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
	 * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
	 * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
	 * `sum`, `uniq`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @alias collect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function timesThree(n) {
	 *   return n * 3;
	 * }
	 *
	 * _.map([1, 2], timesThree);
	 * // => [3, 6]
	 *
	 * _.map({ 'a': 1, 'b': 2 }, timesThree);
	 * // => [3, 6] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // using the `_.property` callback shorthand
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee, thisArg) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  iteratee = baseCallback(iteratee, thisArg, 3);
	  return func(collection, iteratee);
	}

	module.exports = map;


/***/ },
/* 138 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(48),
	    isArrayLike = __webpack_require__(22);

	/**
	 * The base implementation of `_.map` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
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
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(141);


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(142),
	    baseEach = __webpack_require__(48),
	    createForEach = __webpack_require__(143);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection). Iteratee functions may exit iteration early
	 * by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	 * may be used for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array|Object|string} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(n) {
	 *   console.log(n);
	 * }).value();
	 * // => logs each value from left to right and returns the array
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	 *   console.log(n, key);
	 * });
	 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	 */
	var forEach = createForEach(arrayEach, baseEach);

	module.exports = forEach;


/***/ },
/* 142 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(43),
	    isArray = __webpack_require__(28);

	/**
	 * Creates a function for `_.forEach` or `_.forEachRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createForEach(arrayFunc, eachFunc) {
	  return function(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	      ? arrayFunc(collection, iteratee)
	      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	  };
	}

	module.exports = createForEach;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(13),
	    baseCallback = __webpack_require__(7),
	    baseSome = __webpack_require__(145),
	    isArray = __webpack_require__(28),
	    isIterateeCall = __webpack_require__(53);

	/**
	 * Checks if `predicate` returns truthy for **any** element of `collection`.
	 * The function returns as soon as it finds a passing value and does not iterate
	 * over the entire collection. The predicate is bound to `thisArg` and invoked
	 * with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias any
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
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
	 * // using the `_.matches` callback shorthand
	 * _.some(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.some(users, 'active', false);
	 * // => true
	 *
	 * // using the `_.property` callback shorthand
	 * _.some(users, 'active');
	 * // => true
	 */
	function some(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arraySome : baseSome;
	  if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
	    predicate = undefined;
	  }
	  if (typeof predicate != 'function' || thisArg !== undefined) {
	    predicate = baseCallback(predicate, thisArg, 3);
	  }
	  return func(collection, predicate);
	}

	module.exports = some;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(48);

	/**
	 * The base implementation of `_.some` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
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
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var bindCallback = __webpack_require__(43);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeIsFinite = global.isFinite,
	    nativeMin = Math.min;

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;

	/**
	 * Invokes the iteratee function `n` times, returning an array of the results
	 * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
	 * one argument; (index).
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array} Returns the array of results.
	 * @example
	 *
	 * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
	 * // => [3, 6, 4]
	 *
	 * _.times(3, function(n) {
	 *   mage.castSpell(n);
	 * });
	 * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
	 *
	 * _.times(3, function(n) {
	 *   this.cast(n);
	 * }, mage);
	 * // => also invokes `mage.castSpell(n)` three times
	 */
	function times(n, iteratee, thisArg) {
	  n = nativeFloor(n);

	  // Exit early to avoid a JSC JIT bug in Safari 8
	  // where `Array(0)` is treated as `Array(1)`.
	  if (n < 1 || !nativeIsFinite(n)) {
	    return [];
	  }
	  var index = -1,
	      result = Array(nativeMin(n, MAX_ARRAY_LENGTH));

	  iteratee = bindCallback(iteratee, thisArg, 1);
	  while (++index < n) {
	    if (index < MAX_ARRAY_LENGTH) {
	      result[index] = iteratee(index);
	    } else {
	      iteratee(index);
	    }
	  }
	  return result;
	}

	module.exports = times;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(21);

	/** `Object#toString` result references. */
	var numberTag = '[object Number]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	 * as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isNumber(8.4);
	 * // => true
	 *
	 * _.isNumber(NaN);
	 * // => true
	 *
	 * _.isNumber('8.4');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
	}

	module.exports = isNumber;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(129);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(130);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _isEmpty2 = __webpack_require__(149);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _each2 = __webpack_require__(140);

	var _each3 = _interopRequireDefault(_each2);

	var _sum2 = __webpack_require__(4);

	var _sum3 = _interopRequireDefault(_sum2);

	var _isUndefined2 = __webpack_require__(151);

	var _isUndefined3 = _interopRequireDefault(_isUndefined2);

	var _Initialize = __webpack_require__(57);

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
	        this.input = (0, _sum3.default)(this.incoming, function (connection) {
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
	      if (!(0, _isUndefined3.default)(delta)) {
	        this.delta = delta;
	      } else {
	        this.delta = (0, _sum3.default)(this.outgoing, function (_ref) {
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
	      (0, _each3.default)(this.incoming, function (connection) {
	        return connection.accumulate();
	      });
	    }

	    /**
	     * Update Connection weights and reset their accumulated gradients.
	     */

	  }, {
	    key: 'updateWeights',
	    value: function updateWeights() {
	      (0, _each3.default)(this.incoming, function (connection) {
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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(27),
	    isArray = __webpack_require__(28),
	    isArrayLike = __webpack_require__(22),
	    isFunction = __webpack_require__(19),
	    isObjectLike = __webpack_require__(21),
	    isString = __webpack_require__(150),
	    keys = __webpack_require__(16);

	/**
	 * Checks if `value` is empty. A value is considered empty unless it's an
	 * `arguments` object, array, string, or jQuery-like collection with a length
	 * greater than `0` or an object with own enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {Array|Object|string} value The value to inspect.
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
	  if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
	      (isObjectLike(value) && isFunction(value.splice)))) {
	    return !value.length;
	  }
	  return !keys(value).length;
	}

	module.exports = isEmpty;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(21);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 151 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
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
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(129);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(130);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _invoke2 = __webpack_require__(153);

	var _invoke3 = _interopRequireDefault(_invoke2);

	var _each2 = __webpack_require__(140);

	var _each3 = _interopRequireDefault(_each2);

	var _last2 = __webpack_require__(40);

	var _last3 = _interopRequireDefault(_last2);

	var _slice2 = __webpack_require__(156);

	var _slice3 = _interopRequireDefault(_slice2);

	var _first2 = __webpack_require__(157);

	var _first3 = _interopRequireDefault(_first2);

	var _map2 = __webpack_require__(137);

	var _map3 = _interopRequireDefault(_map2);

	var _isNumber2 = __webpack_require__(147);

	var _isNumber3 = _interopRequireDefault(_isNumber2);

	var _every2 = __webpack_require__(158);

	var _every3 = _interopRequireDefault(_every2);

	var _isEmpty2 = __webpack_require__(149);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _isArray2 = __webpack_require__(28);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _Error = __webpack_require__(3);

	var _Error2 = _interopRequireDefault(_Error);

	var _Layer = __webpack_require__(60);

	var _Layer2 = _interopRequireDefault(_Layer);

	var _Util = __webpack_require__(161);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	var Network = function () {
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

	    (0, _classCallCheck3.default)(this, Network);

	    if (!(0, _isArray3.default)(layerSizes)) {
	      throw new Error('Network() `layerSizes` must be an array, not: ' + (0, _Util.type)(layerSizes));
	    }

	    if ((0, _isEmpty3.default)(layerSizes) || !(0, _every3.default)(layerSizes, _isNumber3.default)) {
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
	    this.allLayers = (0, _map3.default)(layerSizes, function (size) {
	      return new _Layer2.default(size);
	    });
	    /**
	     * The first Layer of the Network.  This Layer receives input during
	     * activation.
	     * @type {Layer}
	     */
	    this.inputLayer = (0, _first3.default)(this.allLayers);

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
	    (0, _each3.default)(this.allLayers, function (layer, i) {
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


	  (0, _createClass3.default)(Network, [{
	    key: 'activate',
	    value: function activate(inputs) {
	      this.inputLayer.activate(inputs);
	      (0, _invoke3.default)(this.hiddenLayers, 'activate');
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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(48),
	    invokePath = __webpack_require__(154),
	    isArrayLike = __webpack_require__(22),
	    isKey = __webpack_require__(39),
	    restParam = __webpack_require__(155);

	/**
	 * Invokes the method at `path` of each element in `collection`, returning
	 * an array of the results of each invoked method. Any additional arguments
	 * are provided to each invoked method. If `methodName` is a function it's
	 * invoked for, and `this` bound to, each element in `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Array|Function|string} path The path of the method to invoke or
	 *  the function invoked per iteration.
	 * @param {...*} [args] The arguments to invoke the method with.
	 * @returns {Array} Returns the array of results.
	 * @example
	 *
	 * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	 * // => [[1, 5, 7], [1, 2, 3]]
	 *
	 * _.invoke([123, 456], String.prototype.split, '');
	 * // => [['1', '2', '3'], ['4', '5', '6']]
	 */
	var invoke = restParam(function(collection, path, args) {
	  var index = -1,
	      isFunc = typeof path == 'function',
	      isProp = isKey(path),
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value) {
	    var func = isFunc ? path : ((isProp && value != null) ? value[path] : undefined);
	    result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
	  });
	  return result;
	});

	module.exports = invoke;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(37),
	    baseSlice = __webpack_require__(38),
	    isKey = __webpack_require__(39),
	    last = __webpack_require__(40),
	    toPath = __webpack_require__(41);

	/**
	 * Invokes the method at `path` on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the method to invoke.
	 * @param {Array} args The arguments to invoke the method with.
	 * @returns {*} Returns the result of the invoked method.
	 */
	function invokePath(object, path, args) {
	  if (object != null && !isKey(path, object)) {
	    path = toPath(path);
	    object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	    path = last(path);
	  }
	  var func = object == null ? object : object[path];
	  return func == null ? undefined : func.apply(object, args);
	}

	module.exports = invokePath;


/***/ },
/* 155 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(38),
	    isIterateeCall = __webpack_require__(53);

	/**
	 * Creates a slice of `array` from `start` up to, but not including, `end`.
	 *
	 * **Note:** This method is used instead of `Array#slice` to support node
	 * lists in IE < 9 and to ensure dense arrays are returned.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function slice(array, start, end) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return [];
	  }
	  if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
	    start = 0;
	    end = length;
	  }
	  return baseSlice(array, start, end);
	}

	module.exports = slice;


/***/ },
/* 157 */
/***/ function(module, exports) {

	/**
	 * Gets the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @alias head
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the first element of `array`.
	 * @example
	 *
	 * _.first([1, 2, 3]);
	 * // => 1
	 *
	 * _.first([]);
	 * // => undefined
	 */
	function first(array) {
	  return array ? array[0] : undefined;
	}

	module.exports = first;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEvery = __webpack_require__(159),
	    baseCallback = __webpack_require__(7),
	    baseEvery = __webpack_require__(160),
	    isArray = __webpack_require__(28),
	    isIterateeCall = __webpack_require__(53);

	/**
	 * Checks if `predicate` returns truthy for **all** elements of `collection`.
	 * The predicate is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias all
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.every([true, 1, null, 'yes'], Boolean);
	 * // => false
	 *
	 * var users = [
	 *   { 'user': 'barney', 'active': false },
	 *   { 'user': 'fred',   'active': false }
	 * ];
	 *
	 * // using the `_.matches` callback shorthand
	 * _.every(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.every(users, 'active', false);
	 * // => true
	 *
	 * // using the `_.property` callback shorthand
	 * _.every(users, 'active');
	 * // => false
	 */
	function every(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arrayEvery : baseEvery;
	  if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
	    predicate = undefined;
	  }
	  if (typeof predicate != 'function' || thisArg !== undefined) {
	    predicate = baseCallback(predicate, thisArg, 3);
	  }
	  return func(collection, predicate);
	}

	module.exports = every;


/***/ },
/* 159 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.every` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 */
	function arrayEvery(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (!predicate(array[index], index, array)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = arrayEvery;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(48);

	/**
	 * The base implementation of `_.every` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
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
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _map2 = __webpack_require__(137);

	var _map3 = _interopRequireDefault(_map2);

	var _max2 = __webpack_require__(162);

	var _max3 = _interopRequireDefault(_max2);

	var _min2 = __webpack_require__(168);

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
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(163);


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var createExtremum = __webpack_require__(164),
	    gt = __webpack_require__(167);

	/** Used as references for `-Infinity` and `Infinity`. */
	var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;

	/**
	 * Gets the maximum value of `collection`. If `collection` is empty or falsey
	 * `-Infinity` is returned. If an iteratee function is provided it's invoked
	 * for each value in `collection` to generate the criterion by which the value
	 * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
	 * arguments: (value, index, collection).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Math
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {*} Returns the maximum value.
	 * @example
	 *
	 * _.max([4, 2, 8, 6]);
	 * // => 8
	 *
	 * _.max([]);
	 * // => -Infinity
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36 },
	 *   { 'user': 'fred',   'age': 40 }
	 * ];
	 *
	 * _.max(users, function(chr) {
	 *   return chr.age;
	 * });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using the `_.property` callback shorthand
	 * _.max(users, 'age');
	 * // => { 'user': 'fred', 'age': 40 }
	 */
	var max = createExtremum(gt, NEGATIVE_INFINITY);

	module.exports = max;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var arrayExtremum = __webpack_require__(165),
	    baseCallback = __webpack_require__(7),
	    baseExtremum = __webpack_require__(166),
	    isArray = __webpack_require__(28),
	    isIterateeCall = __webpack_require__(53),
	    toIterable = __webpack_require__(54);

	/**
	 * Creates a `_.max` or `_.min` function.
	 *
	 * @private
	 * @param {Function} comparator The function used to compare values.
	 * @param {*} exValue The initial extremum value.
	 * @returns {Function} Returns the new extremum function.
	 */
	function createExtremum(comparator, exValue) {
	  return function(collection, iteratee, thisArg) {
	    if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	      iteratee = undefined;
	    }
	    iteratee = baseCallback(iteratee, thisArg, 3);
	    if (iteratee.length == 1) {
	      collection = isArray(collection) ? collection : toIterable(collection);
	      var result = arrayExtremum(collection, iteratee, comparator, exValue);
	      if (!(collection.length && result === exValue)) {
	        return result;
	      }
	    }
	    return baseExtremum(collection, iteratee, comparator, exValue);
	  };
	}

	module.exports = createExtremum;


/***/ },
/* 165 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
	 * with one argument: (value).
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} comparator The function used to compare values.
	 * @param {*} exValue The initial extremum value.
	 * @returns {*} Returns the extremum value.
	 */
	function arrayExtremum(array, iteratee, comparator, exValue) {
	  var index = -1,
	      length = array.length,
	      computed = exValue,
	      result = computed;

	  while (++index < length) {
	    var value = array[index],
	        current = +iteratee(value);

	    if (comparator(current, computed)) {
	      computed = current;
	      result = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayExtremum;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(48);

	/**
	 * Gets the extremum value of `collection` invoking `iteratee` for each value
	 * in `collection` to generate the criterion by which the value is ranked.
	 * The `iteratee` is invoked with three arguments: (value, index|key, collection).
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} comparator The function used to compare values.
	 * @param {*} exValue The initial extremum value.
	 * @returns {*} Returns the extremum value.
	 */
	function baseExtremum(collection, iteratee, comparator, exValue) {
	  var computed = exValue,
	      result = computed;

	  baseEach(collection, function(value, index, collection) {
	    var current = +iteratee(value, index, collection);
	    if (comparator(current, computed) || (current === exValue && current === result)) {
	      computed = current;
	      result = value;
	    }
	  });
	  return result;
	}

	module.exports = baseExtremum;


/***/ },
/* 167 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is greater than `other`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
	 * @example
	 *
	 * _.gt(3, 1);
	 * // => true
	 *
	 * _.gt(3, 3);
	 * // => false
	 *
	 * _.gt(1, 3);
	 * // => false
	 */
	function gt(value, other) {
	  return value > other;
	}

	module.exports = gt;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(169);


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var createExtremum = __webpack_require__(164),
	    lt = __webpack_require__(170);

	/** Used as references for `-Infinity` and `Infinity`. */
	var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

	/**
	 * Gets the minimum value of `collection`. If `collection` is empty or falsey
	 * `Infinity` is returned. If an iteratee function is provided it's invoked
	 * for each value in `collection` to generate the criterion by which the value
	 * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
	 * arguments: (value, index, collection).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Math
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {*} Returns the minimum value.
	 * @example
	 *
	 * _.min([4, 2, 8, 6]);
	 * // => 2
	 *
	 * _.min([]);
	 * // => Infinity
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36 },
	 *   { 'user': 'fred',   'age': 40 }
	 * ];
	 *
	 * _.min(users, function(chr) {
	 *   return chr.age;
	 * });
	 * // => { 'user': 'barney', 'age': 36 }
	 *
	 * // using the `_.property` callback shorthand
	 * _.min(users, 'age');
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var min = createExtremum(lt, POSITIVE_INFINITY);

	module.exports = min;


/***/ },
/* 170 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is less than `other`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
	 * @example
	 *
	 * _.lt(1, 3);
	 * // => true
	 *
	 * _.lt(3, 3);
	 * // => false
	 *
	 * _.lt(3, 1);
	 * // => false
	 */
	function lt(value, other) {
	  return value < other;
	}

	module.exports = lt;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(129);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(130);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _sum2 = __webpack_require__(4);

	var _sum3 = _interopRequireDefault(_sum2);

	var _isNumber2 = __webpack_require__(147);

	var _isNumber3 = _interopRequireDefault(_isNumber2);

	var _merge2 = __webpack_require__(172);

	var _merge3 = _interopRequireDefault(_merge2);

	var _Validate = __webpack_require__(181);

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

	      for (var i = maxEpochs; i > 0; i -= 1) {
	        // sum the average error of all training samples
	        var error = (0, _sum3.default)(data, function (sample, sampleIndex) {
	          var shouldUpdate = isOnline || isMiniBatch && sampleCounter % batch === 0 || isBatch && sampleIndex === data.length - 1;

	          // propagation: set inputs & outputs, then error & deltas
	          network.activate(sample.input);
	          network.backprop(sample.output);

	          // weight updates: update weights || accumulate weight gradients
	          if (shouldUpdate) network.updateWeights();else network.accumulateGradients();

	          sampleCounter++;
	          return network.error / data.length;
	        });

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
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(173),
	    createAssigner = __webpack_require__(180);

	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);

	module.exports = merge;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(142),
	    baseMergeDeep = __webpack_require__(174),
	    isArray = __webpack_require__(28),
	    isArrayLike = __webpack_require__(22),
	    isObject = __webpack_require__(20),
	    isObjectLike = __webpack_require__(21),
	    isTypedArray = __webpack_require__(31),
	    keys = __webpack_require__(16);

	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);

	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || (isSrcArr && !(key in object))) &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}

	module.exports = baseMerge;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(175),
	    isArguments = __webpack_require__(27),
	    isArray = __webpack_require__(28),
	    isArrayLike = __webpack_require__(22),
	    isPlainObject = __webpack_require__(176),
	    isTypedArray = __webpack_require__(31),
	    toPlainObject = __webpack_require__(178);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];

	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;

	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (isArrayLike(value) ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}

	module.exports = baseMergeDeep;


/***/ },
/* 175 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(177),
	    isArguments = __webpack_require__(27),
	    isObjectLike = __webpack_require__(21);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
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
	  var Ctor;

	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}

	module.exports = isPlainObject;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(50),
	    keysIn = __webpack_require__(30);

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	module.exports = baseForIn;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(179),
	    keysIn = __webpack_require__(30);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
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
	  return baseCopy(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 179 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(43),
	    isIterateeCall = __webpack_require__(53),
	    restParam = __webpack_require__(155);

	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(129);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(182);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(183);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _isFunction2 = __webpack_require__(19);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _has2 = __webpack_require__(191);

	var _has3 = _interopRequireDefault(_has2);

	var _isBoolean2 = __webpack_require__(192);

	var _isBoolean3 = _interopRequireDefault(_isBoolean2);

	var _includes2 = __webpack_require__(193);

	var _includes3 = _interopRequireDefault(_includes2);

	var _isNumber2 = __webpack_require__(147);

	var _isNumber3 = _interopRequireDefault(_isNumber2);

	var _each2 = __webpack_require__(140);

	var _each3 = _interopRequireDefault(_each2);

	var _isPlainObject2 = __webpack_require__(176);

	var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

	var _isEmpty2 = __webpack_require__(149);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _isArray2 = __webpack_require__(28);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _Util = __webpack_require__(161);

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
	    (0, _each3.default)(sample.input, function (n) {
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
	    (0, _each3.default)(sample.output, function (n) {
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

	    (0, _each3.default)(data, function (sample, i) {
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

	    (0, _each3.default)(options, function (val, key) {
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
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(61);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(184);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(188);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(61);

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
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(185), __esModule: true };

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(186);
	module.exports = __webpack_require__(72).Object.setPrototypeOf;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(70);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(187).set});

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(78)
	  , anObject = __webpack_require__(77);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(73)(Function.call, __webpack_require__(125).f(Object.prototype, '__proto__').set, 2);
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
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(189), __esModule: true };

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(190);
	var $Object = __webpack_require__(72).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(70)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(89)});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(37),
	    baseSlice = __webpack_require__(38),
	    isArguments = __webpack_require__(27),
	    isArray = __webpack_require__(28),
	    isIndex = __webpack_require__(29),
	    isKey = __webpack_require__(39),
	    isLength = __webpack_require__(25),
	    last = __webpack_require__(40),
	    toPath = __webpack_require__(41);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if `path` is a direct property.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
	 * @example
	 *
	 * var object = { 'a': { 'b': { 'c': 3 } } };
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b.c');
	 * // => true
	 *
	 * _.has(object, ['a', 'b', 'c']);
	 * // => true
	 */
	function has(object, path) {
	  if (object == null) {
	    return false;
	  }
	  var result = hasOwnProperty.call(object, path);
	  if (!result && !isKey(path)) {
	    path = toPath(path);
	    object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	    if (object == null) {
	      return false;
	    }
	    path = last(path);
	    result = hasOwnProperty.call(object, path);
	  }
	  return result || (isLength(object.length) && isIndex(path, object.length) &&
	    (isArray(object) || isArguments(object)));
	}

	module.exports = has;


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(21);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
	}

	module.exports = isBoolean;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(194),
	    getLength = __webpack_require__(23),
	    isArray = __webpack_require__(28),
	    isIterateeCall = __webpack_require__(53),
	    isLength = __webpack_require__(25),
	    isString = __webpack_require__(150),
	    values = __webpack_require__(55);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Checks if `target` is in `collection` using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons. If `fromIndex` is negative, it's used as the offset
	 * from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @alias contains, include
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {*} target The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
	 * @returns {boolean} Returns `true` if a matching element is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	 * // => true
	 *
	 * _.includes('pebbles', 'eb');
	 * // => true
	 */
	function includes(collection, target, fromIndex, guard) {
	  var length = collection ? getLength(collection) : 0;
	  if (!isLength(length)) {
	    collection = values(collection);
	    length = collection.length;
	  }
	  if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
	    fromIndex = 0;
	  } else {
	    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
	  }
	  return (typeof collection == 'string' || !isArray(collection) && isString(collection))
	    ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, target, fromIndex) > -1);
	}

	module.exports = includes;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(195);

	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOf;


/***/ },
/* 195 */
/***/ function(module, exports) {

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = indexOfNaN;


/***/ }
/******/ ])
});
;