'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadIframe = require('load-iframe');

var _loadIframe2 = _interopRequireDefault(_loadIframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var openIframe = function openIframe(url) {
  return new Promise(function (resolve, reject) {
    var iframe = (0, _loadIframe2['default'])(url);
    iframe.onload = function () {
      return resolve(iframe);
    };
    iframe.onerror = function (e) {
      return reject(e);
    }; //CORS 情況下好像不會觸發
  });
};

exports['default'] = openIframe;