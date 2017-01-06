var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var cssBase64 = require('gulp-css-base64');

var fonts = [
    'bower_components/font-awesome/fonts/*',
    'bower_components/bootstrap/dist/fonts/*'
];

var images = [
    'bower_components/jquery-minicolors/jquery.minicolors.png',
    'assets/img/*.png',
    'assets/img/*.jpg',
    'assets/img/*.gif'
];

var scripts = [
    'bower_components/angular/angular.js',
    'bower_components/angular-animage/angular-animate.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-json-validator/angular-json-validator.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-minicolors/jquery-minicolors.js',
    'bower_components/tinycolor/tinycolor.js',
    'bower_components/tv4/tv4.js',
    'assets/js/*.js'
];

var stylesheets = [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/jquery-minicolors/jquery.minicolors.css',
    'assets/css/*.css',
];

gulp.task('images', function() {
    return gulp.src(images)
        .pipe(gulp.dest('www/assets/img/'));
});

gulp.task('fonts', function() {
    return gulp.src(fonts)
        .pipe(gulp.dest('www/assets/fonts'));
});

gulp.task('stylesheets', function() {
    return gulp.src(stylesheets)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('www/assets/css'))
        .pipe(rename('app.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('www/assets/css'));
});

gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('www/assets/'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('www/assets'));
});

gulp.task('themes', function() {
    return gulp.src('assets/themes/**/theme.css')
        .pipe(cssBase64())
        .pipe(rename(function(filepath) {
            filepath.basename = path.basename(filepath.dirname);
            filepath.dirname = path.dirname(filepath.dirname);
        }))
        .pipe(gulp.dest('www/assets/themes'));
});

gulp.task('watch', function() {
    gulp.watch(scripts, ['scripts']);
    gulp.watch(stylesheets, ['stylesheets']);
    gulp.watch('assets/themes/**/*', ['themes']);
    gulp.watch(images, ['images']);
    gulp.watch(fonts, ['fonts']);
});

gulp.task('assets', ['images', 'fonts', 'stylesheets', 'scripts', 'themes']);

gulp.task('default', ['assets', 'watch']);