(() => {
    'use strict';

    const gulp        = require('gulp');
    const clean       = require('gulp-clean');
    const gls         = require('gulp-live-server');
    const jshint      = require('gulp-jshint');
    const jscs        = require('gulp-jscs');

    gulp.task('default', ['serve']);

    gulp.task('clean-all', ['clean'], () => {
        return gulp.src([
                'node_modules',
                'public/vendor'
            ])
            .pipe(clean());
    });

    gulp.task('serve', () => {
        var server = gls.new('bin/www');
        server.start();

        gulp.watch([
                'app/**/*.js',
                'bin/www',
                'config/**/*.js',
                'app.js'
            ],
            (file) => {
                console.log(`[GLS] ${file} changed`);
                var promise = server.stop();
                promise.then(() => {
                    server.start();
                });
            }
        );

        gulp.watch('myapp.js', server.start.bind(server));
    });

    gulp.task('lint', ['lint:jshint', 'lint:jscs']);

    // Tarea para pasar el JSHint a el código
    gulp.task('lint:jshint', () => {
        return gulp.src([
                'gulpfile.js',
                'public/js/**/*.js',
                'routes/**/*.js',
                'assets/modules/**/*.js',
                'db/models/**/*.js',
                'config/**/*.js'
            ])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'));
    });

    // Tarea para pasar el JSCS a el código
    gulp.task('lint:jscs', () => {
        return gulp.src([
                'gulpfile.js',
                'public/js/**/*.js',
                'routes/**/*.js',
                'assets/modules/**/*.js',
                'db/models/**/*.js'
            ])
            .pipe(jscs())
            .pipe(jscs.reporter());
    });
})();
