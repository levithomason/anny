const g = require('gulp-load-plugins')();
const gulp = g.help(require('gulp'), require('../gulphelp'));
import {exec} from 'child_process';

gulp.task('deploy', 'deploy master branch', cb => {
  exec('git push origin master:gh-pages', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
