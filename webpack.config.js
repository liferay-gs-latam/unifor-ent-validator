const path = require('path')
const fs = require('fs')

let i18nList = {}

fs.readdirSync('./src/i18n', 'utf-8')
  .filter(
      (file) => file.match(/.*\.yml$/)
  )
  .map((file) => {
    i18nList[`ent-validator_${file.substring(0, file.length - 4)}`] = `./src/i18n/${file}`
  })

module.exports = {
  entry: Object.assign(
    {
      'validator': './src/validator.js',
      'ent-validator': './src/validator.aui.js'
    },
    i18nList
  ),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        loader: 'standard-loader',
        exclude: /(node_module)/,
        options: {
          error: false,
          snazzy: true
        }
      }, {
        test: /\.js?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.yml$/,
        use: [
          path.resolve('webpack/i18n-loader.js')
        ]
      }
    ]
  }

}
