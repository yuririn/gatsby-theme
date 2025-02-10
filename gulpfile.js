const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();
const path = require('path');

const sassTask = (done) => {
    src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('public'))
        .pipe(browserSync.stream());
        done()
};

const postcssTask = (done) => {
    src('public/style.css')
        .pipe(postcss([
            autoprefixer(),
            cssnano(),
            postcssPresetEnv({
                stage: 1,
                features: {
                    'nesting-rules': true,
                },
            }),
        ]))
        .pipe(dest('public'))
        .pipe(browserSync.stream());
        done()
};

const replaceTask = (done) => {
    src('public/style.css')
        .pipe(replace(/SLASH/g, '//'))
        .pipe(dest('public'))
        .pipe(browserSync.stream());
        done()
};

// const serveTask = (done) => {
//     browserSync.init({
//         server: {
//             baseDir: './public',
//         }
//     });
//     done();
// };

const watchTask = () => {
    watch('src/scss/**/*.scss', series(sassTask, postcssTask, replaceTask));
    watch('public/**/*.html').on('change', browserSync.reload);
};

// デフォルトタスクの定義
exports.default = series(sassTask, postcssTask, replaceTask, watchTask);
