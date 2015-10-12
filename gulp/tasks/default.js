var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('default', 'build, serve, watch', function(cb) {
  runSequence(
    'build',
    'serve',
    'watch',
    cb
  )
});
