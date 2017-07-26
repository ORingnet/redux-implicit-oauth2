'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadIframe = require('load-iframe');

var _loadIframe2 = _interopRequireDefault(_loadIframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var openIframe = function openIframe(url) {
  return (0, _loadIframe2['default'])(url);
};

exports['default'] = openIframe;