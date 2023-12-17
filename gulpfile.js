import gulp from 'gulp';
import csso from 'gulp-csso';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';
import {deleteAsync} from 'del';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import sync from 'browser-sync';
const reload = sync.reload;
import terser from 'gulp-terser';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import imagemin from 'gulp-imagemin';
import postcss from 'postcss';

  // webpi = require('gulp-webp');


// Clean
export const clean = () => {
  return deleteAsync('dist');
};


// Copy
export const copy = () => {
  return gulp.src([
    'src/fonts/**/*.{woff, woff2}',
    'src/img/**',
    'src/*.js',
    'src/*.ico,',
    'src/*.png',
    'src/*.svg',
    // 'src/*.xml',
    // 'src/site.webmanifest'
  ],
    { base: 'src' }
  )
    .pipe(gulp.dest('dist'))
};


// Refresh
export const refresh = done => {
  sync.reload();
  done();
};


// Css
export const css = () => {
  return gulp.src('src/styles/index.scss')
    // .pipe(plumber())

    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(reload({ stream: true }))
};


// Html
export const html = () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }))
};


// Script
export const scripts = () => {
  return gulp.src('src/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(reload({ stream: true }))
};

// Images
export const img = () => {
  return gulp.src('src/img')
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('dist/img'))
};


// // Webp
// const webp = () => {
//   return gulp.src('src/img')
//     .pipe(webpi({ quality: 50 }))
//     .pipe(gulp.dest('dist/img'))
// };
// exports.webp = webp;


// Server
export const server = () => {
  sync.init({
    server: 'dist',
    open: true,
    notify: true,
    cors: true
  })
  gulp.watch('src/styles/**/*.scss', gulp.series(css, refresh));
  gulp.watch('src/scripts/**/*.js', gulp.series(scripts, refresh));
  gulp.watch('src/*.html', gulp.series(html, refresh));

};


// Build
export const build = gulp.series(
  clean,
  copy,
  css,
  html,
  scripts,
  server
);


// Start
export const start = gulp.series(
  build,
  server
);
