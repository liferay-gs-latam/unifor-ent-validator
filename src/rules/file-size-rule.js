const message = 'file_size'

function validate (val, node, ruleMaxSize) {
  if (AUI().Lang.isString(ruleMaxSize) && !isNaN(ruleMaxSize)) {
    let files = node.get('files')
    let maxSize = parseFloat(ruleMaxSize) * 1024 * 1024

    if (files.size() > 0) {
      let file = files.shift()

      return file.size <= maxSize
    }
  }

  return true
}

export default {
  name: 'fileSize',
  message,
  rule: validate,
  filledOnly: true
}
