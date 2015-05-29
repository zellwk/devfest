# Starter Kit

This is [Zell's](http://www.zell-weekeat.com) personal starter kit for all his frontend projects. 

## Initialization

Install Node dependencies 

~~~
$ npm install
~~~

Install Bower dependencies

~~~
$ bower install
~~~

## Usage 

### Development

This project uses [Gulp]() to watch for changes in HTML, Sass, JS, images. Whenever a file is changed, the project is recompiled. 

Here are the file locations: 

HTML - `app/views`. Uses handlebars templating engine
SCSS - `app/scss`
JS - `app/js`
Images - `app/images`

Run this command to get the dev server up and running

~~~
$ gulp
~~~

### Production

Run this command to build for production. Minified and revved files are found under the `dist` folder

~~~
$ gulp build
~~~

That's it!

## Detailed Usage 

I'm working on a video tutorial to walk you through everything in here. Will update when it's done! 