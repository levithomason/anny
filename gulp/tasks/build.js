var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var del = require('del');
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('build', 'create a fresh build', function(cb) {
  runSequence(
    'clean-build',
    [
      'build-anny',
      'build-html',
      'build-less',
      'build-ngapp',
    ],
    cb
  )
});

gulp.task('clean-build', function(cb) {
  del(paths.dist, cb);
});


gulp.task('build-anny', function(cb) {
  return gulp.src([
    paths.anny + '/util.js',
    paths.anny + '/activation.js',
    paths.anny + '/initialize.js',
    paths.anny + '/Neuron.js',
    paths.anny + '/Layer.js',
    paths.anny + '/Network.js',
  ])
    .pipe(g.plumber())
    .pipe(g.concat('anny.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(g.uglify())
    .pipe(g.rename({extname: '.min.js'}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-html', function(cb) {
  return gulp.src([
    paths.src + '/**/*.html'
  ])
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-less', function() {
  var minifyOpts = {keepSpecialComments: 0};

  return gulp.src([
    paths.src + '/less/variables.less',
    paths.src + '/less/global.less',
    paths.src + '/**/*variables.less',
    paths.src + '/**/*.less',
  ])
    .pipe(g.plumber())
    .pipe(g.cached('less'))
    .pipe(g.autoprefixer())
    .pipe(g.remember('less'))
    .pipe(g.concat('app.css'))
    .pipe(g.less())
    .pipe(gulp.dest(paths.dist))
    .pipe(g.minifyCss(minifyOpts))
    .pipe(g.rename('app.min.css'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-ngapp', function(cb) {
  return gulp.src([
    paths.src + '/app.js',
    paths.src + '/**/*-module.js',
    paths.src + '/**/*-constant.js',
    paths.src + '/**/*-value.js',
    paths.src + '/**/*-provider.js',
    paths.src + '/**/*-factory.js',
    paths.src + '/**/*-service.js',
    paths.src + '/**/*-directive.js',
    paths.src + '/**/*-controller.js',
  ])
    .pipe(g.plumber())
    .pipe(g.ngAnnotate())
    .pipe(g.concat('app.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(g.uglify())
    .pipe(g.rename({extname: '.min.js'}))
    .pipe(gulp.dest(paths.dist));
});
