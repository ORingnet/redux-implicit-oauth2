'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _token = require('./util/token');

var _actions = require('./actions');

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