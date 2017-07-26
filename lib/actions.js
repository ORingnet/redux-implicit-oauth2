'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.LOGOUT = exports.LOGIN_FAILURE = exports.LOGIN_SUCCESS = exports.LOGIN_REQUEST = undefined;

var _oauth = require('./oauth2');

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