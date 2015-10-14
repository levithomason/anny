var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var paths = require('../paths');

gulp.task('serve', 'start the livereload dev server', function(cb) {
  return gulp.src([
    paths.root,
    paths.appDist,
    paths.docsDist,
  ])
    .pipe(g.webserver({
      port: 8000,
      host: 'localhost',
      directoryListing: false,
      open: false,
      fallback: 'index.html',
      livereload: {
        enable: true,
        filter: function(filePath) {
          var isAppDist = filePath.match(paths.appDist);
          var isAnnyDist = filePath.match(paths.annyDist);
          var isDocsDist = filePath.match(paths.docsDist);

          return isAppDist || isAnnyDist || isDocsDist;
        }
      }
    }));
});
