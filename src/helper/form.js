class Field {
  static getLabel (field) {
    return (field.type === 'radio' || field.type === 'checkbox') ? $(field).closest('label')[0].offsetParent : field.offsetParent
  }

  static getValue (field) {
    let getValue = {
      radio: () => {
        return [...document.getElementsByName(field.name)].filter(function (element) {
          return element.checked
        })
      }
    }

    if (getValue.hasOwnProperty(field.type)) {
      return getValue[field.type](field).value || ''
    }

    return field.value
  }

  static isVisible (field) {
    return $(field.getDOM()).is(':visible')
  }
}

class Form {
  constructor () {
    let z = {}
    return z
  }
}

export default {
  Form,
  Field
}
