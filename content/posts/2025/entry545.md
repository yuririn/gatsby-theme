---
title: use forword 組み込み関数 Dart Sass 便機能徹底ガイド（Gulp タスクサンプルコード(postCSS)付）
date: 2025-03-01
pageType: blog
hero: thumbnail/2025/entry545.jpg
cateId: web-developer
tags: ["SASS","CSS","Gulp"]
description: CSSが進化し、コーディングがかつてないほど便利になった現在。Sass(SCSS)を活用し、パーツをコンポーネントとして管理するのに重宝。5年以上前からSassを愛用し、Gulpを仕事に取り入れることで作業スピードが劇的に向上。このガイドでは、Dart SassとpostCSSの環境設定や、@use と @forword の使用方法をまとめ、テキストフォーマッターの実装について解説。Dart Sassは公式が推奨する実装方法で、LibSassの利用が非推奨となったため新規プロジェクトには必須のツール。Node-sassの開発停止を受け、最新のSassの使用方法をおさらい。
---
CSS も入れ子で書けるようになりコーディングも昔では考えられないくらい便利になりました。

とはいえ、私にとっては SASS(SCSS) もまだ現役でパーツをコンポーネントとして管理する際に便利なので現役で使っています。

私は5年以上前 SASS が出回り始めた頃からの愛用者で、Gulp を仕事に取り入れることで作業スピードが爆上がりしたのでとても思い入れがあります。

そして、コードの見通しが良くなります。

* Dart Sass は、Sass の公式が推奨している実装方法。新規プロジェクトではその使用が推奨(2020 年 10 月に LibSass の利用が非推奨になったため)。
* Node-sass（Node.js で Sass をコンパイルするためのツール）の開発が停止
* @import が廃止され、@use や @forword が推奨

やりたいこと
* `@use` や `@forword` のなどの Dart Sass の使用方法のおさらい
* Dart Sass と postCSS の環境作成まとめ
* テキストフォーマッター実装

## Dart Sass の LibSass や Node Sass との違い

1. *モジュールが使える* Dart Sass 1.23.0 よりモジュールシステムの `@use`、 `@forward` が導入されました。これにより、コードのモジュール化と再利用がカンタンに。
2. *変数にNullが入れられる* 変数が未定義の場合に null 値を持つことができ、条件付きのスタイルやデフォルト値を使用する際の柔軟性。
3. *多くの組み込み関数* 多くの組み込み関数があり、色の操作、数学的演算、リストやマップの操作がカンタンに！
4. *@useでデフォルト値を上書きできる* @use でモジュールのデフォルト設定を上書きできます。
5. *厳密性* 厳しいけどバグを減らすことができる。平たく言うと、変な順番で書くなどバグを仕込むような書き方するとと怒られる。

その他、高速にコンパイルも高速で全てのSass仕様に完全に準拠、新しいCSS機能や構文にも割と対応しています。

## Dart Sass の記述方法を徹底解説

* `@use` : 他のファイルの内容を使う
* `@forward`: 他のファイルの内容をさらに別の場所で使う

たとえばこんなfile構造だった場合。
```
your-project/
├── styles/
│   ├── main.scss
│   ├── utils/
│   │   ├── _utils.scss
│   │   ├── _mixins.scss
│   │   └── _variables.scss
```
### Dart Sass @use の使い方
`@use` で `_mixins.scsss` （mixinをまとめたfile）や `_variables.scss` （変数をまとめたfile）をそれぞれ読み込んで使う方法をご紹介します。

Node Sass（またはLibSass）では一回序盤でこれらの file を `@import` で読みこめばけばよかったですが、Dart Sass では React のように毎度使うfileのトップレベルに `@use` で読み込む必要があります。

<msg txt="React のfile構造を想像したら理解がしやすいです"></msg>

Dart Sass の場合、読み込んだfile内の mixin や変数を使いたい場合は *file名* + *変数* or *mixin* となります。

```scss:title=main.scss
@use './utils/_variables';
@use './utils/_mixins';

p {
  color: variables.$color;
}

section {
  @include mixins.mq(md) {
    color: variables.$color;
  }
}
```
moduleJS（JavaScript） のように `as` を使ってさらに記述を簡素化できます。たとえば、`_utils.scss`に変数やmixinをまとめたfileをそれぞれ呼び出します。

```scss:title=_utils.scss
@use 'mixins';
@use 'variables';
```
`as` を使って *名前をエイリアス化* すれば Node Sass などとと基本の記述方法は何ら変わりませんね！！
```scss:title=main.scss
@use './utils/utils' as *;

p {
  color: $color;
}

section {
  @include mq(md) {
    color: $color;
  }
}
```
### Dart Sass @forward の使い方
`@forward` は、大規模なSassプロジェクトで特定のモジュールを複数のファイルで共有したい場合に特に役立ちます。

普段は使わなくてもいいかなーと思っています。

```
your-project/
├── styles/
│   ├── main.scss
│   ├── components/
│   │   ├── box/
│   │   │   ├── _a.scss
│   │   │   ├── _b.scss
│   │   │   ├── _index.scss
```
`@forward` を使ってコンポーネントをまとめることで、各ファイルで簡単に再利用できますし、スタイルを拡張する（たとえばボーダー追加など）もカンタンになります。

またfile構造もまとまり、コードも見通しが良くなります。

<msg txt="保守性が爆上がり!!"></msg>

```scss:title=components/box/_a.scss
@mixin a {
  padding: 10px;
  background-color: #f0f0f0;
}
```
```scss:title=components/box/_b.scss
@mixin a {
  padding: 20px;
  background-color: #e0e0e0;
}
```
```scss:title=components/box/_index.scss
@forward 'a';
@forward 'b';
```
```scss:title=main.scss
@use './components/box/index' as box;

.c-box--a {
  @include box.a;
}

.c-box--b {
  @include box.b;
}

.c-box--c {
  @include box.a;
  border: #000 1px solid;
}

```
### 'sass:color'（組み込み関数）で「色」を操作する

最近ではCSSのフィルターでめっきり登場機会が減りましたが、Dart Sass の組み込み関数で色を操作できます。

組み込み関数は Node Sass などでも使えましたが、あえて重複したものもご紹介していきます。

```
your-project/
│   ├── styles/
│   │   ├── components/
│   │   │   └── button.scss
```
LibSassでもよく使っていましたが、こちらの例はバー時にボタンを暗くするコードです。色操作をするためには `@use 'sass:color'` で組み込み関数を呼び出しておく必要があります。
```SCSS:title=components/_button.scss
@use 'sass:color';
$button-bg-color: #3498db;
.button {
  padding: 10px 20px;
  color: #fff;
  background-color: $button-bg-color;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken($button-bg-color, 10%);
  }
}
```

もしくは、色の組み込み関数は `utils` にあらかじめ読み込み *エイリアス化して使う* こともできます。
```scss:title=utils/_utils.scss
@use 'sass:color';
```
```scss:title=_button.scss
//エイリアス化
@use './utils/utils' as *;

$button-bg-color: #3498db;
.button {
  padding: 10px 20px;
  color: #fff;
  background-color: $button-bg-color;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken($button-bg-color, 10%);
  }
}
```

その他、`lighten`（明るく） や `invert`（反転）もあります。この記事の最後に[関数をまとめた表](#おまけdart-sass-の組み込み関数)があるので、そちらを参考に。

CSSフィルターの記事はこちら。

<card slug="entry536" anchor="backdrop-filterで重なった下のコンテンツにフィルターする"></card>

### 標準搭載 'sass:list'（組み込み関数）で「リスト」を扱う
Sass で強力な力を発揮するのは配列系じゃないでしょうか？

Sass のリストは、JavaScriptの1次元配列に似ています。
```JS:title=JavaScript
let list = ['1px solid red', '2px dashed blue', '3px dotted green'];
```
使い方は、for文などで回す時便利。
```scss:title=SASS
$list: 1px solid red, 2px dashed blue, 3px dotted green;

@for $i from 1 through length($list) {
  .box-#{$i} {
    border: nth($list, $i);
  }
}
```
`length` や `nth` は標準で組み込まれているので、`@use 'sass:list'` を**呼び出す必要ありません**。

 `@use 'sass:list'` で呼び出すケースとして、異なるリストを結合する`join` など、特定のリスト操作関数を使用する場合などが挙げられます。

```
your-project/
│   ├── styles/
│   │   ├── utils/
│   │   │   ├── _utils.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _variables.scss
│   │   ├── components/
│   │   │   └── button.scss
```
```scss:title=SASS
@use 'sass:list';

$list1: 1px solid red, 2px dashed blue;
$list2: 3px dotted green, 4px double yellow;

// $list1と$list2を結合
$combined-list: list.join($list1, $list2);

@for $i from 1 through list.length($combined-list) {
  .box-#{$i} {
    border: list.nth($combined-list, $i);
  }
}
```
### Dart Sass で組み込み関数で「マップ」を扱う
Sass のマップは、JavaScriptのオブジェクト(多次元配列)に似ています。
```JS:title=JavaScript
const breakpoints = {
  sm: 425,
  md: 768,
  lg: 1080,
  xl: 1366,
};
```
オブジェクト（多次元配列）同様、キーと値をセットにします。
```scss:title=utils/_variables.scss
$breakpoints: (
  'sm': 425,
  'md': 768,
  'lg': 1080,
  'xl': 1366,
);
```
具体的な例です。ブレークポイント用のメディアクエリの `mixin` を作ってみます。
```scss:title=utils/_utiles.scss
@use 'sass:map';
@use 'variables';
@use 'mixins';
```
```scss:title=utils/_variables.scss
@use 'sass:map';
$u-container: 1080;
$breakpoints: (
  'sm': 425,
  'md': 768,
  'lg': $u-container,
  'xl': 1366,
);
```
```scss:title=utils/_mixin.scss
@use 'sass:map';
@use 'variables' as *;

@mixin mq($breakpoint: 'md') {
  @media screen and (min-width:  #{map.get($breakpoints, $breakpoint)px) {
    @content;
  }
}
```
厳格ではありませんがここでは 768px 以上をPC（タッチディバイスではない）とみな、hoverアニメーションをさせてみます。

サンプルコードはこちら。

```scss:title=utils/_button.scss
@use './utils/utils' as *;
@use 'sass:color';

$button-bg-color: #3498db;

.button {
  padding: 10px 20px;
  color: #fff;
  background-color: $button-bg-color;
  border: none;
  border-radius: 4px;

  // 768px以上
  @include mq(){
    transition: background-color 0.3s;
    &:hover {
      background-color: darken($button-bg-color, 10%);
    }
  }
}
```
### 組み込み関数「IF」を扱う
マップで紹介したメディアクエリのコードを改造して逆に `max-width`の処理を追加してみます。`if`も標準組み込み関数のため、呼び出す必要ではありません。

これで一つの `mixin` で、`max-width` 、 `min-width` しかも4つのメディアクエリサイズを処理できます。

```scss:title=utils/_mixin.scss
@use 'sass:map';
@use 'variables' as *;

@mixin mq($breakpoint: 'md', $larger: true) {
  $width: #{map-get($breakpoints, $breakpoint) + if($larger, 0, 1)};
  $type: if($larger, 'min', 'max');
  @media screen and (#{$type}-width: #{$width}px) {
    @content;
  }
}
```
### 'sass:selector'（組み込み関数）を使ってselector操作を行いたい場合
JS で class を付与&スタイルを操作したい場合コードが煩雑になるのが悩みのタネでした。

しかし、`@use 'sass:selector'`を使えば簡潔に書けます。

たとえば画面をスクロールダウンするまではheaderは透明、それ以外は白にしたい場合。

![たとえば画面をスクロールダウンするまではheaderは透明、それ以外は白にしたい場合](./images/03/entry545-2.jpg)

`selector.nest`を使うことで、視覚的な入れ子がなくなることで、コードの見通しも良くなります。

```scss:title=utils/_header.scss
@use 'sass:selector';

$inner: '__inner ';
$root: '.c-header';

#{$root} {
  // デフォルトのスタイル
  &#{$inner} {
    background: #fff;
    transition: bacground-color 1s ease-in;
  }
  // JSなどで別の設定をしたい場合
  #{selector.nest('&', '.is-transparent', $inner)} {
    background: transparent;
  }
}
```
出力されるCSSはこんな感じ。
```css:title=CSS
.c-header__inner {
  background: #fff;
  transition: bacground-color 1s ease-in;
}

.c-header.is-transparent__inner {
  background: transparent;
}
```
またこんなカレンダーのラベルなどで、種類がいくつもあるなどで色分けを行いたい時、スタイルを量産するときがありますよね？

![カレンダーのラベルなどで、種類がいくつもあるなどで色分けを行いたい時](./images/03/entry545-1.jpg)

`selector.append` で特定のセレクタに更にクラスを足して、ループでまとめて色分けしたスタイルを作ります。

ベースは *プレースホルダーセレクタ（%）* を使います。
```scss:title=utils/_header.scss
@use 'sass:map';
@use 'sass:selector';

//プレースホルダーセレクタ
%label {
  border-radius: 8px;
  padding: 4px 16px;
  color: #fff;
}

$base-selector: '.label';
$labels: (
  red: #ff0000,
  blue: #0000ff,
  green: #008000,
);

@each $key, $color in $labels {
  #{selector.append($base-selector, '.#{$key}')} {
    background: $color;
    @extend %label;
  }
}
```
*プレースホルダーセレクタ* を使うことでCSSをまとめることもできます。
```CSS:title=CSS
.label.red, .label.blue, .label.green {
  border-radius: 8px;
  padding: 4px 16px;
  color: #fff;
}

.label.red {
  background: #ff0000;
}

.label.blue {
  background: #0000ff;
}

.label.green {
  background: #008000;
```

`selector.nest`（セレクターをネスト）と`selector.append`（セレクターを追加）は記述方法がちょっと違う程度でできることは一緒です。セレクタを動的に生成するための強力なツールであることは間違いありません。
### @use のコンフィギュレーション（use + with xx）
Dart Sass では `@use` で呼び立ちた変数のデフォルトを上書きできます。

JS や PHP でも使える、クラスに仕様が非常によく似ていて、Dart Sassに特有の機能です。

たとえばスタイルが全く同じだけど色が違ったり、マイナーチェンジしたスタイルを作りたい時に使えます。

```scss:title=mixin/_box.scss
$primary-color: blue !default;
$font-size: 16px !default;

@mixin box($color: $primary-color, $font-size: $font-size) {
  color: $color;
  font-size: $font-size;
  border: solid 1px $color;
  padding: 16px;
  border-radius: 16px;
}

```
```scss:title=components/_box.scss
@use 'mixins/box' as *;

@include box;
```
デフォルト値を変更してカラバリを作る。
```scss:title=components/_box-white.scss
@use 'mixins/box' with (
  $primary-color: white,
  $font-size: 18px
);

@use 'mixins/box' as box;

@include box.box;
```
`mixin` で引数を渡すより変更箇所がわかりやすく、より可読性が上がります。

## Gulp で Dart Sass と postCSS の環境作成を作る

では、Gulp で Dart Sass が使える環境を作ってみましょう。

```bash:title=コマンド
npm init --y
```
package.json は module 形式で記述するのでこんな感じ。
```json:title=package.json
{
  ...
  "main": "gulpfile.js",
  "type": "module",
  "scripts": {
    "start": "gulp",
    "prod": "gulp --env production"
  },
  "browserslist": [
    "last 2 versions",
    "> 2%"
  ],
  ...
}
```
`package.json` でどのブラウザに対応するか `browserslist` に明示的に指定しておきます。

意味は以下のとおり。
* *last 2 versions*: 主要なブラウザの最新2バージョンをサポート
* *> 2%*: 世界中のユーザーシェアが2%以上のブラウザをサポート
ブラウザのユーザーシェアは2025年時点では Chrome 67%、Safari 18%、Edge 5%、Firefox 2.5%、Samsung Internet 2%とのこと。<br><br>

Gulp プラグイン(npm module)をインストール。
```bash:title=コマンド
npm i プラグイン1 プラグイン2 ...
```
今回は次のモジュールを使いました。

| Gulp プラグイン         | 説明                                                                                 |
|-----------------------|--------------------------------------------------------------------------------------|
| `minimist`            | コマンドライン引数を解析するためのツール。                                             |
| `browser-sync`        | ブラウザのライブリロードを実現するためのツール。                                       |
| `gulp-replace`        | テキストやコードを置換するためのGulpプラグイン。                                       |
| `gulp-if`             | 条件に基づいてGulpタスクを実行するためのプラグイン。                                   |
| `gulp-plumber`        | エラーハンドリングを強化し、Gulpタスクの継続を可能にするプラグイン。                   |
| `gulp-sass`           | Sass（SCSS）のコンパイルを行うためのGulpプラグイン。                                    |
| `sass`                | Dart Sassを使用してSass（SCSS）をコンパイルするためのライブラリ。                       |
| `gulp-postcss`        | PostCSSプラグインを使用してCSSを処理するためのGulpプラグイン。                          |
| `css-declaration-sorter` | CSSの宣言をソートして整理するためのPostCSSプラグイン。                              |
| `css-mqpacker`        | メディアクエリをまとめて最適化するためのPostCSSプラグイン。                             |
| `autoprefixer`        | ベンダープレフィックスを自動的に追加するためのPostCSSプラグイン。                       |
| `cssnano`             | CSSを圧縮して最適化するためのPostCSSプラグイン。                                       |
| `gulp-rename`         | ファイル名を変更するためのGulpプラグイン。                                             |


```js:title=gulpfile.js
import { src, dest, series, parallel, watch } from 'gulp';
import minimist from 'minimist';
import bs from 'browser-sync';
import replace from 'gulp-replace';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import postcss from 'gulp-postcss';
import cssdeclsort from 'css-declaration-sorter';
import mqpacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import rename from 'gulp-rename';

//コンパイラーの指定
const sassCompiler = gulpSass(dartSass);
```
パスと開発モード切替設定。
```js:title=gulpfile.js
// パス設定
const paths = {
  srcDir: 'src/', //開発ディレクトリ
  rootDir: 'public/', //コンパイルしたfile格納するディレクトリ
};

// 開発環境のパス
const srcDir = {
  scss: [paths.srcDir + 'scss/*.scss', paths.srcDir + 'scss/**/*.scss'],
};

// 出力パス
const destDir = {
  css: paths.rootDir + 'assets/css/',
};

// 開発環境設定
const envSettings = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development',
  },
};

//モード切り替え
const options = minimist(process.argv.slice(2), envSettings);
const isProduction = options.env === 'production';

```
SASSのタスク。
```js:title=gulpfile.js
// SCSSのコンパイルとPostCSS処理
const compileScss = (done) => {
  console.log('Starging task: compileScss...')
  // postcss の プラグイン
  let plugins = [
    autoprefixer(),
    cssdeclsort({ order: 'smacss' }),
    mqpacker(),
  ];
  // プロダクションモードの場合はCSSを圧縮
  if (isProduction) plugins = [...plugins, cssnano({ autoprefixer: false })]
  src(srcDir.scss, { sourcemaps: !isProduction })
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sassCompiler.sync().on('error', sassCompiler.logError)))
    .pipe(postcss(plugins))
    .pipe(gulpIf(!isProduction, sourcemaps.write('./_map')))
    .pipe(dest(destDir.css))
    .pipe(bs.stream());
    console.log('Going on task: compileScss 👍️')
  done();
};
export default compileScss;
```
コマンド実行（開発モード）。
```shell:title=コマンド
npm start
```
コマンド実行（プロダクションモード）。
```shell:title=コマンド
npm run produciton
```

## SASS テキストをフォーマットする
SASS のインデントなどを自分で整えるのがめんどいのでフォーマッターを入れておきます。

<msg txt="インデントが乱れるとめっちゃイライラする！！"></msg>

Prettier で コードをフォーマットできるようにしておきます。

```shell:title=コマンド
npm i -D prettier
# もしくは
npm install --save-dev prettier
```

プロジェクト直下に、Prettier 設定用のファイル `.prettierrc` を置きます。

```json:title=.prettierrc
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "overrides": [
    {
      "files": "*.scss",
      "options": {
        "parser": "scss"
      }
    }
  ]
}
```
エディターが VScode であればプロジェクト用の `setting.json` にも設定しておけば、視覚的にも正しいインデントが分かります。
```json:title=.vscode/setting.json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "files.eol": "\n",
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[html]": {
    "editor.tabSize": 2
  },
  "[scss]": {
    "editor.tabSize": 2
  }
}
```
コマンドからフォーマッターを実行できるようにする。
```json:title=package.json
{
  "main": "gulpfile.js",
  "type": "module",
  "scripts": {
    "start": "gulp",
    "prod": "gulp --env production",
    "lint:scss": "npx prettier --write \"src/**/*.scss\""
  }
}
```
コマンド実行。
```shell:title=コマンド
npm run lint:scss
```

## まとめ・Dart Sass も仕様を知れば怖くない
今回は Dart Sass を、かなり深堀りして解説させていただきました。

いくつかサンプルを書いていて感じましたが、SASS記法は単純に作業を楽にするだけでなく、*コードの見通しをする（可読性アップ）のため* に非常に役立ちます。

多少学習コストはかかりますがまだまだ需要があると改めて認識しました。

この記事が皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

### おまけ・Dart Sass の組み込み関数

*色の操作*
| 名前 | 説明 | 使い方例 |
|------|------|----------|
| `adjust-hue` | 色の色相を調整。 | `adjust-hue(#3498db, 20deg)` |
| `darken` | 色を暗く。 | `darken(#3498db, 10%)` |
| `lighten` | 色を明るく。 | `lighten(#3498db, 10%)` |
| `saturate` | 色を鮮やかに。 | `saturate(#3498db, 20%)` |
| `desaturate` | 色を淡く。 | `desaturate(#3498db, 20%)` |
| `grayscale` | 色をグレースケールに変換。 | `grayscale(#3498db)` |
| `complement` | 色の補色を取得。 | `complement(#3498db)` |
| `invert` | 色を反転。 | `invert(#3498db)` 

*算術演算*
| 名前 | 説明 | 使い方例 |
|------|------|----------|
| `percentage` | 数値をパーセンテージに変換。 | `percentage(0.5)` |
| `round` | 数値を四捨五入。 | `round(10.4)` |
| `ceil` | 数値を切り上げ。 | `ceil(10.1)` |
| `floor` | 数値を切り捨て。 | `floor(10.9)` |
| `abs` | 数値の絶対値を取得。 | `abs(-10)` |
| `min` | 最小値を取得。 | `min(10, 20, 5)` |
| `max` | 最大値を取得。 | `max(10, 20, 5)` |
| `random` | 1から指定した数値までのランダムな数値を生成。 | `random(100)` |

*リスト(一次元配列)の操作*
| 名前 | 説明 | 使い方例 |
|------|------|----------|
| `length` | リストの長さを取得。 | `length(1px solid red)` |
| `nth` | リストの指定した位置にある要素を取得。 | `nth(1px solid red, 2)` |
| `set-nth` | リストの指定した位置にある要素を設定。 | `set-nth(1px solid red, 2, dashed)` |
| `join` | リストを結合。 | `join(1px solid red, 2px dashed blue)` |
| `append` | リストに要素を追加。 | `append(1px solid red, 2px dashed)` |
| `zip` | 複数のリストを結合。 | `zip((1, 2), (a, b))` |

*マップの操作*
| 名前 | 説明 | 使い方例 |
|------|------|----------|
| `map-get` | マップからキーに対応する値を取得。 | `map-get($map, $key)` |
| `map-merge` | 2つのマップを結合。 | `map-merge($map1, $map2)` |
| `map-remove` | マップから指定したキーを削除。 | `map-remove($map, $keys...)` |
| `map-keys` | マップの全てのキーを取得。 | `map-keys($map)` |
| `map-values` | マップの全ての値を取得。 | `map-values($map)` |
| `map-has-key` | マップに特定のキーが存在するか確認。 | `map-has-key($map, $key)` |

*文字列の操作*
| 名前 | 説明 | 使い方例 |
|------|------|----------|
| `quote` | 文字列を引用符で囲む。 | `quote(foo)` |
| `unquote` | 文字列の引用符を外す。 | `unquote("foo")` |
| `str-length` | 文字列の長さを取得。 | `str-length("hello")` |
| `str-insert` | 文字列に文字を挿入。 | `str-insert("hello", "world", 6)` |
| `str-index` | 文字列内のサブ文字列の位置を取得。 | `str-index("hello", "e")` |
| `str-slice` | 文字列の一部を取得。 | `str-slice("hello", 1, 3)` |
| `to-upper-case` | 文字列を大文字に変換。 | `to-upper-case("hello")` |
| `to-lower-case` | 文字列を小文字に変換。 | `to-lower-case("HELLO")` |

*その他*
| 名前 | 説明 | 使い方例 |
|------|------|----------|
| `if` | 条件に基づいて異なる値を返す。 | `if(true, 1px, 0)` |
| `unique-id` | 一意の識別子を生成。 | `unique-id()` |
| `selector-nest` | セレクタをネスト。 | `selector-nest('.parent', '.child')` |
| `selector-append` | セレクタを追加。 | `selector-append('.parent', '.child')` |
| `selector-replace` | セレクタを置換。 | `selector-replace('.old', '.new')` |
| `selector-unify` | セレクタを統合。 | `selector-unify('.parent', '.child')` |
| `is-superselector` | 一つのセレクタが他のセレクタを含むかどうか。 | `is-superselector('.parent', '.child')` |
