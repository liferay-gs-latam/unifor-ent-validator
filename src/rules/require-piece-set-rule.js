const message = 'required'

function validate (val, node, nameSet) {
  let instance = this
  let members = AUI().all(`[requiredPieceSet=${nameSet}]`)

  if (members.length > 0) {
    let fieldsRule = members.filter(function (member) {
      return AUI().config.FormValidator.RULES.hasValue.apply(instance, [member.val, member])
    })
    let $labels = $()
    let isRequiredSet = fieldsRule.length !== members.length

    members.each(function () {
      $labels.push($(this).closest('.form-group').find('label'))
    })

    if (isRequiredSet) {
      $labels.each(function () {
        $(this).addClass('required')
      })
      return val.length !== 0
    }

    $labels.each(function () {
      $(this).removeClass('required')
    })

    return true
  }

  return true
}

function updateFields () {

}

function afterValidate () {

}

function beforeValidate () {

}

export default {
  name: 'requiredPieceSet',
  message,
  rule: validate,
  filledOnly: false,
  on: {
    updateFields,
    afterValidate,
    beforeValidate
  }
}
