const message = 'pattern'

function validate (val, node, ruleValue) {
  return ruleValue.test(val)
}

export default {
  name: 'pattern',
  message,
  rule: validate,
  filledOnly: true
}
