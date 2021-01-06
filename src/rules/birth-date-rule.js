import Helper from '../helper/date'

const message = 'birth_date'

function validate (val, node, ruleValue) {
  let languageId = Liferay.ThemeDisplay.getLanguageId()
  let date = Helper.parseStringToDateByLanguageId(val, languageId)
  return date.getTime() < new Date().getTime()
}

export default {
  name: 'birthDate',
  message,
  rule: validate,
  filledOnly: true
}
