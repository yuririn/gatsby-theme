const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber')
const notify = require('gulp-notify');

const sassTask = (done) => {
    src(['src/scss/*-style.scss'])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>'),
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(replace(/SLASH/g, '//'))
        .pipe(dest('static'))
        done()
};

const postcssTask = (done) => {
    src(['static/*-style.css'], { allowEmpty: true })
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>'),
        }))
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
        done()
};

const watchTask = () => {
    watch('src/scss/**/*.scss', series(sassTask));
};

// デフォルトタスクの定義
exports.default = series(sassTask, postcssTask, watchTask);
