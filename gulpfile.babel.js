// generated on 2017-07-15 using generator-chrome-extension 0.6.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins();

gulp.task('icons', () => {
  return gulp.src('app/icons/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/icons'));
});

gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest.json')
    .pipe($.chromeManifest({
      buildnumber: true,
      background: {
        target: 'scripts/background.js'
      }
  }))
    .pipe(gulp.dest('dist'));
});

gulp.task('babel', () => {
  return gulp.src('dist/scripts/**')
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('stuff', () => {
  return gulp.src(['app/_locales/**']).pipe(gulp.dest('dist/_locales'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('package', function () {
  var manifest = require('./dist/manifest.json');
  return gulp.src('dist/**')
      .pipe($.zip('donna-' + manifest.version + '.zip'))
      .pipe(gulp.dest('package'));
});

gulp.task('hot', function () {
  return $.watch(
    [
      'app/app/components/**',
      'app/app/middleware/**',
      'app/app/assets/**',
      'app/scripts/**'
    ],
    { ignoreInitial: true }
  )
    .pipe($.shell(['npm start']));
});

gulp.task('build', (cb) => {
  runSequence(
    'stuff',
    'chromeManifest',
    'babel',
    'icons',
    'size',
    cb
  );
});

gulp.task('default', ['clean'], cb => {
  runSequence('build', cb);
});
