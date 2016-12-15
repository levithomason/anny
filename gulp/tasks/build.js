import runSequence from 'run-sequence'

const g = require('gulp-load-plugins')()
const gulp = g.help(require('gulp'), require('../gulphelp'))

gulp.task('build', 'create a fresh anny and app build', (cb) => {
  runSequence(
    [
      'build-anny',
      'build-app',
      'docs',
    ],
    cb,
  )
})
