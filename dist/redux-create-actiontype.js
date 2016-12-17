'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = createActionTypes;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UNDERSCORE = '_';

var API_KEY = 'api';
var POSTFIXES_KEY = 'postfixes';

var defaultOptions = {
  prefix: undefined,
  separator: UNDERSCORE,
  upperCase: true,
  prefixUpperCase: true
};

var defaultAPIPostfixes = ['LOADING', 'ERROR', 'SUCCESS'];

function normalizeString(str) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var upperCase = options.upperCase;
  var prefixUpperCase = options.prefixUpperCase;
  var separator = options.separator;
  var _options$prefix = options.prefix;
  var prefix = _options$prefix === undefined ? '' : _options$prefix;

  var type = str.replace(' ', UNDERSCORE);
  prefix = prefix.replace(' ', UNDERSCORE);
  type = upperCase ? type.toUpperCase() : type;
  prefix = prefixUpperCase ? prefix.toUpperCase() : prefix;

  type = prefix && prefix.length > 0 ? '' + prefix + separator + type : type;

  return type;
};

function createActionTypes() {
  var userOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var options = typeof userOptions === 'string' ? _extends({}, defaultOptions, { prefix: userOptions }) : _extends({}, defaultOptions, userOptions);

  var prefix = options.prefix;
  var separator = options.separator;
  var upperCase = options.upperCase;
  var _options$apiPostfixes = options.apiPostfixes;
  var apiPostfixes = _options$apiPostfixes === undefined ? defaultAPIPostfixes : _options$apiPostfixes;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.reduce(function (result, argument) {
      if (typeof argument !== 'string' && typeof argument !== 'object') {
        console.log(argument);
        throw 'Redux Create ActionType: -> Action Type has to be a string or an object';
        return;
      }

      var newActionType = undefined;

      if (typeof argument === 'string') {
        newActionType = normalizeString(argument, options);
        return _extends({}, result, _defineProperty({}, newActionType, newActionType));
      }

      // this is an object then

      // no empty objects are allowed
      if (!Object.keys(argument).length) {
        throw 'Redux Create ActionType: -> Action Type cannot be an empty object';
        return;
      }

      // get the first key

      var _Object$keys = Object.keys(argument);

      var _Object$keys2 = _slicedToArray(_Object$keys, 1);

      var key = _Object$keys2[0];

      // this is no api node or not postfixes one
      if (!argument[key][POSTFIXES_KEY] && !argument[key][API_KEY]) {
        var _newActionTypes = Object.keys(argument).reduce(function (subResult, key) {
          newActionType = normalizeString(key, options);
          return _extends({}, subResult, _defineProperty({}, newActionType, newActionType));
        }, {});

        return _extends({}, result, _newActionTypes);
      }

      var postfixes = [];
      if (argument[key][API_KEY]) {
        postfixes = apiPostfixes;
      } else if (argument[key][POSTFIXES_KEY]) {
        postfixes = argument[key][POSTFIXES_KEY];
      }

      newActionType = normalizeString(key, options);
      var newActionTypes = postfixes.reduce(function (subResult, postfix) {
        postfix = upperCase ? postfix.toUpperCase() : postfix;
        return _extends({}, subResult, _defineProperty({}, '' + newActionType + UNDERSCORE + postfix, '' + newActionType + UNDERSCORE + postfix));
      }, {});

      return _extends({}, result, newActionTypes);
    }, {});
  };
}

module.exports = exports['default'];