const yml = require('js-yaml')

module.exports = function (source) {
  if (this.cacheable) this.cacheable()

  try {
    return [
      'AUI().config.entValidator = AUI().config.entValidator || {}',
      `AUI().config.entValidator.i18n = ${JSON.stringify(yml.safeLoad(source))}`
    ].join('\r\n')
  } catch (err) {
    this.emitError(err)
    return null
  }
}
