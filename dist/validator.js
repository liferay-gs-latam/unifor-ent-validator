/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _overwrites = __webpack_require__(1);

var _overwrites2 = _interopRequireDefault(_overwrites);

var _rules = __webpack_require__(4);

var _rules2 = _interopRequireDefault(_rules);

var _event = __webpack_require__(5);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AUIValidator = {};
var rules = {};
var rulesListeners = {};

function overWriteMethods(proto) {
  Object.keys(_overwrites2.default).forEach(function (method) {
    proto[method] = _overwrites2.default[method];
  });
}

function registerListeners(validator) {
  validator.on('validateField', function (event) {
    var field = event.validator.field;

    rulesListeners.validateField.forEach(function (listener) {
      return listener.call(validator, event);
    });

    _event2.default.dispatch(_event2.default.VALIDATE, {}, field.getDOM());
  });

  validator.on('errorField', function (event) {
    var field = event.validator.field;
    var errors = event.validator.errors;

    _event2.default.dispatch(_event2.default.AFTER_VALIDATE, {
      errors: errors
    }, field.getDOM());
  });

  validator.on('validField', function (event) {
    var field = event.validator.field;

    _event2.default.dispatch(_event2.default.AFTER_VALIDATE, {}, field.getDOM());
  });

  validator.on('reloadRules', function (event) {
    _event2.default.dispatch(_event2.default.RELOAD_RULES, {}, validator.get('boundingBox').getDOM());
  });

  validator.on('validateFragment', function (event) {
    var fragment = event.validator.fragment;
    var isValid = event.validator.isValid;

    _event2.default.dispatch(_event2.default.VALIDATE_FRAGMENT, {
      isValid: isValid
    }, fragment.getDOM());
  });
}

var ValidatorFactory = function () {
  function ValidatorFactory(FormValidator) {
    _classCallCheck(this, ValidatorFactory);

    AUIValidator = FormValidator;
    overWriteMethods(AUIValidator.prototype);

    rules = new _rules2.default();
  }

  _createClass(ValidatorFactory, [{
    key: 'mergeRules',
    value: function mergeRules(defaults, custom) {
      Object.assign(defaults, custom);
      rules.registerRules(defaults);
    }
  }, {
    key: 'mergeMessages',
    value: function mergeMessages(defaults, custom, i18n) {
      for (var key in defaults) {
        if (i18n.hasOwnProperty(defaults[key])) {
          defaults[key] = i18n[defaults[key]];
        }
      }
      Object.assign(defaults, custom);
      rules.registerMessages(defaults);
    }
  }, {
    key: 'setRulesListeners',
    value: function setRulesListeners(listeners) {
      rulesListeners = listeners;
    }
  }, {
    key: 'createInstance',
    value: function createInstance(config, portlet) {
      var validator = new AUIValidator(config);
      registerListeners(validator);
      return validator;
    }
  }]);

  return ValidatorFactory;
}();

exports.default = ValidatorFactory;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

var _form = __webpack_require__(3);

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var A = AUI();

// Overwrite
function _extractRulesFromMarkup(rules) {
  var instance = this;
  var domBoundingBox = instance.get('boundingBox').getDOM();
  var elements = domBoundingBox.elements;
  // let defaultRulesKeys = Object.keys(A.config.FormValidator.RULES)
  // let defaultRulesJoin = defaultRulesKeys.join('|')
  var regex = A.DOM._getRegExp('(field-)\\w+', 'g');
  var i = void 0;
  var length = void 0;
  var ruleNameMatch = [];
  var ruleMatcher = function ruleMatcher(m1, m2) {
    ruleNameMatch.push(m1.replace(m2, ''));
  };

  for (i = 0, length = elements.length; i < length; i++) {
    var el = elements[i];
    var offsetParent = _form2.default.Field.getLabel(el);
    var isVisible = offsetParent !== null;
    var isEnabled = !el.disabled;
    var fieldName = el.name;

    if (isVisible && isEnabled) {
      el.className.replace(regex, ruleMatcher);

      if (ruleNameMatch.length) {
        var fieldRules = rules[fieldName];
        var j = void 0;
        var ruleNameLength = void 0;

        if (!fieldRules) {
          fieldRules = {};
          rules[fieldName] = fieldRules;
        }

        for (j = 0, ruleNameLength = ruleNameMatch.length; j < ruleNameLength; j++) {
          var rule = ruleNameMatch[j];

          if (!(rule in fieldRules)) {
            fieldRules[rule] = el.getAttribute(rule) || true;
          }
        }

        ruleNameMatch.length = 0;
      }
    }
  }
  instance._rulesAlreadyExtracted = true;
  instance.fire('reloadRules');
}

function getFieldErrorMessage(field, rule) {
  var instance = this;
  var fieldName = field.get('name');
  var fieldStrings = instance.get('fieldStrings')[fieldName] || {};
  var fieldRules = instance.get('rules')[fieldName];
  var strings = instance.get('strings');
  var substituteRulesMap = {};

  if (rule in fieldRules) {
    var ruleValue = A.Array(fieldRules[rule]);

    A.each(ruleValue, function (value, index) {
      substituteRulesMap[index] = [value].join('');
    });
  }

  var message = fieldStrings[rule] || strings[rule] || strings.DEFAULT;
  var dataAttrMsg = field.getAttribute(_constants2.default.DATA_ATTR_MESSAGE_PREFIX + rule);

  if (dataAttrMsg !== '') {
    message = A.LanguageProperties.get(dataAttrMsg) || dataAttrMsg;
  }

  return A.Lang.sub(message, substituteRulesMap);
}

function validatable(field) {
  var instance = this;
  var validatable = false;
  var fieldRules = instance.get('rules')[field.get('name')];

  if (fieldRules && _form2.default.Field.isVisible(field)) {
    validatable = fieldRules.custom || instance.normalizeRuleValue(fieldRules.required, field) || A.config.FormValidator.RULES.hasValue.apply(instance, [field.val(), field]);
  }

  return !!validatable;
}

// Addition
function reloadRules() {
  var instance = this;
  instance._rulesAlreadyExtracted = false;
}

function validateFragment(fragmentElement) {
  var instance = this;
  var visibleElements = [];
  var formFields = [].slice.call($(fragmentElement).children(':not(.hide)').find(':input'));

  visibleElements = formFields.reduce(function (fieldList, el) {
    var offsetParent = el.type === 'radio' || el.type === 'checkbox' ? $(el).closest('label')[0].offsetParent : el.offsetParent;
    var isVisible = offsetParent !== null;

    if (isVisible && !el.disabled) {
      fieldList.push(el);
    }

    return fieldList;
  }, []);

  var rules = Object.keys(instance.get('rules'));

  instance.resetAllFields();

  visibleElements.forEach(function (el) {
    if (rules.indexOf(el.name) > -1) {
      instance.validateField(el.name);
    }
  });

  var isValid = !instance.hasErrors();

  instance.fire('validateFragment', {
    validator: {
      fragment: fragmentElement,
      isValid: isValid
    }
  });

  return isValid;
}

exports.default = {
  // Overwrite
  _extractRulesFromMarkup: _extractRulesFromMarkup,
  getFieldErrorMessage: getFieldErrorMessage,
  validatable: validatable,
  // Addition
  reloadRules: reloadRules,
  validateFragment: validateFragment
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  DATA_ATTR_MESSAGE_PREFIX: 'data-message-'
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = function () {
  function Field() {
    _classCallCheck(this, Field);
  }

  _createClass(Field, null, [{
    key: 'getLabel',
    value: function getLabel(field) {
      return field.type === 'radio' || field.type === 'checkbox' ? $(field).closest('label')[0].offsetParent : field.offsetParent;
    }
  }, {
    key: 'getValue',
    value: function getValue(field) {
      var getValue = {
        radio: function radio() {
          return [].concat(_toConsumableArray(document.getElementsByName(field.name))).filter(function (element) {
            return element.checked;
          });
        }
      };

      if (getValue.hasOwnProperty(field.type)) {
        return getValue[field.type](field).value || '';
      }

      return field.value;
    }
  }, {
    key: 'isVisible',
    value: function isVisible(field) {
      return $(field.getDOM()).is(':visible');
    }
  }]);

  return Field;
}();

var Form = function Form() {
  _classCallCheck(this, Form);

  var z = {};
  return z;
};

exports.default = {
  Form: Form,
  Field: Field
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rules = function () {
  function Rules() {
    _classCallCheck(this, Rules);
  }

  _createClass(Rules, [{
    key: "registerRules",
    value: function registerRules(customRules) {
      Object.assign(AUI().config.FormValidator.RULES, customRules.RULES || {});
      Object.assign(AUI().config.FormValidator.STRINGS, customRules.STRINGS || {});
    }
  }, {
    key: "registerRule",
    value: function registerRule(name, message, validator) {
      this.addMessage(name, message);
      this.addRule(name, validator);
    }
  }, {
    key: "addRule",
    value: function addRule(name, rule) {
      AUI().config.FormValidator.RULES[name] = rule;
    }
  }, {
    key: "addMessage",
    value: function addMessage(name, ruleMessage) {
      AUI().config.FormValidator.STRINGS[name] = ruleMessage;
    }
  }, {
    key: "addRules",
    value: function addRules(customRules) {
      for (var rule in customRules) {
        this.addRule(rule, customRules[rule]);
      }
    }
  }, {
    key: "addMessages",
    value: function addMessages(customMessages) {
      for (var rule in customMessages) {
        this.addMessage(rule, customMessages[rule]);
      }
    }
  }]);

  return Rules;
}();

exports.default = Rules;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event() {
    _classCallCheck(this, Event);
  }

  _createClass(Event, null, [{
    key: 'dispatch',
    value: function dispatch(eventName, params, target) {
      var defultParams = {
        bubbles: true,
        details: {
          val: ''
        }
      };

      Object.assign(defultParams.details, params);

      target.dispatchEvent(new CustomEvent(Event.NS + ':' + eventName, defultParams));
    }
  }]);

  return Event;
}();

Event.NS = 'validator';
Event.VALIDATE = 'validate';
Event.BEFORE_VALIDATE = 'before';
Event.AFTER_VALIDATE = 'after';
Event.VALID = 'valid';
Event.RELOAD_RULES = 'reload_rules';
Event.RESET_FIELDS = 'reset_fields';
Event.VALIDATE_FRAGMENT = 'validate_fragment';

exports.default = Event;

/***/ })
/******/ ]);