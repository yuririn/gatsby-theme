---
title: pug（旧：Jade）を使い倒して時短マークアップしよう！
date: 2021-01-10
modifieddate: 2023-03-02
hero: thumbnail/2021/entry428.jpg
pagetype: blog
cateId: web-developer
tags: ["Gulp","npm"]
description: pug（Jade）の特徴やメリット、基本的な使い方、導入方法（pug-cliとgulp）。とくに記述方法はif（分岐）やfor・each（ループ処理）など解説。テンプレート化したい場合に使う記述方法の解説と具体的なテンプレートの作り方なども紹介。
faq: [["pug での連想配列の書き方がわからない","当記事ではpug での連想配列の書き方もご紹介しています。"],["pug での function(関数) の使い方を使いたい。","pug でも function(関数) を使うことができます。大抵のことはMixinで解決できますが、JavaScriptっぽい記法がいい方は、function で書き換えることもできます。使用方法については、当ブログで紹介しているのでぜひ参考にしてください。","https://ginneko-atelier.com/blogs/entry428/?utm_source=faq#function"],["pug でも for if each文 は使えますか？","もちろんpug でも for if each文 は使えます。少しコツが要りますが、当ブログで使い方も紹介しています。"],["Gulp じゃなくても pug は使えますか？","pug cli を使えば gulp や webpack を使わなくても気軽に使うことができます。"]]
---
ページを量産したりチームでサイトを作る時pugという言語を使ってWebサイトを作っています。pug（旧：Jade）の特徴やメリット、基本的な使い方、導入方法（pug-cliとgulp）についてまとめました。とくに記述方法はif（分岐）やfor・each（ループ処理）など解説。テンプレート化したい場合に使う記述方法の解説と具体的なテンプレートの作り方なども紹介しています。

普段webpackやgulpを使っている方なら導入のハードルも低いと思います。

今回はmpmコマンド出始めたい方はpackage.jsonで手軽にすぐ始められます！とても記事は長いので目次を利用して好きなところを読んでください。

<prof></prof>


## pugとは？
pugとは、Haml（HTMLを抽象化したマークアップ言語）記法に影響を受けたJavaScriptで実装された高機能テンプレートエンジンです。

*より短く、キレイかつ簡潔にコード*を書くことができます。

> The general rendering process of pug is simple. pug.compile() will compile the pug source code into a JavaScript function that takes a data object (called “locals”) as an argument. Call that resultant function with your data, and voilà!, it will return a string of HTML rendered with your data.<br>
> The compiled function can be re-used, and called with different sets of data.<br>
> 公式サイト：[pug](https://pugjs.org/api/getting-started.html)

昔は、*Jade（ヒスイ）*と呼ばれていましたが、すでに商標登録されていたのでpugに名前が変更されました（Version 2以降）。

似たようなテンプレートエンジンでEJSもあります。参考にしてください。

<card id="/blogs/entry459/"></card>

私の考えるpugでコーディングするデメリットとメリットを紹介します。

### 導入のメリット

* 大量のページを手分けして量産できる
* 短いコードでキレイかつ簡潔にコードが書ける
* ヘッダーや共通部分とそれ以外を分けて書ける

![pugではヘッダーや共通部分とそれ以外を分けて書ける](./images/2021/01/entry428-1.jpg)

こちらは私が作っているサイトの実際のpugファイルです。footerやheaderなどを分けてデフォルトで読み込み、主要コンテンツだけ毎度変更しています。

### 導入のデメリット

* 実務で使うためには*gulp*や*webpack*のタスクを書いたりコマンドを覚える必要がある
* インデントをミスると意図しないコンパイルが起きる
* コードの書き方など多少の学習コストがかかる

![実務で使うためにはgulpやwebpackのタスクを書いたりコマンドを覚える必要](./images/2021/01/entry428-2.jpg)

こちらは私が実際に利用しているLaravel mixのwebpackのコードです。タスクを書いたりしないといけないのは少し面倒ですね。

## 導入方法
pugはnpm経由でインストール可能です。

npmのモジュールを管理できるようにpackage.jsonを作っておきます。

今回はpug-cli(npmスクリプト)とgulpでの導入方法をご紹介します。

|　|メリット|デメリット|
|-|-|-|
|*gulp*|SCSSなどとあわせて複雑なタスクが書ける|モジュールを複数インストールしなければならないことがある。複雑なコードを書く場合がある|
|*pug-cli*|記述量が少なくてすむ。|複雑なタスクには不向き|

<msg txt="HTMLをコンパイルするだけなら pug-cli で十分です。"></msg>


package.jsonを作成し、npmモジュールを管理しながら、進めていきます。

今回は *pug-practice* というディレクトリを作り、ディレクトリに移動して以下コマンドを実行します。VS Codeであればディレクトリを開いて、ターミナルを開いて実行すればOKです。

<small>VS Codeであれば、ターミナルを`control + shift + @`で開くことができます。</small>

```shell:title=コマンド
npm init
# OR
npm init -y
```

通常プロジェクト名など、対話式で入力し作成していくのですが`-y`のオプションを使うと面倒な入力を省くことができます。


```json:title=packge.json
{
  "name": "pug-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "pug": "pug ./src --hierarchy -o ./dist -P"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    }
}
```
*package.json* ファイルが作成できました。


### pug-cliで始める

![pug-cliで始める](./images/2021/01/entry428-01.png)

次にpugをインストールします。インストールでコケる場合はsudo（管理者権限で実行）をつけてみてください。

```shell:title=コマンド
npm install pug pug-cli -D
```
`pug`と`pug-cli`がインストールされます。
```
"pug": "^3.0.2"
"pug-cli": "^1.0.0-alpha6"
```

<small>※ テンプレートを分けたい場合は、pug-cliを再インストールする必要があります。<a href="#テンプレート化したい場合に使う記述方法">テンプレート化したい場合に使う記述方法</a>を参照してください。</small>


```json:title=packge.json
{
  "name": "pug-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "pug": "^3.0.2",
    "pug-cli": "^1.0.0-alpha6"
  }
}
```
`src` と `dist` ディレクトリを作成し、空の `index.pug` を追加しておきます。

```
pug-practice/
  ├ node_modules/
  ├ package.json
  ├ src/
  |  └ index.pug（追加）
  └ dist/
```
`src` ディレクトリにある `index.pug` を `index.html` として `dist` ディレクトリに出力します。

```shell:title=コマンド
pug ./src --hierarchy -o ./dist -P -w
```

毎度、コマンドを打つのは面倒なので、scriptとして登録しておきます。

```json:title=packge.json
{
  "name": "pug-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "pug-w": "pug ./src --hierarchy -o ./dist -P -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "pug": "^3.0.2",
    "pug-cli": "^1.0.0-alpha6"
  }
}
```

すると以下コマンドで実行できるようになります。

```shell:title=コマンド
npm run pug-w
```

![pug-cliで実行結果](./images/2021/01/entry428-04.png)

`src` ディレクトリ内のpugファイルを更新すると`src` ディレクトリ内にHTMLファイルがコンパイルされます。`-w`オプションが付いているのでリレンダー（再コンパイル）されます。
<br><small>※scriptのオプションは記事の最後にあります。</small>

<br>Macであれば `Control+C` で実行を抜けることができます。

### Gulpで始める
![Gulpで始める](./images/2021/01/entry428-02.png)
Gulpで始める場合は `gulp` と `gulp-pug` をインストールします。

ディレクトリを作成し `npm init -y` などで *packge.json* ファイルを作成した状態からスタートします。`pug-cli` と同じディレクトリ名を使っていますが、別々に試したい場合は名前を変えてください。

ライブリロードさせたいので `browser-sync`エラーを吐いてもgulpを止めないために`gulp-plumber`をあわせてインストールします。

```shell:title=コマンド
npm install gulp-pug gulp browser-sync gulp-plumber -D
```

```json:title=packge.json
{
  "name": "pug-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "browser-sync": "^2.27.10",
    "gulp-plumber": "^1.2.1",
    "gulp": "^4.0.2",
    "gulp-pug": "^5.0.0"
  }
}
```
`src` と `dist` ディレクトリを作成し、空の `index.pug` を追加しておきます。タスクを記述する *gulpfile.js* を追加します。

```
pug-practice/
  ├ node_modules/
  ├ package.json
  ├ gulpfile.js（追加）
  ├ src/
  |  └ index.pug（追加）
  └ dist/
```
タスクを以下の通り書きます。

```js:title=gulpfile.js
const { src, dest, series, parallel, watch } = require("gulp");
const pug = require('gulp-pug');
const plumber = require("gulp-plumber");
const bs= require("browser-sync");

// browserSync
function bsInit(done) {
  bs.init({
    server: {
      baseDir: "./dist/",
    },
    reloadDelay: 1000,
    open: false,
  });
  done();
}
// pug
function html(done) {
  src('./src/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(dest('./dist'))
    .pipe(bs.stream())
  done();
}
// watch
function watchTask(done) {
  watch('./src/*.pug', html);
  done();
}

exports.default = series(parallel(bsInit,html),watchTask);
```
npmスクリプトを変更します。
```json:title=packge.json
  "scripts": {
    "start": "gulp"
  },
```

```shell:title=コマンド
npm start
```
![Gulp実行結果](./images/2021/01/entry428-03.png)


## 基本のコードのご紹介

基本のpugの記述方法です。

### 基本中の基本・単純なタグと文字列を出力したい場合
pugの記法はタグ名+スペース+コンテンツです。閉じタグは不要です。

```pug:title=pug
p hello,pug!
```
これでファイルはコンパイルできましたね！！

```html:title=HTML
<p>hello,pug!</p>
```

<br>htmlを直に書くことができます。
```pug:title=pug
div
  <p>hello,pug!</p>
```

```html:title=HTML
<div><p>hello,pug!</p></div>
```

<br> *=（イコール）* でタグ内にコンテンツを内包させることもできます。

```pug:title=pug
p='こんにちは。IT戦士のかみーゆです。'
```
```html:title=HTML
<p>こんにちは。IT戦士のかみーゆです。</p>
```

### エスケープ処理
出力内容をエスケープしたくないことがありますよね？
そんなときは!（エクスクラメーション・マーク）を使うとそのまま出力されます。

```pug:title=pug
p='見出し1は<h1>タグで囲みます'

p!='見出し1は<h1>タグで囲みます'
```

```html:title=HTML
<p>見出し1は&lt;h1&gt;で囲みます。</p>

<p>見出し1は<h1>で囲みます。</p>
```
### コメント
コメントをpug上には残して、htmlには反映したくない場合は */（スラッシュ）2つ＋-（ハイフン）*を文前に追加。

```pug:title=pug
//- ここにコメントをかく
```

htmlのコメントとして残したい場合は */（スラッシュ）2つ*です。

```pug:title=pug
// ここにコメントをかく
```

### 入れ子（ネスト）構造を書きたい場合
入れ子にしたい場合はインデント（字下げ）を使います。
以下のような書き方をします。

```pug:title=pug
header
  h1 hello, pug!
```

```html:title=HTML
<header>
  <h1>hello, pug!</h1>
</header>
```

<br>もしくは*:（コロン）+スペース*を使います。
```pug:title=pug
div: p test
```
```html:title=HTML
<div>
  <p>test</p>
</div>
```

### idとclassの出力
idは`#`、classは`.`でつなぐ。

```pug:title=pug
section#hoge
div.piyo
```
```html:title=HTML
<section id="hoge"></section>
<div class="piyo"></div>
```

またidやclassを使うとき、divは省略できます。

```pug:title=pug
.piyo
```

###  srcやhlefなどの属性の出力方法
属性は()内に属性名=値で記載できます。複数あるときは、*,（カンマ）*か*スペース*で区切ります。
```pug:title=pug
img(src="image.jpg", alt="画像", width="300", height="200")

a(href="./" target="_blank") トップページ
```
```html:title=HTML
<img src="image.jpg" alt="画像" width="300" height="200"/>

<a href="./" target="_blank">トップページ</a>
```
<br>id、クラスも同様にカッコ内にも書けます。

```pug:title=pug
section(id="hoge")

div(class="piyo")
```

<br>マルチラインで書くこともできます。

```pug:title=pug
input(
  type='checkbox'
  name='agreement'
  checked
)
```

```html:title=HTML
<input type="checkbox" name="agreement" checked="checked"/>
```

<br> *`（バッククォート）* を使えば、属性の値を複数行にまたいで書くこともできる。
```pug:title=pug
input(data-json=`
  {
    "very-long": "piece of ",
    "data": true
  }
`)
```
```html:title=HTML
<input data-json="
  {
	  &quot;very-long&quot;: &quot;piece of &quot;,
    &quot;data&quot;: true
  }
" />
```

<br>さらに`&attributes()`を使って、後から属性を連想配列として追加できます。
```pug:title=pug
a(href="/")&attributes({'style':'color:white','target':'_blank'}) リンク
```
```html:title=HTML
<a href="/" style="color:white;" target="_blank">リンク</a>
```

### 改行追加
インライン扱いされるようなタグは改行されずコンパイル時美しく整形されません。
改行を加えたい場合は *|（パイプ）2つ*を使います。


```pug:title=pug
a(href="/") HOME
|
|
a(href="/blog") Blog
```

```html:title=HTML
<a href="/">HOME</a>
<a href="/blog">Blog</a>
```

### 文字列の中にタグ
文字列の中に文字を入れる方法が2つあります。
1つは *|（パイプ）*を使う方法です。

```pug:title=pug
p
 | これは
 strong テキスト
 | です
```

もう一つは`#[]`で囲む方法です。

```pug:title=pug
p これは#[strong テキスト]です
```
前述したものに比べてこちらの方がはるかにカンタンなのでよく使います。

```html:title=HTML
<p>これは<strong>テキスト</strong>です</p>
```

### JSやstyleを追加したい場合
headタグ内やbody内にJSやCSSのコードを追加したいときは以下のように書きます。

```pug:title=pug
style.
  a {
    color: #333;
    background: #aaa;
  }

script.
  let pug = 'Hello, pug!!!';
  console.log(pug);
```
```html:title=HTML
<style>
  a {
    color: #333;
    background: #aaa;
  }
</style>

<script>
  let pug = 'Hello, pug!!!';
  console.log(pug);
</script>
```
## プログラミング的記述方法
分岐や変数、ループの書き方です。

ちょっと難しくなりますが、ムリに使わなくてもpugは十分書けます。

### 変数
pugでは変数が使えます。何気に便利。コンテンツとして出力したいときは `#{}` の中に記入します。

```pug:title=pug
- var name = "aaa"

p #{name}
```

```html:title=HTML
<p>aaa</p>
```

<br>属性の中に変数を入れるときはこんな感じで書きます。

```pug:title=pug
//- 変数のみ
input(type="text" value=name)

//- 変数 + 文字列
input(type="text" value=name + 'です')
```

<br>文字列と混在させるときは変数を `${}` 内に記入し *`（バッククオート）* で囲むと前述したものより可読性が上がります。

```pug:title=pug
//- 変数 + 文字列
input(type="text" value=`${name}です`)
```

```html:title=HTML
<input type="text" value="aaa"/>
<input type="text" value="aaaです"/>
```

<br>三項演算子で出力を分けることもできます。

```pug:title=pug
- var toppage = true

h1(class=toppage ? 'is-top' : 'is-lower') 見出し

```
```html:title=HTML
<h1 class="is-top">見出し</h1>
```

<br>そのまま変数を出力したい場合は *\（バックスラッシュ）* を使用します。

```pug:title=pug
p \#{pug}は変数です。
```
```html:title=HTML
<p>#{pug}は変数です。</p>
```

<br>`&attributes()`を使えば、属性を配列に渡して値を追加可能です。

```pug:title=pug
- var attributes = {};
- attributes.target = '_blank';
a(href="/")&attributes(attributes) リンク
```
```html:title=HTML
<a href="/" target="_blank">リンク</a>
```

### ifやcaseなどの分岐処理
*if文* です。ヘッダーロゴのリンクをつけるつけないなどの判定によく使います。

```pug:title=pug
- var pageId = 'home'
- var pageName = 'my site'

if pageId == 'home'
  h1 #{pageName}
else
  p: a(href="/") #{pageName}
```
```html:title=HTML
<h1>my site</h1>
```

<br>いわゆる*swhich文*のような書き方もできます。

```pug:title=pug
- var  pageTemplate = 'contact'
case pageTemplate
  when 'contact'
    section.contact
  when 'top'
    section.top
  default
    section
```
```html:title=HTML
<section class="contact"></section>
```
breakで抜けることもできます。
```pug:title=pug
default
- break
```
*:（コロン）* を使うとまとめて書けます。
```pug:title=pug
- var  pageTemplate = 'contact'
case pageTemplate
  when 'contact': section.contact
  when 'top': section.top
  default: section
```

### for、each、while文などのループ処理
ループもできます。

まずは *for文* から。

```pug:title=pug
ul
  - for (var i = 0; i <= 2; i++) {
    li.item リスト0#{i}
  - }
```
```html:title=HTML
<ul>
  <li class="item">リスト00</li>
  <li class="item">リスト01</li>
  <li class="item">リスト02</li>
  <li class="item">リスト03</li>
</ul>
```
<br> *while文* も使えます。出力結果は先ほどの *for文* と一緒です。

```pug:title=pug
- var n = 0;
ul
  while n < 3
     li.item リスト0#{n++}
```

<br>*each文*はより実用的に使えると思います。

```pug:title=pug
ul
  each val in [1, 2, 3]
    li = val
```
```html:title=HTML
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```
<br>インデックスも合わせて利用する場合。
```pug:title=pug
ul
  each val, index in ['cat', 'dog', 'rabbit']
    li= index + ': ' + val
```
```html:title=HTML
<ul>
  <li>0: 猫</li>
  <li>1: 犬</li>
  <li>2: うさぎ</li>
</ul>
```

<br>連想配列パターン。共通の変数として宣言さえしておけばメニューなんかにめっちゃ使える。

三項演算子と組み合わせると、クラスに現在のページというクラスも追加できます。

```pug:title=pug
- var menu = {'cat': '猫', 'dog': '犬', 'rabbit': 'うさぎ'}
- pageId = 'cat'
ul
  each val, key in menu
    li(class=key == pageId ? 'is-current' : '' ): a(href=`/${key}`)=val
```
```html:title=HTML
<ul>
  <li><a href="/cat">猫</a></li>
  <li><a href="/dog">犬</a></li>
  <li><a href="/rabbit">うさぎ</a></li>
</ul>
```
<br>pugはそもそもJSのメソッドが使えるので、値を大文字（アッパーケース）化してそのままタイトルに使う方法もあります。

```pug:title=pug
ul
  each val in ['cat', 'dog', 'rabbit']
    li: a(href=`/${val}`)=val.toUpperCase()
```
```html:title=HTML
<ul>
  <li><a href="/cat">CAT</a></li>
  <li><a href="/dog">DOG</a></li>
  <li><a href="/rabbit">RABBIT</a></li>
</ul>
```

### mixin
再利用したいときは*mixin*に登録しておきましょう。
```pug:title=pug
mixin list
  ul
    li CAT
    li DOG
    li RABBIT
+list
```
```html:title=HTML
<ul>
  <li>CAT</li>
  <li>DOG</li>
  <li>RABBIT</li>
</ul>
```
<br>引数を使うパターン。下層ページのタイトルやパンくずで使えそう。

```pug:title=pug
mixin pageHeader(pageId, pageName)
  header(class=pageId)
	//- toUpperCase()でローマ字大文字に
    p #{pageId.toUpperCase()}
    h1 #{pageName}

- var pageId = 'service'
- var pageName = '私たちのサービス'
//- 引数のデフォルトが出力される
+ pageHeader

//- 値を変更可能
+ pageHeader(pageId, pageName)
```

```html:title=HTML
<header class="service">
  <p>SERVICE</p>
  <h1>私たちのサービス</h1>
</header>
```
<br>引数にはデフォルトも設定しておけます。

```pug:title=pug
mixin pageHeader(pageId='top', pageName='トップページ')
```
出力結果です。
```html:title=HTML
<header class="top">
  <p>TOP</p>
  <h1>トップページ</h1>
</header>
```
<br>スプレッド構文を利用するパターン

```pug:title=pug
mixin list(id, ...items)
  ul(id=id)
    each item in items
      li= item
+list('my-list', 1, 2, 3, 4)
```
```html:title=HTML
<ul id="my-list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

### function
Mixin 以外にも function （関数）が使えます。たとえば、条件によってクラスをつけたい等は以下のような書き方も可能です。
```pug:title=pug
-
  var target = 1;
  var items = [1, 2, 3, 4];
  function targetNum(i){
    if( i === target )
      return "current";
    else
      return "";
  }
ul
  each item in items
    li(class=targetNum(item)) #{item}
```

```html:title=HTML
<ul>
  <li class="current">1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```
ページによって、メニューにクラスをつけてスタイルを変えたいときに便利ですね。

## pugでテンプレート化してみよう
ファイルを分けて、テンプレート化していきます。

### pug-cliの注意点

このままではコンパイル時に、*_（アンダースコア）* がついたファイルもコンパイルされてしまうので、pug-cliを「**GitHub – pugjs/pug-cli: pug’s CLI interface**」から *インストールし直す* 必要があります。

```json:title=コマンド
npm i github:pugjs/pug-cli#master -D
```
参照：[pug-cliで_（アンダースコア）がついたファイルやディレクトもコンパイルされてしまう問題を解決する
](https://qiita.com/soarflat/items/48cec8fb19252a3fc4ad)

```json:title=packge.json
{
  "name": "pug-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "pug-w": "pug ./src --hierarchy -o ./dist -P -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "pug": "^3.0.2",
    "pug-cli": "github:pugjs/pug-cli#master"
  }
}
```
### gulpの注意点
gulpfileを一部書き換えます。

```js:title=gulpfile.js
function html(done) {
  src(['src/**/*.pug',  '!src/**/_*.pug'])
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(dest('./dist'))
    .pipe(bs.stream())
  done();
}

function watchTask(done) {
  watch('./src/**/*.pug', html);
  done();
}
```

### include・ファイルの読み込み
ファイルを読み込みたい場合は *include+ペース+ファイルパス*です。

拡張子（.pug）は省略できます。

```pug:title=pug
include _inc/_header
```
### extend・継承
extendとblockを使って元となるファイルを継承することもできます。
たとえば、_layout.pugというテンプレートを使いたい場合は次のような書き方になります。

```pug:title=pug
extend _layout
```
### append・独自の設定
ページごとに独自の設定をもたせたいときはappendを使います。
```pug:title=pug
//- _layout.pug
block slider
//- home.pug
append slider
  script(src="slider.js")
```

## テンプレートサンプル（簡易バージョン）

ディレクトリー構成の例です。超簡易バージョンなので、実務用にするためには少し手を加える必要があります。
```
/pug-practice
  ├ node_modules/
  ├ package.json
  ├ src/
  |  ├ _inc/（追加）
  |  |  ├ _layout.pug（追加）
  |  |  ├ _header.pug（追加）
  |  |  └ _footer.pug（追加）
  |  └ index.pug
  └ dist/
     └ index.html（勝手に出力されます）
```

index.pugをテンプレート出力するためには以下のように書くと良いと思います。

### layout.pug・レイアウト用テンプレート
```pug:title=pug
//- Setting
block variables
append siteInfo
  - var siteName = 'My Site'
  - var menu     = {'home': 'トップページ', 'service': 'サービス', 'about': '私たちについて', 'contact':'お問い合わせ'}
  //- メニューの出力
  mixin list(current='', list=menu)
      ul
        each val, key in list
          - var key = key === 'home' ? '' : key
          if current !== ''
            li(class=val === current ? 'is-current' : '' ): a(href=`/${key}`)=val
          else
            li: a(href=`/${key}`)=val

//- コンテンツ
<!DOCTYPE html>
html
  head
    title=pageName
    meta(name="description" content=pageDescription)
  body
    include _header.pug
    main
      block content
    include _footer.pug

```

### header.pug・ヘッダー用テンプレのコード

```pug:title=pug
//- setting
block siteInfo
block variables

//- コンテンツ
header
  if pageId === 'index'
    h1 #{siteName}
  else
    p: a(href="/") #{siteName}

nav
  +list(pageName)

```

### footer.pug・フッター用テンプレのコード
```pug:title=pug
//- setting
block siteInfo

//- コンテンツ
footer
  +list
  p: small (c) #{siteName}
```

### index.pug・コンテンツ用テンプレのコード
```pug:title=pug
//- setting
extend _layout

append variables
  - var pageId = 'index' //- Name of the page
  - var pageName = 'トップページ'
  - var pageDescription = 'ページの説明'

//- コンテンツ
append content
  h1 #{pageName}
  p test

```

### 出力結果
```html:title=HTML
<!DOCTYPE html>
<html>
  <head>
    <title>トップページ</title>
    <meta name="description" content="ページの説明"/>
  </head>
  <body>
    <header>
      <h1>My Site</h1>
    </header>
    <nav>
      <ul>
        <li class="is-current"><a href="/">トップページ</a></li>
        <li><a href="/service">サービス</a></li>
        <li><a href="/about">私たちについて</a></li>
        <li><a href="/contact">お問い合わせ</a></li>
      </ul>
    </nav>
    <main>
      <h1>トップページ</h1>
      <p>test</p>
    </main>
    <footer>
      <ul>
        <li><a href="/">トップページ</a></li>
        <li><a href="/service">サービス</a></li>
        <li><a href="/about">私たちについて</a></li>
        <li><a href="/contact">お問い合わせ</a></li>
      </ul>
      <p><small>(c) My Site</small></p>
    </footer>
  </body>
</html>
```
## まとめ
いかがでしたか？

npmでcliで読み込むと、webpackやgulpどちらにでもカンタンに組み込めるので便利かと思います！

今回はよく忘れる変数やループ処理などの使い方を*かなりディープ*にまとめました。

[pugの公式サイト](https://pugjs.org/api/getting-started.html)を結構頑張って網羅してる（つもり..
）のでよかったら参考にしていただけると嬉しいです。

次回はもう少し実務で使えるテンプレのレシピをまとめようと思います。

最後までお読みいただきありがとうございました。

### おまけ・pug-cli の npmスクリプトのオプション

pug-cliのscriptのオプションです。途中まで訳しましたが、ちょっと自信なし。。。参考までに！

|オプション名|詳細|
|-|-|
|-h, --help             |ヘルプオプションの出力|
|-V, --version          |バージョンを調べる|
|-O, --obj `<str|path>`   |JSON/JavaScriptのオプションオブジェクトやファイル|
|-o, --out `<dir>`        |HTMLやJSを`<dir>`（指定した名前のディレクトリ）に出力|
|-p, --path `<path>`      |filename used to resolve includes|
|-P, --pretty           |インデントなど整えて出力|
|-c, --client           |クライアントようにコンパイル？（compile function for client-side runtime.js）|
|-n, --name `<str>`       |コンパイルされたテンプレートの名前（-cオプションが必要）|
|-D, --no-debug         |デバッグなしでコンパイルする|
|-w, --watch            |ファイルを監視し、更新されたらリロードする|
|-E, --extension `<ext>`  |出力ファイルの拡張子を指定|
|-s, --silent           |ログを出力しない|
|--name-after-file      |name the template after the last section of the file path (requires --client and overriden by --name)|
|--doctype `<str> `       |specify the doctype on the command line (useful if it is not specified by the template)|
|--hierarchy            |階層構造を維持したまま出力|
