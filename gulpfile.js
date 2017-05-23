const gulp = require('gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths;
    cleanCSS = require('gulp-clean-css');
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify'),
    concatify = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    minifyhtml = require('gulp-minify-html');
    pug = require('gulp-pug');
    nodeSassGlobbing = require('node-sass-globbing'),
    livereload = require('gulp-livereload');
    purify = require('gulp-purifycss');
    babel = require('gulp-babel');

// Paths to various files
var paths = {
    scripts: ['js/*'],
    styles: ['scss/main.scss','scss/**/*.scss', 'scss/*.scss'],
    images: ['images/**/*'],
    content: ['views/*.pug']
}

// Compiles scss files and outputs minified file to docs/css/*.css
gulp.task('styles', function() {
    return gulp.src(paths.styles)
      .pipe(sass({
          importer: nodeSassGlobbing,
          includePaths: ['styles'].concat(neat)
      }))
      .pipe(purify(['js/**/*.js', 'views/*.pug']))
      .pipe(cleanCSS({debug: true}, function(details) {
          console.log(details.name + ': ' + details.stats.originalSize);
          console.log(details.name + ': ' + details.stats.minifiedSize);
      }))
      .pipe(gulp.dest('./docs/css/'))
      .pipe(livereload());
});


// Concats & minifies js files and outputs them to docs/js/app.js
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(babel({
           presets: ['es2015']
        }))
        .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concatify('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./docs/js/'))
        .pipe(livereload());
});

// Minifies our HTML files and outputs them to docs/*.html

gulp.task('content', function() {
    return gulp.src(paths.content)
        .pipe(pug())
        .pipe(minifyhtml({
            empty: true,
            quotes: true
        }))
        .pipe(gulp.dest('./docs'))
        .pipe(livereload());
});

// Optimizes our image files and outputs them to docs/image/*
gulp.task('images', function() {
    return gulp.src(paths.images)
                .pipe(imagemin({
                    optimizationLevel: 5
                }))
                .pipe(gulp.dest('./docs/images'))
                .pipe(livereload());
})

// Watches for changes to our files and executes required scripts
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.content, ['content']);
    gulp.watch(paths.images, ['images']);
});

// Launches a test webserver
gulp.task('webserver', function() {
    gulp.src('docs')
        .pipe(webserver({
            livereload: true,
            port: 1111
        }));
});

gulp.task('default', ['watch', 'webserver']);
