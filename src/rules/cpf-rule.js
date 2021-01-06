const message = 'cpf'

function validate (val, node, ruleValue) {
  let rest
  let i = 0
  let sum = 0

  val = val.replace(/[.-]/g, '')

  if (val.length < 11) return false

  // equal numbers
  let arrCpf = val.split('')
  let first = arrCpf.shift()
  let equalNumbersLength = arrCpf.filter(n => {
    return n === first
  }).length

  if (equalNumbersLength === arrCpf.length) return false

  for (i = 1; i <= 9; i++) {
    sum = sum + parseInt(val.substring(i - 1, i)) * (11 - i)
  }

  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11)) {
    rest = 0
  }

  if (rest !== parseInt(val.substring(9, 10))) return false

  sum = 0

  for (i = 1; i <= 10; i++) {
    sum = sum + parseInt(val.substring(i - 1, i)) * (12 - i)
  }

  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11)) {
    rest = 0
  }

  if (rest !== parseInt(val.substring(10, 11))) return false

  return true
}

export default {
  name: 'cpf',
  message,
  rule: validate,
  filledOnly: true
}
