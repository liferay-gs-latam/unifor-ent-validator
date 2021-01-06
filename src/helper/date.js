function parseStringToDateByLanguageId (stringDate, languageId) {
  let arrDate = stringDate.split('/')
  let month
  let day
  let year = parseInt(arrDate[2])

  if (languageId === 'en_US') {
    month = parseInt(arrDate[0]) - 1
    day = parseInt(arrDate[1])
  } else {
    month = parseInt(arrDate[1]) - 1
    day = parseInt(arrDate[0])
  }

  return new Date(year, month, day)
}

function isValid (strBrDateFormat) {
  return createDate(strBrDateFormat)
}

function createDate (strBrDateFormat) {
  let languageId = Liferay.ThemeDisplay.getLanguageId()
  let arrDate = strBrDateFormat.split('/')
  let month
  let day
  let year = parseInt(arrDate[2])

  if (languageId === 'en_US') {
    month = parseInt(arrDate[0]) - 1
    day = parseInt(arrDate[1])
  } else {
    month = parseInt(arrDate[1]) - 1
    day = parseInt(arrDate[0])
  }

  if (arrDate.length === 3) {
    let date = new Date(year, month, day)
    return ((date.toString() !== 'Invalid Date') && (date.getMonth() === month) && date.getDate() === day)
  }
  return false
}

function clearTime (dateObj) {
  dateObj.setSeconds(0)
  dateObj.setMinutes(0)
  dateObj.setHours(0)
  dateObj.setMilliseconds(0)
  return dateObj
}

function requireJqDatepicker () {
  if (!$ || !$.datepicker) {
    throw new Error('Jquery and Jquery UI datepicker is required!')
  }
}

export default {
  parseStringToDateByLanguageId,
  isValid,
  createDate,
  clearTime,
  requireJqDatepicker
}
