'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var functions = _interopDefault(require('jss-plugin-rule-value-function'));
var observable = _interopDefault(require('jss-plugin-rule-value-observable'));
var template = _interopDefault(require('jss-plugin-template'));
var global = _interopDefault(require('jss-plugin-global'));
var extend = _interopDefault(require('jss-plugin-extend'));
var nested = _interopDefault(require('jss-plugin-nested'));
var compose = _interopDefault(require('jss-plugin-compose'));
var camelCase = _interopDefault(require('jss-plugin-camel-case'));
var defaultUnit = _interopDefault(require('jss-plugin-default-unit'));
var expand = _interopDefault(require('jss-plugin-expand'));
var vendorPrefixer = _interopDefault(require('jss-plugin-vendor-prefixer'));
var propsSort = _interopDefault(require('jss-plugin-props-sort'));

var index = (function (options) {
  if (options === void 0) {
    options = {};
  }

  return {
    plugins: [functions(), observable(options.observable), template(), global(), extend(), nested(), compose(), camelCase(), defaultUnit(options.defaultUnit), expand(), vendorPrefixer(), propsSort()]
  };
});

exports.default = index;
