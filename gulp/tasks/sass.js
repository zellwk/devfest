var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var sassConfig = require('../config').sass;
var autoprefixerConfig = require('../config').autoprefixer;

gulp.task('sass', function() {
  return gulp.src(sassConfig.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: sassConfig.includePaths,
      errLogToConsole: true
    }))
    .pipe($.autoprefixer(autoprefixerConfig))
    .pipe($.sourcemaps.write())
    .pipe($.size({
      title: 'styles'
    }))
    .pipe(gulp.dest(sassConfig.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
})
