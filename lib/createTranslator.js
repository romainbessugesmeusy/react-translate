"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _render = require("./render");

var _render2 = _interopRequireDefault(_render);

var _getPluralType = require("./getPluralType");

var _getPluralType2 = _interopRequireDefault(_getPluralType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTranslator = function createTranslator(keys) {
  var pluralType = (0, _getPluralType2.default)(keys.locale);
  return function (componentName, fallBackString) {

    var componentNames = false === Array.isArray(componentName) ? [componentName] : componentName;

    if (1 === componentNames.length && false === keys.hasOwnProperty(componentNames[0])) {
      return function (key) {
        if (componentNames[0].key === undefined && fallBackString !== undefined) {
          return fallBackString;
        }
        return componentNames[0] + "." + key;
      };
    }

    var componentKeys = componentNames.reverse().reduce(function (translations, name) {
      return Object.assign(translations, keys[name]);
    }, {});
    return function (key, params, fallBackString) {
      var translation = componentKeys[key];
      if (translation === undefined) {
        if (fallBackString !== undefined) {
          return fallBackString;
        }
        return componentNames[0] + "." + key;
      }
      if (Array.isArray(translation)) {
        // plural
        if (params != null && typeof params.n === "number") {
          translation = translation[pluralType(params.n)];
        } else {
          return (0, _render2.default)(translation.join("\n"), params);
        }
      }
      return (0, _render2.default)(translation, params);
    };
  };
};

exports.default = createTranslator;