---
title: 【npm-script】imagemin-cliを使って画像圧縮する方法
date: 2020-12-25
hero: 2018/entry267.png
pagetype: blog
category: Front End
cateId: front-end-program
tags: ["JavaScript","node","npm"]
description: npm-scriptで画像を圧縮する方法をご紹介します。imagemin cliで画像を圧縮しようとして、フォルダ階層を保てないことがわかり、どうしたものかハマりました。メモとして残しておきます。
lead: ["npm-scriptで使って画像を圧縮する方法をご紹介します。imagemin cliで画像を圧縮しようとして、フォルダ階層を保てないことがわかり、どうしたものかハマりました。メモとして残しておきます。"]
---
## npm-scriptでタスクを作って今までのプロジェクトのgulpやlaravel mixに差し込みたい

私はフロント案件開発のタスクランナーとして昔gulp、現在はlaravel mix（webpack）を使っています。

今までのプロジェクトに新しくタスクを作る必要があるけど、コード書き直すのが面倒だなーと思ってた時にたどり着いたのが、cliです。npm-scriptから実行できるので、gulpやwebpackに合わせて改めてコードを書かなくてOK。

しかも一度作るとタスクランナーに依存なく*使いまわせます*。もちろんメンテナンスは必要です。

imageminをインストールしてさっさと実行したい人は前置きすっ飛ばしてください。

### npm-scriptとは？
私の敬愛するICSメディアさんにとてもわかりやすい説明が掲載されていたのでそのまま引用しました！

> ウェブ制作の現場では作業の自動化が流行っています。「Gulp」「Grunt」などのタスクランナーや「webpack」などのビルドシステムなどのツールにより人力の作業を減らすことができ、生産効率や品質の向上につながります。
>
> どちらもNode.jsのモジュールとして動作するツールですが、実はこれらのタスクランナーを使わずとも、Node.jsインストール時に付属するnpm(Node Package Manager)を使用すれば、タスク処理が実現できます。
>
> npmとはNode.jsのモジュールを管理するためのツールであり、タスク処理にはnpmの機能のnpm-scriptsを使用します。Gulpやwebpackは有用ですが、npm-scriptsと併用することでさらに便利になります。本記事はnpm-scriptsを使ったタスク実行環境が構築できることを目標に解説します。

[Node.jsユーザーなら押さえておきたいnpm-scriptsのタスク実行方法まとめ](https://ics.media/entry/12226/)

### cliとは？
cliとはCLI(Command Line Interface) の略でコマンドラインから色々操作する方法です。
GitHubにさまざまなCLIが公開されています。

* ESLint
* npm
* imagemin（今回はこれ使います）

## imageminをインストール

npm で node moduleをインストールします。

```
$ npm install imagemin imagemin-keep-folder imagemin-mozjpeg imagemin-pngquant imagemin-gifsicle imagemin-svgo --save-dev
```

ディレクトリー構造はこちら。

```
/ (プロジェクトディレクトリー)
  ├ node_modules/
  ├ package.json
  ├ src/
  |  └ assets/images/（圧縮前の画像が格納されているフォルダ）
  ├ html/
  |  └ assets/images/（圧縮後の画像格納）
  └ imagemin.js（追加）
```

imagemin.jsファイルを作り以下のコードを書きます。

今回はタスクを作るにあたり、こちらのブログ記事を参考にしました。

[npm-scriptで開発環境を作ってみよう](https://olein-design.com/blog/build-webpage-by-npm-script)

同じようにコードを書いてやるとimagemin-pngquantの実行でコケます。

imagemin-pngquantの公式ページで見てみると、配列で書いてねとあるので`0 ~ 1`までの値を指定します。

```js
Type: Array<min: number, max: number>
Values: Array<0...1, 0...1>
Example: [0.3, 0.5]
```
[npm imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant)

```js
/*
 compress images
 */
const imagemin = require('imagemin-keep-folder');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

imagemin(['src/assets/images/**/*.{jpg,png,gif,svg}'], {
	plugins: [
		imageminMozjpeg({ quality: 80 }),
		imageminPngquant({ quality: [0.6, 0.8] }),
		imageminGifsicle(),
		imageminSvgo()
	],
	replaceOutputDir: output => {
		return output.replace(/images\//, '../../html/assets/images/')
	}
}).then(() => {
	console.log('Images optimized');
});
```

あとはpackage.jsonに以下のコードを足します。

```js
"scripts": {
	"image": "node imagemin.js"
}
```

## まとめ
タスクランナーに依存せず使いまわせるのはとっても便利です。

走り書きですが、皆さんのコーディングライフの一助になれば幸いです。

最後までお読みいただきありがとうございました。
