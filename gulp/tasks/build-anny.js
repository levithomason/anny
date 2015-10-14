var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var del = require('del');
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('build-anny', function(cb) {
  runSequence(
    'clean-build-anny',
    'build-anny-js',
    cb
  );
});

gulp.task('clean-build-anny', function(cb) {
  del(paths.annyDist, cb);
});

gulp.task('build-anny-js', function(cb) {
  var webpack = require('webpack');

  // http://webpack.github.io/docs/configuration.html
  var webpackOpts = {
    entry: paths.annyEntry,
    output: {
      path: paths.annyDist,
      filename: 'anny.js',
      libraryTarget: 'umd',
      library: 'anny'
    },
    resolve: {
      root: paths.root,
      modulesDirectories: [
        paths.node_modules,
        '.'
      ]
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['eslint'],
          include: [paths.annySrc]
        }
      ]
    },
    externals: {
      mathjs: 'math',
      lodash: '_',
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
