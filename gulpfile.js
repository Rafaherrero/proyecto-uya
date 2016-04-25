'use strict';

const gulp = require('gulp'),
      clean = require('gulp-clean'),
      browserSync = require('browser-sync'),
      nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync']);

gulp.task('clean', () => {
    return gulp.src([
            'public/stylesheets/*.css'
        ])
        .pipe(clean());
});

gulp.task('browser-sync', ['nodemon'], () => {
    browserSync.init(null, {
        proxy: 'http://localhost:8080',
        files: [
            'views/**/*.ejs',
            'public/javascripts/**/*.js',
            'public/images/**/*.*',
            'public/vendor/**/*.*',
            'assets/public/stylesheets/**/*.scss'
        ],
        port: 3000
    });
});

gulp.task('nodemon', (cb) => {
    var started = false;

    return nodemon({
        script: 'bin/www'
    }).on('start', () => {
        if (!started) {
            cb();
            started = true;
        }
    });
});
