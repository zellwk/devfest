var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function (cb) {
  runSequence('clean:dist', ['browserify', 'handlebars', 'sass'], ['useref', 'fonts', 'images', 'svgmin'], cb)
})