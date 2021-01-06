import ValidatorFactory from './validator'
import defaultRules from './validator-rules'

AUI().applyConfig({
  'modules': {
    'ent-validator-i18n': AUI().config.modules['ent-validator'].fullpath.replace('ent-validator', `ent-validator_${Liferay.ThemeDisplay.getLanguageId()}`)
  }
})

AUI.add('ent-validator', (A) => {
  const factory = new ValidatorFactory(A.FormValidator)
  const custom = A.EntValidatorCustomRules || {}

  factory.mergeRules(defaultRules.RULES, custom.RULES)
  factory.mergeMessages(defaultRules.STRING, custom.STRING, AUI().config.entValidator.i18n || {})
  factory.setRulesListeners(defaultRules.LISTENERS)

  A.EntValidator = function (config, portlet) {
    return factory.createInstance(config, portlet)
  }
}, '0.0.1', {
  'requires': ['ent-validator-i18n', 'aui-form-validator', 'ent-validator-custom-rules'],
  'optional': ['ent-validator-custom-rules']
})
