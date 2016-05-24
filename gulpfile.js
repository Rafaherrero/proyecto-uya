(() => {
  'use strict'

  const gulp = require('gulp')
  const clean = require('gulp-clean')
  const gls = require('gulp-live-server')
  const jstandard = require('gulp-standard')

  gulp.task('default', ['serve'])

  gulp.task('clean-all', ['clean'], () => {
    return gulp.src([
      'node_modules',
      'public/vendor'
    ])
    .pipe(clean())
  })

  gulp.task('serve', () => {
    var server = gls.new('bin/www')
    server.start()

    gulp.watch(
      [
        'app/**/*.js',
        'bin/www',
        'config/**/*.js',
        'app.js'
      ],
      (file) => {
        console.log(`[GLS] ${file} changed`)
        var promise = server.stop()
        promise.then(() => {
          server.start()
        })
      }
    )

    gulp.watch('myapp.js', server.start.bind(server))
  })

  gulp.task('lint', function () {
    return gulp.src(
      [
        'app/**/*.js',
        'bin/www',
        'config/**/*.js',
        'app.js',
        'test/**/*.js',
        'public/javascripts/**.js'
      ])
      .pipe(jstandard())
      .pipe(jstandard.reporter('default', {
        breakOnError: true
      }))
  })
})()
