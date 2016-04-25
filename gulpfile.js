'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass');


// Tarea que compila todos los sass del directorio /public/sass y los coloca
// en /public/css.
gulp.task('sass', () => {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});
