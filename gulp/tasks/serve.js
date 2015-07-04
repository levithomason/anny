var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var paths = require('../paths');

gulp.task('serve', 'start the livereload dev server', function(cb) {
  return gulp.src([
    paths.root
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
          var isDist = filePath.match(paths.dist);
          var shouldReload = isDist;
          // console.log(shouldReload, isDist);

          return shouldReload;
        }
      }
    }));
});
