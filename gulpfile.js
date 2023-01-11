import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import { stacksvg } from "gulp-stacksvg";
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import sourcemaps from 'gulp-sourcemaps';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgo';
import { deleteSync } from 'del'; 'del';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso({restructure: false})
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(html, reload));
  gulp.watch('source/js/**/*.js', gulp.series(scripts, reload));}

// Sprite
const sprite = () => {
  return gulp.src(`source/img/**/*.svg`)
    .pipe(svgo({ plugins: [{ inlineStyles: false }] }))
    .pipe(stacksvg({ output: `sprite` }))
    .pipe(gulp.dest(`build/img`))
}

// Svg
const svgs = () => {
  return gulp.src(`source/img/**/*.svg`)
    .pipe(svgo({ plugins: [{ inlineStyles: false }] }))
    .pipe(gulp.dest(`build/img`))
}

// Scripts
export const scripts = function () {
  return gulp.src('source/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(rename('scripts.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/js'))
}

// Images
const optimizeImages = function () {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const copyImages = function () {
  return gulp.src('source/img/**/*.{jpg,png,webp}')
    .pipe(gulp.dest('build/img'))
}

//WebP
const createWebp = function () {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

// Copy
const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/favicon.ico',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  }).pipe(gulp.dest('build'));
  done();
}

// Clean
const clean = (done) => {
  deleteSync('build');
  done();
}

// Reload
const reload = (done) => {
  browser.reload();
  done();
}

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    sprite,
    scripts,
    html,
    createWebp,
    svgs
  ),
  gulp.series(
    server,
    watcher
  )
);

export const build =  gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    sprite,
    scripts,
    html,
    createWebp,
    svgs
  )
);
