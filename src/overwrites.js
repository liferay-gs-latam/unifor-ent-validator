import constants from './constants'
import Helper from './helper/form'

const A = AUI()

// Overwrite
function _extractRulesFromMarkup (rules) {
  let instance = this
  let domBoundingBox = instance.get('boundingBox').getDOM()
  let elements = domBoundingBox.elements
  // let defaultRulesKeys = Object.keys(A.config.FormValidator.RULES)
  // let defaultRulesJoin = defaultRulesKeys.join('|')
  let regex = A.DOM._getRegExp('(field-)\\w+', 'g')
  let i
  let length
  let ruleNameMatch = []
  let ruleMatcher = (m1, m2) => {
    ruleNameMatch.push(m1.replace(m2, ''))
  }

  for (i = 0, length = elements.length; i < length; i++) {
    let el = elements[i]
    let offsetParent = Helper.Field.getLabel(el)
    let isVisible = offsetParent !== null
    let isEnabled = !el.disabled
    let fieldName = el.name

    if (isVisible && isEnabled) {
      el.className.replace(regex, ruleMatcher)

      if (ruleNameMatch.length) {
        let fieldRules = rules[fieldName]
        let j
        let ruleNameLength

        if (!fieldRules) {
          fieldRules = {}
          rules[fieldName] = fieldRules
        }

        for (j = 0, ruleNameLength = ruleNameMatch.length; j < ruleNameLength; j++) {
          let rule = ruleNameMatch[j]

          if (!(rule in fieldRules)) {
            fieldRules[rule] = el.getAttribute(rule) || true
          }
        }

        ruleNameMatch.length = 0
      }
    }
  }
  instance._rulesAlreadyExtracted = true
  instance.fire('reloadRules')
}

function getFieldErrorMessage (field, rule) {
  let instance = this
  let fieldName = field.get('name')
  let fieldStrings = instance.get('fieldStrings')[fieldName] || {}
  let fieldRules = instance.get('rules')[fieldName]
  let strings = instance.get('strings')
  let substituteRulesMap = {}

  if (rule in fieldRules) {
    let ruleValue = A.Array(fieldRules[rule])

    A.each(
      ruleValue,
      function (value, index) {
        substituteRulesMap[index] = [value].join('')
      }
    )
  }

  let message = (fieldStrings[rule] || strings[rule] || strings.DEFAULT)
  let dataAttrMsg = field.getAttribute(constants.DATA_ATTR_MESSAGE_PREFIX + rule)

  if (dataAttrMsg !== '') {
    message = A.LanguageProperties.get(dataAttrMsg) || dataAttrMsg
  }

  return A.Lang.sub(message, substituteRulesMap)
}

function validatable (field) {
  let instance = this
  let validatable = false
  let fieldRules = instance.get('rules')[field.get('name')]

  if (fieldRules && Helper.Field.isVisible(field)) {
    validatable = fieldRules.custom ||
                  instance.normalizeRuleValue(fieldRules.required, field) ||
                  A.config.FormValidator.RULES.hasValue.apply(instance, [field.val(), field])
  }

  return !!validatable
}

// Addition
function reloadRules () {
  let instance = this
  instance._rulesAlreadyExtracted = false
}

function validateFragment (fragmentElement) {
  let instance = this
  let visibleElements = []
  let formFields = [].slice.call($(fragmentElement).children(':not(.hide)').find(':input'))

  visibleElements = formFields.reduce(function (fieldList, el) {
    let offsetParent = (el.type === 'radio' || el.type === 'checkbox') ? $(el).closest('label')[0].offsetParent : el.offsetParent
    let isVisible = offsetParent !== null

    if (isVisible && !el.disabled) {
      fieldList.push(el)
    }

    return fieldList
  }, [])

  let rules = Object.keys(instance.get('rules'))

  instance.resetAllFields()

  visibleElements.forEach(function (el) {
    if (rules.indexOf(el.name) > -1) {
      instance.validateField(el.name)
    }
  })

  let isValid = !instance.hasErrors()

  instance.fire('validateFragment', {
    validator: {
      fragment: fragmentElement,
      isValid: isValid
    }
  })

  return isValid
}

export default {
  // Overwrite
  _extractRulesFromMarkup,
  getFieldErrorMessage,
  validatable,
  // Addition
  reloadRules,
  validateFragment
}
