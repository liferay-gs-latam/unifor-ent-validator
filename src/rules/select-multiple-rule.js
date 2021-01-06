const message = 'select_multiple'

function validate (val, node, limit) {
  let selected = val || []

  return selected.length <= limit
}

export default {
  name: 'selectMultipleLimit',
  message,
  rule: validate,
  filledOnly: true
}
