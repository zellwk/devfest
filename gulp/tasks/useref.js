var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config');

gulp.task('useref', function() {
  var assets = $.useref.assets();

  return gulp.src(config.handlebars.dest + '/*' + config.handlebars.extname)
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.uncss({
      html: [config.handlebars.dest + '/*' + config.handlebars.extname],
      ignore: [/.is-open/],
    })))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.size({
      title: 'html'
    }))
    .pipe(gulp.dest(config.dest))
});
