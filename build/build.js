var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var npm = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var fs = require('fs');
var version = process.env.VERSION || require('../package.json').version
var name = require('../package.json').name
var banner =
  '/*!\n' +
  ' * ' + name + '.js v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Myron Liu\n' +
  ' * Released under the MIT License.\n' +
  ' */'

// update main file
var main = fs
  .readFileSync('src/index.js', 'utf-8')
  .replace(/store\.version = '@VERSION'/, "store.version = '" + version + "'")

fs.writeFileSync('src/index.js', main)

rollup.rollup({
    entry: 'src/index.js',
    plugins: [
        npm({ jsnext: true, main: true }),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: [ 'es2015-rollup' ]
        })
    ]
}).then(function(bundle) {
    bundle.write({
        format: 'cjs',
        banner: banner,
        dest: 'dist/' + name +'-common.js'
    });
    rollup.rollup({
        entry: 'src/index.js',
        plugins: [
            npm({ jsnext: true, main: true }),
            uglify(),
            commonjs(),
            babel({
                exclude: 'node_modules/**',
                presets: [ 'es2015-rollup' ]
            })
        ]
    }).then(function(bundle) {
        bundle.write({
            // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
            format: 'umd',
            banner: banner,
            moduleName: 'store',
            sourceMap: true,
            dest: name + '.js'
        });
    })
}).catch(function(err){
    console.log(err);
});
