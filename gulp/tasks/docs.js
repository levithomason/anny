import del from 'del'
import { exec } from 'child_process'
import runSequence from 'run-sequence'

import pkg from '../../package'
import paths from '../../paths'

const g = require('gulp-load-plugins')()
const gulp = g.help(require('gulp'), require('../gulphelp'))

gulp.task('docs', 'build docs for the current version', (cb) => {
  runSequence(
    'docs:clean',
    'docs:build',
    'docs:styles',
    cb,
  )
})

gulp.task('docs:clean', (cb) => {
  del(paths.docsDist, cb)
})

gulp.task('docs:build', (cb) => {
  exec(`
    $(npm bin)/jsdoc -c conf.json

    mv ${paths.docsDist}/${pkg.name}/${pkg.version}/* ${paths.docsDist}
    rm -rf ${paths.docsDist}/${pkg.name}`, cb)
})

gulp.task('docs:styles', (cb) => {
  return gulp.src([
    `${paths.docsSrc}/static/styles/*.scss`,
  ])
    .pipe(g.plumber())
    .pipe(g.sass())
    .pipe(g.autoprefixer())
    .pipe(gulp.dest(`${paths.docsDist}/styles`))
})
