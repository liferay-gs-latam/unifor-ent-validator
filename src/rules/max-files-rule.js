const message = 'max_files'

function validate (val, node, maxFiles) {
  return maxFiles >= node.getDOMNode().files.length
}

export default {
  name: 'template',
  message,
  rule: validate,
  filledOnly: true
}
