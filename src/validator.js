import Overwrite from './overwrites'
import Rules from './helper/rules'
import Event from './helper/event'

let AUIValidator = {}
let rules = {}
let rulesListeners = {}

function overWriteMethods (proto) {
  Object.keys(Overwrite).forEach(method => {
    proto[method] = Overwrite[method]
  })
}

function registerListeners (validator) {
  validator.on('validateField', event => {
    let field = event.validator.field

    rulesListeners.validateField.forEach(listener => listener.call(validator, event))

    Event.dispatch(Event.VALIDATE, {}, field.getDOM())
  })

  validator.on('errorField', event => {
    let field = event.validator.field
    let errors = event.validator.errors

    Event.dispatch(Event.AFTER_VALIDATE, {
      errors: errors
    }, field.getDOM())
  })

  validator.on('validField', event => {
    let field = event.validator.field

    Event.dispatch(Event.AFTER_VALIDATE, {}, field.getDOM())
  })

  validator.on('reloadRules', event => {
    Event.dispatch(Event.RELOAD_RULES, {}, validator.get('boundingBox').getDOM())
  })

  validator.on('validateFragment', event => {
    let fragment = event.validator.fragment
    let isValid = event.validator.isValid

    Event.dispatch(Event.VALIDATE_FRAGMENT, {
      isValid: isValid
    }, fragment.getDOM())
  })
}

class ValidatorFactory {
  constructor (FormValidator) {
    AUIValidator = FormValidator
    overWriteMethods(AUIValidator.prototype)

    rules = new Rules()
  }

  mergeRules (defaults, custom) {
    Object.assign(defaults, custom)
    rules.registerRules(defaults)
  }

  mergeMessages (defaults, custom, i18n) {
    for (let key in defaults) {
      if (i18n.hasOwnProperty(defaults[key])) {
        defaults[key] = i18n[defaults[key]]
      }
    }
    Object.assign(defaults, custom)
    rules.registerMessages(defaults)
  }

  setRulesListeners (listeners) {
    rulesListeners = listeners
  }

  createInstance (config, portlet) {
    let validator = new AUIValidator(config)
    registerListeners(validator)
    return validator
  }
}

export default ValidatorFactory
