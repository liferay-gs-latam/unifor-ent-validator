const message = 'cnpj'

function validate (val, node, ruleValue) {
  let cnpj = val
  let i = 0

  cnpj = cnpj.replace(/[^\d]+/g, '')

  if (cnpj === '' || cnpj.length !== 14) return false

  let arrCnpj = val.split('')
  let first = arrCnpj.shift()
  let equalNumbersLength = arrCnpj.filter(n => {
    return n === first
  }).length

  if (equalNumbersLength === arrCnpj.length) return false

  // validate dvs
  let size = cnpj.length - 2
  let numbers = cnpj.substring(0, size)
  let digits = cnpj.substring(size)
  let sum = 0
  let pos = size - 7

  for (i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--
    if (pos < 2) {
      pos = 9
    }
  }
  var result = sum % 11 < 2 ? 0 : 11 - sum % 11

  if (result !== digits.charAt(0)) return false

  size = size + 1
  numbers = cnpj.substring(0, size)
  sum = 0
  pos = size - 7

  for (i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--

    if (pos < 2) {
      pos = 9
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11

  if (result !== digits.charAt(1)) return false

  return true
}

export default {
  name: 'cnpj',
  message,
  rule: validate,
  filledOnly: true
}
