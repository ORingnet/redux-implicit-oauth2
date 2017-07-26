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