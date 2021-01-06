const message = 'full_name'

function validate (val, node, ruleValue) {
  let value = val.trim()

  if (value.length !== 0) {
    let namesMatched = value.match(/\s/gi)

    return namesMatched && namesMatched.length >= 1
  }

  return true
}

export default {
  name: 'fullName',
  message,
  rule: validate,
  filledOnly: true
}
