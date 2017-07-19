/**
 * Created by Administrator on 2017-07-03.
 */

// �������� = require('����̸�');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var include = require('gulp-include');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

// pipe() �� ����� ����� �������ִ� �Լ�

// ���ΰ�ħ
gulp.task('livereload', function(){
  gulp.src(['html/*', 'css/*', 'js/*', '*'])
      .pipe( livereload() );
});

// header, footer, ���뿵�� �и�
gulp.task('include', function(){
  gulp.src('html_src/*.html')
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest("html/"));
});

// sass ����
gulp.task('sass', function(){
  return gulp.src('css_src/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('css/'));
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('*', ['livereload']);
  gulp.watch('html_src/**', ['include', 'livereload']);
  gulp.watch('css_src/**', ['sass', 'livereload']);
  gulp.watch('js_src/**', ['jsconcat', 'livereload']);
});

// concat 실행 - 여러 개의 파일을 하나의 파일로 합치는 기능

gulp.task('tabmenu', function() {
  return gulp.src('js_src/tab_menu/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('tab_menu.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('gnbmenu', function() {
  return gulp.src('js_src/gnb_menu/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('gnb_menu.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('timingfunction', function() {
  return gulp.src('js_src/timing_function/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('timing_function.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('imagesliding', function() {
  return gulp.src('js_src/image_sliding/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('image_sliding.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('accmenu', function() {
  return gulp.src('js_src/acc_menu/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('acc_menu.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('jsconcat', ['tabmenu','gnbmenu','timingfunction', 'imagesliding', 'accmenu']);

gulp.task('default', ['livereload', 'include', 'sass', 'jsconcat', 'watch'] );
