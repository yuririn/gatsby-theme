const { src, dest, series, parallel, watch } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const fs = require('fs');
const cmq = require('gulp-combine-media-queries');
const header = require( 'gulp-header' );
const replace = require('gulp-replace');

// エラー通知
function errNotify() {
  return notify.onError({
    title: "Error running something",
    message: "Error: <%= error.message %>",
    sound: "Glass"
  });
}
const baseDir = './scss/dest/';
const files = fs.readdirSync('./scss/comps/',{ withFileTypes: true });
const dirs = ['choco', 'main', 'portfolio']
function sass(done) {
files.forEach((item)=>{
  const isCommon = item.name.toLocaleLowerCase().includes('common') ? true : false
  let tag = 'main'
  if(item.name.toLocaleLowerCase().includes('header')) {
    tag = 'header'
  } else if(item.name.toLocaleLowerCase().includes('footer')) {
    tag = 'footer'
  } else if(item.name.toLocaleLowerCase().includes('portfolif')) {

    tag = 'div'
  }
  const headCode = [
    'import styled from "styled-components";',
    '',
    'export const '+item.name.split('.')[0]+' = styled.'+tag+'\`',
    '',
  ].join('\n');
  const headCommonCode = [
    'import { createGlobalStyle } from "styled-components"',
    '',
    'export const '+item.name.split('.')[0]+' = createGlobalStyle`',
    '',
  ].join('\n');

  src('scss/comps/' + item.name )
  .pipe(scss({ outputStyle: 'expanded' }))
  .on("error", errNotify())
  .pipe(
    autoprefixer({
      autoprefixer: ["last 2 versions"],
      cascade: false,
    })
    )
    .pipe(cmq())
    .pipe(header(isCommon ? headCommonCode : headCode))
    .pipe(dest('./scss/dest'))
  })
  src('scss/style.scss')
  .pipe(scss({ outputStyle: 'expanded' }))
  .on("error", errNotify())
  .pipe(
    autoprefixer({
      autoprefixer: ["last 2 versions"],
      cascade: false,
    })
    )
    .pipe(cmq())
    .pipe(dest('./src'))
  done();
}
const files2 = fs.readdirSync('./scss/dest/',{ withFileTypes: true });
function comple(done) {
  files2.forEach((item)=>{
    const targetDir = dirs.filter(i => item.name.toLocaleLowerCase().includes(i))
    src([baseDir + item.name, 'scss/end.txt'])
    .pipe(concat(`${item.name.split('.')[0]}.js`))
    .pipe(dest(`./src/styles/${targetDir}`))
  })
  done();
}





function watchTask(done) {
  watch(['scss/*.scss',"scss/**/*.scss"], sass);
  watch(['scss/*.scss',"scss/**/*.scss"], comple);
  done();
}

exports.default = parallel(sass, comple,  watchTask);
