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
gulp.task('gnb', function() {
  return gulp.src('js_src/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('gnb.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('jsconcat', ['gnb']);

gulp.task('default', ['livereload', 'include', 'sass', 'jsconcat', 'watch'] );
