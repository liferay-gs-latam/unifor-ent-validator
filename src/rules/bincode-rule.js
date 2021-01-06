const message = 'bincode'

function validate (val, node, ruleValue) {
  return /[0-9]{4}\.[0-9]{6}\.[0-9]{5}/.test(val)
}

export default {
  name: 'bincode',
  message,
  rule: validate,
  filledOnly: true
}
