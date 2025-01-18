---
title: Pandoc × EJS で Word ファイルを HTMLページに変換する
date: 2025-01-16
pagetype: blog
hero: thumbnail/2025/entry537.jpg
cateId: web-developer
tags: ["Gulp","npm","コマンド"]
description: Pandoc × EJS WordファイルからコマンドでHTMLに生成する方法をまとめました。Pandoc⇒Markdownで変換してもともとあるhtmlをコピーして手動で組み込んでましたがtitleやdescriptionなどの差し替えがすごく面倒だし、間違える。gulpを使ってタスクを作ります。
---
昔努めていた会社で大量のWordで納品されたブログをWordPressに移す作業がありました。

Wordからコピペで貼り付けても、見た目は美しく形成されるのですが、変なクラスなどが付与されコードは汚くなり担当者が困ってました。

ちょうどWordPressにもクラシックエディタが導入され、WordPress内でもMarkdownが使えるようになっていたのでMarkdownにすればいいじゃん！となり、Markdownに変換するコマンドを用意しました。

> Pandoc は、あるマークアップ形式から他の形式へ変換する Haskell ライブラリと、そのライブラリを用いたコマンドラインツールです。

[Pandocユーザーズガイド 日本語版 [2.7.2]](https://pandoc-doc-ja.readthedocs.io/ja/latest/users-guide.html)

<prof></prof>

今回やりたいことは、ヘッダーなどの共通部分は一緒で本文はwordから流出し、HTMLをコマンド生成するというものです。

実際最近お仕事でWord納品の記事をHTMLに組み込む作業をしていました。

最初はPandoc⇒Markdownで変換してもともとあるhtmlをコピーして手動で組み込んでましたがtitleやdescriptionなどの差し替えがすごく面倒だし、間違える涙

それを解決するためにこの記事を書きました。

## pandoc インストール

brewコマンドでインストール。
```shell:title=コマンド
brew install pandoc
```

Homebrew がない方でもファイルをダウンロードしてインストールできます。

[pandoc | Github](https://github.com/jgm/pandoc/releases/tag/3.6.2)

### Word記述のルール
タイトルなどのメタ情報は変数に格納したかったので、記述を以下のようにし、mdファイルに変換した後にejs（本文）とjsonファイル（メタ情報）に分割します。

```text:title=word
=slug_page1
title_タイトル
description_ページの説明=

本文 ....

画像名.jpg
```
mdファイルにしたら、gulp経由で`_`や`=`は置換のトリガーにするので本文にはこの2つの記号は使わないようにします。

### Pandoc で Markdown ファイルに変換
まずは、ファイルをコマンドで markdown に変換しておきます。

```shell:title=コマンド
pandoc -s xxx.docx --wrap=none --extract-media=images -t gfm -o xxx.md
```

## gulp で md ファイルを html に変換

今回は gulp を採用しました。記述方法の問題で `gulp-markdown`のみバージョンを落としてください。

```shell:title=コマンド
npm init -y
npm i -D gulp gulp-ejs gulp-rename gulp-replace fs gulp-html-beautify
npm i -D gulp-markdown@6.0.0
```

* *gulp-ejs*
* *gulp-markdown(v6.0.0)*　
* *gulp-replace*
* *fs*
* *gulp*
* *gulp-html-beautify*
* *gulp-rename*

ファイル構成
```
root/
  ├ src/
  │  main.docx
  │  index.ejs
  │  main.md
  └ dist/
```

### Jsonファイルを作成

正規表現で置換し、jsonファイルを作り、一旦は同じディレクトリに突っ込みます。

```js:title=gulpfile.js
const { src, dest, series, parallel } = require("gulp");
const rename = require("gulp-rename")
const replace = require("gulp-replace")

const dir = {
    dist: "./dist/",
    src: "./src/",
};
const createJsonFile =(done)=> {
    src(`${dir.src}main.md`, {allowEmpty: true})
      .pipe(rename('meta.json'))
      .pipe(replace(/^(?!.*\_).*\n/gmi, ``))
      .pipe(replace(/^\=(.*?)\_(.*?)\n/gmi, `\{\n  "$1": "$2"\,\n`))
      .pipe(replace(/^(.*?)\_(.*?)\=\n/gmi, `  "$1": "$2"\n\}`))
      .pipe(replace(/^(.*?)\_(.*?)\n/gmi, `  "$1": "$2"\,\n`))
      .pipe(dest(`${dir.src}`));
    done()
}

exports.default = parallel(series(createJsonFile))
```
*=slug\_page1*は
```text
{
  "slug": "page1",
```
*description\_ページの説明=* は
```text
  "slug": "page1"
}
```
*title\_タイトル* は
```text
  "title": "タイトル",

```
という感じで置換しています。正規表現に関しては以下を参考に。

<card id="/blogs/entry336/"></card>

ちなみに、うまく置換できなかったのでglobalにgulp-replaceをインストールしています。
```shell:title=コマンド
npm i gulp-replace -g
```

### Jsonファイルを作成

本文を形成し、ejs に変換します。

```js:title=gulpfile.js
...
const markdown = require('gulp-markdown')//追加

...
const createEjs =(done)=> {
  src(`${dir.src}main.md`, {allowEmpty: true})
  .pipe(replace(/^(.*?)\_(.*?)\n/gmi, ``))
    .pipe(replace(/^[\t]\n/gmi, ``))
    .pipe(replace(/^(.*?)\.jpg\n/gmi, `\<img src\="画像格納ディレクトリ名/\/$1.jpg" alt\="" height\="640" width\="420" loading\="lazy"\/>\n`))
    .pipe(markdown())
    .pipe(replace(/\sid\=\"(.*?)\"/gmi, ``))
    .pipe(rename({ extname: ".ejs" }))
    .pipe(dest(`${dir.src}/`));
}

exports.default = parallel(series(createJsonFile, createEjs))
```
pandocからも画像パスは作れるのですが、HTML化するときに都合が悪かったので、とりあえず画像名が配置されている場所に画像タグを挿入するようにします。

*=画像名.jpg*を置換します。
```html
<img src="画像格納ディレクトリ名/画像名.jpg" alt="" width="640" height="420" loading="lazy">
```
Markdown => HMTLにコンバートするときに付与されるidも不要なので削除します。
```js
replace(/\sid\=\"(.*?)\"/gmi, ``)
```
### EJS から HTML へ

HTML変換します。EJSの詳しい記事はこちら。

<card id="/blogs/entry459/"></card>"

```js:title=gulpfile.js
...
const fs = require("fs")//追加
const ejs = require("gulp-ejs")//追加
const htmlbeautify = require("gulp-html-beautify")//追加

...
const destHTML =(done) => {
  setTimeout(() => {
    const json_path = `./src/meta.json`;
    const json = JSON.parse(fs.readFileSync(json_path))
    src(`${dir.src}/index.ejs`, {allowEmpty: true})
      .pipe(
        ejs({
          meta: json,
        })
      )
      .pipe(
        htmlbeautify({
          indent_size: 2,
          indent_char: " ", 
          max_preserve_newlines: 0,
          preserve_newlines: false,
          indent_inner_html: false,
          extra_liners: [],
        })
      )
      .pipe(rename({ extname: ".html" }))
      .pipe(dest(`${dir.dist}/`))
  }, 300)
  done()
}
exports.default = parallel(series(createJsonFile, createEjs, destHTML))
```

生成された `meta.json` を認識しないのであまりスマートではないですが `setTimeout` で遅延させて処理しました。

ディレクトリ構造はこちら。

```
root/
  ├ src/
  │  main.docx
  │  main.md
  │  main.ejs ←本文
  │  meta.json ← メタ情報
  │  index.ejs ← 本文を組み込むテンプレート
  └ dist/
    │  index.html ←新たに生成される
    └ 画像パス/
      [slug名]-eyecatch.jpg
      [slug名]-01.jpg
      [slug名]-02.jpg
```

本文を組み込むテンプレートファイルはこちら。
```html:title=index.ejs
<!DOCTYPE html>
<html lang="ja">
<head>
  <title> <%= meta.title %> | サイト名</title>
  <meta name="description" content="<%= meta.description %>" />
  ...
</head>
<body>
  <header>
    ...
  </header>
  <main>
    <article>
      <h1><%= meta.title %></h1>
      <img src="画像格納ディレクトリ名/<%= meta.slug %>-eyecatch.jpg" height="xx" width="xx" alt="<%= meta.title %>">
      <% /** markdownで生成したファイルをインクルードする */ %>
      <%- include(`./main.ejs`) %>
    </article>
  </main>
  <footer>
    ...
  </footer>
</body>
```

### アドバンス・まとめて組み込みたい時は for などで処理を回す
Pandoc の Markdownファイル作成は別処理になりますが、フォルダ名を取得すればまとめて処理できます。

フォルダ構成は以下とした場合。
```
root/
  ├ src/
  │ ├ A
  │ ├ B
  │ └ C
  └ dist/
    ├ A index.html
    ├ B index.html
    └ C index.html
```

```js:title=gulpfile.js
const posts = fs.readdirSync(dir.src)
  .filter((dir) => dir !== '.DS_Store' && dir !== 'index.ejs')

...
const destHTML =(done)=> {
  setTimeout(()=>{
    for(const post of posts){
      src(`${dir.src}/index.ejs`, {allowEmpty: true})
      .pipe(dest(`${dir.dist}${post}/`))
    }
  }, 300)
  done()
}
```

`createJsonFile` も `createEjs` も同様に `for` 文で処理するだけです。

## まとめ・ブログ記事がWord納品でも簡単にテンプレートに組み込める

この記事が皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。
