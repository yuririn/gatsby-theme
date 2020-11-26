---
title: 脱 jQuery！軽量のスクロール JS・MoveTo が便利
date: 2018-12-14
hero: entry267.png
pagetype: blog
category: 'Front end'
cateId: 'front-end-program'
tags: ["JavaScript"]
description: みなさん、スムーズスクロールは好きですか？最近 jQueryなしで使える jsライブラリの MoveTo がお気に入りです。ということで、今日はMoveTo の使い方をご紹介します。
lead: ["フロントエンドエンジニアのかみーゆです。","みなさん、スムーズスクロールは好きですか？最近 jQueryなしで使える jsライブラリの MoveTo がお気に入りです。ということで、今日はMoveTo の使い方をご紹介します。"]
---

## GitHub からソースを拾ってこよう
以下サイトよりダウンロードします。
Clone or download をクリック後、Download ZIPでおっけーです。

[https://github.com/hsnaydd/moveTo](https://github.com/hsnaydd/moveTo)

dist/内に moveTo.js と moveTo.min.js がありますので、後者のミニファイ（圧縮）されたファイルの方を使いましょう。

## ページ内リンクをスムーズスクロール設定する
```
const moveto = new MoveTo({
  tolerance: 0,
  duration: 800,
  easing: 'easeOutQuart'
})
```
|値|内容|
|-|-|
|tolerance|スクロール到達地点の許容誤差を補正。初期値は「0」。ヘッダー固定などしているときは少し調整すると良い。|
|duration|移動時間をミリ秒単位で指定できる。初期値は「800」。|
|easing|スクロールのイージング描画の種類を指定します。初期値は「easeOutQuart」。|
|callback|スクロール終了時に実行される処理を指定可能。|

初期値のままで使いたい場合は、以下のように指定します。

```
const moveto = new MoveTo()
```

スクロール終了時に何かしら処理を加えることもできます。コールバックを指定したいときはこんな感じで書けばおっけー。

```
const moveto = new MoveTo({
  callback: function () {
    alert('スクロールしたよ！')
  }
})
```
### 個別に設定する
class を js-trigger に設定するとスクロールの対象になります。<br>
ターゲットの設定は aタグであれば href属性にまんま書いてもいいし、ボタンタグなどであればカスタム属性 data-taget の値に指定します。
```
<a class="js-trigger" data-mt-duration="300" href="#target">Trigger</a>
<button class="js-trigger" data-mt-duration="300" data-target="#target" type="button">Trigger</button>
```

### まとめて設定する
#(ハッシュ)から始まる href の値が指定してあるaタグのみスムーズスクロールできるようにします。
ちなみに href は hypertext reference の略です。
`href^=`で値が#から始まる aタグのみを配列化できます。

`forEach()`を使って一気に指定することも可能です。モダンブラウザであれば、`Array.prototype.slice.call`の指定は必要ありませんが、IE11では動きません！IE対策のために一行追加しましょう。

moveto.registerTrigger()で何をクリックしたら、moveTo が動くかを設定してやります。
```
let anchorTags = document.querySelectorAll('a[href^="#"]')
anchorTags = Array.prototype.slice.call(anchorTags, 0)//IE対策
anchorTags.forEach((value) => {
  moveto.registerTrigger(value)
})
```
## webpack から追加してみる
せっかくなので webpack で js もワンソース化しましょう。私は gulp と webpack 使ってます。`npm install` で追加してます。

webpack が入っていない人は入れてください。後日 webpack の導入の仕方は別に記事書きます。

```
$ npm install webpack webpack-stream -D
```
moveTo をインストールします。
```
$ npm install moveto -D
```

### 最新の webpack の場合
最新の webpack (4系)であれば webpack ムダに指示を書く必要はありません。<br>
import で呼び出せます。なんて楽ちん。

```
import MoveTo from 'moveto'
const moveto = new MoveTo()
let anchorTags = document.querySelectorAll('a[href^="#"]')
anchorTags = Array.prototype.slice.call(anchorTags, 0)//IE対策
anchorTags.forEach(　(value) => {
  moveto.registerTrigger(value)
})
```

## まとめ
いかがでしたか？<br>
jQueryなしでわりかし簡単に設定できるしとにかく軽いのは嬉しいです。ぜひ使ってみてください。

追記 : 12/14に[指摘](https://twitter.com/eielh/status/1073557594751459328)を受け、記事を修正・追記いたしました。
