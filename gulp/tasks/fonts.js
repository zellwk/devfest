var gulp = require ('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config').fonts;

gulp.task('fonts', function () {
  return gulp.src(config.src)
  .pipe($.size({title: 'fonts'}))
  .pipe(gulp.dest(config.dest));
})