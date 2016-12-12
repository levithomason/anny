(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("anny"), require("vis"));
	else if(typeof define === 'function' && define.amd)
		define(["anny", "vis"], factory);
	else if(typeof exports === 'object')
		exports["annyApp"] = factory(require("anny"), require("vis"));
	else
		root["annyApp"] = factory(root["anny"], root["vis"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_35__) {
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

	var _factory = __webpack_require__(1);

	var factory = _interopRequireWildcard(_factory);

	var _graph = __webpack_require__(15);

	var graph = _interopRequireWildcard(_graph);

	var _toolbar = __webpack_require__(37);

	var toolbar = _interopRequireWildcard(_toolbar);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// Init
	// ----------------------------------------
	graph.init(factory.network, document.querySelector('.vis-network'));

	// Export
	// ----------------------------------------
	var annyApp = {
	  factory: factory,
	  toolbar: toolbar,
	  graph: graph
	};

	module.exports = annyApp;
	exports.default = annyApp;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.activate = exports.newNetwork = exports.getRandomLayers = exports.network = exports.trainer = exports.data = undefined;

	var _random2 = __webpack_require__(2);

	var _random3 = _interopRequireDefault(_random2);

	var _times2 = __webpack_require__(11);

	var _times3 = _interopRequireDefault(_times2);

	var _anny = __webpack_require__(14);

	var _anny2 = _interopRequireDefault(_anny);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var data = exports.data = _anny2.default.DATA;
	var trainer = exports.trainer = new _anny2.default.Trainer();
	var network = exports.network = new _anny2.default.Network([2, 5, 3, 1]);

	var getRandomLayers = exports.getRandomLayers = function getRandomLayers() {
	  var layers = [2];

	  (0, _times3.default)((0, _random3.default)(1, 3), function () {
	    return layers.push((0, _random3.default)(3, 5));
	  });

	  layers.push(1);

	  return layers;
	};

	var newNetwork = exports.newNetwork = function newNetwork(layers) {
	  exports.network = network = new _anny2.default.Network(layers || getRandomLayers());
	};

	var activate = exports.activate = function activate(inputs) {
	  network.activate(inputs || (0, _times3.default)(network.inputLayer.neurons.length, Math.random));
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var baseRandom = __webpack_require__(3),
	    isIterateeCall = __webpack_require__(4);

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
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(5),
	    isIndex = __webpack_require__(9),
	    isObject = __webpack_require__(10);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(6),
	    isLength = __webpack_require__(8);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(7);

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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var bindCallback = __webpack_require__(12);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(13);

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
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.init = exports.update = exports.getData = undefined;

	var _each2 = __webpack_require__(16);

	var _each3 = _interopRequireDefault(_each2);

	var _vis = __webpack_require__(35);

	var _vis2 = _interopRequireDefault(_vis);

	var _visNetworkOptions = __webpack_require__(36);

	var _visNetworkOptions2 = _interopRequireDefault(_visNetworkOptions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var visNetwork = void 0;

	var getData = exports.getData = function getData(annyNetwork) {
	  var nodes = [];
	  var edges = [];

	  // layers
	  (0, _each3.default)(annyNetwork.allLayers, function (layer, layerIndex) {
	    // neurons
	    (0, _each3.default)(layer.neurons, function (neuron) {
	      var id = neuron.id;
	      var input = neuron.input.toFixed(3);
	      var output = neuron.output.toFixed(3);
	      var delta = neuron.delta.toFixed(6);

	      nodes.push({
	        id: id,
	        title: ['<b>id:</b> ', id, '<br/>', '<b>delta:</b> ', delta, '<br/>'].join(''),
	        level: layerIndex,
	        label: (neuron.isInput() ? ['\no:', output] : neuron.isOutput() ? ['\ni:', input, '\no:', output] : neuron.isBias ? ['\no:', output] : /* hidden layer */['\ni:', input, '\no:', output]).join(' '),
	        value: Math.abs(output),
	        group: neuron.isBias ? 'bias' : 'normal'
	      });

	      // connections
	      (0, _each3.default)(neuron.outgoing, function (connection) {
	        var weight = connection.weight.toFixed(3);

	        edges.push({
	          from: connection.source.id,
	          to: connection.target.id,
	          value: Math.abs(weight),
	          title: 'weight: ' + weight,
	          // matches border colors in network options factory
	          color: {
	            color: weight >= 0 ? 'hsl(210, 20%, 25%)' : 'hsl(30, 15%, 25%)',
	            hover: weight >= 0 ? 'hsl(210, 35%, 45%)' : 'hsl(30, 40%, 40%)',
	            highlight: weight >= 0 ? 'hsl(210, 60%, 70%)' : 'hsl(30, 60%, 60%)'
	          }
	        });
	      });
	    });
	  });

	  return {
	    nodes: new _vis2.default.DataSet(nodes),
	    edges: new _vis2.default.DataSet(edges)
	  };
	};

	var update = exports.update = function update(annyNetwork) {
	  visNetwork.setData(getData(annyNetwork));
	};

	var init = exports.init = function init(annyNetwork, mountNode) {
	  visNetwork = new _vis2.default.Network(mountNode, getData(annyNetwork), _visNetworkOptions2.default);
	  update(annyNetwork);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(18),
	    baseEach = __webpack_require__(19),
	    createForEach = __webpack_require__(34);

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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(20),
	    createBaseEach = __webpack_require__(33);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(21),
	    keys = __webpack_require__(24);

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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(22);

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(23);

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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(10);

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(25),
	    isArrayLike = __webpack_require__(5),
	    isObject = __webpack_require__(10),
	    shimKeys = __webpack_require__(29);

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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(26);

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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(27),
	    isObjectLike = __webpack_require__(28);

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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(10);

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
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(30),
	    isArray = __webpack_require__(31),
	    isIndex = __webpack_require__(9),
	    isLength = __webpack_require__(8),
	    keysIn = __webpack_require__(32);

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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(5),
	    isObjectLike = __webpack_require__(28);

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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(25),
	    isLength = __webpack_require__(8),
	    isObjectLike = __webpack_require__(28);

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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(30),
	    isArray = __webpack_require__(31),
	    isIndex = __webpack_require__(9),
	    isLength = __webpack_require__(8),
	    isObject = __webpack_require__(10);

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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(6),
	    isLength = __webpack_require__(8),
	    toObject = __webpack_require__(23);

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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(12),
	    isArray = __webpack_require__(31);

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
/* 35 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_35__;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var visNetworkOptions = {};

	// Nodes
	visNetworkOptions.nodes = {
	  borderWidth: 0.1,
	  borderWidthSelected: 0.1,
	  shape: 'dot',
	  scaling: {
	    min: 5,
	    max: 15
	  },
	  font: {
	    color: '#777',
	    size: 12,
	    face: 'Lato'
	  },
	  labelHighlightBold: true,
	  mass: 1
	};

	// Groups
	visNetworkOptions.groups = {
	  normal: {
	    color: {
	      border: 'hsl(210, 20%, 25%)',
	      background: 'hsl(210, 80%, 80%)',
	      hover: {
	        border: 'hsl(210, 35%, 45%)',
	        background: 'hsl(210, 80%, 80%)'
	      },
	      highlight: {
	        border: 'hsl(210, 60%, 70%)',
	        background: 'hsl(210, 80%, 80%)'
	      }
	    }
	  },
	  bias: {
	    borderWidth: 2,
	    borderWidthSelected: 2,
	    color: {
	      border: 'hsl(0, 0%, 40%)',
	      background: 'transparent',
	      hover: {
	        border: 'hsl(0, 0%, 60%)',
	        background: 'transparent'
	      },
	      highlight: {
	        border: 'hsl(0, 0%, 80%)',
	        background: 'transparent'
	      }
	    }
	  }
	};

	// Edges
	visNetworkOptions.edges = {
	  smooth: {
	    enabled: false, // faster rendering
	    type: 'dynamic',
	    roundness: 0.5
	  },
	  scaling: {
	    min: 0.5,
	    max: 8
	  },
	  hoverWidth: 1,
	  selectionWidth: 1.5
	};

	// Layout
	visNetworkOptions.layout = {
	  hierarchical: {
	    direction: 'LR'
	  }
	};

	// Interaction
	visNetworkOptions.interaction = {
	  hover: true,
	  tooltipDelay: 150
	};

	// Physics
	visNetworkOptions.physics = {
	  enabled: true,
	  hierarchicalRepulsion: {
	    centralGravity: 0,
	    springLength: 50,
	    springConstant: 0.002,
	    nodeDistance: 80,
	    damping: 0.4
	  },
	  maxVelocity: 50,
	  minVelocity: 0.1,
	  stabilization: {
	    enabled: true,
	    iterations: 0,
	    updateInterval: 0,
	    onlyDynamicEdges: false,
	    fit: true
	  },
	  timestep: 0.5
	};

	exports.default = visNetworkOptions;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.trainIrisFlower = exports.trainNANDGate = exports.trainANDGate = exports.trainXORGate = exports.trainORGate = exports.newIrisNetwork = exports.newRandomNetwork = exports.newLogicNetwork = exports.train = undefined;

	var _round2 = __webpack_require__(38);

	var _round3 = _interopRequireDefault(_round2);

	var _each2 = __webpack_require__(16);

	var _each3 = _interopRequireDefault(_each2);

	var _pad2 = __webpack_require__(40);

	var _pad3 = _interopRequireDefault(_pad2);

	var _factory = __webpack_require__(1);

	var factory = _interopRequireWildcard(_factory);

	var _graph = __webpack_require__(15);

	var graph = _interopRequireWildcard(_graph);

	var _console = __webpack_require__(44);

	var $console = _interopRequireWildcard(_console);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var train = exports.train = function train(trainingSet) {
	  $console.clear();

	  factory.trainer.train(factory.network, trainingSet, {
	    frequency: 1,
	    onProgress: function onProgress(error, epoch) {
	      $console.log('epoch ' + (0, _pad3.default)(epoch, 3) + ' error ' + error.toFixed(6));
	    },
	    onSuccess: function onSuccess(error, epoch) {
	      var results = [];

	      (0, _each3.default)(trainingSet, function (sample) {
	        var input = sample.input;
	        var output = factory.network.activate(input);
	        results.push('[' + input.toString() + '] => ' + (0, _pad3.default)((0, _round3.default)(output, 2), 5) + ' == ' + (0, _pad3.default)(output >= 0.5, 5));
	      });

	      $console.log([// eslint-disable-line
	      '', 'SUCCESS!', '', 'Predictions after training:'].concat(results).join('\n'));

	      graph.update(factory.network);
	    },
	    onFail: function onFail(error, epoch) {
	      $console.log([// eslint-disable-line
	      '', 'FAIL!'].join('\n'));

	      graph.update(factory.network);
	    }
	  });
	};

	var newLogicNetwork = exports.newLogicNetwork = function newLogicNetwork() {
	  factory.newNetwork([2, 5, 3, 1]);
	  graph.update(factory.network);
	};

	var newRandomNetwork = exports.newRandomNetwork = function newRandomNetwork() {
	  factory.newNetwork();
	  graph.update(factory.network);
	};
	var newIrisNetwork = exports.newIrisNetwork = function newIrisNetwork() {
	  factory.newNetwork([4, 20, 10, 7, 3]);
	  graph.update(factory.network);
	};

	var trainORGate = exports.trainORGate = function trainORGate() {
	  train(factory.data.ORGate);
	};

	var trainXORGate = exports.trainXORGate = function trainXORGate() {
	  train(factory.data.XORGate);
	};

	var trainANDGate = exports.trainANDGate = function trainANDGate() {
	  train(factory.data.ANDGate);
	};

	var trainNANDGate = exports.trainNANDGate = function trainNANDGate() {
	  train(factory.data.NANDGate);
	};

	var trainIrisFlower = exports.trainIrisFlower = function trainIrisFlower() {
	  train(factory.data.irisFlower);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var createRound = __webpack_require__(39);

	/**
	 * Calculates `n` rounded to `precision`.
	 *
	 * @static
	 * @memberOf _
	 * @category Math
	 * @param {number} n The number to round.
	 * @param {number} [precision=0] The precision to round to.
	 * @returns {number} Returns the rounded number.
	 * @example
	 *
	 * _.round(4.006);
	 * // => 4
	 *
	 * _.round(4.006, 2);
	 * // => 4.01
	 *
	 * _.round(4060, -2);
	 * // => 4100
	 */
	var round = createRound('round');

	module.exports = round;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/** Native method references. */
	var pow = Math.pow;

	/**
	 * Creates a `_.ceil`, `_.floor`, or `_.round` function.
	 *
	 * @private
	 * @param {string} methodName The name of the `Math` method to use when rounding.
	 * @returns {Function} Returns the new round function.
	 */
	function createRound(methodName) {
	  var func = Math[methodName];
	  return function(number, precision) {
	    precision = precision === undefined ? 0 : (+precision || 0);
	    if (precision) {
	      precision = pow(10, precision);
	      return func(number * precision) / precision;
	    }
	    return func(number);
	  };
	}

	module.exports = createRound;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var baseToString = __webpack_require__(41),
	    createPadding = __webpack_require__(42);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeFloor = Math.floor,
	    nativeIsFinite = global.isFinite;

	/**
	 * Pads `string` on the left and right sides if it's shorter than `length`.
	 * Padding characters are truncated if they can't be evenly divided by `length`.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to pad.
	 * @param {number} [length=0] The padding length.
	 * @param {string} [chars=' '] The string used as padding.
	 * @returns {string} Returns the padded string.
	 * @example
	 *
	 * _.pad('abc', 8);
	 * // => '  abc   '
	 *
	 * _.pad('abc', 8, '_-');
	 * // => '_-abc_-_'
	 *
	 * _.pad('abc', 3);
	 * // => 'abc'
	 */
	function pad(string, length, chars) {
	  string = baseToString(string);
	  length = +length;

	  var strLength = string.length;
	  if (strLength >= length || !nativeIsFinite(length)) {
	    return string;
	  }
	  var mid = (length - strLength) / 2,
	      leftLength = nativeFloor(mid),
	      rightLength = nativeCeil(mid);

	  chars = createPadding('', rightLength, chars);
	  return chars.slice(0, leftLength) + string + chars;
	}

	module.exports = pad;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 41 */
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var repeat = __webpack_require__(43);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeIsFinite = global.isFinite;

	/**
	 * Creates the padding required for `string` based on the given `length`.
	 * The `chars` string is truncated if the number of characters exceeds `length`.
	 *
	 * @private
	 * @param {string} string The string to create padding for.
	 * @param {number} [length=0] The padding length.
	 * @param {string} [chars=' '] The string used as padding.
	 * @returns {string} Returns the pad for `string`.
	 */
	function createPadding(string, length, chars) {
	  var strLength = string.length;
	  length = +length;

	  if (strLength >= length || !nativeIsFinite(length)) {
	    return '';
	  }
	  var padLength = length - strLength;
	  chars = chars == null ? ' ' : (chars + '');
	  return repeat(chars, nativeCeil(padLength / chars.length)).slice(0, padLength);
	}

	module.exports = createPadding;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var baseToString = __webpack_require__(41);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeIsFinite = global.isFinite;

	/**
	 * Repeats the given string `n` times.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to repeat.
	 * @param {number} [n=0] The number of times to repeat the string.
	 * @returns {string} Returns the repeated string.
	 * @example
	 *
	 * _.repeat('*', 3);
	 * // => '***'
	 *
	 * _.repeat('abc', 2);
	 * // => 'abcabc'
	 *
	 * _.repeat('abc', 0);
	 * // => ''
	 */
	function repeat(string, n) {
	  var result = '';
	  string = baseToString(string);
	  n = +n;
	  if (n < 1 || !string || !nativeIsFinite(n)) {
	    return result;
	  }
	  // Leverage the exponentiation by squaring algorithm for a faster repeat.
	  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
	  do {
	    if (n % 2) {
	      result += string;
	    }
	    n = nativeFloor(n / 2);
	    string += string;
	  } while (n);

	  return result;
	}

	module.exports = repeat;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var $console = document.querySelector('.ay-console');

	var log = exports.log = function log() {
	  for (var _len = arguments.length, msgs = Array(_len), _key = 0; _key < _len; _key++) {
	    msgs[_key] = arguments[_key];
	  }

	  $console.innerText = [$console.innerText, '\n'].concat(msgs).join('');
	};

	var clear = exports.clear = function clear() {
	  return $console.innerText = '';
	};

/***/ }
/******/ ])
});
;