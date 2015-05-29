var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var _ = require('lodash');
var browserSync = require('browser-sync');
var config = require('../config').browserify;

function browserifyTask(devMode) {
  var b = browserify(config);

  if (devMode) {
    config = _.extend(watchify.args, config, {
      debug: true
    });
    // config = _.omit(config, ['external', 'require']);
    b = watchify(browserify(config));
  }

  function bundle() {
    return b
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(config.outputName))
      // optional, remove if you don't need to buffer file contents
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      // Add transformation tasks to the pipeline here.
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.reload({
        stream: true
      }));
  }

  bundle();

  if (devMode) {
    b.on('update', bundle); // on any dep update, runs the bundler
    b.on('log', gutil.log); // output build logs to terminal
  }
}

gulp.task('browserify', function() {
  browserifyTask();
});



module.exports = browserifyTask;
