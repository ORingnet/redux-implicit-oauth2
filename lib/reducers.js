'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _token = require('./util/token');

var _actions = require('./actions');

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