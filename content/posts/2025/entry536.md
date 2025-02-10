---
title: 2025年マスターしておきたいCSS10選
date: 2025-01-12
pageType: blog
hero: thumbnail/2025/entry536.jpg
cateId: web-developer
tags: ["CSS"]
description: CSS機能が向上したおかげでJSなしで使えるものも増えてきていますね。現役でコーダーが抑えておきたいCSS10選。scroll-behavior,margin-inline:auto,max-content,<wbr>,background-clip,backdrop-filter,image-set,interpolate-size
---

CSS機能が向上したおかげでサイトの軽量化できるし、JSなしで使えるものも増えてきていますね。Web業界10年以上、身にしみて便利になったと思う今日このごろです。

最近よく使うプロパティはもちろん、情報のアップデートも兼ねて、今回はマスターしておきたいCSS10選ということでお届けします。

<prof></prof>

## CSSだけでscroll-behavior
遠い昔であれば、JSで記述したスムーズスクロールもCSSで解決できるようになりました。スピードなどは調整できませんが十分使えます。

```CSS:title=CSS
html {
  scroll-behavior: smooth;
}
```
ヘッダー固定の場合。例えばヘッダーの高さが60pxの場合は`scroll-padding`を`60px`足せばいいだけです。
```CSS:title=CSS
html {
  scroll-behavior: smooth;
  scroll-padding-top: 60px;
}
```

## iOSなどの可変するビューポート対応、height と dvh
iOSで `height: 100vh` こんな変な隙間ができる問題覚えてますか？

![iOSなどの可変するビューポート対応、height と dvh](./images/2025/01/entry536-3.jpg)

単位vhが出たときは画期的で、スマホのドロワーメニューやフルスクリーンのサイトで大活躍しました。iOSのビューポートがスクロールに応じてメニューが出てくるのでJSを書いて対応などしなければなりませんでした。

現在では`dvh`ですべてのモダンブラウザで対応可能です。


| バリエーション | 値 |
| ---- | ---- |
| *Large* | lvw, lvh, lvmin, lvmax  |
| *Small* | vw, svh, svmin, svmax  |
| *Dynamic* | dvw,dvh,dvmin,dvmax |

```css
height: 100dvh;
```

## margin-inline: auto でセンタリング
ブロックコンテンツのセンタリングは以下のようにしていました。
```CSS:title=CSS
.box {
  margin-left: auto;
  margin-right: auto;
}
```
CSSの「論理プロパティ」で、要素の「インライン方向」のマージンを設定するためのものです。ブロックのコンテンツを文章の方向のように扱えます。
margin-inlineを使えば1行ですみます。

```CSS:title=CSS
.box {
  margin-inline: auto;
  /*
  上記は以下のショートハンド
  margin-inline-start: auto;
  margin-inline-end: auto;
  */
}
```

先程も言及したようにただ縦書きのときには注意が必要です。

上下のマージンが設定されます。

<card id="/blogs/entry436/"></card>

## 内側のコンテンツ要素のサイズを合わせたい max-content
私はよく文字に下線を引いたようなデザインを実装することがあります。

![下線を引いたようなデザインを実装](./images/2025/01/entry536-1.jpg)

従来は`display: inline`で、`position: absolute`や`display: grid;grid-direction:column`を利用して無理やり内側のコンテンツ要素のサイズハマるようにしていました。

`max-content`を使えば、1行でコンテンツにピタッとハマった要素が作れます。

* *min-content*: ボックス内で自動改行される場合、そのコンテンツを収納するインラインサイズ
* *max-content*: コンテンツの幅とおなじになる
* *fit-content*: 上記2つを組み合わせたもの

日本語は英語のように単語単位で改行しないので、我々が主に使うのは`max-content` と`fit-content`だけでいいと思います。

```CSS:title=CSS
.subtitle {
  width: max-content;
}
```

[内側のコンテンツ要素のサイズを合わせたい max-content|CODEPEN](https://codepen.io/camille-cebu/pen/GgKGbZV)

## 親要素だけに固定：position: sticky
もうすっかり定番中の定番！`position: sticky`です。メニュー追従させることがありますよね？

`position: sticky`を使うと特定の親要素の中だけ固定され、スクロールなどが終わると固定が終わります。

このサイトも利便性を考えPCでは記事の領域だけ目次を右に固定してあります。

```CSS:title=CSS
article {
  position: relative;
}
.table-of-content {
  position: sticky;
  right: 0;
  top: 0;
}
```
[background-clip でアイコン作成|CODEPEN](https://codepen.io/camille-cebu/pen/raBKgRm)

## word-break:keep-all と&lt;wbr>でディバイス幅に応じて改行
ディバイス幅で変なところで改行されたら悲しいですよね？

そんな時は`word-break:keep-all` と`<wbr>`が活躍します。

実際文章はきれいに読ませたい文章や、見出しでは重宝しますが、ブログなどの長めの記事ではぶっちゃけ使えません。

```html
<h2>内側のコンテンツ要素の<wbr>サイズを<wbr>合わせたい max-content</h2>
```

```CSS:title=CSS
h2 {
  word-break: keep-all;
}
```
<figure className="animation"><img src="/images/animation/2025/entry536-1.webp" width="600" height="184" alt="detailsでアコーディオン" decoding="async" loading="lazy"/></figure>

[word-break:keep-all と<wbr>でディバイス幅に応じて改行}|CODEPEN](https://codepen.io/camille-cebu/pen/bNbKyXN)

## background-clip でアイコン作成
最近アイコンを`background-clip`で作成する機会がい増えました。

![background-clip でアイコン作成](./images/2025/01/entry536-2.jpg)

素材がすぐ用意できない時は、borderで変態みたいなハックを駆使して作っていましたが、コードは長くなるし疲れます。

`background-clip`を使えばコードの記述量が減ります。

```SCSS:title=SASS
a {
  background: #ff9e08;
  display: grid;
  color: #fff;
  grid-template-columns: 10px 1fr 10px;
  border-radius: 8px;
  font-weight: bold;
  padding: 16px;
  box-sizing: border-box;
  text-align: center;
  align-items: center;
  height: 50px;
  max-width: 300px;
  text-decoration: none;
  &::before,&::after {
    content: '';
  }
  &::after {  
    display: block;
    height: 8px;
    width: 10px;
    background: #fff;
    clip-path: polygon(100% 50%, 0 0, 0 100%);
  }
}
```
アイコンの位置も`absolute`ではなく `grid` を使えば小難しい計算が必要なくなり、コードも使いまわしできます。

[background-clip でアイコン作成|CODEPEN](https://codepen.io/camille-cebu/pen/raBKgRm)

ジェネレーターを使えば簡単に図形が作れます。

[Clippy — CSS clip-path maker](https://bennettfeely.com/clippy/)

## backdrop-filterで重なった下のコンテンツにフィルターする
`backdrop-filter`を使うと下に重なるコンテンツにフィルターを掛けることができます。
当サイトのヘッダーは半透明白で`backdrop-filter`と`blur()`でぼかしています。

```CSS:title=css
  backdrop-filter: blur(2px);
```

![background-clip でアイコン作成](./images/2025/01/entry536-4.jpg)

関数は以下のとおりです。`drop-shadow`と`saturate`は使わないので省きます。

| 関数 | 効果 | 値 |
| ---- | ---- | --- |
| *blur* | ボカす | 1px〜|
| *brightness()* |明るさの調整 | 0%~ (100%がデフォ) |
| *contrast* |コントラストの調整 | 0%（グレー)~ (100%がデフォ) |
| *grayscale()* |グレースケールに変換 | 0% ~100% |
| *hue-rotate()* |色相の角度を回転 | 0deg~ |
| *invert()* |反転 | 0%~100% |
| *opacity()* |透過率を適用 | 0% ~100% |
| *sepia()* |セピア調 | 0% ~100% |

[backdrop-filterで重なった下のコンテンツにフィルターする|CODEPEN](https://codepen.io/camille-cebu/pen/xbKzoWQ)

## image-set で背景も webp 対応する

サイトを軽くしたいのでどんどんwebpを使いたい！ところです。現在ではすべてのモダンブラウザに対応しているようで、当サイトも以前アニメーションはgifアニメからwebpに切り替えました。

iOSであれば14以降、MacはmacOS 11 Big Sur以降であれば対応済み。6年前webp対応のサーバだったので画像が見れないとクレームを喰らったことがあります。もうそろ完全にWebpに切り替えてもいい気もしますが、、、、

HTML内の画像であれば、pictureタグで出し分けれますがCSSを背景で設定する場合は`image-set`を使います。


```CSS:title=CSS
.element {
  background-image: image-set(
    url("xx.jpg") type("image/jpg"),
    url("xx@1x.webp") type("image/webp") 1x,
    url("xx@2x.webp") type("image/webp") 2x,
  );
}
```
```CSS
url("xx@2x.webp")←画像パス
type("image/webp")←画像タイプ
2x←ディスプレイの解像度
```
これでRetinaなどの高解像度のブラウザでも画像がぼやけることはありません。

`image-set`を対応していないブラウザ対策。
```CSS:title=CSS
.element {
  background: url("xx.jpg")
}
@supports (background-image: image-set(url("xx@1x.webp") type("image/webp") 1x)){
  .element {
    background-image: image-set(
      url("xx@1x.webp") type("image/webp") 1x,
      url("xx@2x.webp") type("image/webp") 2x,
    );
  }
}
```
`image-set`に設定した値を一個だけ書いておけば対応してくれます。

iOS 16以下に対応する場合は、`-webkit-`を付与してください。
```CSS:title=CSS
.element {
  background: url("xx.jpg")
}
@supports (background-image: -webkit-image-set(url("xx@1x.webp") type("image/webp") 1x)){
  .element {
    background-image: -webkit-image-set(
      url("xx@1x.webp") type("image/webp") 1x,
      url("xx@2x.webp") type("image/webp") 2x,
    );
    background-image: image-set(
      url("xx@1x.webp") type("image/webp") 1x,
      url("xx@2x.webp") type("image/webp") 2x,
    );
  }
}
```
[image-setで背景もwebp対応する|CODEPEN](https://codepen.io/camille-cebu/pen/LEPrwYP)

## interpolate-size で height:auto のコンテンツをアコーディオンアニメーション

要素に含まれるコンテンツの大きさを基準に要素のサイズのことを`intrinsic-size`といいます。

`interpolate-size`は`intrinsic-size`をアニメーション化するかどうかを指定するためのCSSプロパティです。
値を`allow-keywords`にセットすると`intrinsic-size`が使えるようになります。

現時点ではChromeとEdgeのみの実装ですが、一足先にご紹介しておきます。

* FireFox一方向だけアニメーションする
* Safari全くだめ

<figure className="animation"><img src="/images/animation/2025/entry536-5.webp" width="600" height="184" alt="detailsでアコーディオン" decoding="async" loading="lazy"/></figure>

```HTML:title=HTML
<div>
  <button type="button">トグルボタン</button>
  <ul className="content">
    <li>メニュー1</li>
    <li>メニュー2</li>
    <li>メニュー3</li>
    <li>メニュー4</li>
  </ul>
</div>
```

```CSS:title=SASS
@supports (interpolate-size: allow-keywords) {
  :root {
    interpolate-size: allow-keywords;
  }
  button {
      &.open {
        & + .content {
          height: auto;
        }
      }
    }
  .content {
    transition: height .3s;
    height: 0;
    overflow: clip;
  }
}
```
```JS:title=JS
const title = document.querySelector('button')

title.addEventListener('click', ()=>{
  const hasClass = title.classList.contains('open')
  title.classList.toggle('open', !hasClass)
})
```
[interpolate-size でheight:autoのコンテンツをアコーディオンアニメーション|CODEPEN](https://codepen.io/camille-cebu/pen/raBKXGg)
## interpolate-sizeが全ブラウザに対応されるのが待ち遠しい！

`interpolate-size`なんかは実装されたらいろんな煩わしいハックをしなくて良くなるので超期待しています。

今回は10つのCSSについて触れましたが、マスターしておきたいCSSって10個どころじゃないんですが笑

grid、flexあたりをやり始めると記事一個になっちゃうので辞めときます。

この記事が皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。
