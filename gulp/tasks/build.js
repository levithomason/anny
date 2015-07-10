var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var runSequence = require('run-sequence');

gulp.task('build', 'create a fresh anny and app build', function(cb) {
  runSequence(
    [
      'build-anny',
      'build-app'
    ],
    cb
  );
});
