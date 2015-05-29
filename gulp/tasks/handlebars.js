var fs = require('fs');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config').handlebars;

var readJSON = function(file) {
  var file = fs.readFileSync(file, 'UTF8');
  return JSON.parse(file);
}

// Compile Handlebars views into HTML views
gulp.task('handlebars', function() {
  return gulp.src([config.src, config.excludeSrc])
    .pipe($.plumber())
    .pipe($.compileHandlebars(readJSON(config.data), {
      batch: config.batch,
      helpers: require(config.helpers),
    }))
    .pipe($.rename(function(path) {
      path.extname = config.extname;
    }))
    .pipe($.size({
      title: 'handlebars'
    }))
    .pipe(gulp.dest(config.dest))
})
