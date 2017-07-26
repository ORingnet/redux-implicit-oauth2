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