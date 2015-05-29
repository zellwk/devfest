var src = './app';
var dest = './dist';

module.exports = {
  src: src,
  dest: dest,
  autoprefixer: {
    browsers: ['last 2 versions'],
  },
  browserify: {
    entries: src + '/js/main.js',
    dest: src + '/js/b/',
    outputName: 'bundle.js',
    transform: ['browserify-shim'],
    extensions: ['.hbs'],
    require: ['jquery', 'lodash'],
  },
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: src
        // proxy: "yourlocal.dev"
    }
  },
  fonts: {
    src: src + '/fonts/*',
    dest: dest + '/fonts'
  },
  handlebars: {
    src: src + '/views/**/*.{hbs,handlebars}',
    excludeSrc: '!' + src + '/views/**/_*.{hbs,handlebars}',
    dest: src,
    batch: src + '/views',
    data: src + '/handlebars/data.json',
    helpers: '../.' + src + '/handlebars/helpers',
    extname: '.html'
  },
  images: {
    src: [src + '/images/**/*.{png,jpg,gif}', '!' + src + '/images/sprites/*'],
    dest: dest + '/images',
    options: {
      optimizationLevel: 5,
      progressive: true,
      interlaced: true,
      multipass: true
    }
  },
  sass: {
    src: src + '/scss/**/*.{scss,sass}',
    dest: src + '/css',
    includePaths: [src + '/bower_components']
  },
  svg: {
    src: src + '/images/**/*.svg',
    dest: dest + '/images',
  },
  sprites: {
    src: src + '/images/sprites/*.{png,jpg}',
    imageDest: src + '/images',
    sassDest: src + '/scss',
    options: {
      cssPath: '../images',
      name: 'sprite',
      retina: true,
      style: '_sprite.scss',
      prefix: 'sprite',
      processor: 'scss'
    }
  }
}
