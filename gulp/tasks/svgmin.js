var gulp = require ('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config').svg;

gulp.task('svgmin', function () {
  return gulp.src(config.src)
    .pipe($.svgmin())
    .pipe($.size({'title': 'svg'}))
    .pipe(gulp.dest(config.dest));
})