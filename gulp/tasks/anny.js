import del from 'del'
import runSequence from 'run-sequence'
import webpack from 'webpack'

import paths from '../../paths'

const g = require('gulp-load-plugins')()
const gulp = g.help(require('gulp'), require('../gulphelp'))

gulp.task('anny:build', (cb) => {
  runSequence(
    'anny:clean',
    'anny:build',
    cb,
  )
})

gulp.task('anny:clean', (cb) => {
  del(paths.annyDist, cb)
})

gulp.task('anny:build', (cb) => {
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
        { test: /\.js$/, loaders: ['babel'], include: [paths.annySrc] },
      ],
    },
  }

  webpack(webpackOpts, (err, stats) => {
    if (err) throw new g.util.PluginError('webpack', err)

    g.util.log(
      g.util.colors.green('[webpack]'),
      stats.toString('minimal'),
    )

    cb()
  })
})
