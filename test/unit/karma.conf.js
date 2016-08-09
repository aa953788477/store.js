var babel = require('rollup-plugin-babel')
var npm = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec'],
    files: ['./specs/*.spec.js'],
    preprocessors: {
      './specs/*.spec.js': ['rollup']
    },
    rollupPreprocessor: {
      // rollup settings. See Rollup documentation
      plugins: [
        npm({ jsnext: true, main: true }),
        commonjs(),
        babel({
          exclude: 'node_modules/**',
          babelrc: false,
          presets: [ 'es2015-rollup' ]
        })
      ],
      // will help to prevent conflicts between different tests entries
      format: 'iife',
      sourceMap: 'inline'
    }
  })
}
