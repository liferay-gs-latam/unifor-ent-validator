const message = 'password'

function validate (val, node, ruleValue) {
  /*
   * Password (UpperCase, LowerCase, Number/SpecialChar and
   * min 8 Chars)
   */
  return /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_]).{8,75})/.test(val)
}

export default {
  name: 'template',
  message,
  rule: validate,
  filledOnly: true
}
