var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function (cb) {
  runSequence('clean:dev', ['sass', 'watchify', 'browserSync', 'handlebars'], 'watch', cb);
})