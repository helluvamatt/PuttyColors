var path = require('path');
var gulp = require('gulp');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var cssBase64 = require('gulp-css-base64');

var fonts = [
    'bower_components/bootstrap/dist/fonts/*',
    'bower_components/font-awesome/fonts/*'
];

var images = [
    'assets/img/*.png',
    'assets/img/*.jpg',
    'assets/img/*.gif'
];

var scripts = [
    'bower_components/tinycolor/tinycolor.js',
    'bower_components/tv4/tv4.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-minicolors/jquery.minicolors.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-json-validator/angular-json-validator.js',
    'bower_components/angular-minicolors/angular-minicolors.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'assets/js/*.js'
];

var stylesheets = [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/jquery-minicolors/jquery.minicolors.css',
    'assets/css/*.css',
];

gulp.task('images', ['bower'], function() {
    return gulp.src(images)
        .pipe(gulp.dest('www/assets/img/'));
});

gulp.task('fonts', ['bower'], function() {
    return gulp.src(fonts)
        .pipe(gulp.dest('www/assets/fonts'));
});

gulp.task('stylesheets', ['bower'],function() {
    return gulp.src(stylesheets)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('www/assets/css'))
        //.pipe(rename('app.min.css'))
        //.pipe(cleanCSS())
        //.pipe(gulp.dest('www/assets/css'));
});

gulp.task('scripts', ['bower'], function() {
    return gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('www/assets/js'))
        //.pipe(rename('app.min.js'))
        //.pipe(uglify())
        //.pipe(gulp.dest('www/assets/js'));
});

gulp.task('themes', ['bower'], function() {
    return gulp.src('assets/themes/**/theme.css')
        .pipe(cssBase64())
        .pipe(rename(function(filepath) {
            filepath.basename = path.basename(filepath.dirname);
            filepath.dirname = path.dirname(filepath.dirname);
        }))
        .pipe(gulp.dest('www/assets/themes'));
});

gulp.task('bower', function() {
    return bower();
});

gulp.task('assets', ['images', 'fonts', 'stylesheets', 'scripts', 'themes']);

gulp.task('default', ['assets']);