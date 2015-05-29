var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config');

// Watch for file changes 
gulp.task('watch', function() {
  gulp.watch(config.sass.src , ['sass']);
  gulp.watch([config.handlebars.src, config.handlebars.data, config.handlebars.helpers], ['handlebars', browserSync.reload]);
})