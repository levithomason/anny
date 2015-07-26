var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var del = require('del');
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('build-app', function(cb) {
  runSequence(
    'clean-app-build',
    [
      'build-app-html',
      'build-app-less',
      'build-app-js',
    ],
    cb
  )
});

gulp.task('clean-app-build', function(cb) {
  del(paths.appDist, cb);
});

gulp.task('build-app-html', function(cb) {
  return gulp.src([
    paths.appSrc + '/**/*.html'
  ])
    .pipe(gulp.dest(paths.appDist));
});

gulp.task('build-app-less', function() {
  var minifyOpts = {keepSpecialComments: 0};

  return gulp.src([
    paths.appSrc + '/less/variables.less',
    paths.appSrc + '/less/global.less',
    paths.appSrc + '/**/*variables.less',
    paths.appSrc + '/**/*.less'
  ])
    .pipe(g.plumber())
    .pipe(g.cached('less'))
    .pipe(g.autoprefixer())
    .pipe(g.remember('less'))
    .pipe(g.concat('app.css'))
    .pipe(g.less())
    .pipe(gulp.dest(paths.appDist))
    .pipe(g.minifyCss(minifyOpts))
    .pipe(g.rename('app.min.css'))
    .pipe(gulp.dest(paths.appDist));
});

gulp.task('build-app-js', function(cb) {
  return gulp.src([
    paths.appSrc + '/app.js',
    paths.appSrc + '/**/*-module.js',
    paths.appSrc + '/**/*-constant.js',
    paths.appSrc + '/**/*-value.js',
    paths.appSrc + '/**/*-provider.js',
    paths.appSrc + '/**/*-factory.js',
    paths.appSrc + '/**/*-service.js',
    paths.appSrc + '/**/*-directive.js',
    paths.appSrc + '/**/*-controller.js'
  ])
    .pipe(g.plumber())
    .pipe(g.eslint())
    .pipe(g.eslint.format())
    .pipe(g.ngAnnotate())
    .pipe(g.concat('app.js'))
    .pipe(gulp.dest(paths.appDist))
    .pipe(g.uglify())
    .pipe(g.rename({extname: '.min.js'}))
    .pipe(gulp.dest(paths.appDist));
});
