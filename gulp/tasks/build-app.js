const g = require('gulp-load-plugins')()
const gulp = g.help(require('gulp'), require('../gulphelp'))
import del from 'del'
import runSequence from 'run-sequence'
import paths from '../../paths'
import webpack from 'webpack'

gulp.task('build-app', cb => {
  runSequence(
    'clean-app-build',
    [
      'build-app-html',
      'build-app-styles',
      'build-app-fonts',
      'build-app-js',
    ],
    cb
  )
})

gulp.task('clean-app-build', cb => {
  del(paths.appDist, cb)
})

gulp.task('build-app-html', cb => {
  return gulp.src(`${paths.appSrc}/**/*.html`)
    .pipe(gulp.dest(paths.appDist))
})

gulp.task('build-app-fonts', cb => {
  return gulp.src([
    `${paths.appSrc}/fonts/**/*`,
  ])
    .pipe(gulp.dest(`${paths.appDist}/fonts`))
})

gulp.task('build-app-styles', cb => {
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

gulp.task('build-app-js', cb => {
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
      stats.toString('minimal')
    )

    cb()
  })
})
