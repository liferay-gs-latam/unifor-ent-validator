const message = 'min_years_old'

function validate (val, node, minYersOld) {
  let splitedDate = val.split('/')
  let informedDate = new Date(splitedDate[2], splitedDate[1] - 1, splitedDate[0]).getTime()
  let currentDate = new Date()
  let limitYearsOldTime = new Date(currentDate.getFullYear() - minYersOld, currentDate.getMonth(), currentDate.getDate()).getTime()

  return informedDate <= limitYearsOldTime
}

export default {
  name: 'minYearsOld',
  message,
  rule: validate,
  filledOnly: true
}
