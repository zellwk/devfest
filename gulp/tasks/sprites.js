// NOTE SPRITES NOT READY YET! NEED SPRITE FOLDER

var gulp = require ('gulp');
var $ = require('gulp-load-plugins')();
var sprite = require('css-sprite').stream;
var config = require('../config').sprites;

// Generates sprites to be used in css
gulp.task('sprites', function() {
  return gulp.src(config.src)
    .pipe(sprite({
      cssPath: '../images',
      name: 'sprite',
      retina: true,
      style: '_sprite.scss',
      prefix: 'sprite',
      processor: 'scss'
    }))
    .pipe($.plumber())
    .pipe($.size({
      title: 'sprites'
    }))
    .pipe($.if('*.png', gulp.dest(config.imageDest), gulp.dest(config.sassDest)));
})