import Helper from '../helper/date'

const message = 'datepicker'
// TODO -- JQUERY
function validate (val, node, ruleValue) {
  Helper.requireJqDatepicker()

  let length = val.length

  if (length < 10 || !Helper.isValid(val)) {
    return false
  }

  let el = $(node.getDOMNode())
  let options = el.datepicker('option', 'all')
  let languageId = Liferay.ThemeDisplay.getLanguageId()
  let now = Helper.parseStringToDateByLanguageId(val, languageId)

  if (options.minDate) {
    let minDate = options.minDate.indexOf('/') === -1
    ? $.datepicker._determineDate(null, options.minDate, new Date())
    : Helper.parseStringToDateByLanguageId(options.minDate, languageId)

    if (now.getTime() < minDate.getTime()) {
      return false
    }

    this.resetField($(el.attr('datepicker-set-maxdate-to')).attr('name'))
  }

  if (options.maxDate) {
    let maxDate = options.maxDate.indexOf('/') === -1
    ? $.datepicker._determineDate(null, options.maxDate, new Date())
    : Helper.parseStringToDateByLanguageId(options.maxDate, languageId)

    if (now.getTime() > maxDate.getTime()) {
      return false
    }

    this.resetField($(el.attr('datepicker-set-mindate-to')).attr('name'))
  }

  return true
}

export default {
  name: 'template',
  message,
  rule: validate,
  filledOnly: true
}
