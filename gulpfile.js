/**
 * Our Gulp tasks.
 *
 * @author Nathan Buchar
 * @ignore
 */

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
  return gulp.src('test/*.js', { read: false})
    .pipe(mocha());
});

gulp.task('watch', ['test'], function () {
  gulp.watch(['bin/**', 'lib/**'], ['test']);
});
