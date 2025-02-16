---
title: babel + browserify で async/await に対応しながら外部スクリプトファイルを読み込む
date: 2025-01-28
pagetype: blog
hero: thumbnail/2025/entry540.jpg
cateId: web-developer
tags: ["npm", "Gulp",'JavaScript']
description: babel + browserify でローカルの普通の JS でも、npm module 経由でインストールしたファイルや外部ファイルを読み込んだり async/fetch のコードをトランスパイル。この記事は npm や node がすでに使えることを前提。Swiper/lodashなども使えます。
---
今回やりたかったことは、babel + browserify でローカルの普通の JS でも、npm module 経由でインストールしたファイルや外部ファイルを読み込んだり async/fetch のコードをトランスパイルするというもの。

どうしても訳合ってこの環境を作りたくてサンプルコードを探して、実際やったらコケる。

[GulpでBrowserifyを使った外部スクリプトファイルを読み込むタスクを作成する|designsupply](https://designsupply-web.com/media/programming/5921/)

上記 designsupply さんのコードを参考にしつつ修正しました。

まずは必要なモジュールはこちら。バージョンが古いままになってるかもしれないので適宜新しいものを入れてください。

この記事は npm や node がすでに使えることを前提に書かれています。メモ程度の記事なので、必要に応じて参考にする程度にしていただければと思います。

## package.json / 各種モジュールをインストール
```json:title=package.json
{
  "name": "browserify+babel",
  "version": "1.0.0",
  "main": "gulpfile.js",
  "scripts": {
    "start": "gulp",
    "prod": "gulp --env production"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.26.7",
    "@babel/preset-env": "^7.26.7",
    "babel-plugin-transform-remove-console": "^6.9.4",
    "babelify": "^10.0.0",
    "browser-sync": "^3.0.3",
    "browserify": "^3.46.1",
    "gulp": "^5.0.0",
    "gulp-if": "^3.0.0",
    "gulp-plumber": "^1.2.1",
    "gulp-uglify": "^3.0.2",
    "minimist": "^1.2.8",
    "through2": "^4.0.2"
  },
}
```
## gulpfile.js にタスクを書く
`browserify` の処理で `file.contents` に直接 `buf` を代入したら処理でコケます。`Buffer.from()` で文字列などのデータから生成し直して代入します。`browserify` の中で `babelify` を適応させます。`browserify` にオプションをつける時は `.configure` で渡します。

```js:title=gulpfile.js
import { series, parallel, src, dest, watch } from 'gulp';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import minimist from 'minimist';
import gIf from 'gulp-if';
import browserify from 'browserify';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import babelify from 'babelify';
import through2 from 'through2';

const destRootPath = './dest/';
const srcPath = {
  js: './src/js/*.js',
};

const serverInit = (done) => {
  server.init({
    server: {
      baseDir: paths.rootDir,
    },
  });
  done();
};

const envSettings = {
  string: "env",
  default: {
    env: process.env.NODE_ENV || "development",
  },
};

const options = minimist(process.argv.slice(2), envSettings);
const isProduction = options.env === "production" ? true : false;

const exportJs = (done) => {
  const browserified = through2.obj((file, enc, callback) => {
    browserify(file.path, { debug: !isProduction })
      .transform(babelify.configure({
          presets: ['@babel/preset-env'],
          //プロダクションではコメントを削除
          plugins: isProduction ? ['babel-plugin-transform-remove-console'] : [],
          sourceMaps: !isProduction
      }))
      .bundle((error, buf) => {
        // エラー処理
        if(error) {
          return callback(error);
        }
        file.contents = Buffer.from(buf)
        callback(null, file);
      });
  })
  src(srcPath.js, {allowEmpty: true})
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(browserified)
    .pipe(rename({suffix: ".min"}))
    .pipe(gIf(isProduction, uglify()))
    .pipe(dest(`${destRootPath}assets/js/`))
    .pipe(server.stream());
  done();
}

const watchFiles = (done) => {
  watch([srcPath.js, './src/js/_inc/*.js'], exportJs);
  done();
};

export default series(serverInit, exportJs, watchFiles);
```
コマンド実行。
```shell
# 開発用
$ npm start
# プロダクション用
$ npm run prod
```
## Swiper や lodash を読み込む
これで npm 経由でインストールしたモジュールも直接使えます。
```shell:title=コマンド
npm i swiper -D
```
```js:title=JavaScript
import Swiper from 'swiper';
```
<prof></prof>
