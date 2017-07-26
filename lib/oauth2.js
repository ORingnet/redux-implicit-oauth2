'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

var _popup = require('./util/popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var listenForCredentials = function listenForCredentials(popup, state, resolve, reject) {
  var hash = void 0;
  try {
    hash = popup.location.hash;
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
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