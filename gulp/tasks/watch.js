const g = require('gulp-load-plugins')();
const gulp = g.help(require('gulp'), require('../gulphelp'));
import paths from '../../paths';

gulp.task('watch', 'rebuild when files change', cb => {
  gulp.watch([
    // anny
    paths.annyEntry,
    `${paths.annySrc}/**/*`,

    // app
    `${paths.root}/index.html`,
    `${paths.appSrc}/**/*`,
  ], ['build']);

  // docs
  gulp.watch([
    `${paths.root}/README.md`,
    `${paths.docsSrc}/**/*`,
    `!${paths.docsSrc}/**/*.less`,
  ], ['docs']);

  // docs less
  gulp.watch([
    `${paths.docsSrc}/**/*.less`,
  ], ['docs-less']);

  cb();
});
