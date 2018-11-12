//'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    cleanCss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    webserver = require('gulp-webserver'),
    webserver = require('gulp-webserver'),
    prettyError = require('gulp-prettyerror'),
    del = require('del');

// directories
var appDir = "dist",
    mainDir = "/",
    assetsDir = appDir + '/assets/',
    sourceDir = 'src/',
    sassFiles = sourceDir + 'stylesheets/',
    fontsFiles = sourceDir + 'fonts/',
    imgFiles = sourceDir + 'img/',
    cssAssetsDir = assetsDir + 'css/',
    jsAssetsDir = assetsDir + 'js/',
    jsFiles = [
                'src/javascripts/main.js'
              ],
    fontsDir = assetsDir + 'fonts/';

var options = {
    sass: {}
};

gulp.task('sass:build', function() {
    return gulp.src(sassFiles + 'all.scss')
        .pipe(rename('styles.css'))
        .pipe(sourcemaps.init())
        .pipe(sass(options.sass).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Explorer >= 11'] }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssAssetsDir));
});

gulp.task('sass:build:minify', function() {
    return gulp.src(sassFiles + 'all.scss')
        .pipe(rename('styles.css'))
        .pipe(sourcemaps.init())
        .pipe(sass(options.sass).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Explorer >= 11'] }))
        .pipe(cleanCss({ compatibility: 'ie11' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssAssetsDir));
});

gulp.task('sass:build_and_sync', function() {
    runSequence('sass:build');
});

gulp.task('js:build:assets', function() {
  return gulp.src(jsFiles)
    .pipe(sourcemaps.init())
      .pipe(babel({
          presets: [
            ['@babel/env', { "modules": false }]
          ]
        }))
      .pipe(prettyError())
      .pipe(concat('scripts.js'))
      .pipe(sourcemaps.write({ addComment: false }))
      .pipe(gulp.dest(jsAssetsDir));
});

gulp.task('js:assets:build_and_sync', function() {
    runSequence('js:build:assets');
});

gulp.task('js:minify', function() {
    gulp.src(jsAssetsDir + '**')
        .pipe(minify())
        .pipe(gulp.dest(jsAssetsDir))
});

gulp.task('clean', function() {
    del(jsAssetsDir + 'scripts-min.js');
});

gulp.task('copy:html', function() {
    return gulp.src(sourceDir + '*.html')
        .pipe(gulp.dest(appDir));
});

gulp.task('copy:fonts', function() {
    gulp.src(fontsFiles + '/**')
        .pipe(gulp.dest(fontsDir));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', function() {
    options.sass = {
        sourceComments: true
    };

    gulp.watch('src/stylesheets/**/*.scss', ['sass:build_and_sync']);
    gulp.watch('src/javascripts/**/*.js', ['js:assets:build_and_sync']);
    gulp.watch('src/*.html', ['copy:html']);

    runSequence('webserver');
});

gulp.task('default', ['sass:build', 'js:build:assets', 'copy:fonts', 'copy:html', 'watch', 'webserver']);

gulp.task('prod', function() {
    runSequence('sass:build', 'clean', 'js:build:assets', 'js:minify', 'copy:fonts', 'copy:html', 'webserver');
});
