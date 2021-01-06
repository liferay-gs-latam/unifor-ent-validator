const requireContext = require.context('./rules', true, /^\.\/.*\.js$/)
const ruleList = requireContext.keys().map(requireContext)

const RULES = {}
const STRINGS = {}
const LISTENERS = {
  updateField: [],
  beforeValidate: [],
  afterValidate: []
}

ruleList.map(rule => {
  STRINGS[rule.default.name] = rule.default.message

  RULES[rule.default.name] = (val, node, ruleValue) => {
    let instance = this
    let isValid = true
    let filledOnly = rule.default.filledOnly || true

    if (filledOnly && !AUI().config.FormValidator.RULES.hasValue.apply(instance, [val, node])) return true

    isValid = rule.default.rule(val, node, ruleValue)

    return isValid
  }

  if (rule.default.on) {
    if (rule.default.on.updateField) {
      LISTENERS.updateField.push(rule.default.on.updateField)
    }

    if (rule.default.on.beforeValidate) {
      LISTENERS.beforeValidate.push(rule.default.on.beforeValidate)
    }

    if (rule.default.on.afterValidate) {
      LISTENERS.afterValidate.push(rule.default.on.afterValidate)
    }
  }
})

export default {
  RULES,
  STRINGS,
  LISTENERS
}
