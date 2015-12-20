const g = require('gulp-load-plugins')()
const gulp = g.help(require('gulp'), require('../gulphelp'))
import del from 'del'
import runSequence from 'run-sequence'
import paths from '../../paths'
import webpack from 'webpack'

gulp.task('build-anny', cb => {
  runSequence(
    'clean-build-anny',
    'build-anny-js',
    cb
  )
})

gulp.task('clean-build-anny', cb => {
  del(paths.annyDist, cb)
})

gulp.task('build-anny-js', cb => {
  // http://webpack.github.io/docs/configuration.html
  const webpackOpts = {
    entry: paths.annyEntry,
    output: {
      path: paths.annyDist,
      filename: 'anny.js',
      libraryTarget: 'umd',
      library: 'anny',
    },
    resolve: {
      root: paths.root,
      modulesDirectories: [
        paths.node_modules,
        '.',
      ],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: [
            'babel',
            'eslint',
          ],
          include: [paths.annySrc],
        },
      ],
    },
    externals: {
      lodash: '_',
    },
  }

  // http://webpack.github.io/docs/node.js-api.html#stats
  const webpackOutputOpts = {
    hash: false,            // the hash of the compilation
    version: false,         // webpack version info
    timings: true,          // timing info
    assets: true,           // assets info
    chunks: false,          // chunk info
    colors: false,          // with console colors
    chunkModules: false,    // built modules info to chunk info
    modules: false,         // built modules info
    cached: false,          // also info about cached (not built) modules
    reasons: false,         // info about the reasons why modules are included
    source: false,          // the source code of modules
    errorDetails: true,     // details to errors (like resolving log)
    chunkOrigins: false,    // the origins of chunks and chunk merging info
    modulesSort: '',        // (string) sort the modules by that field
    chunksSort: '',         // (string) sort the chunks by that field
    assetsSort: '',         // (string) sort the assets by that field
  }

  // run webpack
  webpack(webpackOpts, (err, stats) => {
    if (err) {
      throw new g.util.PluginError('webpack', err)
    }

    g.util.log(
      g.util.colors.green('[webpack]'),
      stats.toString(webpackOutputOpts)
    )

    cb()
  })
})
