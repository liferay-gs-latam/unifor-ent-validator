const message = 'less_than_current_date'

function validate (val, node, ruleValue) {
  let splitedDate = val.split('/')
  let informedDate = new Date(splitedDate[2], splitedDate[1] - 1, splitedDate[0])
  let currentDate = new Date()

  currentDate.setHours(0, 0, 0, 0)
  return informedDate.getTime() < currentDate.getTime()
}

export default {
  name: 'lessThanCurrentDate',
  message,
  rule: validate,
  filledOnly: true
}
