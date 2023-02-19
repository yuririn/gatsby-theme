---
title: Gulp4 x Webpack で Vue.js の開発環境を作る
date: 2023-02-18
pagetype: blog
hero: thumbnail/2023/entry522.png
cateId: web-developer
tags: ["Vue.js","Gulp","Webpack"]
description: GulpとWebpackを使ってVue.jsの開発環境を作りました。ほぼ個人的な備忘録ですが、実務で使えるので実践的です。興味のある方は参考にしてください。今回は端折らず、丁寧に順を追って解説します。
---
Vue.js を必要に迫られて久々に触りましたが、拡張性の高さと柔軟性にビビりまくってます笑

最近さらにコンポーネント化し、あれこれ拡張しなければなりませんでした。結構タスクランナーなどに頼らずに制作するのは限界があるなぁと思い、Gulp と Webpack を使って改めて開発環境を作りました。

今回は Gulp と Webpack を使った Vue.js の実務で使える実践的な開発環境の作り方をご紹介します。

手軽にVue.jsを導入する方法はこちらです。

<card id="/blogs/entry520/"></card>

<prof></prof>

*前提条件*
* Gulpの使い方がわかる
* Webpackを使ってVue.jsのファイルをバンドル（まとめる）したい
* Vue.jsのコンポーネントを使いたい
* Node や npm をインストールしていて、コマンドが使える状態
* コマンドの使い方がある程度わかっている
* Compostion API を使いたい

今回は丁寧に順を追って説明します。「そんなの知ってるよ」って方は目次から必要な項目をすっ飛ばしてお読みください。

<toc id="/blogs/entry522/"></toc>

## Gulp で Webpack を使った環境を準備する
今回は Gulp を使った開発方法のご紹介です。`webpack-stream` を使って `webpack` を読み込む方法をご紹介です。

まずはディレクトリを作成し、そこでコマンドで `package.json` を新規で作ります。
```shell:title=コマンド
npm init -y
```
`-y` オプションを付けることで、対話せずに `package.json` が作成されます。

作成したら、いくつか node module をインストールします。

```shell:title=コマンド
npm -D gulp browser-sync
```
それぞれの node module の役割です。
|モジュール名|役割|
|-|-|
|*gulp*|JavaScriptで記述できるビルドシステム。SassやJSをリアルタイムでコンパイルできるようになる|
|*browser-sync*|仮想サーバーを立てたり、コード更新とともにブラウザをリロードできるので作業効率化できる|

今回はディレクトリ構造は以下のようにします。
```
vue-sample/（ルートディレクトリ）
  ├ node_modules/(自動生成)
  ├ gulpfile.js(新規作成)
  ├ package.json(自動生成)
  ├ package-lock.json(自動生成)
  └ public/
    └ index.html（とりあえず空でオッケー）
```

`gulp` コマンドが使えるように `package.json` を編集します。`scripts` を追加します。
```json{7}:title=package.json
{
  "name": "vue-practice",
  "version": "1.0.0",
  "description": "Sample for VUE sort Articles.",
  "main": "index.js",
  "scripts": {
    "start": "gulp"
  },
  "devDependencies": {
    "browser-sync": "^2.27.11",
    "gulp": "^4.0.2",
    "webpack": "^5.75.0",
    "webpack-stream": "^7.0.0"
  }
}
```
### browserSync で心地よい開発環境を作る
`gulpfile.js` を追加し、まずはローカルにサーバーを立てます。

```js:title=gulpfile.js
const { parallelh } = require("gulp");

const browserSync = require("browser-sync").create();

const paths = {
  root: "public/",
};

const serverTask = () => {
  browserSync.init({
    server: {
      baseDir: paths.root,
    },
    reloadDelay: 1000,
    open: false,
    startPath: '/',
  });
}

exports.default = parallel(serverTask);
```

空でいいのでHTMLファイルを作ります。以下コマンドで ` http://localhost:3000/` にアクセスできたら成功です。

```shell:title=コマンド
npm start
```

browserSync のオプション `open` ですが、 `false` サンプルコード通り付与することをおすすめします。付与しないと初期値は `true` になっており、起動するたびにブラウザが開くので鬱陶しいです。

### Webpack でコードをバンドル（まとめる）できる環境を作る
次にコードをまとめる環境を作ります。コードをまとめる方法は、直接 `gulpfile.js` に書く方法もありますが、今回は別ファイル `webpack.config.js` を新たに作成します。


```{3-4,8}
vue-sample/（ルートディレクトリ）
  ├ node_modules/
  ├ gulpfile.js(編集)
  ├ webpack.config.js(新規作成)
  ├ package.json
  ├ package-lock.json
  ├ js/
  | └ index.js(新規追加)
  └ public/
    ├ js/
    | └ index.min.js(index.jsがバンドルされて自動生成)
    └ index.html
```

Vue.js をnpm経由でインストールします。

```shell:title=コマンド
npm -D vue webpack webpack-stream path
```
|モジュール名|役割|
|-|-|
|*vue*|Vue.jsを使えるようにする|
|*webpack*|複数のファイルを１つにまとめて出力してくれるツール。gulpに近い機能がたくさんあるのでwebpack単独でも使える|
|*webpack-stream*|gulpでwebpackを使うためのモジュール|
|*path*|ディレクトリやファイルのパス（場所）の問題を解決するモジュール|

`gulpfile.js` に Vue.js をコンパイルするためのコードを追加。
```js{1,4-6,10-11,14-23,26}:title=gulpfile.js
const { dest, parallel, watch } = require("gulp");

// 省略
const path = require("path");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");

const paths = {
  root: "public/",
  js: "public/js/",
  webpackConfig: "./webpack.config.js",
};
// 省略
const vueCompile = () => {
  const webpackConfigPath = path.resolve(__dirname, "webpack.config");
  delete require.cache[webpackConfigPath];
  const webpackConfig = require(webpackConfigPath);
  return webpackStream(webpackConfig, webpack).on("error", function() {
    this.emit("end");
  })
  .pipe(dest(paths.js));
  .pipe(browserSync.stream())
}
// ファイルの変更をウォッチ
const watchTask = ()=> {
  return watch([paths.js+ '*.js', paths.js+ 'components/*.vue'], vueCompile);
}
exports.default = parallel(serverTask, vueCompile);
```

`webpack.config.js` で node module にインストールしたVueを使えるようにし、バンドルしたJSを出力できるようにする。

```js:title=webpack.config.js
module.exports = {
  entry: "./js/index.js",
  output: {
    filename: "index.min.js"
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm-browser.prod.js'
    }
  }
}
```

`js/index.js` ではwebpack経由で `vue` を呼び出し、Module形式でコードを書く。

```js:title=js/index.js
import {
  createApp,
  ref,
  onMounted,
} from 'vue';
// 省略
```
ファイルは `type="module"` で呼び出す。

```html:title=public/index.html
<script src="./js/index.min.js" type="module" defer></script>
```

これで Vue.js とバンドルされたJSが生成されるようになります。

## 拡張子、.vue形式のコンポーネント（部品）を使えるようにする
Vue.jsの素晴らしいところはコンポーネント（部品）をモジュール化して管理できるところです。

Vue.jsのコンポーネントは一般的に **.vue という拡張子のファイルに分けて管理します。

コンポーネントファイルの構成は出力したいテンプレートのコードと、それに関する設定といった感じになります。

```js:title=コンポーネント
<template>
<!-- 部品の構成 -->
</template>
<script>
//コンポーネントに関する設定
</script>
```

せっかくなので Gulp の開発環境で便利なコンポーネントを使えるようにしましょう。

 **.vue を分解してバンドルできるように、`vue` と `babel` のローダー用 node module をインストールします。

```shell:title=コマンド
npm run babel-loader vue-loader -D
```

```js:title=webpack.config.js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: "./js/index.js",
  output: {
    filename: "index.min.js"
  },
   module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm-browser.prod.js'
    }
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
```

たとえば `components/Label.vue` ファイルを追加してコンポーネントとして使う場合、以下のような形で呼び出せるようになります。

```js{6,9}:title=js/index.js
import {
  createApp,
  ref,
} from 'vue';

import Label from './components/Label.vue'

const app = createApp({
  components:{ Label },
  setup() {
    // 省略
  }
})

```
これで、**.vue形式のコンポーネントを使えるようになります。

詳しいテンプレートの実装方法に関しては以下記事で紹介していますのでそちらを参照してください。
<card id="/blogs/entry523/"></card>

## プロダクション（製品版）とディベロップメント（開発版）で出力を分ける
Webpack では `mode` で `production（リリース）` と `development(開発)` とコンパイルしたファイルを出し分けることができます。

もちろん `development(開発)` のほうが遥かにエラー箇所を見つけやすくデバッグに適しており、 `production（リリース）` になるとソースはぐっとコンパクトに圧縮することができます。

今回は、せっかくなので開発モードとリリースモードで分けて開発できるようにします。

コマンドに引数を渡せる `minimist` という node module をインストールします。

```shell:title=コマンド
npm -D minimist
```

```js{3-11,14}:title=webpack.config.js
const { VueLoaderPlugin } = require('vue-loader')

const minimist = require("minimist");
const envSettings = {
  string: "env",
  default: {
    env: process.env.NODE_ENV || "development", // NODE_ENVに指定が無い場合のデフォルト
  },
};
const options = minimist(process.argv.slice(2), envSettings);
const isProduction = options.env === "production" ? true : false;

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./js/index.js",
  output: {
    filename: "index.min.js"
  },
   module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm-browser.prod.js'
    }
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
```
`package.json` にスクリプトを追加します。
```json{7-8}:title=package.json
{
  "name": "vue-practice",
  "version": "1.0.0",
  "description": "Sample for VUE sort Articles.",
  "main": "index.js",
  "scripts": {
    "start": "gulp",
    "prod": "gulp --env production"
  },
  // 省略
}
```
状況に応じてコマンドを出し分けます。
```shell:title=コマンド
# 開発者モード
npm start
# プロダクション
npm run prod
```

## ソースサンプル
すべてのソースサンプルはこちらになります。

[vue-sourt-sample　Git](https://github.com/yuririn/vue-sourt-sample/tree/add-gulp)

## まとめ・少し複雑なVue.jsの実装をするためには開発環境の用意が必要
Vue.jsはちょっとした機能を追加するにはめちゃ適しています。

が、その気軽に導入できるVue.jsですが少し手の混んだ実装をするためにはやはり開発環境の準備は必要と思いました。

必要に応じて、ある程度の開発環境は作れたほうがいいと思いその方法をまとめました。

この記事が皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただき、ありがとうございました。


コンポーネントを使ったデータバインドについてはこちらをお読みくだだい。
<card id="/blogs/entry523/"></card>
