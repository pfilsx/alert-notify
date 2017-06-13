var gulp = require('gulp');
var compress = require('gulp-yuicompressor');
var closure = require('gulp-closure-compiler-service');
var rename = require('gulp-rename');
var insert = require('gulp-insert');

gulp.task('minify-css', function () {
    return gulp.src('src/css/*.css')
        .pipe(compress({type: 'css'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function () {
    return gulp.src('src/js/*.js')
        .pipe(closure({language: 'ECMASCRIPT5'}))
        .pipe(insert.prepend(copyright))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['minify-css', 'minify-js']);

var copyright = `/* Alert Notifications Library 1.0.0 

Copyright 2016, Pavel Filimonov
filimonps@gmail.com

Dependencies:
jQuery
http://jquery.com/
    Copyright 2011, John Resig
Dual licensed under the MIT or GPL Version 2 licenses.
    http://jquery.org/license

Font Awesome(optional)
http://fontawesome.io/
    Created by Dave Gandy
Font Awesome licensed under SIL OFL 1.1
Code licensed under MIT License
Documentation licensed under CC BY 3.0
*/`;
