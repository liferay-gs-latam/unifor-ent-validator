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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function parseStringToDateByLanguageId(stringDate, languageId) {
  var arrDate = stringDate.split('/');
  var month = void 0;
  var day = void 0;
  var year = parseInt(arrDate[2]);

  if (languageId === 'en_US') {
    month = parseInt(arrDate[0]) - 1;
    day = parseInt(arrDate[1]);
  } else {
    month = parseInt(arrDate[1]) - 1;
    day = parseInt(arrDate[0]);
  }

  return new Date(year, month, day);
}

function isValid(strBrDateFormat) {
  return createDate(strBrDateFormat);
}

function createDate(strBrDateFormat) {
  var languageId = Liferay.ThemeDisplay.getLanguageId();
  var arrDate = strBrDateFormat.split('/');
  var month = void 0;
  var day = void 0;
  var year = parseInt(arrDate[2]);

  if (languageId === 'en_US') {
    month = parseInt(arrDate[0]) - 1;
    day = parseInt(arrDate[1]);
  } else {
    month = parseInt(arrDate[1]) - 1;
    day = parseInt(arrDate[0]);
  }

  if (arrDate.length === 3) {
    var date = new Date(year, month, day);
    return date.toString() !== 'Invalid Date' && date.getMonth() === month && date.getDate() === day;
  }
  return false;
}

function clearTime(dateObj) {
  dateObj.setSeconds(0);
  dateObj.setMinutes(0);
  dateObj.setHours(0);
  dateObj.setMilliseconds(0);
  return dateObj;
}

function requireJqDatepicker() {
  if (!$ || !$.datepicker) {
    throw new Error('Jquery and Jquery UI datepicker is required!');
  }
}

exports.default = {
  parseStringToDateByLanguageId: parseStringToDateByLanguageId,
  isValid: isValid,
  createDate: createDate,
  clearTime: clearTime,
  requireJqDatepicker: requireJqDatepicker
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _validator = __webpack_require__(0);

var _validator2 = _interopRequireDefault(_validator);

var _validatorRules = __webpack_require__(8);

var _validatorRules2 = _interopRequireDefault(_validatorRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

AUI().applyConfig({
  'modules': {
    'ent-validator-i18n': AUI().config.modules['ent-validator'].fullpath.replace('ent-validator', 'ent-validator_' + Liferay.ThemeDisplay.getLanguageId())
  }
});

AUI.add('ent-validator', function (A) {
  var factory = new _validator2.default(A.FormValidator);
  var custom = A.EntValidatorCustomRules || {};

  factory.mergeRules(_validatorRules2.default.RULES, custom.RULES);
  factory.mergeMessages(_validatorRules2.default.STRING, custom.STRING, AUI().config.entValidator.i18n || {});
  factory.setRulesListeners(_validatorRules2.default.LISTENERS);

  A.EntValidator = function (config, portlet) {
    return factory.createInstance(config, portlet);
  };
}, '0.0.1', {
  'requires': ['ent-validator-i18n', 'aui-form-validator', 'ent-validator-custom-rules'],
  'optional': ['ent-validator-custom-rules']
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var requireContext = __webpack_require__(9);
var ruleList = requireContext.keys().map(requireContext);

var RULES = {};
var STRINGS = {};
var LISTENERS = {
  updateField: [],
  beforeValidate: [],
  afterValidate: []
};

ruleList.map(function (rule) {
  STRINGS[rule.default.name] = rule.default.message;

  RULES[rule.default.name] = function (val, node, ruleValue) {
    var instance = undefined;
    var isValid = true;
    var filledOnly = rule.default.filledOnly || true;

    if (filledOnly && !AUI().config.FormValidator.RULES.hasValue.apply(instance, [val, node])) return true;

    isValid = rule.default.rule(val, node, ruleValue);

    return isValid;
  };

  if (rule.default.on) {
    if (rule.default.on.updateField) {
      LISTENERS.updateField.push(rule.default.on.updateField);
    }

    if (rule.default.on.beforeValidate) {
      LISTENERS.beforeValidate.push(rule.default.on.beforeValidate);
    }

    if (rule.default.on.afterValidate) {
      LISTENERS.afterValidate.push(rule.default.on.afterValidate);
    }
  }
});

exports.default = {
  RULES: RULES,
  STRINGS: STRINGS,
  LISTENERS: LISTENERS
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bincode-rule.js": 10,
	"./birth-date-rule.js": 11,
	"./cnpj-rule.js": 12,
	"./cpf-rule.js": 13,
	"./date-with-format-rule.js": 14,
	"./datepicker-rule.js": 15,
	"./file-size-rule.js": 16,
	"./full-name-rule.js": 17,
	"./hour-rule.js": 18,
	"./less-than-current-date-rule.js": 19,
	"./mail-domain-rule.js": 20,
	"./max-files-rule.js": 21,
	"./max-years-old-rule.js": 22,
	"./min-years-old-rule.js": 23,
	"./password-rule.js": 24,
	"./pattern-rule.js": 25,
	"./require-piece-set-rule.js": 26,
	"./select-multiple-rule.js": 27,
	"./template.js": 28
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 9;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'bincode';

function validate(val, node, ruleValue) {
  return (/[0-9]{4}\.[0-9]{6}\.[0-9]{5}/.test(val)
  );
}

exports.default = {
  name: 'bincode',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _date = __webpack_require__(6);

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message = 'birth_date';

function validate(val, node, ruleValue) {
  var languageId = Liferay.ThemeDisplay.getLanguageId();
  var date = _date2.default.parseStringToDateByLanguageId(val, languageId);
  return date.getTime() < new Date().getTime();
}

exports.default = {
  name: 'birthDate',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'cnpj';

function validate(val, node, ruleValue) {
  var cnpj = val;
  var i = 0;

  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '' || cnpj.length !== 14) return false;

  var arrCnpj = val.split('');
  var first = arrCnpj.shift();
  var equalNumbersLength = arrCnpj.filter(function (n) {
    return n === first;
  }).length;

  if (equalNumbersLength === arrCnpj.length) return false;

  // validate dvs
  var size = cnpj.length - 2;
  var numbers = cnpj.substring(0, size);
  var digits = cnpj.substring(size);
  var sum = 0;
  var pos = size - 7;

  for (i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  var result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if (result !== digits.charAt(0)) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if (result !== digits.charAt(1)) return false;

  return true;
}

exports.default = {
  name: 'cnpj',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'cpf';

function validate(val, node, ruleValue) {
  var rest = void 0;
  var i = 0;
  var sum = 0;

  val = val.replace(/[.-]/g, '');

  if (val.length < 11) return false;

  // equal numbers
  var arrCpf = val.split('');
  var first = arrCpf.shift();
  var equalNumbersLength = arrCpf.filter(function (n) {
    return n === first;
  }).length;

  if (equalNumbersLength === arrCpf.length) return false;

  for (i = 1; i <= 9; i++) {
    sum = sum + parseInt(val.substring(i - 1, i)) * (11 - i);
  }

  rest = sum * 10 % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(val.substring(9, 10))) return false;

  sum = 0;

  for (i = 1; i <= 10; i++) {
    sum = sum + parseInt(val.substring(i - 1, i)) * (12 - i);
  }

  rest = sum * 10 % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(val.substring(10, 11))) return false;

  return true;
}

exports.default = {
  name: 'cpf',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'date_with_format';

function validate(val, node, format) {
  var splitedDate = val.split('/');
  var dateFormat = AUI().Lang.isString(format) ? format : 'dd/mm/yyyy';
  var formatElements = dateFormat.split('/');
  var maskSize = formatElements.length;
  var formats = {
    'y': checkYear,
    'm': checkMonth,
    'd': checkDay
  };

  if (splitedDate.length !== maskSize) {
    return false;
  }

  return formatElements.filter(function (format, index) {
    var dateItem = splitedDate[index];
    var type = format.toLowerCase()[0];

    if (formats.hasOwnProperty(type)) {
      return formats[type](dateItem, format);
    }
  }).length === maskSize;

  function checkDay(day) {
    return day > 0 && day <= 31;
  }

  function checkMonth(month) {
    return month > 0 && month <= 12;
  }

  function checkYear(year, format) {
    if (format) {
      if (year.length !== format.length) return false;
    }
    return year > 0;
  }
}

exports.default = {
  name: 'dateWithFormat',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _date = __webpack_require__(6);

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message = 'datepicker';
// TODO -- JQUERY
function validate(val, node, ruleValue) {
  _date2.default.requireJqDatepicker();

  var length = val.length;

  if (length < 10 || !_date2.default.isValid(val)) {
    return false;
  }

  var el = $(node.getDOMNode());
  var options = el.datepicker('option', 'all');
  var languageId = Liferay.ThemeDisplay.getLanguageId();
  var now = _date2.default.parseStringToDateByLanguageId(val, languageId);

  if (options.minDate) {
    var minDate = options.minDate.indexOf('/') === -1 ? $.datepicker._determineDate(null, options.minDate, new Date()) : _date2.default.parseStringToDateByLanguageId(options.minDate, languageId);

    if (now.getTime() < minDate.getTime()) {
      return false;
    }

    this.resetField($(el.attr('datepicker-set-maxdate-to')).attr('name'));
  }

  if (options.maxDate) {
    var maxDate = options.maxDate.indexOf('/') === -1 ? $.datepicker._determineDate(null, options.maxDate, new Date()) : _date2.default.parseStringToDateByLanguageId(options.maxDate, languageId);

    if (now.getTime() > maxDate.getTime()) {
      return false;
    }

    this.resetField($(el.attr('datepicker-set-mindate-to')).attr('name'));
  }

  return true;
}

exports.default = {
  name: 'template',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'file_size';

function validate(val, node, ruleMaxSize) {
  if (AUI().Lang.isString(ruleMaxSize) && !isNaN(ruleMaxSize)) {
    var files = node.get('files');
    var maxSize = parseFloat(ruleMaxSize) * 1024 * 1024;

    if (files.size() > 0) {
      var file = files.shift();

      return file.size <= maxSize;
    }
  }

  return true;
}

exports.default = {
  name: 'fileSize',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'full_name';

function validate(val, node, ruleValue) {
  var value = val.trim();

  if (value.length !== 0) {
    var namesMatched = value.match(/\s/gi);

    return namesMatched && namesMatched.length >= 1;
  }

  return true;
}

exports.default = {
  name: 'fullName',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'hour';

function validate(val, node, ruleValue) {
  var hour = val;
  var HOUR_INDEX = 0;
  var MINUTES_INDEX = 1;

  if (hour.indexOf(':') && hour.length === 5) {
    hour = hour.split(':');
    return parseInt(hour[HOUR_INDEX]) <= 23 && parseInt(hour[MINUTES_INDEX]) <= 59;
  } else if (hour.length === 2) {
    return parseInt(hour) <= 23;
  }
  return false;
}

exports.default = {
  name: 'hour',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'less_than_current_date';

function validate(val, node, ruleValue) {
  var splitedDate = val.split('/');
  var informedDate = new Date(splitedDate[2], splitedDate[1] - 1, splitedDate[0]);
  var currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);
  return informedDate.getTime() < currentDate.getTime();
}

exports.default = {
  name: 'lessThanCurrentDate',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'mail_domain';

function validate(val, node, ruleValue) {
  var validExcept = ruleValue.split(',');

  validExcept = validExcept.map(function (host) {
    return host.trim();
  });

  var mailDomain = val.match(/@.*/gi);

  return !(mailDomain && mailDomain[0].indexOf(validExcept) >= 0);
}

exports.default = {
  name: 'mailDomain',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'max_files';

function validate(val, node, maxFiles) {
  return maxFiles >= node.getDOMNode().files.length;
}

exports.default = {
  name: 'template',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'max_years_old';

function validate(val, node, maxYersOld) {
  var splitedDate = val.split('/');
  var informedDate = new Date(splitedDate[2], splitedDate[1] - 1, splitedDate[0] - 1).getTime();
  var currentDate = new Date();
  var limitYearsOldTime = new Date(currentDate.getFullYear() - maxYersOld, currentDate.getMonth(), currentDate.getDate()).getTime();

  return informedDate >= limitYearsOldTime;
}

exports.default = {
  name: 'maxYearOld',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'min_years_old';

function validate(val, node, minYersOld) {
  var splitedDate = val.split('/');
  var informedDate = new Date(splitedDate[2], splitedDate[1] - 1, splitedDate[0]).getTime();
  var currentDate = new Date();
  var limitYearsOldTime = new Date(currentDate.getFullYear() - minYersOld, currentDate.getMonth(), currentDate.getDate()).getTime();

  return informedDate <= limitYearsOldTime;
}

exports.default = {
  name: 'minYearsOld',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'password';

function validate(val, node, ruleValue) {
  /*
   * Password (UpperCase, LowerCase, Number/SpecialChar and
   * min 8 Chars)
   */
  return (/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_]).{8,75})/.test(val)
  );
}

exports.default = {
  name: 'template',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'pattern';

function validate(val, node, ruleValue) {
  return ruleValue.test(val);
}

exports.default = {
  name: 'pattern',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'required';

function validate(val, node, nameSet) {
  var instance = this;
  var members = AUI().all('[requiredPieceSet=' + nameSet + ']');

  if (members.length > 0) {
    var fieldsRule = members.filter(function (member) {
      return AUI().config.FormValidator.RULES.hasValue.apply(instance, [member.val, member]);
    });
    var $labels = $();
    var isRequiredSet = fieldsRule.length !== members.length;

    members.each(function () {
      $labels.push($(this).closest('.form-group').find('label'));
    });

    if (isRequiredSet) {
      $labels.each(function () {
        $(this).addClass('required');
      });
      return val.length !== 0;
    }

    $labels.each(function () {
      $(this).removeClass('required');
    });

    return true;
  }

  return true;
}

function updateFields() {}

function afterValidate() {}

function beforeValidate() {}

exports.default = {
  name: 'requiredPieceSet',
  message: message,
  rule: validate,
  filledOnly: false,
  on: {
    updateFields: updateFields,
    afterValidate: afterValidate,
    beforeValidate: beforeValidate
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'select_multiple';

function validate(val, node, limit) {
  var selected = val || [];

  return selected.length <= limit;
}

exports.default = {
  name: 'selectMultipleLimit',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = 'yml_namespace';

function validate(val, node, ruleValue) {}

exports.default = {
  name: 'template',
  message: message,
  rule: validate,
  filledOnly: true
};

/***/ })
/******/ ]);