const clean = require('gulp-clean');
const gulp = require('gulp');
const { exec } = require('child_process');

gulp.task('build-react-dev-app', (cb) => {
  exec('cd src/react && npm run build', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('build-react-dev-app-netlify', (cb) => {
  exec('cd src/react && npm run build', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('clean-react-dev-app', () => gulp.src(['src/react/node_modules', './dist/react'], { read: false }).pipe(clean()));

gulp.task('install-react-dev-app', (cb) => {
  exec('cd src/react && npm install', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('link-spark-to-react-dir', (cb) => {
  gulp
    .src(
      [
        'src/react/node_modules/@sparkdesignsystem/spark-core',
        'src/react/node_modules/@sparkdesignsystem/spark-extras',
      ],
      { read: false },
    )
    .pipe(clean());
  exec(
    'cd src/react && npm link @sparkdesignsystem/spark-core && npm link @sparkdesignsystem/spark-card && npm link @sparkdesignsystem/spark-dictionary && npm link @sparkdesignsystem/spark-highlight-board',
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    },
  );
});

gulp.task('link-spark-core-react-to-react-dir', (cb) => {
  gulp
    .src(['./src/react/node_modules/@sparkdesignsystem/spark-core-react'], { read: false })
    .pipe(clean());
  exec('cd src/react && npm link @sparkdesignsystem/spark-core-react', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('serve-react-dev-app', (cb) => {
  exec('cd src/react && npm start', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('transfer-react-dev-app', () => {
  gulp.src('dist/react/build', { read: false }).pipe(clean());
  gulp.src('src/react/build/react/**/*').pipe(gulp.dest('dist/react'));
});
