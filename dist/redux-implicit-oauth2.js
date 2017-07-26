(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReduxImplicitOAuth2"] = factory();
	else
		root["ReduxImplicitOAuth2"] = factory();
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.authReducer = exports.authMiddleware = exports.logout = exports.login = exports.LOGOUT = exports.LOGIN_FAILURE = exports.LOGIN_SUCCESS = exports.LOGIN_REQUEST = undefined;

	var _actions = __webpack_require__(1);

	var _middleware = __webpack_require__(3);

	var _middleware2 = _interopRequireDefault(_middleware);

	var _reducers = __webpack_require__(5);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports.LOGIN_REQUEST = _actions.LOGIN_REQUEST;
	exports.LOGIN_SUCCESS = _actions.LOGIN_SUCCESS;
	exports.LOGIN_FAILURE = _actions.LOGIN_FAILURE;
	exports.LOGOUT = _actions.LOGOUT;
	exports.login = _actions.login;
	exports.logout = _actions.logout;
	exports.authMiddleware = _middleware2['default'];
	exports.authReducer = _reducers2['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.logout = exports.login = exports.LOGOUT = exports.LOGIN_FAILURE = exports.LOGIN_SUCCESS = exports.LOGIN_REQUEST = undefined;

	var _oauth = __webpack_require__(4);

	var _oauth2 = _interopRequireDefault(_oauth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var LOGIN_REQUEST = exports.LOGIN_REQUEST = 'LOGIN_REQUEST';
	var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
	var LOGIN_FAILURE = exports.LOGIN_FAILURE = 'LOGIN_FAILURE';
	var LOGOUT = exports.LOGOUT = 'LOGOUT';

	var loginRequest = function loginRequest() {
	  return {
	    type: LOGIN_REQUEST
	  };
	};

	var loginSuccess = function loginSuccess(token, expiresAt) {
	  return {
	    type: LOGIN_SUCCESS,
	    token: token,
	    expiresAt: expiresAt
	  };
	};

	var loginFailure = function loginFailure(error) {
	  return {
	    type: LOGIN_FAILURE,
	    error: error
	  };
	};

	var login = exports.login = function login(config) {
	  return function (dispatch) {
	    dispatch(loginRequest());
	    return (0, _oauth2['default'])(config).then(function (_ref) {
	      var token = _ref.token,
	          expiresAt = _ref.expiresAt;
	      return dispatch(loginSuccess(token, expiresAt));
	    }, function (error) {
	      return dispatch(loginFailure(error));
	    });
	  };
	};

	var logout = exports.logout = function logout() {
	  return {
	    type: LOGOUT
	  };
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TOKEN_KEY = 'token';
	var EXPIRES_AT_KEY = 'expiresAt';

	var getExpiresAt = exports.getExpiresAt = function getExpiresAt() {
	  return window.localStorage.getItem(EXPIRES_AT_KEY) || null;
	};

	var hasToken = exports.hasToken = function hasToken() {
	  return getToken() !== null;
	};

	var getToken = exports.getToken = function getToken() {
	  var expires_at = getExpiresAt();
	  if (expires_at === null || expires_at > new Date().getTime()) {
	    return window.localStorage.getItem(TOKEN_KEY) || null;
	  }
	  return null;
	};

	var setToken = exports.setToken = function setToken(token, expiresAt) {
	  window.localStorage.setItem(TOKEN_KEY, token);
	  window.localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
	};

	var removeToken = exports.removeToken = function removeToken() {
	  window.localStorage.removeItem(TOKEN_KEY);
	  window.localStorage.removeItem(EXPIRES_AT_KEY);
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _token = __webpack_require__(2);

	var _actions = __webpack_require__(1);

	var authMiddleware = function authMiddleware() {
	  return function (next) {
	    return function (action) {
	      switch (action.type) {
	        case _actions.LOGIN_SUCCESS:
	          (0, _token.setToken)(action.token, action.expiresAt);
	          break;
	        case _actions.LOGIN_FAILURE:
	        case _actions.LOGOUT:
	          (0, _token.removeToken)();
	          break;
	      }

	      return next(action);
	    };
	  };
	};

	exports['default'] = authMiddleware;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _queryString = __webpack_require__(9);

	var _queryString2 = _interopRequireDefault(_queryString);

	var _cuid = __webpack_require__(7);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _popup = __webpack_require__(6);

	var _popup2 = _interopRequireDefault(_popup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var listenForCredentials = function listenForCredentials(popup, state, resolve, reject) {
	  var hash = void 0;
	  try {
	    hash = popup.location.hash;
	  } catch (err) {
	    if (true) {
	      /* eslint-disable no-console */
	      console.error(err);
	      /* eslint-enable no-console */
	    }
	  }

	  if (hash) {
	    popup.close();

	    var response = _queryString2['default'].parse(hash.substr(1));
	    if (response.state !== state) {
	      reject('Invalid state returned.');
	    }

	    if (response.access_token) {
	      var expiresIn = response.expires_in ? parseInt(response.expires_in) : NaN;
	      var result = {
	        token: response.access_token,
	        expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null
	      };
	      resolve(result);
	    } else {
	      reject(response.error || 'Unknown error.');
	    }
	  } else if (popup.closed) {
	    reject('Authentication was cancelled.');
	  } else {
	    setTimeout(function () {
	      return listenForCredentials(popup, state, resolve, reject);
	    }, 100);
	  }
	};

	var authorize = function authorize(config) {
	  var state = (0, _cuid2['default'])();
	  var query = _queryString2['default'].stringify({
	    state: state,
	    response_type: 'token',
	    client_id: config.client,
	    scope: config.scope,
	    redirect_uri: config.redirect
	  });
	  var popup = (0, _popup2['default'])(config.url + (config.url.indexOf('?') === -1 ? '?' : '&') + query, 'oauth2');

	  return new Promise(function (resolve, reject) {
	    return listenForCredentials(popup, state, resolve, reject);
	  });
	};

	exports['default'] = authorize;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _token = __webpack_require__(2);

	var _actions = __webpack_require__(1);

	var initialState = {
	  isLoggedIn: (0, _token.hasToken)(),
	  token: (0, _token.getToken)(),
	  expiresAt: (0, _token.getExpiresAt)(),
	  error: null
	};

	var auth = function auth() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case _actions.LOGIN_SUCCESS:
	      return _extends({}, state, {
	        isLoggedIn: true,
	        token: action.token,
	        expiresAt: action.expiresAt,
	        error: null
	      });
	    case _actions.LOGIN_FAILURE:
	      return _extends({}, state, {
	        isLoggedIn: false,
	        token: null,
	        expiresAt: null,
	        error: action.error
	      });
	    case _actions.LOGOUT:
	      return _extends({}, state, {
	        isLoggedIn: false,
	        token: null,
	        expiresAt: null,
	        error: null
	      });
	    default:
	      return state;
	  }
	};

	exports['default'] = auth;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SETTINGS = 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no';

	var getPopupDimensions = function getPopupDimensions(width, height) {
	  var wLeft = window.screenLeft || window.screenX;
	  var wTop = window.screenTop || window.screenY;

	  var left = wLeft + window.innerWidth / 2 - width / 2;
	  var top = wTop + window.innerHeight / 2 - height / 2;

	  return 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
	};

	var openPopup = function openPopup(url, name) {
	  return window.open(url, name, SETTINGS + ',' + getPopupDimensions(400, 400));
	};

	exports['default'] = openPopup;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * cuid.js
	 * Collision-resistant UID generator for browsers and node.
	 * Sequential for fast db lookups and recency sorting.
	 * Safe for element IDs and server-side lookups.
	 *
	 * Extracted from CLCTR
	 *
	 * Copyright (c) Eric Elliott 2012
	 * MIT License
	 */

	/*global window, navigator, document, require, process, module */
	(function (app) {
	  'use strict';
	  var namespace = 'cuid',
	    c = 0,
	    blockSize = 4,
	    base = 36,
	    discreteValues = Math.pow(base, blockSize),

	    pad = function pad(num, size) {
	      var s = "000000000" + num;
	      return s.substr(s.length-size);
	    },

	    randomBlock = function randomBlock() {
	      return pad((Math.random() *
	            discreteValues << 0)
	            .toString(base), blockSize);
	    },

	    safeCounter = function () {
	      c = (c < discreteValues) ? c : 0;
	      c++; // this is not subliminal
	      return c - 1;
	    },

	    api = function cuid() {
	      // Starting with a lowercase letter makes
	      // it HTML element ID friendly.
	      var letter = 'c', // hard-coded allows for sequential access

	        // timestamp
	        // warning: this exposes the exact date and time
	        // that the uid was created.
	        timestamp = (new Date().getTime()).toString(base),

	        // Prevent same-machine collisions.
	        counter,

	        // A few chars to generate distinct ids for different
	        // clients (so different computers are far less
	        // likely to generate the same id)
	        fingerprint = api.fingerprint(),

	        // Grab some more chars from Math.random()
	        random = randomBlock() + randomBlock();

	        counter = pad(safeCounter().toString(base), blockSize);

	      return  (letter + timestamp + counter + fingerprint + random);
	    };

	  api.slug = function slug() {
	    var date = new Date().getTime().toString(36),
	      counter,
	      print = api.fingerprint().slice(0,1) +
	        api.fingerprint().slice(-1),
	      random = randomBlock().slice(-2);

	      counter = safeCounter().toString(36).slice(-4);

	    return date.slice(-2) +
	      counter + print + random;
	  };

	  api.globalCount = function globalCount() {
	    // We want to cache the results of this
	    var cache = (function calc() {
	        var i,
	          count = 0;

	        for (i in window) {
	          count++;
	        }

	        return count;
	      }());

	    api.globalCount = function () { return cache; };
	    return cache;
	  };

	  api.fingerprint = function browserPrint() {
	    return pad((navigator.mimeTypes.length +
	      navigator.userAgent.length).toString(36) +
	      api.globalCount().toString(36), 4);
	  };

	  // don't change anything from here down.
	  if (app.register) {
	    app.register(namespace, api);
	  } else if (true) {
	    module.exports = api;
	  } else {
	    app[namespace] = api;
	  }

	}(this.applitude || this));


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(10);
	var objectAssign = __webpack_require__(8);

	function encoderForArrayFormat(opts) {
		switch (opts.arrayFormat) {
			case 'index':
				return function (key, value, index) {
					return value === null ? [
						encode(key, opts),
						'[',
						index,
						']'
					].join('') : [
						encode(key, opts),
						'[',
						encode(index, opts),
						']=',
						encode(value, opts)
					].join('');
				};

			case 'bracket':
				return function (key, value) {
					return value === null ? encode(key, opts) : [
						encode(key, opts),
						'[]=',
						encode(value, opts)
					].join('');
				};

			default:
				return function (key, value) {
					return value === null ? encode(key, opts) : [
						encode(key, opts),
						'=',
						encode(value, opts)
					].join('');
				};
		}
	}

	function parserForArrayFormat(opts) {
		var result;

		switch (opts.arrayFormat) {
			case 'index':
				return function (key, value, accumulator) {
					result = /\[(\d*)\]$/.exec(key);

					key = key.replace(/\[\d*\]$/, '');

					if (!result) {
						accumulator[key] = value;
						return;
					}

					if (accumulator[key] === undefined) {
						accumulator[key] = {};
					}

					accumulator[key][result[1]] = value;
				};

			case 'bracket':
				return function (key, value, accumulator) {
					result = /(\[\])$/.exec(key);
					key = key.replace(/\[\]$/, '');

					if (!result) {
						accumulator[key] = value;
						return;
					} else if (accumulator[key] === undefined) {
						accumulator[key] = [value];
						return;
					}

					accumulator[key] = [].concat(accumulator[key], value);
				};

			default:
				return function (key, value, accumulator) {
					if (accumulator[key] === undefined) {
						accumulator[key] = value;
						return;
					}

					accumulator[key] = [].concat(accumulator[key], value);
				};
		}
	}

	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}

		return value;
	}

	function keysSorter(input) {
		if (Array.isArray(input)) {
			return input.sort();
		} else if (typeof input === 'object') {
			return keysSorter(Object.keys(input)).sort(function (a, b) {
				return Number(a) - Number(b);
			}).map(function (key) {
				return input[key];
			});
		}

		return input;
	}

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str, opts) {
		opts = objectAssign({arrayFormat: 'none'}, opts);

		var formatter = parserForArrayFormat(opts);

		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);

		if (typeof str !== 'string') {
			return ret;
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return ret;
		}

		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			formatter(decodeURIComponent(key), val, ret);
		});

		return Object.keys(ret).sort().reduce(function (result, key) {
			var val = ret[key];
			if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
				// Sort object keys, not values
				result[key] = keysSorter(val);
			} else {
				result[key] = val;
			}

			return result;
		}, Object.create(null));
	};

	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true,
			arrayFormat: 'none'
		};

		opts = objectAssign(defaults, opts);

		var formatter = encoderForArrayFormat(opts);

		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return encode(key, opts);
			}

			if (Array.isArray(val)) {
				var result = [];

				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}

					result.push(formatter(key, val2, result.length));
				});

				return result.join('&');
			}

			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ })
/******/ ])
});
;