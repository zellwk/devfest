var gulp = require ('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config').images;

gulp.task('images', function () {
  return gulp.src(config.src)
    .pipe($.newer(config.dest))
    .pipe($.imagemin(config.options))
    .pipe($.size({'title': 'images'}))
    .pipe(gulp.dest(config.dest));
})