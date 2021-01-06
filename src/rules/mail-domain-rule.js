const message = 'mail_domain'

function validate (val, node, ruleValue) {
  let validExcept = ruleValue.split(',')

  validExcept = validExcept.map((host) => {
    return host.trim()
  })

  let mailDomain = val.match(/@.*/gi)

  return !(mailDomain && mailDomain[0].indexOf(validExcept) >= 0)
}

export default {
  name: 'mailDomain',
  message,
  rule: validate,
  filledOnly: true
}
