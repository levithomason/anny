var del = require('del');
var exec = require('child_process').exec;
var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var runSequence = require('run-sequence');

var pkg = require('../../package.json');
var paths = require('../paths');

gulp.task('docs', 'build docs for the current version', function(cb) {
  runSequence(
    'docs-clean',
    'docs-jsdoc',
    'docs-less',
    'docs-index-html',
    cb
  );
});

gulp.task('docs-clean', function(cb) {
  del(paths.docsDist + '/' + pkg.version, cb);
});

gulp.task('docs-jsdoc', function(cb) {
  exec([
    // run jsdoc
    '$(npm bin)/jsdoc -c conf.json',

    // flatten
    'mv ' +
      paths.docsDist + '/' + pkg.name + '/' + pkg.version + ' ' +
      paths.docsDist,
    'rm -rf ' + paths.docsDist + '/' + pkg.name,

    // remove fonts
    'rm -rf ' + paths.docsDist + '/' + pkg.version + '/fonts'

  ].join(' && '), cb);
});

gulp.task('docs-less', function(cb) {
  return gulp.src([
      paths.docsSrc + '/static/styles/*.less'
    ])
    .pipe(g.plumber())
    .pipe(g.less())
    .pipe(g.autoprefixer())
    .pipe(gulp.dest(paths.docsDist + '/' + pkg.version + '/styles'));
});

gulp.task('docs-index-html', function(){
  return gulp.src([paths.docsSrc + '/index.html'])
    .pipe(g.replace(/CURRENT_PACKAGE_VERSION/g, 'dist/' + pkg.version))
    .pipe(gulp.dest(paths.docsRoot));
});
