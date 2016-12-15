import del from 'del'
import runSequence from 'run-sequence'
import webpack from 'webpack'

import paths from '../../paths'

const g = require('gulp-load-plugins')()
const gulp = g.help(require('gulp'), require('../gulphelp'))

gulp.task('app:build', (cb) => {
  runSequence(
    'app:clean',
    [
      'app:build:html',
      'app:build:styles',
      'app:build:fonts',
      'app:build:js',
    ],
    cb,
  )
})

gulp.task('app:clean', (cb) => {
  del(paths.appDist, cb)
})

gulp.task('app:build:html', cb => gulp.src(`${paths.appSrc}/**/*.html`)
    .pipe(gulp.dest(paths.appDist)))

gulp.task('app:build:fonts', cb => gulp.src([
  `${paths.appSrc}/fonts/**/*`,
])
    .pipe(gulp.dest(`${paths.appDist}/fonts`)))

gulp.task('app:build:styles', (cb) => {
  const minifyOpts = { keepSpecialComments: 0 }

  return gulp.src(`${paths.appSrc}/styles/main.scss`)
    .pipe(g.plumber())
    .pipe(g.sass())
    .pipe(g.autoprefixer())
    .pipe(gulp.dest(`${paths.appDist}/css`))
    .pipe(g.minifyCss(minifyOpts))
    .pipe(g.rename('main.min.css'))
    .pipe(gulp.dest(`${paths.appDist}/css`))
})

gulp.task('app:build:js', (cb) => {
  const webpackOpts = {
    entry: paths.appEntry,
    output: {
      path: `${paths.appDist}/js`,
      filename: 'main.js',
      libraryTarget: 'umd',
      library: 'annyApp',
    },
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel', 'eslint'], include: [paths.appSrc] },
      ],
    },
    externals: {
      vis: 'vis',
      anny: 'anny',
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
