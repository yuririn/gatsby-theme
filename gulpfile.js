const { src, dest, series, parallel, watch } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");

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
    .pipe(dest('./src'))
  done();
}
function watchTask(done) {
  watch(['scss/*.scss',"scss/**/*.scss"], sass);
  done();
}

exports.default = parallel(series(sass, watchTask));
