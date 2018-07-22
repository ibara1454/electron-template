import gulp from 'gulp';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';
import electronCollect from 'electron-connect';

const electron = electronCollect.server.create();

gulp.task('compile:js', () => {
  return gulp.src('src/app.js')
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'app.js'
      },
      module: {
        rules: [
          {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
          {test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader'}
        ]
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy:html', () => {
  return gulp.src('src/**/*.html', {base: 'src'})
    .pipe(gulp.dest('dist'));
});

gulp.task('copy:setting', () => {
  return gulp.src('src/main.js', {base: 'src'})
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', gulp.parallel('copy:html', 'copy:setting'));

gulp.task('compile', gulp.task('compile:js'));

gulp.task('electron:reload', (done) => {
  electron.reload();
  done();
});

gulp.task('electron:restart', (done) => {
  electron.restart();
  done();
});

gulp.task('watch:setting', () => {
  gulp.watch('src/main.js', gulp.series('copy:setting', 'electron:restart'));
});

gulp.task('watch:html', () => {
  gulp.watch('src/**/*.html', gulp.series('copy:html', 'electron:reload'));
});

gulp.task('watch:js', () => {
  gulp.watch(['src/app.js', 'components/**/*.vue'],
    gulp.series('compile:js', 'electron:reload')
  );
});

gulp.task('watch',
  gulp.parallel('watch:html', 'watch:setting', 'watch:js')
);

gulp.task('server', (done) => {
  electron.start();
  done();
});

gulp.task('build', gulp.parallel('compile', 'copy'));

gulp.task('default', gulp.series('build', 'server', 'watch'));
