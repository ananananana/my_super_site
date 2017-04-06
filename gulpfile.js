var gulp = require('gulp');
var	concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var rebaseUrls = require('gulp-css-rebase-urls');
var bless = require('gulp-bless');
 
gulp.task('bless', function() {
    gulp.src('./style.css')
        .pipe(bless())
        .pipe(gulp.dest('./'));
});
 
gulp.task('rebase', function () {
    gulp.src('./assets/css/*.css')
        .pipe(rebaseUrls())
        .pipe(concat('style.css')) // <-- just an example 
        .pipe(gulp.dest('./'));
});


gulp.task('cssConcat', function() {
  gulp.src('./style.css')
  .pipe(autoprefixer({
	  browsers: ['last 4 version'],
	  cascade:true
  }))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./public'))
  });

gulp.task('cssmin', function() {
  gulp.src('./public/all.css')
  .pipe(cssmin())
  .pipe(concat('all.min.css'))
  .pipe(gulp.dest('./public'))
  });

gulp.task('sass', function () {
  return gulp.src('./assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('watch', function () {
  gulp.watch('./assets/scss/*.scss', ['sass']);
	gulp.watch('./assets/css/*.css', ['rebase']);
	gulp.watch('./style.css', ['bless', 'cssConcat']);
	gulp.watch('./public/*.css', ['cssmin']);
});
