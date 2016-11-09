var gulp = require('gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths;
    cleanCSS = require('gulp-clean-css');
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify'),
    concatify = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    minifyhtml = require('gulp-minify-html');

// Paths to various files
var paths = {
    scripts: ['js/*.js'],
    styles: ['scss/main.scss','scss/**/*.scss', 'scss/*.scss'],
    images: ['images/**/*'],
    content: ['index.html']
}

// Compiles scss files and outputs minified file to docs/css/*.css
gulp.task('styles', function() {
    return gulp.src(paths.styles)
      .pipe(sass({
          includePaths: ['styles'].concat(neat)
      }))
      .pipe(gulp.dest('./docs/css'))
      .pipe(cleanCSS({debug: true}, function(details) {
          console.log(details.name + ': ' + details.stats.originalSize);
          console.log(details.name + ': ' + details.stats.minifiedSize);
      }))
      .pipe(gulp.dest('./docs/css/'));
});


// Concats & minifies js files and outputs them to docs/js/app.js
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concatify('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./docs/js/'));
});

// Minifies our HTML files and outputs them to docs/*.html
gulp.task('content', function() {
    return gulp.src(paths.content)
        .pipe(minifyhtml({
            empty: true,
            quotes: true
        }))
        .pipe(gulp.dest('./docs'))
});

// Optimizes our image files and outputs them to docs/image/*
gulp.task('images', function() {
    return gulp.src(paths.images)
                .pipe(imagemin({
                    optimizationLevel: 5
                }))
                .pipe(gulp.dest('./docs/images'))
})

// Watches for changes to our files and executes required scripts
gulp.task('watch', function() {
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
