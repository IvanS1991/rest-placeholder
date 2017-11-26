const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

gulp.task('eslint', () => {
  gulp.src('**/*.js')
    .pipe(eslint({
      configFile: '.eslintrc',
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('dev', ['eslint'], () => {
  nodemon({
    script: 'server.js',
    tasks: ['eslint'],
  });
});

gulp.task('default', ['dev']);
