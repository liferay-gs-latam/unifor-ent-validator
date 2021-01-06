const message = 'max_years_old'

function validate (val, node, maxYersOld) {
  let splitedDate = val.split('/')
  let informedDate = new Date(splitedDate[2], splitedDate[1] - 1, splitedDate[0] - 1).getTime()
  let currentDate = new Date()
  let limitYearsOldTime = new Date(currentDate.getFullYear() - maxYersOld, currentDate.getMonth(), currentDate.getDate()).getTime()

  return informedDate >= limitYearsOldTime
}

export default {
  name: 'maxYearOld',
  message,
  rule: validate,
  filledOnly: true
}
