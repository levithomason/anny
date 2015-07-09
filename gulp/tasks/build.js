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
  var webpack = require('webpack');

  // http://webpack.github.io/docs/configuration.html
  var webpackOpts = {
    entry: paths.anny + '/Anny.js',
    output: {
      path: paths.dist,
      filename: 'anny.js',
      output: {
        library: 'anny',
        libraryTarget: 'umd'
      },
      resolve: {
        root: paths.root,
        modulesDirectories: paths.node_modules
      }
    }
  };

  // http://webpack.github.io/docs/node.js-api.html#stats
  var webpackOutputOpts = {
    hash: false,            // the hash of the compilation
    version: false,         // webpack version info
    timings: true,          // timing info
    assets: true,           // assets info
    chunks: false,          // chunk info
    colors: false,          // with console colors
    chunkModules: false,    // built modules info to chunk info
    modules: false,         // built modules info
    cached: false,          // also info about cached (not built) modules
    reasons: false,         // info about the reasons why modules are included
    source: false,          // the source code of modules
    errorDetails: true,     // details to errors (like resolving log)
    chunkOrigins: false,    // the origins of chunks and chunk merging info
    modulesSort: '',        // (string) sort the modules by that field
    chunksSort: '',         // (string) sort the chunks by that field
    assetsSort: ''          // (string) sort the assets by that field
  };

  // run webpack
  webpack(webpackOpts, function(err, stats) {
    if (err) {
      throw new g.util.PluginError('webpack', err);
    }

    g.util.log(
      g.util.colors.green('[webpack]'),
      stats.toString(webpackOutputOpts)
    );

    cb();
  });
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
