'use strict';

var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  jscs = require('gulp-jscs'),
  jshint = require('gulp-jshint'),
  stylish = require('gulp-jscs-stylish'),
  scsslint = require('gulp-scss-lint'),
  tar = require('gulp-tar'),
  gutil = require('gulp-util'),
  ftp = require('gulp-ftp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  react = require('gulp-react'),
  rename = require('gulp-rename'),
  header = require('gulp-header'),
  settings = require('./settings.json'),
  pkg = require('./package.json'),
  bowerComponents,
  appComponents,
  sources,
  banner,
  bowerBanner;

sources = [
  'gulpfile.js',
  'src/**/*.js',
  '!node_modules/**/*.js',
  '!bower_components/**/*.js',
  '!src/**/*.min.js'
];

// Bower components
bowerComponents = [
  './bower_components/react/react-with-addons.min.js',
  './bower_components/react/react-dom.min.js',
  './bower_components/routie/dist/routie.min.js'
];

// React app components in the correct load order
appComponents = [
  './src/assets/react/collection-list.jsx',
  './src/assets/react/header.jsx',
  './src/assets/react/footer.jsx',
  './src/assets/react/about.jsx',
  './src/assets/react/album.jsx',
  './src/assets/react/home.jsx',
  './src/assets/react/collection.jsx',
  './src/assets/react/layout.jsx',
  './src/assets/react/router.jsx'
];

// Header for app.min.js
banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @git <%= pkg.repository.url %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// Header for bower_components.js
bowerBanner = ['/**',
  ' * Bower Components',
  ' * React 0.14.7 - https://github.com/facebook/react',
  ' * Routie 0.3.2 - https://github.com/jgallen23/routie',
  ' */',
  ''].join('\n');

// Check js code styling
gulp.task('jscs', function() {
  return gulp.src(sources)
  .pipe(jscs())
  .pipe(stylish());
});

// Check scss code styling
gulp.task('scss', function() {
  return gulp.src([
    'src/**/*.scss',
    '!**/bourbon/**',
    '!**/animatewithsass/**',
    '!**/meyer-reset.scss'
  ])
  .pipe(scsslint({
    'config': 'scss-lint.yml',
    'maxBuffer': 1307200
  }));
});

// Check js linting
gulp.task('lint', function() {
  return gulp.src(sources)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

// Render the scss
gulp.task('sass', function() {
  return sass('src/assets/sass/**/style.scss', {style: 'compressed'})
  .on('error', sass.logError)
  .pipe(gulp.dest('src/assets/stylesheets'));
});

// Concat the listed bower components and add header
gulp.task('bower', function() {
  return gulp.src(bowerComponents)
  .pipe(concat('bower_components.js'))
  .pipe(header(bowerBanner))
  .pipe(gulp.dest('./src/assets/'));
});

// Concat all the app components, render jsx, uglify and add header
gulp.task('build', function() {
  return gulp.src(appComponents)
  .pipe(concat('app.jsx'))
  .pipe(react())
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(header(banner, {pkg : pkg}))
  .pipe(gulp.dest('./src/assets'));
});

// Watch for jsx and scss changes
gulp.task('watch', function() {
  gulp.watch('src/assets/sass/*.scss', ['sass']);
  gulp.watch('src/assets/react/*.jsx', ['build']);
});

// Generate an archive.zip
gulp.task('compress', ['bower','build','sass'], function() {
  return gulp.src([
    'src/**/*',
    '!src/assets/react/',
    '!src/assets/react/**/*',
    '!src/assets/sass/',
    '!src/assets/sass/**/*',
    '!src/assets/stylesheets/style.css.map'
  ])
  .pipe(tar('archive.zip'))
  .pipe(gulp.dest('build'));
});

// Deploy the project using ftp excluding the jsx and scss files
gulp.task('deploy', ['bower','build','sass'], function() {
  return gulp.src([
    'src/**/*',
    '!src/assets/react/',
    '!src/assets/react/**/*',
    '!src/assets/sass/',
    '!src/assets/sass/**/*',
    '!src/assets/stylesheets/style.css.map'
  ])
  .pipe(ftp({
    host: settings.host,
    user: settings.user,
    pass: settings.pass,
    remotePath: settings.remotePath
  }))
  .pipe(gutil.noop());
});
