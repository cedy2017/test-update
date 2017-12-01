var gulp = require('gulp'),
  less = require('gulp-less'),
  cssmin = require('gulp-cssmin');

gulp.task('watch', function () {
  gulp.watch('app/style/*.less', ['less']);
});

gulp.task('less', function () {
  return gulp.src('app/style/main.less')
    .pipe(less().on('error', function (err) {
      console.log(err);
    }))
    .pipe(cssmin().on('error', function(err) {
      console.log(err);
    }))
    .pipe(gulp.dest('app/public/css/'));

});

gulp.task('default', ['less', 'watch']);