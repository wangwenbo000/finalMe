var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var md5 = require('md5');

gulp.task('sass', function() {
  return gulp.src('./sass/style.scss')
    // .pipe(rename('home_style.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('home_style.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('../static/finalme/css/'));
});
gulp.task('template', function() {
  return gulp.src('./*.html')
    .pipe(replace('<{##vMd5##}>', md5(new Date().getTime())))
    .pipe(htmlmin({
      ignoreCustomFragments: [ /{%[\s\S]*?%}/, /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ],
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      decodeEntities: true,
      html5: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      processScripts: ['text/html'],
      // removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      // removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeTagWhitespace: true,
      sortAttributes: true,
      sortClassName: true,
      trimCustomFragments: true,
      useShortDoctype: true
    }))
    // .pipe(replace('CHANGE_VALUE_NO', 'WWB_' + md5(new Date().getTime())))
    .pipe(gulp.dest('../../view/'));
});
gulp.task('sitemap', function() {
  return gulp.src('./*.xml')
    .pipe(gulp.dest('../../view/'));
});
gulp.task('start', function() {
  gulp.watch('./sass/*.scss', ['sass', 'template']);
  gulp.watch('./*.html', ['template']);
  gulp.watch('./*.xml', ['sitemap']);
});
