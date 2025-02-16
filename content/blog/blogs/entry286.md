---
title: 脱 jQuery！軽量のスクロール JS・MoveTo が便利
date: 2018-12-14
modifieddate: 2022-12-17
hero: thumbnail/2018/entry267.png
pagetype: blog
cateId: 'web-developer'
tags: ["JavaScript"]
description: jQueryなしで使える jsライブラリの MoveTo の使い方をご紹介します。別ページに遷移したときの対処法もご紹介。
---
みなさん、スムーズスクロールは好きですか？最近 jQueryなしで使える jsライブラリの MoveTo がお気に入りです。ということで、今日はMoveTo の使い方をご紹介します。別ページに遷移したときの対処法もご紹介。


## GitHub からソースを拾ってこよう
以下サイトよりダウンロードします。
Clone or download をクリック後、Download ZIPでおっけーです。

[https://github.com/hsnaydd/moveTo](https://github.com/hsnaydd/moveTo)

dist/内に moveTo.js と moveTo.min.js がありますので、後者のミニファイ（圧縮）されたファイルの方を使いましょう。

## ページ内リンクをスムーズスクロール設定する
```js:title=JavaScript
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

```js:title=JavaScript
const moveto = new MoveTo()
```

スクロール終了時に何かしら処理を加えることもできます。コールバックを指定したいときはこんな感じで書けばおっけー。

```js:title=JavaScript
const moveto = new MoveTo({
  callback: function () {
    alert('スクロールしたよ！')
  }
})
```
### 個別に設定する
class を js-trigger に設定するとスクロールの対象になります。<br>
ターゲットの設定は aタグであれば href属性にまんま書いてもいいし、ボタンタグなどであればカスタム属性 data-taget の値に指定します。
```HTML:title=HTML
<a class="js-trigger" data-mt-duration="300" href="#target">Trigger</a>
<button class="js-trigger" data-mt-duration="300" data-target="#target" type="button">Trigger</button>
```

### まとめて設定する
#(ハッシュ)から始まる href の値が指定してあるaタグのみスムーズスクロールできるようにします。
ちなみに href は hypertext reference の略です。
`href^=`で値が#から始まる aタグのみを配列化できます。

`forEach()`を使って一気に指定することも可能です。モダンブラウザであれば、`Array.prototype.slice.call`の指定は必要ありませんが、IE11では動きません！IE対策のために一行追加しましょう。

moveto.registerTrigger()で何をクリックしたら、moveTo が動くかを設定してやります。
```js:title=JavaScript
const anchorTags = document.querySelectorAll('a[href^="#"]')
anchorTags.forEach((value) => {
  moveto.registerTrigger(value)
})
```

## おまけ・アンカーのある遷移したページのスクロール位置を調整
MoveToではヘッダーが固定されていてもページ内アンカーの移動はうまく動きますが、別ページに遷移をした時はうまく動きません。

なので遷移先でも `tolerance` のような処理をしたい場合は以下のようにJSで調整しておきます。

スクロール位置をヘッダー分上に上がるように調整します。

特にアニメーションする必要もないので、移動位置をシンプルにヘッダーの高さ分上に移動させるだけです。

```js:title=JavaScript
window.addEventListener('load', () => {
  const urlHash      = location.hash;
  const headerHeight = document.querySelector('.header').clientHeight;
  if (urlHash) {
    const id = location.hash.split('#')[1]
    const position = document.getElementById(id).offsetTop - headerHeight;
    scrollTo(0, position);
  }
}, false)
```

完全に読み込み終了しないと、位置がずれることがあるので `addEventListener('load')` を使ってページ読み込み終了後に実行します。

## まとめ
いかがでしたか？<br>
jQueryなしでわりかしカンタンに設定できるしとにかく軽いのは嬉しいです。ぜひ使ってみてください。

<prof></prof>
