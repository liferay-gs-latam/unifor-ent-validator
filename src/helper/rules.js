export default class Rules {
  registerRules (customRules) {
    Object.assign(AUI().config.FormValidator.RULES, customRules.RULES || {})
    Object.assign(AUI().config.FormValidator.STRINGS, customRules.STRINGS || {})
  }

  registerRule (name, message, validator) {
    this.addMessage(name, message)
    this.addRule(name, validator)
  }

  addRule (name, rule) {
    AUI().config.FormValidator.RULES[name] = rule
  }

  addMessage (name, ruleMessage) {
    AUI().config.FormValidator.STRINGS[name] = ruleMessage
  }

  addRules (customRules) {
    for (var rule in customRules) {
      this.addRule(rule, customRules[rule])
    }
  }

  addMessages (customMessages) {
    for (var rule in customMessages) {
      this.addMessage(rule, customMessages[rule])
    }
  }
}
