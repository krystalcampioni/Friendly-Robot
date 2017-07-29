[![Code Climate](https://codeclimate.com/github/krystalcampioni/gulp-pug-bourbon-neat-boilerplate/badges/gpa.svg)](https://codeclimate.com/github/krystalcampioni/Friendly-Robot)
[![dependencies Status](https://david-dm.org/jakemmarsh/angularjs-gulp-browserify-boilerplate/status.svg)](https://david-dm.org/krystalcampioni/Friendly-Robot) [![devDependency Status](https://david-dm.org/jakemmarsh/angularjs-gulp-browserify-boilerplate/dev-status.svg)](https://david-dm.org/krystalcampioni/Friendly-Robot)


# Friendly Robot
This is an opinionated starter boilerplate that uses Gulp, Pug ( formerly Jade ), Bourbon and Neat


## Running the project
1. `$ git clone git@github.com:krystalcampioni/Friendly-Robot.git`
2. `$ cd Friendly-Robot`
3. `$ npm install` or `$ yarn` if you use [Yarn](https://yarnpkg.com/) as package manager
4. `$ gulp`

This will start a local server at [http://localhost:1111/](http://localhost:1111/)

The files will be compiled, concatenated, minified, compressed and output to the `Docs` folder

## Features
 - Live reload via [gulp-webserver](https://www.npmjs.com/package/gulp-webserver)
 - Minified CSS via [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
 - Sass globbing support via [node-sass-globbing](https://www.npmjs.com/package/node-sass-globbing)
 - Removes unused CSS classes via [gulp-purifycss](https://github.com/purifycss/gulp-purifycss)
 - Bourbon support via [node-bourbon](https://www.npmjs.com/package/node-bourbon)
 - Neat support via [node-neat](https://www.npmjs.com/package/node-neat)
 - Concat and minified JS via [gulp-concat](https://www.npmjs.com/package/gulp-concat) and [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
 - Minified HTML via [gulp-minify-html](https://www.npmjs.com/package/gulp-minify-html)
 - Pug templates support via [gulp-pug](https://www.npmjs.com/package/gulp-pug)
 - Image compression via [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
