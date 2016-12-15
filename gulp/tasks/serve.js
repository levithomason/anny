import paths from '../../paths'

const g = require('gulp-load-plugins')()
const gulp = g.help(require('gulp'), require('../gulphelp'))

gulp.task('serve', 'start the livereload dev server', () => gulp.src([
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
      filter: (filePath) => {
        const isAppDist = filePath.match(paths.appDist)
        const isAnnyDist = filePath.match(paths.annyDist)
        const isDocsDist = filePath.match(paths.docsDist)

        return isAppDist || isAnnyDist || isDocsDist
      },
    },
  })))
