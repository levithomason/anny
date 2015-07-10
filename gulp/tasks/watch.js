var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var paths = require('../paths');

gulp.task('watch', 'rebuild when files change', function(cb) {
  // anny
  gulp.watch([
    paths.annyEntry,
    paths.annyLib + '/**/*'
  ], ['build-anny']);

  // app
  gulp.watch([
    paths.appBower + '/**/*',
    paths.appSrc + '/**/*',
    paths.root + '/index.html'
  ], ['build-app']);

  cb();
});
