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
        .pipe(replace(/SLASH/g, '//'))
        .pipe(dest('static'))
        .pipe(browserSync.stream());
        done()
};

const postcssTask = (done) => {
    src('static/style.css', { allowEmpty: true })
        
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
        
        .pipe(dest('static'))
        .pipe(browserSync.stream());
        done()
};

const watchTask = () => {
    watch('src/scss/**/*.scss', series(sassTask));
    watch('public/**/*.html').on('change', browserSync.reload);
};

// デフォルトタスクの定義
exports.default = series(sassTask, postcssTask, watchTask);
