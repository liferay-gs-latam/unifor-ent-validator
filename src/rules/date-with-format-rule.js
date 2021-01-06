const message = 'date_with_format'

function validate (val, node, format) {
  let splitedDate = val.split('/')
  let dateFormat = AUI().Lang.isString(format) ? format : 'dd/mm/yyyy'
  let formatElements = dateFormat.split('/')
  let maskSize = formatElements.length
  let formats = {
    'y': checkYear,
    'm': checkMonth,
    'd': checkDay
  }

  if (splitedDate.length !== maskSize) {
    return false
  }

  return formatElements.filter(function (format, index) {
    let dateItem = splitedDate[index]
    let type = format.toLowerCase()[0]

    if (formats.hasOwnProperty(type)) {
      return formats[type](dateItem, format)
    }
  }).length === maskSize

  function checkDay (day) {
    return day > 0 && day <= 31
  }

  function checkMonth (month) {
    return month > 0 && month <= 12
  }

  function checkYear (year, format) {
    if (format) {
      if (year.length !== format.length) return false
    }
    return (year > 0)
  }
}

export default {
  name: 'dateWithFormat',
  message,
  rule: validate,
  filledOnly: true
}
