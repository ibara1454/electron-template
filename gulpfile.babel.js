import gulp from 'gulp';
import babel from 'gulp-babel';
import gulpif from 'gulp-if';
import useref from 'gulp-useref';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
import electronCollect from 'electron-connect';

const electron = electronCollect.server.create();

const mode = process.env.NODE_ENV || 'development';
const isProd = mode === 'production';

gulp.task('compile:js', () => {
  // Sets `mode` to given mode
  webpackConfig.mode = mode;
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('build'));
});

gulp.task('copy:html', () => {
  return gulp.src('src/**/*.html', {base: 'src'})
    .pipe(gulpif(isProd, useref()))
    .pipe(gulp.dest('build'));
});

gulp.task('copy:entry', () => {
  return gulp.src('src/index.js', {base: 'src'})
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('copy', gulp.parallel('copy:html', 'copy:entry'));

gulp.task('compile', gulp.task('compile:js'));

gulp.task('electron:reload', (done) => {
  electron.reload();
  done();
});

gulp.task('electron:restart', (done) => {
  electron.restart();
  done();
});

gulp.task('watch:entry', () => {
  gulp.watch('src/index.js', gulp.series('copy:entry', 'electron:restart'));
});

gulp.task('watch:html', () => {
  gulp.watch('src/**/*.html', gulp.series('copy:html', 'electron:reload'));
});

gulp.task('watch:js', () => {
  gulp.watch(['!src/index.js', 'src/**/*.js', 'src/components/**/*.vue'],
    gulp.series('compile:js', 'electron:reload')
  );
});

gulp.task('watch',
  gulp.parallel('watch:html', 'watch:entry', 'watch:js')
);

gulp.task('server', (done) => {
  electron.start();
  done();
});

gulp.task('build', gulp.parallel('compile', 'copy'));

gulp.task('build:watch', gulp.series('build', 'server', 'watch'));

gulp.task('default', gulp.task('build'));
