const message = 'hour'

function validate (val, node, ruleValue) {
  let hour = val
  let HOUR_INDEX = 0
  let MINUTES_INDEX = 1

  if (hour.indexOf(':') && hour.length === 5) {
    hour = hour.split(':')
    return parseInt(hour[HOUR_INDEX]) <= 23 && parseInt(hour[MINUTES_INDEX]) <= 59
  } else if (hour.length === 2) {
    return parseInt(hour) <= 23
  }
  return false
}

export default {
  name: 'hour',
  message,
  rule: validate,
  filledOnly: true
}
