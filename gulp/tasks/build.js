const g = require('gulp-load-plugins')();
const gulp = g.help(require('gulp'), require('../gulphelp'));
import runSequence from 'run-sequence';

gulp.task('build', 'create a fresh anny and app build', cb => {
  runSequence(
    [
      'build-anny',
      'build-app',
      'docs',
    ],
    cb
  );
});
