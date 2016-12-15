import runSequence from 'run-sequence'

const g = require('gulp-load-plugins')()
const gulp = g.help(require('gulp'), require('../gulphelp'))

gulp.task('default', 'build, serve, watch', (cb) => {
  runSequence(
    'build',
    'serve',
    'watch',
    cb,
  )
})
