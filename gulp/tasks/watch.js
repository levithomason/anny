var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var paths = require('../paths');

gulp.task('watch', 'rebuild when files change', function(cb) {
  gulp.watch([
    // anny
    paths.annyEntry,
    paths.annyLib + '/**/*',

    // app
    paths.root + '/index.html',
    paths.appSrc + '/**/*',
  ], ['build']);

  // docs
  gulp.watch([
    paths.root + '/README.md',
    paths.docsSrc + '/**/*',
    '!' + paths.docsSrc + '/**/*.less'
  ], ['docs']);

  // docs less
  gulp.watch([
    paths.docsSrc + '/**/*.less'
  ], ['docs-less']);

  cb();
});
