const { src, dest, series, parallel, watch } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const fs = require('fs');

// エラー通知
function errNotify() {
  return notify.onError({
    title: "Error running something",
    message: "Error: <%= error.message %>",
    sound: "Glass"
  });
}

function sass(done) {
  src(['scss/*.scss',"scss/**/*.scss"])
  .pipe(scss({ outputStyle: 'compressed' }))
  .on("error", errNotify())
  .pipe(
    autoprefixer({
      autoprefixer: ["last 2 versions"],
      cascade: false,
    })
    )
    .pipe(dest('./scss/dest'))
    done();
  }

  function globalStyle(done) {
  if(fs.existsSync('scss/dest/style.css')) {
    src(['scss/dest/start.txt','scss/dest/style.css','scss/dest/end.txt'])
      .pipe(dest('./scss/dest'))
      .pipe(concat('global-style.js'))
      .pipe(dest('./src/styles/common'))
  }
  done();
}

function watchTask(done) {
  watch(['scss/*.scss',"scss/**/*.scss"], sass);
  watch(['scss/*.scss',"scss/**/*.scss"], globalStyle);
  done();
}

exports.default = parallel(series(sass, globalStyle, watchTask));
