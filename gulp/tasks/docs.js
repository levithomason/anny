const g = require('gulp-load-plugins')();
const gulp = g.help(require('gulp'), require('../gulphelp'));
import del from 'del';
import {exec} from 'child_process';
import runSequence from 'run-sequence';

import pkg from '../../package.json';
import paths from '../../paths';

gulp.task('docs', 'build docs for the current version', cb => {
  runSequence(
    'docs-clean',
    'docs-jsdoc',
    'docs-less',
    'docs-index-html',
    cb
  );
});

gulp.task('docs-clean', cb => {
  del(`${paths.docsDist}/${pkg.version}`, cb);
});

gulp.task('docs-jsdoc', cb => {
  exec([
    `$(npm bin)/jsdoc -c conf.json`,

    `mv ${paths.docsDist}/${pkg.name}/${pkg.version} ${paths.docsDist}`,
    `rm -rf ${paths.docsDist}/${pkg.name}`,

    // remove fonts
    `rm -rf ${paths.docsDist}/${pkg.version}/fonts`

  ].join(' && '), cb);
});

gulp.task('docs-less', cb => {
  return gulp.src([
      `${paths.docsSrc}/static/styles/*.less`
    ])
    .pipe(g.plumber())
    .pipe(g.less())
    .pipe(g.autoprefixer())
    .pipe(gulp.dest(`${paths.docsDist}/${pkg.version}/styles`));
});

gulp.task('docs-index-html', cb => {
  return gulp.src([`${paths.docsSrc}/index.html`])
    .pipe(g.replace(/CURRENT_PACKAGE_VERSION/g, `dist/${pkg.version}`))
    .pipe(gulp.dest(paths.docsRoot));
});
