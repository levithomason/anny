var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var paths = require('../paths');

gulp.task('watch', 'rebuild when files change', function(cb) {
  return gulp.watch([
    paths.src + '/**/*',
    paths.root + '/index.html'
  ], ['build']);
});
