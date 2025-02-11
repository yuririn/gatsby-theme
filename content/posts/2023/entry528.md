---
title: Cropper.js でアップロードした画像をリサイズしたファイルをダウンロードする
date: 2023-12-28
pageType: blog
hero: thumbnail/2023/entry528.jpg
cateId: web-developer
tags: ["JavaScript"]
description: アップロードした画像のリサイズを手軽にリサイズするためcropper.jsというライブラリを使ってみました。フォームから画像をアップロード、リサイズ、ダウンロードしました。Base64からバイナリファイルの変換方法も合わせて紹介しています。
---

アップロードした画像のリサイズを手軽にするために cropper.js というライブラリを使ってみました。

_やりたかったこと_

- フォームから画像ファイルをアップロード
- cropper.js で決まったアスペクト比・規定のサイズでトリム
- トリムした画像を自動ダウンロード

_前提条件_

- JS ライブラリを扱ったことがある
- HTML・CSS の基礎知識がある

<prof></prof>

## JS でファイルのアップロード機能を実装

まずはアップロード機能を作ります。今回は`input[type=file]`に`id`を振って操作します。

`accept`属性でアップロードできる画像の種類（png,jpg）を限定します。

```html:title=HTML
<input type="file" id="fileUpload" accept="image/png, image/jpeg">
```

```js:title=JS
  const fileUpload = document.querySelector('#fileUpload');

  fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const blobUrl = URL.createObjectURL(file);
    //パスを格納する要素を作成
    const img = document.createElement('img')
    img.src = blobUrl
    //imgタグをinputタグの後ろに追加
    fileUpload.parentNode.insertBefore(img, fileUpload.nextElementSibling);
  });
```

JS で`img` タグを追加して`createObjectURL()`でパスを生成、追加します。挙動としてはアップロードするとどんな画像がアップロードされたかビジュアル的に確認できます。

![画像のアップロード](images/2023/12/entry528-3.jpg)

[createObjectURL() 静的メソッド | MDN](https://developer.mozilla.org/ja/docs/Web/API/URL/createObjectURL_static)

CANIUSE や ChatGPT によると`createObjectURL()` は _現在非推奨_ とされているそうです。あえて使った [理由](#createobjecturl-を使う理由) はこちら。

## Cropper.js でトリム機能を追加、データ書き出し

Cropper.js で画像のトリムを行います。操作と、実際にトリムした画像データを出力するまでを解説します。

![Cropper.js 公式サイト](images/2023/12/entry528-1.jpg)

[Cropper.js 公式サイト](https://fengyuanchen.github.io/cropperjs/)

今回は CDN を使います。

```html:title=cropper.min.js
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js"></script>
```

```html:title=cropper.min.css
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css">
```

[cropperjs | cdnjs](https://cdnjs.com/libraries/cropperjs)

### Cropper.js でトリム操作できるようにする

Cropper 追加方法はこんな感じ。

```js:title=Cropper追加
new Cropper(要素,{オプション});
```

すでにある画像要素に`Cropper()`させたい場合は要素を `getElementById` や `querySelector` などで引っ張ってきて第一引数に入れれば OK。

```js:title=Cropper追加
const img = document.querySelector('img');
const cropper = new Cropper(img);
```

```js{2,5-7,11,16-23}:title=トリム操作できるようにする
const fileUpload = document.querySelector('#fileUpload');
let cropper, img; //変数追加
fileUpload.addEventListener('change', (e) => {
  //ファイルを選んでいないときのCropperJS発火防止
  if (e.target.files[0] === undefined) {
    return false;
  }
  const file = e.target.files[0];
  const blobUrl = window.URL.createObjectURL(file);

  if (cropper === undefined) { //インスタンス化されていないときの処理
    //パスを格納する要素を作成
    const img = document.createElement('img')
    img.src = blobUrl
    fileUpload.parentNode.insertBefore(img, fileUpload.nextElementSibling);
    cropper = new Cropper(img, {
      aspectRatio: 1 / 1,
      scalable: false,
      zoomable: false,
    });
  } else { //インスタンス化されており画像の変更があったときの処理
    cropper.replace(blobUrl);
  }
})
```

画像アップロードと同時にトリム操作可能になります。

![Cropper.js でトリム操作できるようにする](images/2023/12/entry528-4.jpg)

#### オプションとメソッド

```js:title=オプション
cropper = new Cropper(img, {
  aspectRatio: 1 / 1,
  scalable: false,
  zoomable: false,
});
```

今回設定したオプションは以下です。固定でアスペクト比 1:1 に切り取りたかったので`aspectRatio`をセットしました。

| オプション    | 説明                         | 初期値 |
| ------------- | ---------------------------- | ------ |
| `aspectRatio` | ボックスのアスペクト比の固定 | NaN    |
| `scalable`    | 画像の拡大・縮小操作できるか | true   |
| `zoomable`    | 画像のズーム操作できるか     | true   |

公式の[Options](https://github.com/fengyuanchen/cropperjs?tab=readme-ov-file#options)（英語）です。

画像が再アップロードされて入れ替わったとき、一度インスタンス化した`cropper`の 画像パスを切り替える処理です。`replace`メソッドを使います。

```js:title=画像の切替処理
let cropper; // インスタンス化前の初期値はundefined

if (cropper === undefined) {
  cropper = new Cropper(要素)
} else {
  cropper.replace(画像パス);
}
```

公式の[Methods](https://github.com/fengyuanchen/cropperjs?tab=readme-ov-file#methods)（英語）です。

### リサイズしたデータを base64 変換

`getCroppedCanvas`を使って、トリムしたデータを一度`canvas`にします。`toDataURL`を使って base64 変換します。

```js{2,7-9,11,21-26}:title=リサイズしたデータをbase64変換
const fileUpload = document.querySelector('#fileUpload');
let cropper, img, trimBtn, base64Data;//trimBtn, base64Data追加
fileUpload.addEventListener('change', (e) => {
  //省略
  if (cropper === undefined) {
    // トリムボタンを作成
    trimBtn = document.createElement('button')
    trimBtn.type = 'button';
    trimBtn.textContent = 'トリム'
    // トリムボタンをimgタグの下に挿入
    img.parentNode.insertBefore(trimBtn, img.nextElementSibling);

    cropper = new Cropper(img, {
      aspectRatio: 1 / 1,
      scalable: false,
      zoomable: false,
    });
  } else {
    cropper.replace(blobUrl);
  }
  //トリムボタンをクリックしたらデータ取得
  trimBtn.addEventListener('click', () => {
    const croppedCanvas = cropper.getCroppedCanvas({ width: 300, height: 300 });
    base64Data = croppedCanvas.toDataURL("image/jpeg");
    console.log(base64Data);//データ出力を確認
  })
})
```

`console.log` で base64 化できたかを確認します。
![ console.log出力](images/2023/12/entry528-5.jpg)

## base64 データをバイナリ化して自動ダウンロード

リサイズした画像を実際の JPG ファイルに変換してダウンロードします。

```js{4-12}:title=base64データをバイナリ化
//省略
trimBtn.addEventListener('click', () => {
  //省略
  base64Data = croppedCanvas.toDataURL("image/jpeg");

  const bin = atob(base64Data.replace(/^.*,/, ''));
  const buffer = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
  }
  //バイナリファイル化
  const blob = new Blob([buffer.buffer], { type: "image/jpeg" })
})
//省略
```

- _atob_...Base64 文字列をバイナリ文字列へ変換
- _Uint8Array_...8 ビット符号なし整数値の配列を生成
- _charCodeAt_... メソッドは、指定された位置にある UTF-16 コード単位を表す 0 から 65535 までの整数を返す。
- _Blob(source, option)_... Blob コンストラクターは、新たな Blob（Binary Large OBject） を返す。

データがバイナリ化出来たら`a`タグを生成し画像へのリンクを貼り、強制的にクリックして画像をダウンロードさせます。

```js{6-17}:title=バイナリ化したファイルをダウンロード
//省略
  trimBtn.addEventListener('click', () => {
    //省略

    //バイナリファイル化
    const blob = new Blob([buffer.buffer], { type: "image/jpeg" })
    //ダウンロード用のaタグを生成
    const linkTag = document.createElement('a');
    const link = URL.createObjectURL(blob)
    linkTag.href = link;
    //ファイル名用
    const now = new Date();
    linkTag.download = `resize-${now.getTime()}.jpg`;
    linkTag.textContent = "ダウンロードする";
    trimBtn.parentNode.insertBefore(linkTag, trimBtn.nextElementSibling);
    //強制的にクリックしてダウンロード
    linkTag.click();
  })
//省略
```

300✕300px で resize-1703724887608.jpg とリネームされた JPG ファイルがダウンロードされました。

![バイナリ化したファイルをダウンロード](images/2023/12/entry528-6.jpg)

## createObjectURL() を使う理由

`createObjectURL()` は、非推奨という記事も見かけたので ChatGPT に聞いてみました。

<msg txt="私の知識の範囲では、2022年1月までの情報しか含まれておらず、最新の情報は提供できません。代わりに、File や Blob を直接使用して処理する方法が推奨されています。" name="ChatGPT" cls="right"  img="common/chatgpt.png"></msg>

<msg txt="え、、2023年更新の記事にも検証結果が載ってたんですが。。。"></msg>

![caniuse](images/2023/12/entry528-2.png)

CANIUSE で調べると思いっきり _createObjectURL() is no longer available within the context of a ServiceWorker.(ServiceWorker のコンテキスト内では使用できなくなりました。)_ って書いてありました。

> Service Worker はブラウザがバックグラウンドで実行するスクリプト。

今回は Service Worker は関係ないので、あえて`createObjectURL()`を使います。次回また、`fileReader()` を使った方法をご紹介します。

## まとめ・画像は JS で直感的にリサイズできると ◎

今回実は会員証の画像のアップロードさせたくて Cropper.JS を試してみました。

ファイル名、拡張子、アスペクト比、サイズがバラバラだったら受け取ったあとの管理が難しいですしね。

使ってみたら想像以上に便利だったので、使い方をご紹介させていただきました。

この記事が、みなさんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

### おまけ・Cropper.JS のボックスに顔の位置のガイドを付ける

証明写真撮影マシーン（？）で撮影すると顔の位置ガイドってありますよね？

Cropper.JS のボックスにもつけれないかなーと思ったらあっさり出来たのでその方法のご紹介しておきます。

![caniuse](images/2023/12/entry528-8.jpg)

CSS だけで OK。サイズ等は適宜変更してください。

```css:title=顔の位置ガイド
/**ガイドの部分がタッチできなくなるので順番を上に持ってくる */
.cropper-face.cropper-move {
  z-index: 1;
}
/**ガイド */
.cropper-crop-box::before {
  content: "";
  width: 50%;
  display: block;
  height: 60%;
  position: absolute;
  background: rgba(255,255,255,.3);
  z-index: 1;
  left: 25%;
  top: 20%;
  border-radius: 50%
}
```
