---
title: Pandoc × EJS で Word ファイルを HTML ページに変換する
date: 2025-01-16
modified: 2025-01-27
pageType: blog
hero: thumbnail/2025/entry537.jpg
cateId: web-developer
tags: ["Gulp","npm","コマンド"]
description: Pandoc × EJS WordファイルからコマンドでHTMLに生成する方法をまとめました。Pandoc⇒Markdownで変換してもともとあるhtmlをコピーして手動で組み込んでましたがtitleやdescriptionなどの差し替えがすごく面倒だし、間違える。gulpを使ってタスクを作ります。
---
今回やりたいことは、ヘッダーなどの共通部分は一緒で本文はwordから流出し、HTMLをコマンド生成するというものです。

実際最近お仕事でWord納品の記事をHTMLに組み込む作業をしていました。

最初は Pandoc⇒Markdown で変換してもともとあるhtmlをコピーして手動で組み込んでましたが title や description などの差し替えがすごく面倒だし、間違える涙

それを解決するためにこの記事を書きました。

> Pandoc は、あるマークアップ形式から他の形式へ変換する Haskell ライブラリと、そのライブラリを用いたコマンドラインツールです。

[Pandocユーザーズガイド 日本語版 [2.7.2]](https://pandoc-doc-ja.readthedocs.io/ja/latest/users-guide.html)

<prof></prof>

[ESモジュール版のサンプル](#アドバンス2無駄なファイルを生成しない方法esモジュール)も用意しています。

## pandoc インストール

brewコマンドでインストール。
```shell:title=コマンド
brew install pandoc
```

Homebrew がない方でも以下リンクから直接ダウンロードしてインストールできます。

[pandoc | Github](https://github.com/jgm/pandoc/releases/tag/3.6.2)

### Word記述のルール
タイトルなどのメタ情報は変数に格納したかったので、記述を以下のようにし、Markdown ファイルに変換した後にEJS（本文）と json ファイル（メタ情報）に分割します。

```text:title=word
slug_page1
title_タイトル
description_ページの説明

本文 ....

画像名.jpg
```
MDファイルにしたら、gulp経由で`_`や`=`は置換のトリガーにするので本文にはこの2つの記号は使わないようにします。

### Pandoc で Markdown ファイルに変換
まずは、ファイルをコマンドで md ファイルに変換しておきます。

```shell:title=コマンド
pandoc -s xxx.docx --wrap=none --extract-media=images -t gfm -o xxx.md
```

gulpで処理したい。

## gulp で md ファイルを html に変換

今回は gulp を採用しました。タスクを今回はmodule形式で書かないため `gulp-markdown`のみバージョンを落としてください。

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

### Json ファイルを作成

正規表現で置換し、json ファイルを作り、一旦は同じディレクトリに突っ込みます。

```js:title=gulpfile.js
const { src, dest, series, parallel } = require("gulp");
const rename = require("gulp-rename")
const replace = require("gulp-replace")

const dir = {
  dist: "./dist/",
  src: "./src/",
};

const createJsonFile = () => {
  return new Promise((resolve, reject) => {
    src(`${dir.src}main.md`, { allowEmpty: true })
      .pipe(rename('temp.json'))
      .pipe(replace(/^(?!.*\_).*\n/gmi, ``))
      .pipe(replace(/^\=(.*?)\_(.*?)\n/gmi, `{\n  "$1": "$2",\n`))
      .pipe(replace(/^(.*?)\_(.*?)\=\n/gmi, `  "$1": "$2"\n}`))
      .pipe(replace(/^(.*?)\_(.*?)\n/gmi, `  "$1": "$2",\n`))
      .pipe(dest(`${dir.src}`))
      .on("end", resolve)
      .on("error", reject);
  });
};

exports.default = parallel(series(createJsonFile))
```
*=slug\_page1*は
```text
{
  "slug": "page1",
```
*description\_ページの説明=* は
```text
  "description": "ページの説明"
}
```
*title\_タイトル* は
```text
  "title": "タイトル",

```
という感じで置換されるようにしています。正規表現に関しては以下を参考に。

<card id="/blogs/entry336/"></card>

ちなみに、うまく置換できなかったのでglobalにgulp-replaceをインストールしています。
```shell:title=コマンド
npm i gulp-replace -g
```

### Jsonファイルを作成

本文を形成し、EJS に変換します。

```js:title=gulpfile.js
...
const markdown = require('gulp-markdown')//追加

...
const createEjs = () => {
  return new Promise((resolve, reject) => {
    src(`${dir.src}main.md`, {allowEmpty: true})
      .pipe(replace(/^(.*?)\_(.*?)\n/gmi, ``))
      .pipe(replace(/^[\t]\n/gmi, ``))
      .pipe(replace(/^(.*?)\.jpg\n/gmi, `\<img src\="画像格納ディレクトリ名/\/$1.jpg" alt\="" height\="640" width\="420" loading\="lazy"\/>\n`))
      .pipe(markdown())
      .pipe(replace(/\sid\=\"(.*?)\"/gmi, ``))
      .pipe(rename({ extname: ".ejs" }))
      .pipe(dest(`${dir.src}/`))
      .on("end", resolve)
      .on("error", reject);
  });
}

exports.default = parallel(series(createJsonFile, createEjs))
```
Pandocからも画像のタグは作れるのですが、HTML化するときに都合が悪かったので、とりあえず画像名が配置されている場所に画像タグを挿入するようにします。

*=画像名.jpg*を置換します。
```html
<img src="画像格納ディレクトリ名/画像名.jpg" alt="" width="640" height="420" loading="lazy">
```

Markdown => HMTLにコンバートするときに見出しに付与されるidも不要なので削除します。

```js
replace(/\sid\=\"(.*?)\"/gmi, ``)
```
### EJS から HTML へ

HTML 変換します。EJS の詳しい記事はこちら。

<card id="/blogs/entry459/"></card>"

```js:title=gulpfile.js
...
const fs = require("fs")//追加
const ejs = require("gulp-ejs")//追加
const htmlbeautify = require("gulp-html-beautify")//追加

...
const destHTML = () => {
  return new Promise((resolve, reject) => {
    const json_path = `./src/temp.json`;
    const json = JSON.parse(fs.readFileSync(json_path));

    src(`${dir.src}/index.ejs`, { allowEmpty: true })
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
      .on("end", () => {
        // 指定されたファイルの削除
        Promise.all([
          fs.unlink(json_path),
          fs.unlink(`${dir.src}/temp.ejs`)
        ])
        .then(resolve)
        .catch(reject);
      })
      .on("error", reject);
  });
}
exports.default = parallel(series(createJsonFile, createEjs, destHTML))
```

ディレクトリ構造はこちら。

```
root/
  ├ src/
  │  main.docx
  │  main.md
  │  temp.ejs ←本文（一時ファイル）
  │  temp.json ← メタ情報（一時ファイル)
  │  index.ejs ← 本文を組み込むテンプレート
  └ dist/
    │  index.html ←新たに生成される
    └ 画像格納ディレクトリ/
      [slug名]-eyecatch.jpg
      [slug名]-01.jpg
      [slug名]-02.jpg
```

生成された temp.json や temp.ejs は一時的な作業用ファイルなので、削除します。

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
      <%- include(`./temp.ejs`) %>
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
  for(const post of posts){
    let promise = new Promise((resolve, reject) => {
      src(`${dir.src}/index.ejs`, {allowEmpty: true})
        .pipe(dest(`${dir.dist}${post}/`))
        .on("end", resolve)
        .on("error", reject);
      })
    promises.push(promise);
  }
  Promise.all(promises).then(() => done()).catch(done);
}
```

`createJsonFile` も `createEjs` も同様に `for` 文で処理するだけです。

## アドバンス2・無駄なファイルを生成しない方法(ESモジュール)
child_process を使えば、gulpから指定したコマンドを叩けます。

一度 Markdown 化し中身を目視でチェック、問題なければhtml化するプロセスを取ります。

```shell:title=コマンド
npn i gulp fs/promises child_process gulp-ejs vinyl through2 gulp-markdown gulp-html-beautify gulp-rename -D
```
```js:title=gulpfile.js
import { src, dest } from "gulp";
import * as fs from 'fs/promises'; // fs.promises モジュールを使用
import { exec } from 'child_process';
import ejs from 'gulp-ejs';
import File from 'vinyl';
import through from 'through2';
import markdown from 'gulp-markdown';
import htmlbeautify from 'gulp-html-beautify';
import rename from 'gulp-rename';

// execPromise を使用して非同期にシェルコマンドを実行するためのプロミスを作成
const execPromise = promisify(exec);

// ディレクトリ設定
const dir = {
  dist: "./dist/",
  src: "./src/",
  imgPath: `/assets2/images/educaion/`,
  prodPath: `/dist/educaion/`,
};

// ディレクトリ内のポストを取得する関数
const getPosts = async () => {
  const files = await fs.readdir(dir.src);
  return files.filter(file => file !== '.DS_Store' && file !== 'index.ejs');
};
```
```js:title=gulpfile.js
// Markdownファイルを読み取り、メタ情報とメインコンテンツに分割する関数
const readMarkdownFile = async (path) => {
  let markdownContent = await fs.readFile(path, 'utf-8');
  let metaInfo = {};
  let mainContent = markdownContent.replace(/^\-\s+([\w\W]+?)\/([\w\W]+?)$/gm, (match, key, value) => {
    metaInfo[key.trim()] = value.trim();
      return '';
  });
  return { metaInfo, mainContent };
};

// 画像ファイル名をHTMLの画像タグに置換する関数
const replaceImages = (content, post) => {
  return content.replace(/(.*\.(?:jpg|jpeg|png|gif))/gi, `<img src="${dir.imgPath}${post}/$1" alt="" width="640" height="420" loading="lazy">`);
};

// MarkdownコンテンツをHTMLに変換する関数
const convertMarkdownToHtml = (markdownContent) => {
  const stream = through.obj();
  const file = new File({
    contents: Buffer.from(markdownContent),
      path: "temp.md"
  });

  stream.write(file);
  stream.end();

  return new Promise((resolve, reject) => {
    stream
        .pipe(markdown())
        .pipe(through.obj((file, enc, cb) => {
            resolve(file.contents.toString(enc));
            cb();
        }));
  });
};

// HTMLコンテンツを処理する関数（見出しのID削除とh3のテキストを囲む）
const processHtmlContent = (htmlContent) => {
  return htmlContent
    .replace(/\<h(2|3|4)\sid\=\"(.*?)\"/gmi, '<h$1')
    .replace(/<h3>(.*?)<\/h3>/gmi, '<h3><span className="heading--q">$1</span></h3>');
};

// 一時的なHTMLファイルにコンテンツを書き込む関数
const writeTempHtmlFile = async (path, content) => {
  await fs.writeFile(path, content, 'utf-8');
};

// HTMLコンテンツをテンプレートにインクルードする関数
const includeHtmlContentInTemplate = async (post, metaInfo) => {
  return new Promise((resolve, reject) => {
    src(`${dir.src}/index.ejs`, { allowEmpty: true })
      .pipe(
          ejs({
              jsonData: metaInfo
          }).on('error', reject)
      )
      .pipe(
          htmlbeautify({
              indent_size: 2, // インデントサイズ
              indent_char: " ", // インデントに使う文字列はスペース1個
              max_preserve_newlines: 0, // 許容する連続改行数
              preserve_newlines: false, // コンパイル前のコードの改行
              indent_inner_html: false, // head,bodyをインデント
              extra_liners: [],
          })
      )
      .pipe(rename({ extname: ".html" }))
      .pipe(dest(`${dir.dist}${post}`))
      .on('end', resolve)
      .on('error', reject);
  });
};

// DOCXファイルをMarkdownに変換する関数
const convertDocxToMd = async (sourcePath, destPath) => {
  try {
    const { stdout, stderr } = await execPromise(`pandoc ${sourcePath} -f docx -t markdown -o ${destPath}`);
    if (stderr) {
        console.error(`Error processing ${sourcePath}:`, stderr);
    } else {
        console.log(`Processed ${sourcePath} to Markdown`);
    }
  } catch (error) {
    console.error(`Error processing ${sourcePath}:`, error);
  }
};
```
```js:title=gulpfile.js
// HTMLファイルを生成するメイン関数
const createHTML = async (done) => {
  console.log('Starting HTML creation..');

  const posts = await getPosts();

  for (const post of posts) {
      const mdPath = `${dir.src}${post}/main.md`;
      const htmlPath = `${dir.dist}${post}/main.html`;
      console.log(`Reading file: ${mdPath}`);

      try {
          const { metaInfo, mainContent } = await readMarkdownFile(mdPath);
          const contentWithImages = replaceImages(mainContent, post);
          let htmlContent = await convertMarkdownToHtml(contentWithImages);
          htmlContent = processHtmlContent(htmlContent);

          // 一時ファイルに保存
          const tempHtmlPath = `${dir.src}${post}/temp.ejs`;
          await writeTempHtmlFile(tempHtmlPath, htmlContent);

          await includeHtmlContentInTemplate(post, metaInfo);

          console.log(`Created HTML file: ${htmlPath}`);
          await fs.unlink(tempHtmlPath);
      } catch (error) {
          console.error(`Error creating HTML for ${mdPath}:`, error);
      }
  }

  console.log('Finished HTML creation..');
  done();
};

// DOCXファイルをMarkdownに変換する関数
const createMdFiles = async () => {
    console.log('Starting pandoc..');

    const posts = await getPosts();

    for (const post of posts) {
        const sourcePath = `${dir.src}${post}/main.docx`;
        const destPath = `${dir.src}${post}/main.md`;
        console.log(`Target file is ${sourcePath}.`);

        await convertDocxToMd(sourcePath, destPath);
    }

    console.log('Finished pandoc..');
};
// エクスポートするタスク
export const doHtml = createHTML;
export const doPandoc = createMdFiles;
```

```json:title=package.json
"type": "module",
"scripts": {
  "start": "gulp",
  "html": "gulp doHtml",
  "pandoc": "gulp doPandoc"
},
```
```shell:title=コマンド
npm run html
npm run pandoc
```
## まとめ・ブログ記事が Word 納品でも簡単にテンプレートに組み込める

昔努めていた会社で大量の Word で納品されたブログを WordPress に移す作業がありました。

Word からコピペで貼り付けても、見た目は美しく形成されるのですが、変なクラスなどが付与されコードは汚くなり担当者が困ってました。

ちょうど WordPress にも ブロックエディタが導入され、Markdown が使えるようになっていたので Markdown に すればいいじゃん！となり、変換するコマンドを用意しました。

この経験がヒントになりました。

この記事が皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。
