'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('bower.json', ['wiredep']);
});
