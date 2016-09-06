(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("react-ui-states", [], factory);
	else if(typeof exports === 'object')
		exports["react-ui-states"] = factory();
	else
		root["react-ui-states"] = factory();
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

	var _index = __webpack_require__(1);

	Object.defineProperty(exports, 'Utils', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_index).default;
	  }
	});

	var _defaultStore = __webpack_require__(4);

	Object.defineProperty(exports, 'DefaultStore', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_defaultStore).default;
	  }
	});

	var _defaultStoreDecorator = __webpack_require__(7);

	Object.defineProperty(exports, 'DefaultStoreDecorator', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_defaultStoreDecorator).default;
	  }
	});

	var _statesStore = __webpack_require__(8);

	Object.defineProperty(exports, 'StatesStore', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_statesStore).default;
	  }
	});

	var _baseUiState = __webpack_require__(9);

	Object.defineProperty(exports, 'BaseUIState', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_baseUiState).default;
	  }
	});

	var _defaultUiState = __webpack_require__(10);

	Object.defineProperty(exports, 'DefaultUIState', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_defaultUiState).default;
	  }
	});

	var _objectPath = __webpack_require__(5);

	Object.defineProperty(exports, 'objectPath', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_objectPath).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _other = __webpack_require__(2);

	var _other2 = _interopRequireDefault(_other);

	var _array = __webpack_require__(3);

	var _array2 = _interopRequireDefault(_array);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Utils = {
	    Other: _other2.default,
	    Array: _array2.default
	};

	exports.default = Utils;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Other = function () {
	    function Other() {
	        _classCallCheck(this, Other);
	    }

	    _createClass(Other, null, [{
	        key: 'isExist',

	        /**
	         * return true if value is not: null, undefined, NaN, empty string ("")
	         **/
	        value: function isExist(value) {

	            if (value === true || value === false) {
	                return true;
	            }

	            if (value === 0) {
	                return true;
	            }

	            if (value) {
	                return true;
	            }

	            return false;
	        }
	    }, {
	        key: 'isExistAll',
	        value: function isExistAll(values) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var value = _step.value;

	                    if (!Other.isExist(value)) {
	                        return false;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return true;
	        }
	    }, {
	        key: 'deepClone',
	        value: function deepClone(obj) {
	            return JSON.parse(JSON.stringify(obj));
	        }
	    }, {
	        key: 'createGuid',
	        value: function createGuid() {
	            function s4() {
	                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	            }
	            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	        }
	    }]);

	    return Other;
	}();

	exports.default = Other;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ArrayUtils = function () {
	    function ArrayUtils() {
	        _classCallCheck(this, ArrayUtils);
	    }

	    _createClass(ArrayUtils, null, [{
	        key: "removeAt",
	        value: function removeAt(arr, index) {
	            var removeCount = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	            arr.splice(index, removeCount);
	        }
	    }]);

	    return ArrayUtils;
	}();

	exports.default = ArrayUtils;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _objectPath = __webpack_require__(5);

	var _objectPath2 = _interopRequireDefault(_objectPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DefaultStore = function () {
	    function DefaultStore(key) {
	        _classCallCheck(this, DefaultStore);

	        this._key = key;
	        this._model = { _lastUpdateTime: Date.now(), _isNew: null, _isExist: false };
	        this._subscribers = []; //subscriber signature = {id, action}
	        this._subscribersOnFieldUpdate = []; //subscriber signature = {id, action}
	    }

	    _createClass(DefaultStore, [{
	        key: 'createNew',
	        value: function createNew() {
	            var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this._model = data;
	            this._model._lastUpdateTime = Date.now();
	            this._model._isNew = true;
	            this._model._isExist = true;
	            this._publish();
	        }
	    }, {
	        key: 'replace',
	        value: function replace() {
	            var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this._model = data;
	            this._model._lastUpdateTime = Date.now();
	            this._model._isNew = false;
	            this._model._isExist = true;
	            this._publish();
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this._model = { _lastUpdateTime: Date.now(), _isNew: null, _isExist: false };
	            this._publish();
	        }
	    }, {
	        key: 'update',
	        value: function update(data, validationData, options) {
	            if (!_utils2.default.Other.isExist(validationData)) {
	                this._model._isNew = false;
	                this._model._isExist = true;
	                Object.assign(this._model, data); //merge with remaining fields
	            }
	            this._model._lastUpdateTime = Date.now();
	            this._publish(validationData, options);
	        }
	    }, {
	        key: 'updateField',
	        value: function updateField(data, validationData, path, options) {
	            if (!_utils2.default.Other.isExist(validationData)) {
	                _objectPath2.default.set(this._model, path, data);
	            }
	            this._model._lastUpdateTime = Date.now();
	            this._publishByPath(path, data, validationData, options);
	        }
	    }, {
	        key: 'clearValidationInField',
	        value: function clearValidationInField(path) {
	            this.updateField(_objectPath2.default.get(this._model, path), null, path);
	        }
	    }, {
	        key: 'isExist',
	        value: function isExist() {
	            return this.getModel()._isExist;
	        }
	    }, {
	        key: 'getModel',
	        value: function getModel() {
	            return this._model;
	        }
	    }, {
	        key: 'getModelClone',
	        value: function getModelClone() {
	            return _utils2.default.Other.deepClone(this.getModel());
	        }
	    }, {
	        key: 'getDataByPath',
	        value: function getDataByPath(path) {
	            var data = _objectPath2.default.get(this._model, path);
	            return data || '';
	        }
	    }, {
	        key: 'getDataCloneByPath',
	        value: function getDataCloneByPath(path) {
	            return _utils2.default.Other.deepClone(this.getDataByPath(path));
	        }
	    }, {
	        key: 'subscribe',
	        value: function subscribe(id, onUpdateStore) {
	            this._subscribe(id, onUpdateStore, '_subscribers');
	        }
	    }, {
	        key: 'subscribeOnFieldUpdate',
	        value: function subscribeOnFieldUpdate(id, onUpdateStoreField) {
	            this._subscribe(id, onUpdateStoreField, '_subscribersOnFieldUpdate');
	        }
	    }, {
	        key: 'unSubscribe',
	        value: function unSubscribe(id) {
	            var index = this._subscribers.findIndex(function (s) {
	                return s.id === id;
	            });
	            _utils2.default.Array.removeAt(this._subscribers, index);

	            index = this._subscribersOnFieldUpdate.findIndex(function (s) {
	                return s.id === id;
	            });
	            _utils2.default.Array.removeAt(this._subscribersOnFieldUpdate, index);
	        }
	    }, {
	        key: '_publish',
	        value: function _publish(validationData, options) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this._subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var subscriber = _step.value;

	                    subscriber.action(this.key, this._model, validationData, options);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_subscribe',
	        value: function _subscribe(id, onUpdate, subscribersfieldKey) {
	            var index = this[subscribersfieldKey].findIndex(function (s) {
	                return s.id === id;
	            });
	            if (index === -1) {
	                this[subscribersfieldKey].push({ id: id, action: onUpdate });
	            } else {
	                console.warn('state with id = ' + id + 'already added');
	            }
	        }
	    }, {
	        key: '_publishByPath',
	        value: function _publishByPath(path, value, validationData, options) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this._subscribersOnFieldUpdate[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var subscriber = _step2.value;

	                    subscriber.action(this.key, path, value, validationData, options);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'key',
	        get: function get() {
	            return this._key;
	        }
	    }]);

	    return DefaultStore;
	}();

	exports.default = DefaultStore;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (root, factory) {
	  'use strict';

	  /*istanbul ignore next:cant test*/

	  if (( false ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
	    module.exports = factory();
	  } else if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // Browser globals
	    root.objectPath = factory();
	  }
	})(undefined, function () {
	  'use strict';

	  var toStr = Object.prototype.toString,
	      _hasOwnProperty = Object.prototype.hasOwnProperty;

	  function isEmpty(value) {
	    if (!value) {
	      return true;
	    }
	    if (isArray(value) && value.length === 0) {
	      return true;
	    } else if (!isString(value)) {
	      for (var i in value) {
	        if (_hasOwnProperty.call(value, i)) {
	          return false;
	        }
	      }
	      return true;
	    }
	    return false;
	  }

	  function toString(type) {
	    return toStr.call(type);
	  }

	  function isNumber(value) {
	    return typeof value === 'number' || toString(value) === "[object Number]";
	  }

	  function isString(obj) {
	    return typeof obj === 'string' || toString(obj) === "[object String]";
	  }

	  function isObject(obj) {
	    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && toString(obj) === "[object Object]";
	  }

	  var isArray = Array.isArray || function (obj) {
	    return toStr.call(obj) === '[object Array]';
	  };

	  function isBoolean(obj) {
	    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	  }

	  function getKey(key) {
	    var intKey = parseInt(key);
	    if (intKey.toString() === key) {
	      return intKey;
	    }
	    return key;
	  }

	  function set(obj, path, value, doNotReplace) {
	    if (isNumber(path)) {
	      path = [path];
	    }
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isString(path)) {
	      return set(obj, path.split('.').map(getKey), value, doNotReplace);
	    }
	    var currentPath = path[0];

	    if (path.length === 1) {
	      var oldVal = obj[currentPath];
	      if (oldVal === void 0 || !doNotReplace) {
	        obj[currentPath] = value;
	      }
	      return oldVal;
	    }

	    if (obj[currentPath] === void 0) {
	      //check if we assume an array
	      if (isNumber(path[1])) {
	        obj[currentPath] = [];
	      } else {
	        obj[currentPath] = {};
	      }
	    }

	    return set(obj[currentPath], path.slice(1), value, doNotReplace);
	  }

	  function del(obj, path) {
	    if (isNumber(path)) {
	      path = [path];
	    }

	    if (isEmpty(obj)) {
	      return void 0;
	    }

	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isString(path)) {
	      return del(obj, path.split('.'));
	    }

	    var currentPath = getKey(path[0]);
	    var oldVal = obj[currentPath];

	    if (path.length === 1) {
	      if (oldVal !== void 0) {
	        if (isArray(obj)) {
	          obj.splice(currentPath, 1);
	        } else {
	          delete obj[currentPath];
	        }
	      }
	    } else {
	      if (obj[currentPath] !== void 0) {
	        return del(obj[currentPath], path.slice(1));
	      }
	    }

	    return obj;
	  }

	  var objectPath = function objectPath(obj) {
	    return Object.keys(objectPath).reduce(function (proxy, prop) {
	      if (typeof objectPath[prop] === 'function') {
	        proxy[prop] = objectPath[prop].bind(objectPath, obj);
	      }

	      return proxy;
	    }, {});
	  };

	  objectPath.has = function (obj, path) {
	    if (isEmpty(obj)) {
	      return false;
	    }

	    if (isNumber(path)) {
	      path = [path];
	    } else if (isString(path)) {
	      path = path.split('.');
	    }

	    if (isEmpty(path) || path.length === 0) {
	      return false;
	    }

	    for (var i = 0; i < path.length; i++) {
	      var j = path[i];
	      if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
	        obj = obj[j];
	      } else {
	        return false;
	      }
	    }

	    return true;
	  };

	  objectPath.ensureExists = function (obj, path, value) {
	    return set(obj, path, value, true);
	  };

	  objectPath.set = function (obj, path, value, doNotReplace) {
	    return set(obj, path, value, doNotReplace);
	  };

	  objectPath.insert = function (obj, path, value, at) {
	    var arr = objectPath.get(obj, path);
	    at = ~~at;
	    if (!isArray(arr)) {
	      arr = [];
	      objectPath.set(obj, path, arr);
	    }
	    arr.splice(at, 0, value);
	  };

	  objectPath.empty = function (obj, path) {
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isEmpty(obj)) {
	      return void 0;
	    }

	    var value, i;
	    if (!(value = objectPath.get(obj, path))) {
	      return obj;
	    }

	    if (isString(value)) {
	      return objectPath.set(obj, path, '');
	    } else if (isBoolean(value)) {
	      return objectPath.set(obj, path, false);
	    } else if (isNumber(value)) {
	      return objectPath.set(obj, path, 0);
	    } else if (isArray(value)) {
	      value.length = 0;
	    } else if (isObject(value)) {
	      for (i in value) {
	        if (_hasOwnProperty.call(value, i)) {
	          delete value[i];
	        }
	      }
	    } else {
	      return objectPath.set(obj, path, null);
	    }
	  };

	  objectPath.push = function (obj, path /*, values */) {
	    var arr = objectPath.get(obj, path);
	    if (!isArray(arr)) {
	      arr = [];
	      objectPath.set(obj, path, arr);
	    }

	    arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
	  };

	  objectPath.coalesce = function (obj, paths, defaultValue) {
	    var value;

	    for (var i = 0, len = paths.length; i < len; i++) {
	      if ((value = objectPath.get(obj, paths[i])) !== void 0) {
	        return value;
	      }
	    }

	    return defaultValue;
	  };

	  objectPath.get = function (obj, path, defaultValue) {
	    if (isNumber(path)) {
	      path = [path];
	    }
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isEmpty(obj)) {
	      return defaultValue;
	    }
	    if (isString(path)) {
	      return objectPath.get(obj, path.split('.'), defaultValue);
	    }

	    var currentPath = getKey(path[0]);

	    if (path.length === 1) {
	      if (obj[currentPath] === void 0) {
	        return defaultValue;
	      }
	      return obj[currentPath];
	    }

	    return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
	  };

	  objectPath.del = function (obj, path) {
	    return del(obj, path);
	  };

	  return objectPath;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DefaultStoreDecorator = function () {
	    function DefaultStoreDecorator(store) {
	        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, DefaultStoreDecorator);

	        this._store = store;
	        this._params = {};

	        //setup default params
	        this._params.useStoreClone = params.useStoreClone || true;
	        this._params.convertModel = params.convertModel || function (m) {
	            return m;
	        };
	    }

	    _createClass(DefaultStoreDecorator, [{
	        key: "getModel",
	        value: function getModel() {
	            var storeModel = this._params.useStoreClone === true ? this._store.getModelClone() : this._store.store.getModel();
	            return this._params.convertModel(storeModel);
	        }
	    }, {
	        key: "getDataByPath",
	        value: function getDataByPath(pathInStore) {
	            var storeData = this._params.useStoreClone === true ? this._store.getDataCloneByPath(pathInStore) : this._store.getDataByPath(pathInStore);
	            return storeData;
	        }
	    }, {
	        key: "subscribe",
	        value: function subscribe(id, onUpdateStore) {
	            this._store.subscribe(id, onUpdateStore);
	        }
	    }, {
	        key: "subscribeOnFieldUpdate",
	        value: function subscribeOnFieldUpdate(id, onUpdateStoreField) {
	            this._store.subscribeOnFieldUpdate(id, onUpdateStoreField);
	        }
	    }, {
	        key: "unSubscribe",
	        value: function unSubscribe(id) {
	            this._store.unSubscribe(id);
	        }
	    }, {
	        key: "isDecorator",
	        get: function get() {
	            return true;
	        }
	    }, {
	        key: "key",
	        get: function get() {
	            return this._store.key;
	        }
	    }]);

	    return DefaultStoreDecorator;
	}();

	exports.default = DefaultStoreDecorator;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StatesStore = function () {
	    function StatesStore() {
	        _classCallCheck(this, StatesStore);
	    }

	    _createClass(StatesStore, null, [{
	        key: 'addState',
	        value: function addState(state) {
	            StatesStore._states.push(state);
	        }
	    }, {
	        key: 'removeState',
	        value: function removeState(id) {
	            var index = StatesStore._states.findIndex(function (s) {
	                return s.id === id;
	            });
	            if (index > -1) {
	                _utils2.default.Array.removeAt(StatesStore._states, index);
	            }
	        }
	    }]);

	    return StatesStore;
	}();

	StatesStore._states = [];
	exports.default = StatesStore;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.getFullPath = getFullPath;

	var _statesStore = __webpack_require__(8);

	var _statesStore2 = _interopRequireDefault(_statesStore);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _objectPath = __webpack_require__(5);

	var _objectPath2 = _interopRequireDefault(_objectPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseUIState = function () {
	    function BaseUIState() {
	        _classCallCheck(this, BaseUIState);

	        this.id = _utils2.default.Other.createGuid();
	        _statesStore2.default.addState(this);
	    }

	    _createClass(BaseUIState, [{
	        key: 'set',
	        value: function set(path, newValue) {
	            var doComponentUpdate = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	            if (!_objectPath2.default.has(this, path)) {
	                console.info('created path: ' + path);
	            }
	            _objectPath2.default.set(this, path, newValue);

	            if (doComponentUpdate === true) {
	                this._updateComponent();
	            }
	        }
	    }, {
	        key: 'has',
	        value: function has(path) {
	            return _objectPath2.default.has(this, path);
	        }
	    }, {
	        key: 'get',
	        value: function get(path) {
	            var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	            return _objectPath2.default.get(this, path, defaultValue);
	        }
	    }, {
	        key: 'removeState',
	        value: function removeState() {
	            _statesStore2.default.removeState(this.id);
	        }
	    }, {
	        key: '_updateComponent',
	        value: function _updateComponent() {}
	    }]);

	    return BaseUIState;
	}();

	exports.default = BaseUIState;
	function getFullPath(path, field) {
	    var fullPath = field;
	    if (_utils2.default.Other.isExist(path)) {
	        fullPath = path + '.' + field;
	    }
	    return fullPath;
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _objectPath = __webpack_require__(5);

	var _objectPath2 = _interopRequireDefault(_objectPath);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _baseUiState = __webpack_require__(9);

	var _baseUiState2 = _interopRequireDefault(_baseUiState);

	var _defaultStoreDecorator = __webpack_require__(7);

	var _defaultStoreDecorator2 = _interopRequireDefault(_defaultStoreDecorator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DefaultUIState = function (_BaseUIState) {
	    _inherits(DefaultUIState, _BaseUIState);

	    function DefaultUIState(component, stateModel) {
	        var storesParams = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	        _classCallCheck(this, DefaultUIState);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DefaultUIState).call(this));

	        _this._onUpdateStore = _this._onUpdateStore.bind(_this);
	        _this._onUpdateStoreField = _this._onUpdateStoreField.bind(_this);

	        _this.model = stateModel || {};
	        _this._initialModel = stateModel ? _utils2.default.Other.deepClone(stateModel) : {};
	        _this._component = component;
	        _this._storesParams = [];
	        _this._updatedStore = null;
	        _this._updatedFieldPath = null;

	        //setup default storesParams
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = storesParams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var params = _step.value;

	                var newParams = Object.assign({}, params);
	                if (!_utils2.default.Other.isExist(newParams.store)) {
	                    console.error('params.store is empty in component ' + _this._component.constructor.name);
	                    return _possibleConstructorReturn(_this);
	                }

	                newParams.updateCondition = newParams.updateCondition || function () {
	                    return true;
	                };
	                newParams.updateFieldCondition = newParams.updateFieldCondition || function () {
	                    return true;
	                };

	                if (newParams.store.isDecorator !== true) {
	                    newParams.store = new _defaultStoreDecorator2.default(newParams.store);
	                }

	                _this._storesParams.push(newParams);
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }

	        _this._subscribeToStores(storesParams);
	        setTimeout(function () {
	            _this._setStoreModels();
	        }, 0);
	        return _this;
	    }

	    _createClass(DefaultUIState, [{
	        key: 'cancelAllChanges',
	        value: function cancelAllChanges() {
	            var clearValidation = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	            this.cancelModelChanges(false);
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this._storesParams[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var param = _step2.value;

	                    this._setStoreModel(param.store.key, null, true);

	                    if (clearValidation === true) {
	                        this[param.store.key].validationData = {};
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            this._updateComponent();
	        }
	    }, {
	        key: 'cancelModelChanges',
	        value: function cancelModelChanges() {
	            var doUpdate = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	            this.model = _utils2.default.Other.deepClone(this._initialModel);
	            if (doUpdate) {
	                this._updateComponent();
	            }
	        }
	    }, {
	        key: 'cancelStoresChanges',
	        value: function cancelStoresChanges(storeKeys) {
	            var clearValidation = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	            var validationOnly = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = storeKeys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var key = _step3.value;

	                    if (validationOnly === false) {
	                        this._setStoreModel(key, null, true);
	                    }
	                    if (clearValidation === true) {
	                        this[key].validationData = {};
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            this._updateComponent();
	        }
	    }, {
	        key: 'updateFromStores',
	        value: function updateFromStores() {
	            var storeKeys = arguments.length <= 0 || arguments[0] === undefined ? this._getAllStoreKeys() : arguments[0];
	            var doUpdate = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = storeKeys[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var key = _step4.value;

	                    var validationData = this[key].validationData;
	                    this._setStoreModel(key);
	                    this[key].validationData = validationData;
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }

	            if (doUpdate === true) {
	                this._updateComponent();
	            }
	        }
	    }, {
	        key: 'cancelChangesByPath',
	        value: function cancelChangesByPath(path, storeKey) {
	            var doUpdate = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	            var fullPath = storeKey + '.' + path;
	            if (_objectPath2.default.has(this, fullPath)) {
	                var storeParams = this._getParamByStoreKey(storeKey);
	                var storeValue = storeParams.store.getDataByPath(path);
	                _objectPath2.default.set(this, fullPath, storeValue);
	                this._removeValidationInField(storeKey, path);
	            } else {
	                console.log('path ' + fullPath + ' not found');
	            }

	            if (doUpdate === true) {
	                this._updateComponent();
	            }
	        }
	    }, {
	        key: 'removeState',
	        value: function removeState() {
	            _get(Object.getPrototypeOf(DefaultUIState.prototype), 'removeState', this).call(this);
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = this._storesParams[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var param = _step5.value;

	                    param.store.unSubscribe(this.id);
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'storeLastUpdateTime',
	        value: function storeLastUpdateTime(storeKey) {
	            return this[storeKey]._lastUpdateTime;
	        }
	    }, {
	        key: 'storeModelIsNew',
	        value: function storeModelIsNew(storeKey) {
	            return this[storeKey]._isNew;
	        }
	    }, {
	        key: 'storeModelIsExist',
	        value: function storeModelIsExist(storeKey) {
	            return this[storeKey]._isExist;
	        }
	    }, {
	        key: '_setStoreModels',
	        value: function _setStoreModels() {
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;

	            try {
	                for (var _iterator6 = this._storesParams[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var param = _step6.value;

	                    this._setStoreModel(param.store.key);
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_setStoreModel',
	        value: function _setStoreModel(storeKey, validationData) {
	            var isCancel = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	            var storeParams = this._getParamByStoreKey(storeKey);
	            var storeObject = storeParams.store.getModel();
	            if (isCancel === true || !_utils2.default.Other.isExist(validationData)) {
	                this[storeKey] = storeObject;
	            } else {
	                this[storeKey].validationData = validationData;
	                this[storeKey]._lastUpdateTime = storeObject._lastUpdateTime;
	            }
	        }
	    }, {
	        key: '_subscribeToStores',
	        value: function _subscribeToStores(storesParams) {
	            var _iteratorNormalCompletion7 = true;
	            var _didIteratorError7 = false;
	            var _iteratorError7 = undefined;

	            try {
	                for (var _iterator7 = storesParams[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                    var param = _step7.value;

	                    param.store.subscribe(this.id, this._onUpdateStore);
	                    param.store.subscribeOnFieldUpdate(this.id, this._onUpdateStoreField);
	                }
	            } catch (err) {
	                _didIteratorError7 = true;
	                _iteratorError7 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                        _iterator7.return();
	                    }
	                } finally {
	                    if (_didIteratorError7) {
	                        throw _iteratorError7;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_onUpdateStore',
	        value: function _onUpdateStore(storeKey, model, validationData, options) {
	            var storeParams = this._getParamByStoreKey(storeKey);
	            if (storeParams.updateCondition(model) === false) {
	                return;
	            }
	            this._setStoreModel(storeKey, validationData);

	            if (_utils2.default.Other.isExist(options) && options.doUpdateUIState === false) {
	                return;
	            }
	            this._updateComponent(storeKey);
	        }
	    }, {
	        key: '_onUpdateStoreField',
	        value: function _onUpdateStoreField(storeKey, path, fieldValue, validationData, options) {
	            var storeParam = this._getParamByStoreKey(storeKey);
	            if (storeParam.updateFieldCondition(path, fieldValue) === false) {
	                return;
	            }
	            if (_utils2.default.Other.isExist(validationData)) {
	                //add validationData if validationData object not exist
	                if (!_objectPath2.default.has(this[storeKey].validationData, path)) {
	                    this[storeKey].validationData = {};
	                }
	                _objectPath2.default.set(this[storeKey].validationData, path, validationData);
	            } else {
	                _objectPath2.default.set(this[storeKey], path, fieldValue);
	                this._removeValidationInField(storeKey, path);
	            }
	            var fullPath = (0, _baseUiState.getFullPath)(storeKey, path);
	            this._updateField(fullPath);
	        }
	    }, {
	        key: '_getParamByStoreKey',
	        value: function _getParamByStoreKey(storeKey) {
	            return this._storesParams.find(function (p) {
	                return p.store.key == storeKey;
	            });
	        }
	    }, {
	        key: '_getAllStoreKeys',
	        value: function _getAllStoreKeys() {
	            return this._storesParams.map(function (p) {
	                return p.store.key;
	            });
	        }
	    }, {
	        key: '_updateField',
	        value: function _updateField() {
	            var _this2 = this;

	            var path = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	            this._updatedFieldPath = path;
	            this._component.forceUpdate(function () {
	                _this2._updatedFieldPath = null;
	            });
	        }
	    }, {
	        key: '_updateComponent',
	        value: function _updateComponent() {
	            var _this3 = this;

	            var storeKey = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	            this._updatedStore = storeKey;
	            this._component.forceUpdate(function () {
	                _this3._updatedStore = null;
	            });
	        }
	    }, {
	        key: '_removeValidationInField',
	        value: function _removeValidationInField(storeKey, pathToField) {
	            if (_utils2.default.Other.isExist(this[storeKey].validationData)) {
	                _objectPath2.default.set(this[storeKey].validationData, pathToField, undefined);

	                if (Object.keys(this[storeKey].validationData).length === 0) {
	                    this[storeKey].validationData = undefined;
	                }
	            }
	        }
	    }, {
	        key: 'updatedStore',
	        get: function get() {
	            return this._updatedStore;
	        }
	    }, {
	        key: 'updatedFieldPath',
	        get: function get() {
	            return this._updatedFieldPath;
	        }
	    }]);

	    return DefaultUIState;
	}(_baseUiState2.default);

	exports.default = DefaultUIState;

/***/ }
/******/ ])
});
;