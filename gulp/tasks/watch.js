import paths from '../../paths'

const g = require('gulp-load-plugins')()
const gulp = g.help(require('gulp'), require('../gulphelp'))

gulp.task('watch', 'rebuild when files change', (cb) => {
  // anny
  gulp.watch(`${paths.annySrc}/**/*`, ['anny:build'])

  // app
  gulp.watch([
    `${paths.appSrc}/**/*`,
    `${paths.root}/index.html`,
  ], ['app:build'])

  // docs
  gulp.watch([
    `${paths.root}/README.md`,
    `${paths.docsSrc}/**/*`,
    `!${paths.docsSrc}/**/*.less`,
  ], ['docs'])

  // docs less
  gulp.watch(`${paths.docsSrc}/static/styles/**/*`, ['docs:styles'])

  cb()
})
