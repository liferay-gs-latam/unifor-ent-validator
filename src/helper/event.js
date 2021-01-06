class Event {
  static dispatch (eventName, params, target) {
    let defultParams = {
      bubbles: true,
      details: {
        val: ''
      }
    }

    Object.assign(defultParams.details, params)

    target.dispatchEvent(new CustomEvent(`${Event.NS}:${eventName}`, defultParams))
  }
}

Event.NS = 'validator'
Event.VALIDATE = 'validate'
Event.BEFORE_VALIDATE = 'before'
Event.AFTER_VALIDATE = 'after'
Event.VALID = 'valid'
Event.RELOAD_RULES = 'reload_rules'
Event.RESET_FIELDS = 'reset_fields'
Event.VALIDATE_FRAGMENT = 'validate_fragment'

export default Event
