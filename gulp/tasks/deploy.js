var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var exec = require('child_process').exec;

gulp.task('deploy', 'deploy master branch', function(cb) {
  exec('git push origin master:gh-pages', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
