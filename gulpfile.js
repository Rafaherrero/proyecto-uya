'use strict';

const gulp = require('gulp'),
      clean = require('gulp-clean');

gulp.task('clean', () => {
    return gulp.src([
            'public/stylesheets/*.css'
        ])
        .pipe(clean());
});
