const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

gulp.task('eslint', () => {
  gulp.src('**/*.js')
    .pipe(eslint({
      configFile: '.eslintrc',
    }))
    .pipe(eslint.format())
    .pipe(eslint.result((result) => {
      if (result.messages.length) {
        console.log(result.filePath);
        result.messages.forEach((item) => {
          console
            .log(`Line: ${item.line}, Column: ${item.column}: ${item.message}`);
        });
      }
    }))
    .pipe(eslint.failAfterError());
});

gulp.task('dev', () => {
  nodemon({
    script: 'server.js',
    tasks: ['eslint'],
  });
});

gulp.task('default', ['dev']);
