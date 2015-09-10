var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('clean:dev', function () {
  del([config.src + '/*.html']);
  del([config.browserify.dest]);
});

gulp.task('clean:dist', function () {
  del(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});