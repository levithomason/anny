const g = require('gulp-load-plugins')();
const gulp = g.help(require('gulp'), require('../gulphelp'));
import del from 'del';
import runSequence from 'run-sequence';
import paths from '../../paths';

gulp.task('build-app', cb => {
  runSequence(
    'clean-app-build',
    [
      'build-app-html',
      'build-app-less',
      'build-app-fonts',
      'build-app-js',
    ],
    cb
  );
});

gulp.task('clean-app-build', cb => {
  del(paths.appDist, cb);
});

gulp.task('build-app-html', cb => {
  return gulp.src([
    `${paths.appSrc}/**/*.html`,
  ])
    .pipe(gulp.dest(paths.appDist));
});

gulp.task('build-app-fonts', cb => {
  return gulp.src([
    `${paths.appSrc}/fonts/**/*`,
  ])
    .pipe(gulp.dest(`${paths.appDist}/fonts`));
});

gulp.task('build-app-less', cb => {
  const minifyOpts = {keepSpecialComments: 0};

  return gulp.src([
    `${paths.appSrc}/less/variables.less`,
    `${paths.appSrc}/less/global.less`,
    `${paths.appSrc}/**/*variables.less`,
    `${paths.appSrc}/**/*.less`,
  ])
    .pipe(g.plumber())
    .pipe(g.cached('less'))
    .pipe(g.autoprefixer())
    .pipe(g.remember('less'))
    .pipe(g.concat('app.css'))
    .pipe(g.less())
    .pipe(gulp.dest(`${paths.appDist}/css`))
    .pipe(g.minifyCss(minifyOpts))
    .pipe(g.rename('app.min.css'))
    .pipe(gulp.dest(`${paths.appDist}/css`));
});

gulp.task('build-app-js', cb => {
  return gulp.src([
    `${paths.appSrc}/app.js`,
    `${paths.appSrc}/**/*-module.js`,
    `${paths.appSrc}/**/*-constant.js`,
    `${paths.appSrc}/**/*-value.js`,
    `${paths.appSrc}/**/*-provider.js`,
    `${paths.appSrc}/**/*-factory.js`,
    `${paths.appSrc}/**/*-service.js`,
    `${paths.appSrc}/**/*-directive.js`,
    `${paths.appSrc}/**/*-controller.js`,
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
