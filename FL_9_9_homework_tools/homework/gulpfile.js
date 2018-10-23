const gulp = require('gulp');
const connect = require('gulp-connect');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const del = require('del');
const jshint = require('gulp-jshint');
const watch = require('gulp-watch');

gulp.task('default', function () {
  runSequence('build', 'connect', 'reload-css-js', 'watch');
});

gulp.task('build', function () {
  runSequence('clean', ['js-dev-version', 'css-dev-version', 'copy-html']);
});

gulp.task('build-prod', function () {
  runSequence('clean', ['js-prod-version', 'css-prod-version', 'copy-html-prod']);
});

gulp.task('lint', function () {
  return gulp.src('src/js*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
  return del('dist', 'bin');
});

gulp.task('connect', function () {
  connect.server({
    name: 'Clock App',
    root: 'bin',
    port: 8080,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./bin/*.html')
    .pipe(gulp.dest('./bin'))
    .pipe(connect.reload());
});

gulp.task('reload-css-js', function () {
  gulp.src(['./bin/css/*.css', './bin/js/*.js'])
    .pipe(watch(['./bin/css/*.css', './bin/js/*.js']))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/sass/*.scss', ['css-dev-version']);
  gulp.watch('./src/js/*.js', ['js-dev-version']);
});

gulp.task('js-dev-version', function () {
  return gulp.src(['node_modules/moment/min/moment.min.js', 'src/js/canvasState.js', 'src/js/clock.js', 'src/js/app.js'])
      .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))             
        .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('bin/js'));
});

gulp.task('css-dev-version', function () {
  return gulp.src('./src/sass/*.scss')
      .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('bin/css'));
});

gulp.task('js-prod-version', function () {
  return gulp.src(['node_modules/moment/min/moment.min.js', 'src/js/canvasState.js', 'src/js/clock.js', 'src/js/app.js'])
      .pipe(concat('app.min.js'))      
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('css-prod-version', function () {
  return gulp.src('./src/sass/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(concat('style.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/css'));
});  

gulp.task('copy-html', function () {
  return gulp.src('src/app.html')
      .pipe(rename("index.html"))
      .pipe(gulp.dest("bin/"));
});

gulp.task('copy-html-prod', function() {
  return gulp.src('src/app.html')
      .pipe(rename("index.html"))
      .pipe(gulp.dest("dist/"));
});