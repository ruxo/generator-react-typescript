const generators = require('yeoman-generator')

const isBlank = s => s.match(/^\W*$/) !== null
const containsWS = s => s.match(/\W/) !== null

module.exports = generators.Base.extend({
  prompting() {
    this.log('Please ensure that you have typescript, typings, and webpack installed globally before continue.')

    const self = this
    return this.prompt([
      { type: 'input'
      , name: 'slug'
      , message: 'Your project slug'
      , validate: s => !isBlank(s) && !containsWS(s) },
      { type: 'input'
      , name: 'desc'
      , message: 'Description'
      , default: '' },
      { type: 'confirm'
      , name: 'use_redux'
      , message: 'Use Redux'
      , default: false }
    ]).then(answers => self.answers = answers)
  },
  createPackageJson() {
    this.fs.writeJSON(
      this.destinationPath('package.json'),
      { name: this.answers.slug
      , version: '1.0.0'
      , description: this.answers.description
      , scripts: { 'start': 'webpack-dev-server --inline' }}
    )
  },
  installNpmLibs() {
    const reacts = ['react', 'react-dom']
    const additions = this.answers.use_redux? ['redux', 'react-redux'] : []
    const webpacks = ['webpack-bundle-tracker', 'ts-loader', 'source-map-loader', 'webpack-dev-server']
    const mandatoryApps = ['typescript', 'webpack']
    this.npmInstall(reacts.concat(additions).concat(webpacks).concat(mandatoryApps), { saveDev: true })
  },
  copyFiles() {
    this.copy('tsconfig.json', 'tsconfig.json')
    this.copy('webpack.config.js', 'webpack.config.js')
    this.copy('src/index.tsx', 'src/js/index.tsx')
    this.copy('index.html', 'index.html')
  },
  instal() {
    const reactTypes = ['dt~react', 'dt~react-dom']
    const reduxTypes = ['dt~redux', 'dt~react-redux']
    const types = reactTypes.concat(this.answers.use_redux? reduxTypes : [])
    this.spawnCommand('typings', ['install', '--save', '--global'].concat(types))
  },
  end() {
    this.log('Run `npm start` to see the project works. Happy time!')
  }
})